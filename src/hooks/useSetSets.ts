import useAppContext from './useAppContext';
import { SetsProps } from '@/@types';
import { setService } from '@/services/SetService';
import { Response } from '@/controllers/FrontController';

export default function useSetSets() {
	const { setSets, sets } = useAppContext();
	const replaceSets = (newSet: SetsProps) => {
		const copySets = [...sets].map((set) =>
			set.id === newSet.id ? newSet : set,
		);
		setSets(copySets);
	};
	const deleteSet = (clotheId: string) => {
		const newSet = [...sets].filter((clothe) => clothe.id !== clotheId);
		setSets(newSet);
	};
	const updateSet = async (userId: string) => {
		const setsResponse: Response = await setService.getAllByUserId({
			userId: userId,
		});
		setSets(setsResponse.data);
	};
	return { replaceSets, deleteSet, updateSet };
}
