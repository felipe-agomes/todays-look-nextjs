import Image from 'next/image';
import Style from './GridClothes.module.css';
import {
	ClothesProps,
	FetcherOptions,
	OpenOrCloseModalProps,
	SetsProps,
} from '@/@types';
import ClotheModal from '../ClotheModal';

type Props = {
	clothes?: ClothesProps[];
	workbench: [] | ClothesProps[];
	uniqueCategories: string[];
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
		setId?: string | null
	) => void;
	fetcher: (
		url: string,
		options?: FetcherOptions | undefined
	) => Promise<ClothesProps | ClothesProps[] | SetsProps | SetsProps[] | undefined>;
};

export default function GridClothes({
	clothes,
	workbench,
	modal,
	uniqueCategories,
	fetcher,
	addToWorkbench,
	removeItemWorkbench,
	openOrCloseModal,
}: Props) {
	return (
		<>
			{modal.clotheModal && (
				<ClotheModal
					removeItemWorkbench={removeItemWorkbench}
					workbench={workbench}
					addToWorkbench={addToWorkbench}
					categories={uniqueCategories.filter(
						(category) => category !== 'Todos' && category !== 'Favoritos'
					)}
					openOrCloseModal={openOrCloseModal}
					fetcher={fetcher}
					modal={modal}
				/>
			)}
			<ul className={Style.boxList}>
				{clothes &&
					clothes.map((clothe) => {
						return (
							<li
								className={Style.list}
								key={clothe.id}
							>
								<Image
									style={{ cursor: 'pointer' }}
									width={128}
									height={128}
									src={clothe.image}
									alt='Roupa'
									onClick={() => {
										openOrCloseModal(
											{ whichModal: 'clotheModal', operation: 'open' },
											clothe.id
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
