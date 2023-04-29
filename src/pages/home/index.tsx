/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import { NextApiRequest } from 'next';

import { AddIcon } from '@chakra-ui/icons';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react';

import {
	ClotheResponse,
	Clothes,
	ExtendedSession,
	FetcherOptions,
	ModalState,
	SessionProps,
	SetsProps,
	SetsResponse,
} from '@/@types';
import ClotheModal from '@/components/ClotheModal';
import FormSendClothe from '@/components/FormSendClothe';
import GridClothes from '@/components/GridClothes';

import ProfilePage from '@/components/ProfilePage';

import style from './home.module.css';
import HeaderClothesPage from '@/components/HeaderClothesPage';
import HeaderPage from '@/components/HeaderPage';
import WorkbenchSet from '@/components/workbenchClotheSet';
import GridSets from '@/components/GridSets';

type Props = {
	serverSession: SessionProps;
};

export default function Home({ serverSession }: Props) {
	const [currentPage, setCurrentPage] = useState<string>('Todos');
	const [clothes, setClothes] = useState<Clothes[] | []>([]);
	const [sets, setSets] = useState<SetsProps[] | []>([]);
	const [modal, setModal] = useState<ModalState>({
		changeCategoryModal: false,
		deleteModal: false,
		clotheModal: false,
		clothe: null,
	});
	const [workbench, setworkbench] = useState<Clothes[] | []>([]);

	const clothesCategories = clothes.map((clothe) => clothe.category);
	const categories = ['Favoritos', 'Todos', ...clothesCategories];
	const uniqueCategories = categories.filter(
		(category, index) => categories.indexOf(category) === index
	);

	async function updateClothesAndSets() {
		const dataClothes = (await fetcher(
			`/api/protected/user/${serverSession.user.id}/clothe/all`
		)) as Clothes[] | Clothes;

		const dataSets = (await fetcher(
			`/api/protected/user/${serverSession.user.id}/clothe/allSets`
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

	function filteredClothes(category: string) {
		if (category === 'Favoritos') {
			return clothes.filter((clothe) => clothe.favorite);
		} else {
			return clothes.filter(
				(clothe) => clothe.category === category || category === 'Todos'
			);
		}
	}

	async function fetcher(
		url: string,
		options?: FetcherOptions
	): Promise<SetsProps | SetsProps[] | Clothes | Clothes[] | undefined> {
		let response;
		if (options?.method) {
			response = await fetch(url, {
				method: options.method,
				body: options.body,
				headers: { 'Content-Type': 'application/json' },
			});
		} else {
			response = await fetch(url);
		}

		const data: any = await response.json();
		let clotheOrSet;

		if (data.clothe) {
			clotheOrSet = data.clothe as Clothes[];
		} else if (data.set) {
			clotheOrSet = data.set as SetsProps[];
		}

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
		{
			whichModal,
			operation,
		}: {
			whichModal: 'clotheModal' | 'deleteModal' | 'changeCategoryModal';
			operation: 'open' | 'close';
		},
		clotheId?: string
	) {
		if (whichModal === 'clotheModal') {
			const newClothe = clothes.filter((clothe) => clothe.id === clotheId)[0];
			operation === 'open'
				? setModal({ ...modal, clothe: newClothe, clotheModal: true })
				: setModal({
						clothe: null,
						clotheModal: false,
						deleteModal: false,
						changeCategoryModal: false,
				  });
		} else if (whichModal === 'deleteModal') {
			operation === 'open'
				? setModal({ ...modal, deleteModal: true })
				: setModal({ ...modal, deleteModal: false });
		} else if (whichModal === 'changeCategoryModal') {
			operation === 'open'
				? setModal({ ...modal, changeCategoryModal: true })
				: setModal({ ...modal, changeCategoryModal: false });
		}
	}

	function addToWorkbench(clotheId: string) {
		const alreadyExists = workbench.find((clothe) => clothe.id === clotheId);

		if (alreadyExists) return;

		const newWorkbench = [
			...workbench,
			clothes.filter((clothe) => clothe.id === clotheId)[0],
		];
		setworkbench(newWorkbench);
	}

	function resetWorkbench() {
		setworkbench([]);
	}

	function removeItemWorkbench(clotheId) {
		const newWorkbench = workbench.filter((clothe) => clothe.id !== clotheId);
		setworkbench(newWorkbench);
	}

	console.log(clothes);

	return (
		<div className={style.homePage}>
			<Tabs align='center'>
				<main>
					<TabPanels>
						<TabPanel className={style.page}>
							<HeaderPage headerTitle='Conjuntos' />
							<GridSets sets={sets} />
						</TabPanel>
						<TabPanel className={style.page}>
							<HeaderClothesPage
								openOrCloseModal={openOrCloseModal}
								setCurrentPage={setCurrentPage}
								uniqueCategories={uniqueCategories}
							/>
							<GridClothes
								clothes={
									currentPage === 'Todos'
										? filteredClothes('Todos')
										: filteredClothes(currentPage)
								}
								openOrCloseModal={openOrCloseModal}
							>
								<ClotheModal
									removeItemWorkbench={removeItemWorkbench}
									workbench={workbench}
									addToWorkbench={addToWorkbench}
									categories={uniqueCategories.filter(
										(category) => category !== 'Todos' && category !== 'Favoritos'
									)}
									openOrCloseModal={openOrCloseModal}
									fetcher={fetcher}
									modal={modal}
								/>
							</GridClothes>
						</TabPanel>
						<TabPanel className={style.page}>
							<HeaderPage headerTitle='Adicionar Roupa' />
							<FormSendClothe
								userId={serverSession.user.id}
								updateClothesAndSets={updateClothesAndSets}
							/>
						</TabPanel>
						<TabPanel
							className={style.page}
							style={{ background: '#eee' }}
						>
							<HeaderPage headerTitle='Criar Conjunto' />
							<WorkbenchSet
								resetWorkbench={resetWorkbench}
								fetcher={fetcher}
								workbench={workbench}
							/>
						</TabPanel>
						<TabPanel className={style.page}>
							<HeaderPage headerTitle='Perfil' />
							<ProfilePage userName={serverSession.user.name} />
						</TabPanel>
					</TabPanels>
				</main>

				<TabList className={style.footerPage}>
					<Tab height={10}>
						<img
							src='wedding.png'
							alt='Conjunto'
						/>
					</Tab>
					<Tab height={10}>
						<img
							src='tshirt.png'
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
							src='fashion.png'
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
