/* eslint-disable @next/next/no-img-element */
'use client';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

import { useEffect, useState } from 'react';
import style from './home.module.css';
import FormSendClothe from '@/components/FormSendClothe';
import HeaderClothesPage from '@/components/HeaderClothesPage';
import HeaderAddClothePage from '@/components/HeaderAddClothePage';
import { Clothes, ExtendedSession, SessionProps, UserSession } from '@/@types';
import connectDb from '@/services/connectDb';
import { getSession, useSession } from 'next-auth/react';
import { NextApiRequest } from 'next';

export default function Home({
	serverSession,
}: // clothes,
{
	serverSession: SessionProps;
	clothes: Clothes[];
}) {
	const [currentPage, setCurrentPage] = useState<string>('Todos');
	const [clothes, setClothes] = useState<Clothes[] | []>([]);

	async function getAllClothes(id: string) {
		const response = await fetch(
			`http://localhost:3000/api/protected/user/${id}/clothe/all`
		);

		const data: { error: string; message: string; clothe: Clothes[] } =
			await response.json();

		return data.clothe;
	}

	useEffect(() => {
		getAllClothes(serverSession.user.id).then((clothesData) =>
			setClothes(clothesData)
		);
	}, [serverSession]);

	let categories: string[] = ['Todos'];
	let clothesCategories: string[] = [];

	if (clothes) {
		clothesCategories =
			clothes &&
			clothes.map((clothe) => {
				return clothe.category;
			});
	}
	categories = [...categories, ...clothesCategories];

	const uniqueCategories = categories.filter((category, index) => {
		return categories.indexOf(category) === index;
	});

	function filteredClothes(category: string) {
		const clothesByCategory: (JSX.Element | undefined)[] | null =
			clothes &&
			clothes.map((clothe) => {
				if (clothe.category === category || category === 'Todos') {
					return (
						<img // TODO: Alterar para a tag imagem do next
							key={clothe.id}
							alt={clothe.key}
							// width={200}
							// height={300}
							src={clothe.image}
						></img>
					);
				}
			});
		return clothesByCategory;
	}

	return (
		<div className={style.homePage}>
			<Tabs align='center'>
				<main>
					<TabPanels>
						<TabPanel className={style.mainPage}>
							<HeaderClothesPage
								setCurrentPage={setCurrentPage}
								uniqueCategories={uniqueCategories}
							/>
							{currentPage === 'Todos'
								? filteredClothes('Todos')
								: filteredClothes(currentPage)}
						</TabPanel>
						<TabPanel className={style.MainAddClothe}>
							<HeaderAddClothePage />
							<FormSendClothe userId={serverSession.user.id} />
						</TabPanel>
						<TabPanel>
							<p>Perfil</p>
						</TabPanel>
					</TabPanels>
				</main>

				<TabList className={style.footerPage}>
					<Tab width={100}>Roupas</Tab>
					<Tab>
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
					<Tab width={100}>Perfil</Tab>
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
