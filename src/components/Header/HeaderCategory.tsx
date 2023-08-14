import S from './Header.module.css';
import useAppContext from '@/hooks/useAppContext';
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
	const categoryWithFavoritoAndTodos = ['Favoritos', 'Todos', ...categories];

	return (
		<nav className={S.navegation}>
			<ul className={S.categories}>
				{categoryWithFavoritoAndTodos.map((categoryMap) => {
					return (
						<li
							key={categoryMap}
							style={{ cursor: 'pointer' }}
							className={category === categoryMap ? S.categoryActive : ''}
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
