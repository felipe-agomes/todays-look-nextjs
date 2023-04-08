import { useState } from 'react';
import style from './HeaderClothesPage.module.css';

type Props = {
	uniqueCategories: string[];
	setCurrentPage: (category: string) => void;
};

export default function HeaderClothesPage({
	uniqueCategories,
	setCurrentPage,
}: Props) {
	const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

	function handleClickCategory(category: string) {
		setCurrentPage(category);
	}

	return (
		<header className={style.headerPage}>
			<div className={style.topHeader}>
				<h1>Roupas</h1>
			</div>
			<nav className={style.navegation}>
				<ul className={style.categories}>
					{uniqueCategories &&
						uniqueCategories.map((category) => {
							return (
								<li
									key={category}
									className={selectedCategory === category ? style.categoryActive : ''}
									onClick={() => {
										setSelectedCategory(category);
										handleClickCategory(category);
									}}
								>
									{category}
								</li>
							);
						})}
				</ul>
			</nav>
		</header>
	);
}
