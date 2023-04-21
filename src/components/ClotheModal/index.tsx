import { Clothes } from '@/@types';
import Style from './ClotheModal.module.css';
import { Spinner } from '@chakra-ui/react';
import { CloseIcon, StarIcon, DeleteIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import DeleteModal from '../DeleteModal';

type Props = {
	modal: {
		modal: 'active' | '';
		clothe: Clothes | null;
	};
	deleteModal: boolean;
	closeModal: () => void;
	toggleFavorite: (
		clotheId: string,
		userId: string
	) => Promise<Clothes | undefined>;
	deleteClothe: (
		clotheId: string,
		userId: string
	) => Promise<Clothes | undefined>;
	closeDeleteModal: () => void;
	openDeleteModal: () => void;
};

export default function ClotheModal({
	modal,
	deleteModal,
	closeModal,
	toggleFavorite,
	deleteClothe,
	closeDeleteModal,
	openDeleteModal,
}: Props) {
	const [loading, setLoading] = useState<boolean>(false);
	const [favorite, setFavorite] = useState<boolean>(false);

	useEffect(() => {
		setFavorite(modal.clothe?.favorite!);
	}, [modal]);

	const clothe = { ...modal.clothe };

	return (
		<>
			{deleteModal && (
				<DeleteModal
					closeDeleteModal={closeDeleteModal}
					deleteClothe={() => {
						deleteClothe(clothe.id!, clothe.userId!);
						closeModal();
					}}
				/>
			)}
			<div className={`${Style.modalContainer} ${Style[modal.modal]}`}>
				{loading && <Spinner className={Style.spinner} />}
				<CloseIcon
					onClick={() => {
						closeModal();
						closeDeleteModal();
					}}
					cursor={'pointer'}
					position={'absolute'}
					right={'20px'}
					top={'20px'}
				/>
				<h1>Roupa categoria: {clothe.category}</h1>
				<ul>
					<li>
						Favorito
						<span>
							<StarIcon
								onClick={async () => {
									setLoading(true);
									const data = await toggleFavorite(clothe?.id!, clothe?.userId!);
									data && setFavorite(data.favorite);
									setLoading(false);
								}}
								cursor={'pointer'}
								boxSize={5}
								color={favorite ? 'gold' : 'whiteAlpha.600'}
							/>
						</span>
					</li>
					<li>
						Deletar Roupa
						<span>
							<DeleteIcon
								onClick={openDeleteModal}
								cursor={'pointer'}
								color={'red'}
								boxSize={5}
							/>
						</span>
					</li>
					<li>Adicionar ao conjunto</li>
					<li>Alterar Categoria</li>
				</ul>
			</div>
		</>
	);
}
