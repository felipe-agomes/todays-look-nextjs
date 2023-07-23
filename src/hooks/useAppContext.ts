import { AppContext } from '@/contexts/App';
import { useContext } from 'react';

export default function useAppContext() {
	const context = useContext(AppContext);
	return context;
}
