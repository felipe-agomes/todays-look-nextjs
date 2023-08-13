import { CloseIcon } from '@chakra-ui/icons';
import S from './Modal.module.css';
import useModaisController from '@/hooks/useModaisController';
import { useState } from 'react';
import { Spinner } from '@chakra-ui/react';
import useModaisContext from '@/hooks/useModaisContext';
import ProviderModalLoading from '@/contexts/ModalLoading';
import DeleteModal from '../Delete';
import useModalLoadingContext from '@/hooks/useModalLoadingContext';
import { ClothesProps } from '@/@types';
import ChangeCategory from '../ChangeCategory';

export default function ModalRoot({
	clothe,
	children,
}: {
	clothe: ClothesProps;
	children: React.ReactNode;
}) {
	const { closeAllModais } = useModaisController();
	const { deleteModal, changeCategoryModal } = useModaisContext();
	const { loading } = useModalLoadingContext();

	return (
		<ProviderModalLoading>
			<div className={S.modalRoot}>
				<CloseIcon
					onClick={() => {
						closeAllModais();
					}}
					cursor={'pointer'}
					position={'absolute'}
					right={'20px'}
					top={'20px'}
				/>
				{loading && (
					<Spinner
						color={'cyan'}
						className={S.spinner}
					/>
				)}
				{changeCategoryModal && <ChangeCategory clothe={clothe} />}
				{deleteModal && <DeleteModal clothe={clothe} />}
				{children}
			</div>
		</ProviderModalLoading>
	);
}
