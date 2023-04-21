/* eslint-disable @next/next/no-img-element */
'use client';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

import { useEffect, useState } from 'react';
import style from './home.module.css';
import FormSendClothe from '@/components/FormSendClothe';
import HeaderClothesPage from '@/components/HeaderClothesPage';
import HeaderAddClothePage from '@/components/HeaderAddClothePage';
import {
	ClotheResponse,
	Clothes,
	ExtendedSession,
	SessionProps,
} from '@/@types';
import { getSession } from 'next-auth/react';
import { NextApiRequest } from 'next';
import ProfilePage from '@/components/ProfilePage';
import GridClothes from '@/components/GridClothes';
import ClotheModal from '@/components/ClotheModal';

export default function Home({
	serverSession,
}: {
	serverSession: SessionProps;
}) {
	const [currentPage, setCurrentPage] = useState<string>('Todos');
	const [clothes, setClothes] = useState<Clothes[] | []>([]);
	const [modal, setModal] = useState<{
		modal: 'active' | '';
		clothe: Clothes | null;
	}>({
		modal: '',
		clothe: null,
	});
	const [deleteModal, setDeleteModal] = useState<boolean>(false);
	let categories: string[] = ['Favoritos', 'Todos'];
	let clothesCategories: string[] = [];

	if (clothes) {
		clothesCategories =
			clothes &&
			clothes.map((clothe) => {
				return clothe.category;
			});
	}
	categories = [...categories, ...clothesCategories];

	async function getAllClothes(id: string) {
		const response = await fetch(`/api/protected/user/${id}/clothe/all`);

		const data: { error: string; message: string; clothe: Clothes[] } =
			await response.json();

		return data.clothe;
	}

	useEffect(() => {
		getAllClothes(serverSession.user.id).then((clothesData) =>
			setClothes(clothesData)
		);
	}, [serverSession]);

	const uniqueCategories = categories.filter((category, index) => {
		return categories.indexOf(category) === index;
	});

	function openModal(clotheId: string) {
		const newClothe = clothes.filter((clothe) => clothe.id === clotheId)[0];
		setModal({ clothe: newClothe, modal: 'active' });
	}

	function filteredClothes(category: string) {
		if (category === 'Favoritos') {
			const newClothes = clothes.filter((clothe) => clothe.favorite);
			return newClothes;
		} else {
			const newClothes = clothes.filter(
				(clothe) => clothe.category === category || category === 'Todos'
			);
			return newClothes;
		}
	}

	function updateClothes() {
		getAllClothes(serverSession.user.id).then((clothesData) =>
			setClothes(clothesData)
		);
	}

	function closeModal() {
		setModal({ clothe: null, modal: '' });
		setDeleteModal(false);
	}

	function closeDeleteModal() {
		setDeleteModal(false);
	}

	function openDeleteModal() {
		setDeleteModal(true);
	}

	async function toggleFavorite(clotheId: string, userId: string) {
		const response = await fetch(
			`/api/protected/user/${userId}/clothe/favorite/${clotheId}`,
			{
				method: 'PUT',
			}
		);
		const data: ClotheResponse = await response.json();
		if (data.error) {
			console.error('Erro: ', data.message);
			return;
		}
		updateClothes();
		return data.clothe;
	}

	async function deleteClothe(clotheId: string, userId: string) {
		const response = await fetch(
			`/api/protected/user/${userId}/clothe/delete/${clotheId}`,
			{
				method: 'DELETE',
			}
		);
		const data: ClotheResponse = await response.json();

		if (data.error) {
			console.error('Erro: ', data.message);
			return;
		}

		updateClothes();
		return data.clothe;
	}

	return (
		<div className={style.homePage}>
			<Tabs align='center'>
				<main>
					<TabPanels>
						<TabPanel className={style.pageClothes}>
							<HeaderClothesPage
								closeModal={closeModal}
								setCurrentPage={setCurrentPage}
								uniqueCategories={uniqueCategories}
							/>
							<GridClothes
								clothes={
									currentPage === 'Todos'
										? filteredClothes('Todos')
										: filteredClothes(currentPage)
								}
								openModal={openModal}
							>
								<ClotheModal
									deleteModal={deleteModal}
									closeDeleteModal={closeDeleteModal}
									openDeleteModal={openDeleteModal}
									deleteClothe={deleteClothe}
									toggleFavorite={toggleFavorite}
									modal={modal}
									closeModal={closeModal}
								/>
							</GridClothes>
						</TabPanel>
						<TabPanel className={style.pageAddClothe}>
							<HeaderAddClothePage headerTitle='Adicionar Roupa' />
							<FormSendClothe
								userId={serverSession.user.id}
								updateClothes={updateClothes}
							/>
						</TabPanel>
						<TabPanel className={style.pageProfile}>
							<HeaderAddClothePage headerTitle='Perfil' />
							<ProfilePage userName={serverSession.user.name} />
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
