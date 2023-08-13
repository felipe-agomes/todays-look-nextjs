import { ModaisContext } from '@/contexts/Modais';
import { useContext } from 'react';

export default function useModaisContext() {
	const context = useContext(ModaisContext);
	return context;
}
