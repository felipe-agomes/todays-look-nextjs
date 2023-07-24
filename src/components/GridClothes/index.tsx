/* eslint-disable @next/next/no-img-element */
import Style from './GridClothes.module.css';
import { ClothesProps, FetcherOptions, SetsProps } from '@/@types';
import ModalClothe from '../ModalClothe';
import useAppContext from '@/hooks/useAppContext';
import { filterClotheOrSetByCategory } from '@/functions/filterClotheOrSetByCategory';
import useModaisContext from '@/hooks/useModaisContext';

type Props = {
	fetcher: (
		url: string,
		options?: FetcherOptions | undefined,
	) => Promise<
		ClothesProps | ClothesProps[] | SetsProps | SetsProps[] | undefined
	>;
};

export default function GridClothes({ fetcher }: Props) {
	const { clothes, currentCategoryClothes } = useAppContext();
	const { mainModal, setMainModal } = useModaisContext();
	const filteredClotheByCategory: ClothesProps[] =
		filterClotheOrSetByCategory<ClothesProps>(currentCategoryClothes, clothes);

	return (
		<>
			{mainModal && (
				<ModalClothe
					modalId={mainModal}
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
