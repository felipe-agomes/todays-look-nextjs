import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';

import { GetServerSideProps, NextApiRequest } from 'next';
import { getSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import style from './home.module.css';
import Image from 'next/image';

type UserSession = {
	session: {
		user: {
			email: string;
			user: string;
			id: number;
		};
	};
	clothes: Clothes[] | null;
};

type Clothes = {
	id: number;
	body: string;
	category: string;
	favorite: false;
	image: string;
	key: string;
	userId: number;
};

type Response = {
	error: boolean;
	message: string;
	clothe: Clothes[] | null;
};

export default function Home({ session, clothes }: UserSession) {
	const categories: string[] | null =
		clothes &&
		clothes.map((clothe) => {
			return clothe.category;
		});
	const uniqueCategories =
		categories &&
		categories.filter((category, index) => {
			return categories.indexOf(category) === index;
		});

	function handleEditClothes() {
		console.log('Editar roupas');
	}

	function handleWardobe() {
		console.log('Guarda roupas');
	}

	function handleAddClothes() {
		console.log('Adicionar roupas');
	}

	return (
		<div className={style.homePage}>
			<header className={style.headerPage}>
				<div className={style.topHeader}>
					<h1>Roupas</h1>
					<button onClick={handleEditClothes}>Editar roupas</button>
				</div>
				<nav className={style.navegation}>
					<ul className={style.categoryes}>
						{uniqueCategories &&
							uniqueCategories.map((category) => {
								return <li key={category}>{category}</li>;
							})}
					</ul>
				</nav>
			</header>
			<Tabs align='center'>
				<TabPanels>
					<TabPanel className={style.mainPage}>
						{clothes &&
							clothes.map((clothe) => {
								console.log(clothe.image);
								return (
									<img
										key={clothe.id}
										alt={clothe.key}
										// width={200}
										// height={300}
										src={clothe.image}
									></img>
								);
							})}
					</TabPanel>
					<TabPanel>
						<p>Adicionar roupa</p>
					</TabPanel>
					<TabPanel>
						<p>Perfil</p>
					</TabPanel>
				</TabPanels>

				<TabList className={style.footerPage}>
					<Tab width={70}>Roupas</Tab>
					<Tab width={70}>+</Tab>
					<Tab width={70}>Perfil</Tab>
				</TabList>
			</Tabs>
		</div>
	);
}

async function getAllClothes() {
	const response = await fetch(
		`http://localhost:3000/api/protected/user/14/clothe/all`
	);
	const data: Response = await response.json();
	const { clothe } = data;
	return clothe;
}

export async function getServerSideProps({ req }) {
	// const session = await getSession({ req });
	const session = true;

	if (!session) {
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		};
	}

	const clothes = await getAllClothes();

	return {
		props: { session, clothes },
	};
}
