import { ModalId } from "@/@types";

export function findOneClotheOrSet<ClothePropOrSetProp>(
	element: ClothePropOrSetProp[],
	modalId: ModalId | null,
): ClothePropOrSetProp | undefined {
	if (!modalId) return;
	return element.find((element: any) => element.id === modalId);
}
