/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import Style from './GridClothes.module.css';
import {
	ClothePosition,
	ClothesProps,
	FetcherOptions,
	OpenOrCloseModalProps,
	SetsProps,
} from '@/@types';
import ModalClothe from '../ModalClothe';
import useAppContext from '@/hooks/useAppContext';
import { filterClotheOrSetByCategory } from '@/functions/filterClotheOrSetByCategory';

type Props = {
	modal: {
		changeCategoryModal: boolean;
		setModal: boolean;
		deleteModal: boolean;
		clotheModal: boolean;
		clothe: ClothesProps | null;
		set: SetsProps | null;
	};
	addToWorkbench: (clotheId: string) => void;
	removeItemWorkbench: (clotheId: string) => void;
	openOrCloseModal: (
		{ whichModal, operation }: OpenOrCloseModalProps,
		clotheId?: string | null,
		setId?: string | null,
	) => void;
	fetcher: (
		url: string,
		options?: FetcherOptions | undefined,
	) => Promise<
		ClothesProps | ClothesProps[] | SetsProps | SetsProps[] | undefined
	>;
};

export default function GridClothes({
	modal,
	fetcher,
	addToWorkbench,
	removeItemWorkbench,
	openOrCloseModal,
}: Props) {
	const { clothes, currentCategoryClothes } = useAppContext();
	const filteredClotheByCategory: ClothesProps[] =
		filterClotheOrSetByCategory<ClothesProps>(currentCategoryClothes, clothes);

	return (
		<>
			{modal.clotheModal && (
				<ModalClothe
					removeItemWorkbench={removeItemWorkbench}
					addToWorkbench={addToWorkbench}
					openOrCloseModal={openOrCloseModal}
					fetcher={fetcher}
					modal={modal}
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
									openOrCloseModal(
										{ whichModal: 'clotheModal', operation: 'open' },
										clothe.id,
									);
								}}
							/>
						</li>
					);
				})}
			</ul>
		</>
	);
}
