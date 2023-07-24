export function categoriesClotheOrSet<ClothePropsOrSetProps>(
	element: ClothePropsOrSetProps[],
) {
	return [
		'Favoritos',
		'Todos',
		...new Set(element.map((element: any) => element.category)),
	];
}
