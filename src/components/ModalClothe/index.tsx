import {
	ClothesProps,
	FetcherOptions,
	ModalState,
	OpenOrCloseModalProps,
	SetsProps,
} from '@/@types';
import Style from './ModalClothe.module.css';
import { Spinner } from '@chakra-ui/react';
import {
	StarIcon,
	DeleteIcon,
	EditIcon,
	SmallAddIcon,
	SmallCloseIcon,
} from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import ModalDelete from '../ModalDelete';
import ModalChangeCategory from '../ModalChangeCategory';
import ModalBase from '../ModalBase';
import useAppContext from '@/hooks/useAppContext';

type Props = {
	modal: ModalState;
	removeItemWorkbench: (clotheId: string) => void;
	fetcher: (
		url: string,
		options?: FetcherOptions,
	) => Promise<
		SetsProps | SetsProps[] | ClothesProps | ClothesProps[] | undefined
	>;
	openOrCloseModal: (
		{ whichModal, operation }: OpenOrCloseModalProps,
		clotheId?: string | null,
		setId?: string | null,
	) => void;
	addToWorkbench: (clotheId: string) => void;
};

export default function ModalClothe({
	modal,
	openOrCloseModal,
	fetcher,
	addToWorkbench,
	removeItemWorkbench,
}: Props) {
	const { workbench, clothes } = useAppContext();
	const [loading, setLoading] = useState<boolean>(false);
	const [favorite, setFavorite] = useState<boolean>(false);

	useEffect(() => {
		setFavorite(modal.clothe?.favorite!);
	}, [modal]);

	const clothe = { ...modal.clothe };
	const categories = [...new Set(clothes.map((clothe) => clothe.category))];

	return (
		<>
			{modal.clotheModal && (
				<div className={Style.modalContainer}>
					{modal.changeCategoryModal && (
						<ModalChangeCategory
							clothesOrSets='clothes'
							fetcher={fetcher}
							openOrCloseModal={openOrCloseModal}
							clotheOrSet={modal.clothe!}
							categories={categories}
						/>
					)}
					{modal.deleteModal && (
						<ModalDelete
							openOrCloseModal={openOrCloseModal}
							deleteClothe={async () => {
								await fetcher(
									`/api/protected/user/${clothe.userId}/clothe/delete/${clothe.id}`,
									{ method: 'DELETE', update: true },
								);
								openOrCloseModal({ whichModal: 'clotheModal', operation: 'close' });
							}}
						/>
					)}
					{loading && (
						<Spinner
							color={'cyan'}
							className={Style.spinner}
						/>
					)}
					<ModalBase
						clothes={modal.clothe}
						openOrCloseModal={openOrCloseModal}
					>
						<>
							<h1>Roupa categoria: {clothe.category}</h1>
							<ul>
								<li>
									<div className={Style.rowBox}>
										<p>Favorito</p>
										<span>
											<StarIcon
												onClick={async () => {
													setLoading(true);
													const data = (await fetcher(
														`/api/protected/user/${clothe.userId}/clothe/favorite/${clothe.id}`,
														{ method: 'PUT', update: true },
													)) as ClothesProps;
													data && setFavorite(data.favorite);
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
												onClick={() => {
													openOrCloseModal({ whichModal: 'deleteModal', operation: 'open' });
												}}
												cursor={'pointer'}
												color={'red'}
												boxSize={5}
											/>
										</span>
									</div>
								</li>
								<li>
									<div className={Style.rowBox}>
										<p>Alterar categoria</p>
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
											{workbench.find(
												(workbenchClothe) => workbenchClothe.id === clothe.id,
											) ? (
												<SmallCloseIcon
													onClick={() => removeItemWorkbench(clothe.id!)}
													color={'red.500'}
													cursor={'pointer'}
													boxSize={5}
												/>
											) : (
												<SmallAddIcon
													color={'green.500'}
													onClick={() => {
														addToWorkbench(clothe.id!);
													}}
													cursor={'pointer'}
													boxSize={5}
												/>
											)}
										</span>
									</div>
								</li>
							</ul>
						</>
					</ModalBase>
				</div>
			)}
		</>
	);
}
