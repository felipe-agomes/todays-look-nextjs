import useAppContext from './useAppContext';
import { setService } from '@/services/SetService';
import { SetData } from '@/@types/models';
import { Response } from '@/@types/controller';

export default function useSetSets() {
	const { setSets, sets } = useAppContext();
	const replaceSets = (newSet: SetData) => {
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
