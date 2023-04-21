import { Clothes } from '@/@types';
import Style from './ClotheModal.module.css';
import { CloseIcon } from '@chakra-ui/icons';

type Props = {
	modal: {
		modal: 'active' | '';
		clothe: Clothes | null;
	};
	closeModal: () => void;
};

export default function ClotheModal({ modal, closeModal }: Props) {
	console.log(modal);

	return (
		<div className={`${Style.modalContainer} ${Style[modal.modal]}`}>
			<CloseIcon
				onClick={closeModal}
				cursor={'pointer'}
				position={'absolute'}
				right={'20px'}
				top={'20px'}
			></CloseIcon>
			<h2>Roupa {modal.clothe?.category}</h2>
			<ul>
				<li>Marcar como favorito</li>
				<li>Remover roupa</li>
				<li>Adicionar ao conjunto</li>
			</ul>
		</div>
	);
}
