export function filterClotheOrSetByCategory<ClothePropsOrSetProps>(
	currentCategory: string,
	ClotheOrSet: ClothePropsOrSetProps[],
): ClothePropsOrSetProps[] {
	const mapFindCategory = [
		{ test: 'Todos', resolve: ClotheOrSet },
		{
			test: 'Favoritos',
			resolve: ClotheOrSet.filter((element: any) => element.favorite),
		},
	];
	return (
		mapFindCategory.find(({ test }) => test === currentCategory)?.resolve ??
		ClotheOrSet.filter(
			(element: any) => element.category === currentCategory,
		)
	);
}