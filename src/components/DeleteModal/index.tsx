import Style from './DeleteModal.module.css';
import { Button, ButtonGroup } from '@chakra-ui/react';

type Props = {
	closeDeleteModal: () => void;
	deleteClothe: () => void;
};

export default function DeleteModal({ closeDeleteModal, deleteClothe }: Props) {
	return (
		<div className={Style.modalContainer}>
			<h1>Deseja realmente remover a roupa?</h1>
			<ButtonGroup gap={4}>
				<Button
					onClick={closeDeleteModal}
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
