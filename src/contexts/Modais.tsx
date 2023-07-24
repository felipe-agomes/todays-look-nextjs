import { ModalId } from '@/@types';
import { createContext, useState } from 'react';

type ModaisContext = {
	mainModal: ModalId | null;
	setMainModal: (newValue: ModalId | null) => void;
	deleteModal: ModalId | null;
	setDeleteModal: (newValue: ModalId | null) => void;
	changeCategoryModal: ModalId | null;
	setChangeCategoryModal: (newValue: ModalId | null) => void;
};

export const ModaisContext = createContext<ModaisContext>({
	mainModal: null,
	setMainModal() {},
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
	const [mainModal, setMainModal] = useState<ModalId | null>(null);
	const [deleteModal, setDeleteModal] = useState<ModalId | null>(null);
	const [changeCategoryModal, setChangeCategoryModal] = useState<ModalId | null>(
		null,
	);

	return (
		<ModaisContext.Provider
			value={{
				mainModal,
				setMainModal,
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
