import { OpenOrCloseModalProps } from '@/@types';
import Style from './ModalDelete.module.css';
import { Button, ButtonGroup, Spinner } from '@chakra-ui/react';
import deleteSet from '@/pages/api/protected/user/[userId]/clothe/deleteSet/[setId]';
import { useState } from 'react';

type Props = {
	openOrCloseModal: (
		{ whichModal, operation }: OpenOrCloseModalProps,
		clotheId?: string | null,
		setId?: string | null,
	) => void;
	deleteClothe?: () => Promise<void>;
	deleteSet?: () => Promise<void>;
};

export default function ModalDelete({
	openOrCloseModal,
	deleteClothe,
	deleteSet,
}: Props) {
	const [loading, setLoading] = useState<boolean>(false);

	return (
		<div className={Style.modalContainer}>
			{loading && (
				<Spinner
					color={'cyan'}
					className={Style.spinner}
				/>
			)}
			<h1>Deseja realmente remover a roupa?</h1>
			<ButtonGroup gap={4}>
				<Button
					onClick={() =>
						openOrCloseModal({ whichModal: 'deleteModal', operation: 'close' })
					}
					colorScheme={'gray'}
				>
					Não
				</Button>
				<Button
					color={'white'}
					colorScheme={'red'}
					onClick={async () => {
						setLoading(true);
						deleteClothe && (await deleteClothe());
						deleteSet && (await deleteSet());
						openOrCloseModal({ whichModal: 'setModal', operation: 'close' });
						setLoading(false);
					}}
				>
					Sim
				</Button>
			</ButtonGroup>
		</div>
	);
}
