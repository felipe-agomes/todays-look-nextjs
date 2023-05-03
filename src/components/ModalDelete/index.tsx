import { OpenOrCloseModalProps } from '@/@types';
import Style from './ModalDelete.module.css';
import { Button, ButtonGroup } from '@chakra-ui/react';

type Props = {
	openOrCloseModal: (
		{ whichModal, operation }: OpenOrCloseModalProps,
		clotheId?: string | null,
		setId?: string | null
	) => void;
	deleteClothe: () => void;
};

export default function ModalDelete({ openOrCloseModal, deleteClothe }: Props) {
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
					onClick={deleteClothe}
				>
					Sim
				</Button>
			</ButtonGroup>
		</div>
	);
}
