export function findOneClotheOrSet<ClothePropOrSetProp>(
	element: ClothePropOrSetProp[],
	modalId: string | null,
): ClothePropOrSetProp | undefined {
	if (!modalId) return;
	return element.find((element: any) => element.id === modalId);
}
