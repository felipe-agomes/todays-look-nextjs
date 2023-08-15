'use client';
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import S from './home.module.css';
import AddClothe from '@/components/AddClothe';
import ContainerPage from '@/components/ContainerPage';
import GridClothes from '@/components/GridClothes';
import GridSets from '@/components/GridSets';
import ProfilePage from '@/components/ProfilePage';
import WorkbenchSet from '@/components/WorkbenchSet';
import useAppContext from '@/hooks/useAppContext';
import useSetCltohes from '@/hooks/useSetClothes';
import useSetSets from '@/hooks/useSetSets';
import Head from 'next/head';
import { Header } from '@/components/Header';
import { categoriesClotheOrSet } from '@/functions/categoriesClotheOrSet';
import { AddIcon } from '@chakra-ui/icons';
import {
	Tabs,
	TabPanels,
	TabPanel,
	TabList,
	Tab,
	Avatar,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { ClotheData, SetData } from '@/@types/models';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Home() {
	const { clothes, sets } = useAppContext();
	const { updateClothes } = useSetCltohes();
	const { updateSet } = useSetSets();
	const { data: session, status: sessionStatus } = useSession() as any;
	const router = useRouter();
	const setsCategories = categoriesClotheOrSet<SetData>(sets);
	const clothesCategories = categoriesClotheOrSet<ClotheData>(clothes);

	useEffect(() => {
		if (sessionStatus === 'unauthenticated') {
			router.push('/login');
			return;
		}
		if (session) {
			updateClothes(session.user.id);
			updateSet(session.user.id);
		}
	}, [session]);

	return (
		<>
			{session && (
				<>
					<Head>
						<title>{"Today's Look"}</title>
						<link
							rel='icon'
							href='/favIcon.ico'
						/>
					</Head>
					<div className={S.homePage}>
						<Tabs align='center'>
							<main>
								<TabPanels>
									<TabPanel className={S.page}>
										<Header.Root title='Conjuntos'>
											<Header.Category categories={setsCategories} />
										</Header.Root>
										<ContainerPage>
											<GridSets />
										</ContainerPage>
									</TabPanel>
									<TabPanel className={S.page}>
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
									<TabPanel className={S.page}>
										<Header.Root title='Adicionar Roupa' />
										<ContainerPage>
											<AddClothe userId={session.user.id} />
										</ContainerPage>
									</TabPanel>
									<TabPanel className={S.page}>
										<Header.Root title='Criar Conjunto' />
										<ContainerPage>
											<WorkbenchSet />
										</ContainerPage>
									</TabPanel>
									<TabPanel className={S.page}>
										<Header.Root title='Perfil' />
										<ContainerPage>
											<ProfilePage userName={session.user.name} />
										</ContainerPage>
									</TabPanel>
								</TabPanels>
							</main>

							<TabList className={S.footerPage}>
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
									<div className={S.boxAddIcon}>
										<div className={S.addIcon}>
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
										name={session.user.name}
										src={session.user.image}
									/>
								</Tab>
							</TabList>
						</Tabs>
					</div>
				</>
			)}
		</>
	);
}
