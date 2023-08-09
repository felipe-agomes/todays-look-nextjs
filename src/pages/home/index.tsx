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
import { clotheService } from '@/services/ClotheService';
import { categoriesClotheOrSet } from '@/functions/categoriesClotheOrSet';
import { Response } from '@/controllers/FrontController';

type Props = {
	serverSession: SessionProps;
};

export default function Home({ serverSession }: Props) {
	const { setClothes, clothes, sets } = useAppContext();
	const setsCategories = categoriesClotheOrSet<SetsProps>(sets);
	const clothesCategories = categoriesClotheOrSet<ClothesProps>(clothes);

	const updateClothesAndSets = async () => {
		const response: Response = await clotheService.getAllByUserId({
			userId: serverSession.user.id,
		});
		setClothes(response.data);
	};

	useEffect(() => {
		updateClothesAndSets();
	}, [serverSession]);

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
									<Header.Category categories={setsCategories} />
								</Header.Root>
								<ContainerPage>
									<GridSets />
								</ContainerPage>
							</TabPanel>
							<TabPanel className={style.page}>
								<Header.Root title='Roupas'>
									<Header.Category
										categories={clothesCategories}
										isClothe
									/>
								</Header.Root>
								<ContainerPage>
									<GridClothes />
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
									<WorkbenchSet />
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
	// const serverSession = (await getSession({ req })) as ExtendedSession | null;

	const serverSession = {
		user: {
			id: '7108',
			name: 'Felipe de Almeida Gomes',
			email: 'falmeidagomes13@gmail.com',
			password: '$2b$08$/bTNU54RhkM2uBfN8tTYjeInR.w7Er97dqfeM8lV5iSF6m2dmAHWq',
			image:
				'https://lh3.googleusercontent.com/a/AGNmyxbMjhevatxOLBIb0laXHYi8oKUlIXGrn_bNvBmuPg=s96-c',
		},
	};

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
