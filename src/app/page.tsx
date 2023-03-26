'use client';

import { Inter } from '@next/font/google';
import styles from './page.module.css';
import Link from 'next/link';

import React, { useEffect, useState } from 'react';
import Looks from '../components/Looks/Looks';
import ClothesSet from '../components/ClothesSet/ClothesSet';
import './page.css';
import { type Clothe } from '../types';
import AddCloth from '../components/AddCloth/AddCloth';
import User from '@/models/schema/user';

type Modal = {
	addCloth: 'active' | '';
	looks: 'active' | '';
};

function Home(): JSX.Element {
	const [selectedClothes, setSelectedClothes] = useState<Clothe[]>([]);
	const [modal, setModal] = useState<Modal>({ addCloth: '', looks: 'active' });
	const [clothes, setClothes] = useState<Clothe[]>([]);

	const user = localStorage.getItem('user');
	const token = localStorage.getItem('token');
	const userName = localStorage.getItem('userName');

	useEffect(() => {
		getAllClothes();
	}, []);

	const getAllClothes = async (): Promise<void> => {
		if (!(user || token || userName)) {
			window.location = 'http://localhost:3000/Login';
			// router.push('/Login');
			return;
		}
		fetch(`http://localhost:3333/users/${user}/clothes`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then(async (response) => {
			const data = await response.json();
			if (data.error) return;

			setClothes(data.clothes);
		});
	};

	function handleClickChange(clothe: Clothe): void {
		const filteredClothes = selectedClothes.filter((element) =>
			element.body === clothe.body ? element : undefined
		);
		if (!filteredClothes.length) {
			const newSelectedClothes: Clothe[] = [...selectedClothes, clothe];
			setSelectedClothes(newSelectedClothes);
		}
	}

	function removeCloth(id: string): void {
		const newSelectedClothes: Clothe[] = selectedClothes.filter(
			(clothe) => clothe.id !== id
		);
		setSelectedClothes(newSelectedClothes);
	}

	function addClothe(id: string): void {
		const selectedClothe: Clothe = clothes.filter(
			(clothe) => clothe.id === id
		)[0];
		const newSelectedClothes = selectedClothes.filter(
			(clothe) => clothe.body !== selectedClothe.body
		);
		if (selectedClothes.length === 0) {
			setSelectedClothes([selectedClothe]);
			return;
		}

		if (newSelectedClothes.length > 0) {
			setSelectedClothes([...selectedClothes, selectedClothe]);
		}
	}

	function logOut() {
		localStorage.removeItem('userName');
		localStorage.removeItem('user');
		localStorage.removeItem('token');
		window.location = 'http://localhost:3000/Login';
	}

	function activeModal(n: 'addCloth' | 'cloth'): void {
		if (n === 'addCloth') {
			setModal({ addCloth: 'active', looks: '' });
			return;
		}

		setModal({ addCloth: '', looks: 'active' });
	}

	return (
		<main id='home'>
			<header>
				<nav>
					<ul>
						<li
							className={`${modal.addCloth}`}
							onClick={() => {
								activeModal('addCloth');
							}}
						>
							Adicionar roupa
						</li>
						<li
							className={`${modal.looks}`}
							onClick={() => {
								activeModal('cloth');
							}}
						>
							Roupas
						</li>
					</ul>
				</nav>
				<h1>Olá, {userName?.toUpperCase()}</h1>
				<button
					onClick={() => {
						logOut();
					}}
				>
					Sign out
				</button>
			</header>
			<div className='looks-container'>
				<AddCloth
					updateClothes={getAllClothes}
					modal={modal.addCloth}
				/>
				<Looks
					clothes={clothes}
					modal={modal.looks}
					addClothe={addClothe}
					updateClothes={getAllClothes}
				/>

				<ClothesSet
					removeCloth={removeCloth}
					selectedClothes={selectedClothes}
				/>
			</div>
		</main>
	);
}

export default Home;
