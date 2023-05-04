import {
	ClothesProps,
	FetcherOptions,
	ModalState,
	OpenOrCloseModalProps,
	SetsProps,
} from '@/@types';
import ModalBase from '../ModalBase';
import Style from './ModalSet.module.css';
import { Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { DeleteIcon, EditIcon, StarIcon } from '@chakra-ui/icons';
import ModalDelete from '../ModalDelete';
import ModalChangeCategory from '../ModalChangeCategory';

type Props = {
	modal: ModalState;
	userId: string;
	setId: string;
	categories: string[] | [];
	openOrCloseModal: (
		{ whichModal, operation }: OpenOrCloseModalProps,
		clotheId?: string | null,
		setId?: string | null
	) => void;
	fetcher: (
		url: string,
		options?: FetcherOptions
	) => Promise<
		SetsProps | SetsProps[] | ClothesProps | ClothesProps[] | undefined
	>;
};

export default function ModalSet({
	modal,
	setId,
	userId,
	categories,
	openOrCloseModal,
	fetcher,
}: Props) {
	const [loading, setLoading] = useState<boolean>(false);
	const [favorite, setFavorite] = useState<boolean>(false);

	useEffect(() => {
		setFavorite(modal.set?.favorite!);
	}, [modal]);
	return (
		<div className={Style.modalContainer}>
			{modal.changeCategoryModal && (
				<ModalChangeCategory
					clothesOrSets='sets'
					categories={categories}
					clotheOrSet={modal.set!}
					fetcher={fetcher}
					openOrCloseModal={openOrCloseModal}
				/>
			)}
			{modal.deleteModal && (
				<ModalDelete
					deleteSet={async () => {
						await fetcher(`/api/protected/user/${userId}/clothe/deleteSet/${setId}`, {
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
			)}
			<h1
				style={{
					fontWeight: '500',
					fontSize: '1.2rem',
				}}
			>
				Conjunto: {modal.set?.category}
			</h1>
			<ModalBase
				set={modal.set}
				openOrCloseModal={openOrCloseModal}
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
									`/api/protected/user/${modal.set?.userId}/clothe/favoriteSet/${modal.set?.id}`,
									{ update: true, method: 'PUT' }
								)) as SetsProps;
								console.log(data);
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
								openOrCloseModal({ whichModal: 'deleteModal', operation: 'open' });
							}}
						/>
					</li>
					<li>
						<p>Alterar categoria</p>
						<EditIcon
							cursor={'pointer'}
							boxSize={5}
							onClick={() => {
								console.log('aqui');
								openOrCloseModal({
									whichModal: 'changeCategoryModal',
									operation: 'open',
								});
							}}
						/>
					</li>
				</ul>
			</ModalBase>
		</div>
	);
}
