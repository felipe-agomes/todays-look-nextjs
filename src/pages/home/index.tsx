/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import { NextApiRequest } from 'next';

import { AddIcon } from '@chakra-ui/icons';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { Avatar } from '@chakra-ui/react';

import {
	ClothesProps,
	ExtendedSession,
	FetcherOptions,
	SessionProps,
	SetsProps,
} from '@/@types';
import AddClothe from '@/components/AddClothe';
import GridClothes from '@/components/GridClothes';

import ProfilePage from '@/components/ProfilePage';

import style from './home.module.css';
import WorkbenchSet from '@/components/WorkbenchSet';
import GridSets from '@/components/GridSets';
import ContainerPage from '@/components/ContainerPage';
import Head from 'next/head';
import useAppContext from '@/hooks/useAppContext';
import { Header } from '@/components/Header';
import { FrontController } from '@/services/FrontController';
import { FetcherAxios } from '@/services/Fetcher';

type Props = {
	serverSession: SessionProps;
};

export default function Home({ serverSession }: Props) {
	const { setClothes, setSets } = useAppContext();

	// async function updateClothesAndSets() {
	// 	const clotheService = makeClotheService();
	// 	setClothes((await clotheService.getAll(serverSession.user.id)).clothes);
	// 	const dataClothes = response.clothes as ClothesProps[] | [];
	// 	setClothes(dataClothes.clothes);
	// 	const dataSets = (await fetcher(
	// 		`/api/protected/user/${serverSession.user.id}/clothe/allSets`,
	// 	)) as SetsProps[] | SetsProps;

	// 	if (Array.isArray(dataClothes)) {
	// 		setClothes(dataClothes);
	// 	}
	// 	if (Array.isArray(dataSets)) {
	// 		setSets(dataSets);
	// 	}
	// }

	const updateClothesAndSets = async () => {};

	useEffect(() => {
		const fetcherAxios = new FetcherAxios();
		const frontController = new FrontController(fetcherAxios);
		frontController
			.doGet({ url: '/api/protected/adm/alluser' })
			.then(console.log);

		updateClothesAndSets();
	}, [serverSession]);

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
								<Header.Root title='Conjuntos'>
									<Header.Category />
								</Header.Root>
								<ContainerPage>
									<GridSets fetcher={fetcher} />
								</ContainerPage>
							</TabPanel>
							<TabPanel className={style.page}>
								<Header.Root title='Roupas'>
									<Header.Category isClothe />
								</Header.Root>
								<ContainerPage>
									<GridClothes fetcher={fetcher} />
								</ContainerPage>
							</TabPanel>
							<TabPanel className={style.page}>
								<Header.Root title='Adicionar Roupa' />
								<ContainerPage>
									<AddClothe
										userId={serverSession.user.id}
										updateClothesAndSets={updateClothesAndSets}
									/>
								</ContainerPage>
							</TabPanel>
							<TabPanel className={style.page}>
								<Header.Root title='Criar Conjunto' />
								<ContainerPage>
									<WorkbenchSet fetcher={fetcher} />
								</ContainerPage>
							</TabPanel>
							<TabPanel className={style.page}>
								<Header.Root title='Perfil' />
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
