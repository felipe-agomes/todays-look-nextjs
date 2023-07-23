import { ClothesProps, OpenOrCloseModalProps, SetsProps } from '@/@types';
import Style from './Header.module.css';
import useAppContext from '@/hooks/useAppContext';
import { categoriesClotheOrSet } from '@/functions/categoriesClotheOrSet';

type Props = {
	title: string;
	isClothe?: boolean;
	openOrCloseModal?: (
		{ whichModal, operation }: OpenOrCloseModalProps,
		clotheId?: string | null,
		setId?: string | null,
	) => void;
};

export default function Header({
	title,
	isClothe,
	openOrCloseModal,
}: Props) {
	const {
		sets,
		setCurrentCategorySets,
		currentCategorySets,
		clothes,
		setCurrentCategoryClothes,
		currentCategoryClothes,
	} = useAppContext();
	const categories = isClothe
		? categoriesClotheOrSet<ClothesProps>(clothes)
		: categoriesClotheOrSet<SetsProps>(sets);
	const currentCategory = isClothe
		? { category: currentCategoryClothes, setCategory: setCurrentCategoryClothes }
		: { category: currentCategorySets, setCategory: setCurrentCategorySets };

	return (
		<>
			<header className={Style.headerPage}>
				<div className={Style.topHeader}>
					<h1>{title}</h1>
				</div>
				<nav className={Style.navegation}>
					<ul className={Style.categories}>
						{categories.map((category) => {
							return (
								<li
									key={category}
									style={{ cursor: 'pointer' }}
									className={
										currentCategory.category === category ? Style.categoryActive : ''
									}
									onClick={() => {
										currentCategory.setCategory(category);
										if (openOrCloseModal)
											openOrCloseModal({
												whichModal: 'clotheModal',
												operation: 'close',
											});
									}}
								>
									{category}
								</li>
							);
						})}
					</ul>
				</nav>
			</header>
		</>
	);
}
