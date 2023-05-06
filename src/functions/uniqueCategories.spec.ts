import uniqueCategories from './uniqueCategories';

describe('uniqueCategories test', () => {
	it('should return unique category with "Favorito" and "Todos" at the begin', () => {
		const categories = ['A', 'A', 'A', 'B', 'C', 'D', 'D', 'D', 'E'];

		expect(uniqueCategories(categories)).toEqual([
			'Favoritos',
			'Todos',
			'A',
			'B',
			'C',
			'D',
			'E',
		]);
	});
});
