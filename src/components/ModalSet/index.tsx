import {
	ClothesProps,
	FetcherOptions,
	ModalId,
	ModalState,
	OpenOrCloseModalProps,
	SetsProps,
	UserId,
} from '@/@types';
import ModalBase from '../ModalBase';
import Style from './ModalSet.module.css';
import { Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { DeleteIcon, EditIcon, StarIcon } from '@chakra-ui/icons';
import ModalDelete from '../ModalDelete';
import ModalChangeCategory from '../ModalChangeCategory';
import useAppContext from '@/hooks/useAppContext';

type Props = {
	userId: UserId;
	modalId: ModalId;
	setModalId: (newValue: ModalId | null) => void;
	fetcher: (
		url: string,
		options?: FetcherOptions,
	) => Promise<
		SetsProps | SetsProps[] | ClothesProps | ClothesProps[] | undefined
	>;
};

export default function ModalSet({
	modalId,
	userId,
	fetcher,
	setModalId,
}: Props) {
	const { sets } = useAppContext();
	const [changeCategoryModal, setChangeCategoryModal] = useState<ModalId | null>(
		null,
	);
	const [loading, setLoading] = useState<boolean>(false);
	const [favorite, setFavorite] = useState<boolean>(false);

	// useEffect(() => {
	// 	setFavorite(modal.set?.favorite!);
	// }, [modalId]);

	const set = sets.find((set) => set.id === modalId);

	return (
		<div className={Style.modalContainer}>
			{changeCategoryModal && (
				<ModalChangeCategory
					modalId={changeCategoryModal}
					setModal={setChangeCategoryModal}
					fetcher={fetcher}
				/>
			)}
			{/*{modal.deleteModal && (
				<ModalDelete
					deleteSet={async () => {
						await fetcher(`/api/protected/user/${userId}/clothe/deleteSet/${modalId}`, {
							method: 'DELETE',
							update: true,
						});
					}}
					openOrCloseModal={openOrCloseModal}
				/>
			)}
			{loading && (
				<Spinner
					color='cyan'
					style={{
						position: 'absolute',
						zIndex: 2,
						top: '50%',
						left: '50%',
					}}
				/>
			)} */}
			<h1
				style={{
					fontWeight: '500',
					fontSize: '1.2rem',
				}}
			>
				Conjunto: {set?.category}
			</h1>
			<ModalBase
				set={set}
				setModalId={setModalId}
			>
				<ul>
					<li>
						<p>Favoritar conjunto</p>
						<StarIcon
							cursor={'pointer'}
							boxSize={5}
							color={favorite ? 'gold' : 'whiteAlpha.600'}
							onClick={async () => {
								setLoading(true);
								const data = (await fetcher(
									`/api/protected/user/${set?.userId}/clothe/favoriteSet/${set?.id}`,
									{ update: true, method: 'PUT' },
								)) as SetsProps;
								data && setFavorite(data.favorite);
								setLoading(false);
							}}
						/>
					</li>
					<li>
						<p>Deletar conjunto</p>
						<DeleteIcon
							cursor={'pointer'}
							boxSize={5}
							color={'red'}
							onClick={() => {
								// openOrCloseModal({ whichModal: 'deleteModal', operation: 'open' });
							}}
						/>
					</li>
					<li>
						<p>Alterar categoria</p>
						<EditIcon
							cursor={'pointer'}
							boxSize={5}
							onClick={() => {
								// openOrCloseModal({
								// 	whichModal: 'changeCategoryModal',
								// 	operation: 'open',
								// });
								setChangeCategoryModal(set?.id ?? null);
							}}
						/>
					</li>
				</ul>
			</ModalBase>
		</div>
	);
}
