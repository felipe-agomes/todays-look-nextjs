export function categoriesClotheOrSet<ClothePropsOrSetProps>(
	element: ClothePropsOrSetProps[],
): string[] {
	return [...new Set(element.map((element: any) => element.category))];
}
