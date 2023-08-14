import useAppContext from './useAppContext';

export default function useWorkBench() {
	const { workbench, setWorkbench, clothes } = useAppContext();
	function addClotheToWorkbench(clotheId: string) {
		const alreadyExists = workbench.some((clothe) => clothe.id === clotheId);
		if (alreadyExists) return;
		const newClothe = clothes.find((clothe) => clothe.id === clotheId);
		if (!newClothe) throw new Error('Roupa não existe');
		const newWorkbench = [...workbench, { ...newClothe, x: 0, y: 0 }];
		setWorkbench(newWorkbench);
	}
	function resetWorkbench() {
		setWorkbench([]);
	}
	function removeClotheFromWorkbench(clotheId: string) {
		const newWorkbench = workbench.filter((clothe) => clothe.id !== clotheId);
		setWorkbench(newWorkbench);
	}
	return { removeClotheFromWorkbench, addClotheToWorkbench, resetWorkbench };
}
