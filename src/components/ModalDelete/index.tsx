import { OpenOrCloseModalProps } from '@/@types';
import Style from './ModalDelete.module.css';
import { Button, ButtonGroup } from '@chakra-ui/react';
import deleteSet from '@/pages/api/protected/user/[userId]/clothe/deleteSet/[setId]';

type Props = {
	openOrCloseModal: (
		{ whichModal, operation }: OpenOrCloseModalProps,
		clotheId?: string | null,
		setId?: string | null
	) => void;
	deleteClothe?: () => Promise<void>;
	deleteSet?: () => Promise<void>;
};

export default function ModalDelete({
	openOrCloseModal,
	deleteClothe,
	deleteSet,
}: Props) {
	return (
		<div className={Style.modalContainer}>
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
						deleteClothe && (await deleteClothe());
						deleteSet && (await deleteSet());
						openOrCloseModal({ whichModal: 'setModal', operation: 'close' });
					}}
				>
					Sim
				</Button>
			</ButtonGroup>
		</div>
	);
}
