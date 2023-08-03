import { ClothesProps } from '@/@types';
import useAppContext from './useAppContext';

export default function useSetCltohes() {
	const { clothes, setClothes } = useAppContext();
	const replaceClothes = (newClothe: ClothesProps) => {
		const copyClothes = [...clothes].map((clothe) =>
			clothe.id === newClothe.id ? newClothe : clothe,
		);
		setClothes(copyClothes);
	};
	return { replaceClothes };
}
