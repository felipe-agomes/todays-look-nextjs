/* eslint-disable @next/next/no-img-element */
import Style from './GridClothes.module.css';
import { ClothesProps, FetcherOptions, SetsProps } from '@/@types';
import useAppContext from '@/hooks/useAppContext';
import { filterClotheOrSetByCategory } from '@/functions/filterClotheOrSetByCategory';
import useModaisContext from '@/hooks/useModaisContext';
import { useEffect, useState } from 'react';
import { Modal } from '../Modal/Clothe';
import { Content } from '../Modal/Clothe/Content';
import ModalClothe from '../ModalClothe';
import { Row } from '../Modal/Clothe/Content/Row';

export default function GridClothes() {
	const { clothes, currentCategoryClothes } = useAppContext();
	const { mainModal, setMainModal } = useModaisContext();
	const filteredClotheByCategory: ClothesProps[] =
		filterClotheOrSetByCategory<ClothesProps>(currentCategoryClothes, clothes);
	const currentClothe = clothes.find((clothe) => clothe.id === mainModal);

	return (
		<>
			{mainModal && (
				<Modal.ClotheRoot clothe={currentClothe}>
					<Modal.Title
						title='Roupa categoria'
						category={currentClothe.category}
					/>
					<Content.Root>
						<Content.Image
							image={currentClothe.image}
							category={currentClothe.category}
						/>
						<Row.Root>
							<Row.Favorite clothe={currentClothe} />
							<Row.Delete clothe={currentClothe} />
							<Row.ChangeCategory clothe={currentClothe} />
							<Row.AddToWorkbench clothe={currentClothe} />
						</Row.Root>
					</Content.Root>
				</Modal.ClotheRoot>
			)}
			{/* {mainModal && <ModalClothe modalId={mainModal} />} */}
			<ul className={Style.boxList}>
				{filteredClotheByCategory.map((clothe) => {
					return (
						<li
							className={Style.list}
							key={clothe.id}
						>
							<img
								src={clothe.image}
								alt='Roupa'
								onClick={() => {
									setMainModal(clothe.id);
								}}
							/>
						</li>
					);
				})}
			</ul>
		</>
	);
}
