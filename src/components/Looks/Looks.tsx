/* eslint-disable @typescript-eslint/object-curly-spacing */
import React, { useState } from 'react';
import { type Clothe, type CategoriesData } from '../../types';
import Categories from '../Categories/Categories';

import './Looks.css';

type Prop = {
	modal: 'active' | '';
	clothes: Clothe[];
	addClothe: (id: string) => void;
	updateClothes: () => void;
};

function Looks({ modal, clothes, updateClothes, addClothe }: Prop): JSX.Element {
	const [categories, setCategories] = useState<CategoriesData[]>([
		{ category: 'TODOS', active: true },
		{ category: 'CALÇA', active: false },
		{ category: 'SHORTS/SAIA', active: false },
		{ category: 'BLUSA', active: false },
		{ category: 'CALÇADO', active: false },
		{ category: 'CAMISETA', active: false },
		{ category: 'VESTIDO', active: false },
		{ category: 'FAVORITO', active: false },
	]);

	function handleClickList(index: number): void {
		const newCategories = categories.map((category, i) => ({ ...category, active: i === index }));
		setCategories(newCategories);
	}

	return (
		<div
			className={`
			list-container
			${modal}
		`}>
			<ul className='list'>
				{categories.map((cat, index) => (
					<Categories
						key={cat.category}
						categories={cat}
						index={index}
						clothes={clothes.filter((clothe) =>
							cat.category === 'TODOS'
								? cat
								: cat.category === 'FAVORITO'
									? clothe.favorite
									: clothe.category === cat.category,
						)}
						addClothe={addClothe}
						handleClickList={() => {
							handleClickList(index);
						}}
						updateClothes={updateClothes}
					/>
				))}
			</ul>
		</div>
	);
}

export default Looks;
