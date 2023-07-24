import useModaisContext from './useModaisContext';

export default function useModaisController() {
	const { setChangeCategoryModal, setDeleteModal, setMainModal } =
		useModaisContext();

	const closeAllModais = () => {
		setChangeCategoryModal(null);
		setDeleteModal(null);
		setMainModal(null);
	};
	return { closeAllModais };
}
