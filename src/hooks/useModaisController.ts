import useModaisContext from './useModaisContext';

export default function useModaisController() {
	const { setChangeCategoryModal, setDeleteModal, setClotheModal, setSetModal } =
		useModaisContext();

	const closeAllModais = () => {
		setChangeCategoryModal(null);
		setDeleteModal(null);
		setClotheModal(null);
		setSetModal(null);
	};

	const closeDeleteModal = () => {
		setDeleteModal(null);
	};
	const closeChangeCategoryModal = () => {
		setChangeCategoryModal(null);
	};
	return { closeAllModais, closeDeleteModal, closeChangeCategoryModal };
}
