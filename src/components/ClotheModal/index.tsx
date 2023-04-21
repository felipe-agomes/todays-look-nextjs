import { Clothes, FetcherOptions } from '@/@types';
import Style from './ClotheModal.module.css';
import { Spinner } from '@chakra-ui/react';
import { CloseIcon, StarIcon, DeleteIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import DeleteModal from '../DeleteModal';

type Props = {
	modal: {
		deleteModal: boolean;
		clotheModal: boolean;
		clothe: Clothes | null;
	};
	fetcher: (
		url: string,
		options?: FetcherOptions
	) => Promise<Clothes | Clothes[] | undefined>;
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
};

export default function ClotheModal({
	modal,
	openOrCloseModal,
	fetcher,
}: Props) {
	const [loading, setLoading] = useState<boolean>(false);
	const [favorite, setFavorite] = useState<boolean>(false);

	useEffect(() => {
		setFavorite(modal.clothe?.favorite!);
	}, [modal]);

	const clothe = { ...modal.clothe };

	return (
		<>
			{modal.deleteModal && (
				<DeleteModal
					openOrCloseModal={openOrCloseModal}
					deleteClothe={() => {
						fetcher(
							`/api/protected/user/${clothe.userId}/clothe/delete/${clothe.id}`,
							{ method: 'DELETE', update: true }
						);
						openOrCloseModal({ whichModal: 'clotheModal', operation: 'close' });
					}}
				/>
			)}
			{modal.clotheModal && (
				<div className={Style.modalContainer}>
					{loading && <Spinner className={Style.spinner} />}
					<CloseIcon
						onClick={() => {
							openOrCloseModal({ whichModal: 'clotheModal', operation: 'close' });
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
										const data = await fetcher(
											`/api/protected/user/${clothe.userId}/clothe/favorite/${clothe.id}`,
											{ method: 'PUT', update: true }
										);
										if (!Array.isArray(data)) {
											data && setFavorite(data.favorite);
										}
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
									onClick={() =>
										openOrCloseModal({ whichModal: 'deleteModal', operation: 'open' })
									}
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
			)}
		</>
	);
}
