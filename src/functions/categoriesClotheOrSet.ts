export function categoriesClotheOrSet<ClothePropsOrSetProps>(
	element: ClothePropsOrSetProps[],
): string[] {
	console.log(element);
	return [...new Set(element.map((element: any) => element.category))];
}
