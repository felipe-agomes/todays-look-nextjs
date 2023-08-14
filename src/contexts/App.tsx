import { ClotheData, ClothePosition, SetData } from '@/@types/models';
import { Dispatch, SetStateAction, createContext, useState } from 'react';

type AppContextType = {
	workbench: ClothePosition[];
	setWorkbench: Dispatch<SetStateAction<[] | ClothePosition[]>>;
	clothes: ClotheData[];
	setClothes: Dispatch<SetStateAction<ClotheData[]>>;
	sets: SetData[];
	setSets: Dispatch<SetStateAction<SetData[]>>;
	currentCategoryClothes: string;
	setCurrentCategoryClothes: Dispatch<SetStateAction<string>>;
	currentCategorySets: string;
	setCurrentCategorySets: Dispatch<SetStateAction<string>>;
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
	const [clothes, setClothes] = useState<ClotheData[]>([]);
	const [workbench, setWorkbench] = useState<ClothePosition[]>([]);
	const [sets, setSets] = useState<SetData[]>([]);
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
