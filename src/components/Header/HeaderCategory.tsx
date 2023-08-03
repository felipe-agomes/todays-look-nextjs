import useAppContext from '@/hooks/useAppContext';
import Style from './Header.module.css';
import { categoriesClotheOrSet } from '@/functions/categoriesClotheOrSet';
import { ClothesProps, SetsProps } from '@/@types';
import useModaisController from '@/hooks/useModaisController';

type Props = {
	isClothe?: boolean;
	categories: string[];
};

export default function HeaderCategory({ isClothe, categories }: Props) {
	const {
		setCurrentCategorySets,
		currentCategorySets,
		setCurrentCategoryClothes,
		currentCategoryClothes,
	} = useAppContext();
	const { closeAllModais } = useModaisController();
	const { setCategory, category } = isClothe
		? { category: currentCategoryClothes, setCategory: setCurrentCategoryClothes }
		: { category: currentCategorySets, setCategory: setCurrentCategorySets };
	const categoryWithFavoritoAndTodos = ['Favorito', 'Todos', ...categories];

	return (
		<nav className={Style.navegation}>
			<ul className={Style.categories}>
				{categoryWithFavoritoAndTodos.map((categoryMap) => {
					return (
						<li
							key={categoryMap}
							style={{ cursor: 'pointer' }}
							className={category === categoryMap ? Style.categoryActive : ''}
							onClick={() => {
								setCategory(categoryMap);
								closeAllModais();
							}}
						>
							{categoryMap}
						</li>
					);
				})}
			</ul>
		</nav>
	);
}
