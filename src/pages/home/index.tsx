/* eslint-disable @next/next/no-img-element */
'use client';
import {
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
	Center,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

import { useState } from 'react';
import style from './home.module.css';
import { useFormik } from 'formik';
import FormSendClothe from '@/components/FormSendClothe';
import HeaderClothesPage from '@/components/HeaderClothesPage';
import HeaderAddClothe from '@/components/HeaderAddClothePage';
import HeaderAddClothePage from '@/components/HeaderAddClothePage';
import { GetServerSidePropsContext } from 'next';
import { Response, UserSession } from '@/@types';
import { getSession } from 'next-auth/react';
import connectDb from '@/services/connectDBMong';

export default function Home({ session, clothes }: UserSession) {
	const [currentPage, setCurrentPage] = useState<string>('Todos');
	// const { getEditButtonProps } = useEditableControls();

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
							<FormSendClothe userId={session.user.id} />
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

async function getAllClothes(id: string) {
	console.log(id);
	try {
		const response = await fetch(
			`http://localhost:3000/api/protected/user/${id}/clothe/all`
		);
		const data: Response = await response.json();
		const { clothe } = data;
		return clothe;
	} catch (error) {
		console.error('Error: ' + error);
	}
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	await connectDb();
	const { req } = context;
	const session = await getSession({ req });
	// const session = true;
	console.log(session);
	if (!session) {
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		};
	}

	type t = {
		name: string;
		id: string;
		email: string;
		image: string;
	};

	const { id } = session.user as t;

	const clothes = await getAllClothes(id);

	return {
		props: { session, clothes, id },
	};
}
