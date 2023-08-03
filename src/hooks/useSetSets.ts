import { SetsProps } from '@/@types';
import useAppContext from './useAppContext';

export default function useSetSets() {
	const { setSets, sets } = useAppContext();
	const replaceSets = (newSet: SetsProps) => {
		const copySets = [...sets].map((set) =>
			set.id === newSet.id ? newSet : set,
		);
		setSets(copySets);
	};
	return { replaceSets };
}
