export default function uniqueCategories(categories: string[]) {
	const newCategories = ['Favoritos', 'Todos', ...categories];
	return newCategories.filter(
		(category, index) => newCategories.indexOf(category) === index
	);
}
