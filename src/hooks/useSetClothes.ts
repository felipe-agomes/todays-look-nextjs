import { ClothesProps } from '@/@types';
import useAppContext from './useAppContext';

export default function useSetCltohes() {
	const { clothes, setClothes } = useAppContext();
	const replaceClothes = (newClothe: ClothesProps) => {
		const newClothes = [...clothes].map((clothe) =>
			clothe.id === newClothe.id ? newClothe : clothe,
		);
		setClothes(newClothes);
	};
	const deleteClothe = (clotheId: string) => {
		const newClothes = [...clothes].filter((clothe) => clothe.id !== clotheId);
		setClothes(newClothes);
	};
	return { replaceClothes, deleteClothe };
}
