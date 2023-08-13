import { ModalLoadingContext } from '@/contexts/ModalLoading';
import { useContext } from 'react';

export default function useModalLoadingContext() {
	const context = useContext(ModalLoadingContext);
	return context;
}
