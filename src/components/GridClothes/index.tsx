import S from './GridClothes.module.css';
import useAppContext from '@/hooks/useAppContext';
import useModaisContext from '@/hooks/useModaisContext';
import { ClothesProps } from '@/@types';
import { filterClotheOrSetByCategory } from '@/functions/filterClotheOrSetByCategory';
import { ClotheModal } from '../Modal/Clothe';

/* eslint-disable @next/next/no-img-element */
export default function GridClothes() {
	const { clothes, currentCategoryClothes } = useAppContext();
	const { clotheModal, setClotheModal } = useModaisContext();
	const filteredClotheByCategory: ClothesProps[] =
		filterClotheOrSetByCategory<ClothesProps>(currentCategoryClothes, clothes);
	const currentClothe = clothes.find((clothe) => clothe.id === clotheModal);

	return (
		<>
			{clotheModal && (
				<ClotheModal.Root
					category={currentClothe.category}
					title='Roupa categoria'
					clothe={currentClothe}
				>
					<ClotheModal.Content.Root>
						<ClotheModal.Content.Image
							image={currentClothe.image}
							category={currentClothe.category}
						/>
						<ClotheModal.Content.Row.Root>
							<ClotheModal.Content.Row.Favorite clothe={currentClothe} />
							<ClotheModal.Content.Row.Delete clothe={currentClothe} />
							<ClotheModal.Content.Row.ChangeCategory clothe={currentClothe} />
							<ClotheModal.Content.Row.AddToWorkbench clothe={currentClothe} />
						</ClotheModal.Content.Row.Root>
					</ClotheModal.Content.Root>
				</ClotheModal.Root>
			)}
			{/* {mainModal && <ModalClothe modalId={mainModal} />} */}
			<ul className={S.boxList}>
				{filteredClotheByCategory.map((clothe) => {
					return (
						<li
							className={S.list}
							key={clothe.id}
						>
							<img
								src={clothe.image}
								alt='Roupa'
								onClick={() => {
									setClotheModal(clothe.id);
								}}
							/>
						</li>
					);
				})}
			</ul>
		</>
	);
}
