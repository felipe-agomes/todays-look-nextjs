import { ClothePosition, ClothesProps, SetsProps } from '@/@types';
import { createContext, useState } from 'react';

type AppContextType = {
	workbench: ClothePosition[] | [];
	setWorkbench: (newValue: ClothePosition[] | []) => void;
	clothes: ClothesProps[] | [];
	setClothes: (newValue: ClothesProps[] | []) => void;
	sets: SetsProps[] | [];
	setSets: (newValue: SetsProps[] | []) => void;
};

export const AppContext = createContext<AppContextType>({
	clothes: [],
	setClothes() {},
	sets: [],
	setSets() {},
	workbench: [],
	setWorkbench() {},
});

export default function ProviderAppContext({
	children,
}: {
	children: React.ReactNode;
}) {
	const [clothes, setClothes] = useState<ClothesProps[] | []>([]);
	const [workbench, setWorkbench] = useState<ClothePosition[] | []>([]);
	const [sets, setSets] = useState<SetsProps[] | []>([]);

	return (
		<AppContext.Provider
			value={{ clothes, setClothes, workbench, setWorkbench, sets, setSets }}
		>
			{children}
		</AppContext.Provider>
	);
}
