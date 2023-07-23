/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import { NextApiRequest } from 'next';

import { AddIcon } from '@chakra-ui/icons';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { Avatar } from '@chakra-ui/react';

import {
	ClothePosition,
	ClothesProps,
	ExtendedSession,
	FetcherOptions,
	ModalState,
	OpenOrCloseModalProps,
	SessionProps,
	SetsProps,
} from '@/@types';
import AddClothe from '@/components/AddClothe';
import GridClothes from '@/components/GridClothes';

import ProfilePage from '@/components/ProfilePage';

import style from './home.module.css';
import WorkbenchSet from '@/components/WorkbenchSet';
import GridSets from '@/components/GridSets';
import Image from 'next/image';
import ContainerPage from '@/components/ContainerPage';
import Header from '@/components/Header';
import Head from 'next/head';
import uniqueCategories from '@/functions/uniqueCategories';
import useAppContext from '@/hooks/useAppContext';

type Props = {
	serverSession: SessionProps;
};

export default function Home({ serverSession }: Props) {
	const {
		clothes,
		setClothes,
		sets,
		setSets,
		workbench,
		setWorkbench,
		currentCategoryClothes,
		currentCategorySets,
		setCurrentCategoryClothes,
		setCurrentCategorySets,
	} = useAppContext();


	const [modal, setModal] = useState<ModalState>({
		changeCategoryModal: false,
		setModal: false,
		deleteModal: false,
		clotheModal: false,
		clothe: null,
		set: null,
	});

	const clothesAllCategories = clothes.map((clothe) => clothe.category);
	const clothesCategories = ['Favoritos', 'Todos', ...clothesAllCategories];

	const setsAllCategories = sets.map((set) => set.category);
	const setsCategories = ['Favoritos', 'Todos', ...setsAllCategories];

	const clotheUniqueCaterories = uniqueCategories(clothesCategories);
	const setsUniqueCategories = uniqueCategories(setsCategories);

	async function updateClothesAndSets() {
		const dataClothes = (await fetcher(
			`/api/protected/user/${serverSession.user.id}/clothe/all`,
		)) as ClothesProps[] | ClothesProps;
		const dataSets = (await fetcher(
			`/api/protected/user/${serverSession.user.id}/clothe/allSets`,
		)) as SetsProps[] | SetsProps;

		if (Array.isArray(dataClothes)) {
			setClothes(dataClothes);
		}
		if (Array.isArray(dataSets)) {
			setSets(dataSets);
		}
	}

	useEffect(() => {
		updateClothesAndSets();
	}, [serverSession]);

	function filteredCategory<ClothesOrSetsProps>(
		category: string,
		clothesOrSets: 'clothe' | 'sets',
	): ClothesOrSetsProps[] {
		if (clothesOrSets === 'clothe') {
			if (category === 'Favoritos') {
				return clothes.filter((clothe) => clothe.favorite) as ClothesOrSetsProps[];
			} else {
				return clothes.filter(
					(clothe) => clothe.category === category || category === 'Todos',
				) as ClothesOrSetsProps[];
			}
		} else {
			if (category === 'Favoritos') {
				return sets.filter((set) => set.favorite) as ClothesOrSetsProps[];
			} else {
				return sets.filter(
					(set) => set.category === category || category === 'Todos',
				) as ClothesOrSetsProps[];
			}
		}
	}

	async function fetcher(
		url: string,
		options?: FetcherOptions,
	): Promise<
		SetsProps | SetsProps[] | ClothesProps | ClothesProps[] | undefined
	> {
		const response = await fetch(
			url,
			options?.method
				? {
						method: options.method,
						body: options.body,
						headers: { 'Content-Type': 'application/json' },
				  }
				: undefined,
		);

		const data: any = await response.json();

		let clotheOrSet =
			(data.clothe as ClothesProps[]) || (data.set as SetsProps[]);

		if (data.error) {
			console.error('Erro: ', data.message);
			return;
		}

		if (options?.update) {
			await updateClothesAndSets();
		}

		return clotheOrSet;
	}

	function openOrCloseModal(
		{ whichModal, operation }: OpenOrCloseModalProps,
		clotheId: string | null = null,
		setId: string | null = null,
	) {
		const resetModal: ModalState = {
			changeCategoryModal: false,
			clothe: null,
			clotheModal: false,
			deleteModal: false,
			set: null,
			setModal: false,
		};
		let newModal = { ...modal };
		if (whichModal === 'clotheModal') {
			const newClothe = clothes.filter((clothe) => clothe.id === clotheId)[0];
			newModal.clothe = operation === 'open' ? newClothe : null;
			if (!newModal.clothe) {
				setModal(resetModal);
				return;
			}
			newModal.clotheModal = operation === 'open';
		} else if (whichModal === 'setModal') {
			const newSet = sets.filter((set) => set.id === setId)[0];
			newModal.set = operation === 'open' ? newSet : null;
			newModal.setModal = operation === 'open';
			if (!newModal.set) {
				setModal(resetModal);
				return;
			}
		} else {
			newModal[whichModal] = operation === 'open';
		}
		setModal(newModal);
	}

	function addToWorkbench(clotheId: string) {
		const alreadyExists = workbench.find((clothe) => clothe.id === clotheId);

		if (alreadyExists) return;

		const newWorkbench = [
			...workbench,
			{ ...clothes.filter((clothe) => clothe.id === clotheId)[0], x: 0, y: 0 },
		];
		setWorkbench(newWorkbench);
	}

	function resetWorkbench() {
		setWorkbench([]);
	}

	function removeItemWorkbench(clotheId: string) {
		const newWorkbench = workbench.filter((clothe) => clothe.id !== clotheId);
		setWorkbench(newWorkbench);
	}

	return (
		<>
			<Head>
				<title>{"Today's Look"}</title>
				<link
					rel='icon'
					href='/favIcon.ico'
				/>
			</Head>
			<div className={style.homePage}>
				<Tabs align='center'>
					<main>
						<TabPanels>
							<TabPanel className={style.page}>
								<Header
									title='Conjuntos'
									categoryes={true}
									uniqueCategories={setsUniqueCategories}
									openOrCloseModal={openOrCloseModal}
									setCurrentPage={setCurrentCategorySets}
								/>
								<ContainerPage>
									<GridSets
										sets={
											currentCategorySets === 'Todos'
												? filteredCategory('Todos', 'sets')
												: filteredCategory(currentCategorySets, 'sets')
										}
										uniqueCategories={setsUniqueCategories}
										fetcher={fetcher}
										modal={modal}
										openOrCloseModal={openOrCloseModal}
									/>
								</ContainerPage>
							</TabPanel>
							<TabPanel className={style.page}>
								<Header
									title='Roupas'
									categoryes={true}
									openOrCloseModal={openOrCloseModal}
									setCurrentPage={setCurrentCategoryClothes}
									uniqueCategories={clotheUniqueCaterories}
								/>
								<ContainerPage>
									<GridClothes
										openOrCloseModal={openOrCloseModal}
										addToWorkbench={addToWorkbench}
										fetcher={fetcher}
										modal={modal}
										removeItemWorkbench={removeItemWorkbench}
										uniqueCategories={clotheUniqueCaterories}
									/>
								</ContainerPage>
							</TabPanel>
							<TabPanel className={style.page}>
								<Header title='Adicionar Roupa' />
								<ContainerPage>
									<AddClothe
										userId={serverSession.user.id}
										updateClothesAndSets={updateClothesAndSets}
									/>
								</ContainerPage>
							</TabPanel>
							<TabPanel className={style.page}>
								<Header title='Criar Conjunto' />
								<ContainerPage>
									<WorkbenchSet
										resetWorkbench={resetWorkbench}
										fetcher={fetcher}
									/>
								</ContainerPage>
							</TabPanel>
							<TabPanel className={style.page}>
								<Header title='Perfil' />
								<ContainerPage>
									<ProfilePage userName={serverSession.user.name} />
								</ContainerPage>
							</TabPanel>
						</TabPanels>
					</main>

					<TabList className={style.footerPage}>
						<Tab height={10}>
							<img
								src='/wedding.png'
								alt='Conjunto'
							/>
						</Tab>
						<Tab height={10}>
							<img
								src='/tshirt.png'
								alt='Roupas'
							/>
						</Tab>
						<Tab height={10}>
							<div className={style.boxAddIcon}>
								<div className={style.addIcon}>
									<AddIcon
										borderRadius={'full'}
										width={5}
										height={5}
										color={'white'}
									></AddIcon>
								</div>
								<p>Adicionar</p>
							</div>
						</Tab>
						<Tab height={10}>
							<img
								src='/fashion.png'
								alt='Novo conjunto'
							/>
						</Tab>
						<Tab height={10}>
							<Avatar
								size={'sm'}
								name={serverSession.user.name}
								src={serverSession.user.image}
							/>
						</Tab>
					</TabList>
				</Tabs>
			</div>
		</>
	);
}

export async function getServerSideProps({ req }: { req: NextApiRequest }) {
	const serverSession = (await getSession({ req })) as ExtendedSession | null;

	if (!serverSession) {
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		};
	}

	return {
		props: {
			serverSession,
		},
	};
}
