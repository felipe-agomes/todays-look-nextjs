import { useState } from 'react';
import style from './HeaderClothesPage.module.css';

type Props = {
	uniqueCategories: string[];
	setCurrentPage: (category: string) => void;
	openOrCloseModal: (
		{
			whichModal,
			operation,
		}: {
			whichModal: 'clotheModal' | 'deleteModal';
			operation: 'open' | 'close';
		},
		clotheId?: string
	) => void;
};

export default function HeaderClothesPage({
	uniqueCategories,
	setCurrentPage,
	openOrCloseModal,
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
									style={{ cursor: 'pointer' }}
									className={selectedCategory === category ? style.categoryActive : ''}
									onClick={() => {
										setSelectedCategory(category);
										handleClickCategory(category);
										openOrCloseModal({ whichModal: 'clotheModal', operation: 'close' });
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
