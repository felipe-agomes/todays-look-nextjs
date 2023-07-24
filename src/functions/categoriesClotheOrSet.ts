export function categoriesClotheOrSet<ClothePropsOrSetProps>(
	element: ClothePropsOrSetProps[],
) {
	return [...new Set(element.map((element: any) => element.category))];
}
