import { createContext, useState } from 'react';

type ModaisContext = {
	clotheModal: string | null;
	setClotheModal: (newValue: string | null) => void;
	setModal: string | null;
	setSetModal: (newValue: string | null) => void;
	deleteModal: string | null;
	setDeleteModal: (newValue: string | null) => void;
	changeCategoryModal: string | null;
	setChangeCategoryModal: (newValue: string | null) => void;
};

export const ModaisContext = createContext<ModaisContext>({
	clotheModal: null,
	setClotheModal() {},
	setModal: null,
	setSetModal() {},
	deleteModal: null,
	setDeleteModal() {},
	changeCategoryModal: null,
	setChangeCategoryModal() {},
});

export default function ProviderModaisContext({
	children,
}: {
	children: React.ReactNode;
}) {
	const [clotheModal, setClotheModal] = useState<string | null>(null);
	const [setModal, setSetModal] = useState<string | null>(null);
	const [deleteModal, setDeleteModal] = useState<string | null>(null);
	const [changeCategoryModal, setChangeCategoryModal] = useState<string | null>(
		null,
	);

	return (
		<ModaisContext.Provider
			value={{
				clotheModal,
				setClotheModal,
				setModal,
				setSetModal,
				deleteModal,
				setDeleteModal,
				changeCategoryModal,
				setChangeCategoryModal,
			}}
		>
			{children}
		</ModaisContext.Provider>
	);
}
