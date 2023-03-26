export type SelectedClothes = {
	id: number;
	category: Category;
};

export type Category =
	'CALÇA'
	| 'SHORTS/SAIA'
	| 'BLUSA'
	| 'CALÇADO'
	| 'CAMISETA'
	| 'FAVORITO'
	| 'VESTIDO';

export type Body =
	'body'
	| 'legs'
	| 'shoes'
	| 'bodyLegs';

export type CategoriesData = {
	category: Category | 'TODOS';
	active: boolean;
};

export type Clothe = {
	id: string;
	key: string;
	category: Category;
	favorite: boolean;
	image: string;
	body: Body;
};

export type Message = {
	error?: string;
	message?: string;
	body?: string;
};
