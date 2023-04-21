import Style from './DeleteModal.module.css';
import { Button, ButtonGroup } from '@chakra-ui/react';

type Props = {
	openOrCloseModal: (
		{
			whichModal,
			operation,
		}: {
			whichModal: 'clotheModal' | 'deleteModal';
			operation: 'open' | 'close';
		},
		clotheId?: string
	) => void;
	deleteClothe: () => void;
};

export default function DeleteModal({ openOrCloseModal, deleteClothe }: Props) {
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
