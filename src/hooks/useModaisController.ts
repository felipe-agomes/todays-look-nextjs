import useModaisContext from './useModaisContext';

export default function useModaisController() {
	const { setChangeCategoryModal, setDeleteModal, setMainModal } =
		useModaisContext();

	const closeAllModais = () => {
		setChangeCategoryModal(null);
		setDeleteModal(null);
		setMainModal(null);
	};

	const closeDeleteModal = () => {
		setDeleteModal(null);
	};
	const closeChangeCategoryModal = () => {
		setChangeCategoryModal(null);
	};
	return { closeAllModais, closeDeleteModal, closeChangeCategoryModal };
}
