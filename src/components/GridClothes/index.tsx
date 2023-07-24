/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import Style from './GridClothes.module.css';
import {
	ClothePosition,
	ClothesProps,
	FetcherOptions,
	ModalId,
	OpenOrCloseModalProps,
	SetsProps,
} from '@/@types';
import ModalClothe from '../ModalClothe';
import useAppContext from '@/hooks/useAppContext';
import { filterClotheOrSetByCategory } from '@/functions/filterClotheOrSetByCategory';
import { useState } from 'react';
import useModaisContext from '@/hooks/useModaisContext';

type Props = {
	addToWorkbench: (clotheId: string) => void;
	removeItemWorkbench: (clotheId: string) => void;
	fetcher: (
		url: string,
		options?: FetcherOptions | undefined,
	) => Promise<
		ClothesProps | ClothesProps[] | SetsProps | SetsProps[] | undefined
	>;
};

export default function GridClothes({
	fetcher,
	addToWorkbench,
	removeItemWorkbench,
}: Props) {
	const { clothes, currentCategoryClothes } = useAppContext();
	const { mainModal, setMainModal } = useModaisContext();
	const filteredClotheByCategory: ClothesProps[] =
		filterClotheOrSetByCategory<ClothesProps>(currentCategoryClothes, clothes);

	return (
		<>
			{mainModal && (
				<ModalClothe
					removeItemWorkbench={removeItemWorkbench}
					addToWorkbench={addToWorkbench}
					modalId={mainModal}
					setModalId={setMainModal}
					fetcher={fetcher}
				/>
			)}
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
