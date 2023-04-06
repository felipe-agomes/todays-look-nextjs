import { NextApiRequest } from 'next';
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
};

export default function Home({ session }: UserSession) {
	const categoryes = [
		'Camiseta',
		'blusa',
		'shorts',
		'tenis',
		'sapato',
		'bermuda',
		'CALÇA',
		'LUVA',
	];

	const clothes = [
		'roupa1',
		'roupa2',
		'roupa3',
		'roupa4',
		'roupa5',
		'roupa6',
		'roupa7',
		'roupa8',
		'roupa9',
		'roupa10',
		'roupa11',
	];

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
						{categoryes.map((category) => {
							return <li key={category}>{category}</li>;
						})}
					</ul>
				</nav>
			</header>

			<main className={style.mainPage}>
				{clothes.map((clothe) => {
					return (
						<h1
							key={clothe}
							style={{ height: '128px' }}
						>
							{clothe}
						</h1>
					);
				})}
			</main>
			<footer className={style.footerPage}>
				<button
					onClick={handleWardobe}
					className={style.buttonWardobe}
				>
					Roupas
				</button>
				<button
					onClick={handleAddClothes}
					className={style.buttonAddClothes}
				>
					Adicionar
				</button>
			</footer>
		</div>
	);
}

export async function getServerSideProps({ req }) {
	// const session = await getSession({ req }); ABILITAR EM PRODUÇÃO
	const session = true;

	if (!session) {
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		};
	}

	return {
		props: { session },
	};
}
