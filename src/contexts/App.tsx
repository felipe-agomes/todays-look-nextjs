import { ClothePosition, ClothesProps, SetsProps } from '@/@types';
import { createContext, useState } from 'react';

type AppContextType = {
	workbench: ClothePosition[] | [];
	setWorkbench: (newValue: ClothePosition[] | []) => void;
	clothes: ClothesProps[] | [];
	setClothes: (newValue: ClothesProps[] | []) => void;
	sets: SetsProps[] | [];
	setSets: (newValue: SetsProps[] | []) => void;
	currentCategoryClothes: string;
	setCurrentCategoryClothes: (newValue: string) => void;
	currentCategorySets: string;
	setCurrentCategorySets: (newValue: string) => void;
};

export const AppContext = createContext<AppContextType>({
	clothes: [],
	setClothes() {},
	sets: [],
	setSets() {},
	workbench: [],
	setWorkbench() {},
	currentCategoryClothes: 'Todos',
	setCurrentCategoryClothes() {},
	currentCategorySets: 'Todos',
	setCurrentCategorySets() {},
});

export default function ProviderAppContext({
	children,
}: {
	children: React.ReactNode;
}) {
	const [clothes, setClothes] = useState<ClothesProps[] | []>([]);
	const [workbench, setWorkbench] = useState<ClothePosition[] | []>([]);
	const [sets, setSets] = useState<SetsProps[] | []>([]);
	const [currentCategoryClothes, setCurrentCategoryClothes] = useState('Todos');
	const [currentCategorySets, setCurrentCategorySets] = useState('Todos');

	return (
		<AppContext.Provider
			value={{
				clothes,
				setClothes,
				workbench,
				setWorkbench,
				sets,
				setSets,
				currentCategoryClothes,
				setCurrentCategoryClothes,
				currentCategorySets,
				setCurrentCategorySets,
			}}
		>
			{children}
		</AppContext.Provider>
	);
}
