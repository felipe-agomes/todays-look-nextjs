import { Clothes, FetcherOptions } from '@/@types';
import Style from './ClotheModal.module.css';
import { Spinner } from '@chakra-ui/react';
import {
	CloseIcon,
	StarIcon,
	DeleteIcon,
	EditIcon,
	PlusSquareIcon,
} from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import DeleteModal from '../DeleteModal';
import ChangeCategoryModal from '../ChangeCategoryModal';

type Props = {
	modal: {
		changeCategoryModal: boolean;
		deleteModal: boolean;
		clotheModal: boolean;
		clothe: Clothes | null;
	};
	categories: string[] | [];
	fetcher: (
		url: string,
		options?: FetcherOptions
	) => Promise<Clothes | Clothes[] | undefined>;
	openOrCloseModal: (
		{
			whichModal,
			operation,
		}: {
			whichModal: 'clotheModal' | 'deleteModal' | 'changeCategoryModal';
			operation: 'open' | 'close';
		},
		clotheId?: string
	) => void;
	addToworkbench: (clotheId: string) => void;
};

export default function ClotheModal({
	categories,
	modal,
	openOrCloseModal,
	fetcher,
	addToworkbench,
}: Props) {
	const [loading, setLoading] = useState<boolean>(false);
	const [favorite, setFavorite] = useState<boolean>(false);

	useEffect(() => {
		setFavorite(modal.clothe?.favorite!);
	}, [modal]);

	const clothe = { ...modal.clothe };

	return (
		<>
			{modal.clotheModal && (
				<div className={Style.modalContainer}>
					{modal.changeCategoryModal && (
						<ChangeCategoryModal
							fetcher={fetcher}
							openOrCloseModal={openOrCloseModal}
							clothe={modal.clothe!}
							categories={categories}
						/>
					)}
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
					<div style={{ width: '128px', height: '128px' }}>
						<img
							style={{ maxWidth: '100%', maxHeight: '100%' }}
							src={clothe.image}
						/>
					</div>
					<div>
						<h1>Roupa categoria: {clothe.category}</h1>
						<ul>
							<li>
								<div className={Style.rowBox}>
									<p>Favorito</p>
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
								</div>
							</li>
							<li>
								<div className={Style.rowBox}>
									<p>Deletar Roupa</p>
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
								</div>
							</li>
							<li>
								<div className={Style.rowBox}>
									<p>Categoria</p>
									<span>
										<EditIcon
											onClick={() => {
												openOrCloseModal({
													whichModal: 'changeCategoryModal',
													operation: 'open',
												});
											}}
											cursor={'pointer'}
											boxSize={5}
										/>
									</span>
								</div>
							</li>
							<li>
								<div className={Style.rowBox}>
									<p>Adicionar ao conjunto</p>
									<span>
										<PlusSquareIcon
											onClick={() => {
												addToworkbench(clothe.id!);
											}}
											cursor={'pointer'}
											boxSize={5}
										/>
									</span>
								</div>
							</li>
						</ul>
					</div>
				</div>
			)}
		</>
	);
}
