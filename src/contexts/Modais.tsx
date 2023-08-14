import { ModalId } from '@/@types';
import { createContext, useState } from 'react';

type ModaisContext = {
	clotheModal: ModalId | null;
	setClotheModal: (newValue: ModalId | null) => void;
	setModal: ModalId | null;
	setSetModal: (newValue: ModalId | null) => void;
	deleteModal: ModalId | null;
	setDeleteModal: (newValue: ModalId | null) => void;
	changeCategoryModal: ModalId | null;
	setChangeCategoryModal: (newValue: ModalId | null) => void;
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
	const [clotheModal, setClotheModal] = useState<ModalId | null>(null);
	const [setModal, setSetModal] = useState<ModalId | null>(null);
	const [deleteModal, setDeleteModal] = useState<ModalId | null>(null);
	const [changeCategoryModal, setChangeCategoryModal] = useState<ModalId | null>(
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
