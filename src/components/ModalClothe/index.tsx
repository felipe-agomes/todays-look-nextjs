import {
	ClothesProps,
	FetcherOptions,
	ModalId,
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
import useModaisContext from '@/hooks/useModaisContext';
import useWorkBench from '@/hooks/useWorkBench';
import useModaisController from '@/hooks/useModaisController';

type Props = {
	modalId: ModalId | null;
	fetcher: (
		url: string,
		options?: FetcherOptions,
	) => Promise<
		SetsProps | SetsProps[] | ClothesProps | ClothesProps[] | undefined
	>;
};

export default function ModalClothe({ fetcher, modalId }: Props) {
	const { addClotheToWorkbench, removeClotheFromWorkbench } = useWorkBench();
	const { closeAllModais } = useModaisController();
	const { workbench, clothes } = useAppContext();
	const {
		changeCategoryModal,
		setChangeCategoryModal,
		deleteModal,
		setDeleteModal,
	} = useModaisContext();
	const [loading, setLoading] = useState<boolean>(false);
	const [favorite, setFavorite] = useState<boolean>(false);
	const clothe = clothes.find((clothe) => clothe.id === modalId);

	useEffect(() => {
		setFavorite(clothe?.favorite ?? false);
	}, [clothe]);

	return (
		<>
			{modalId && (
				<div className={Style.modalContainer}>
					{changeCategoryModal && (
						<ModalChangeCategory
							modalId={changeCategoryModal}
							setModal={setChangeCategoryModal}
							fetcher={fetcher}
							isClothe
						/>
					)}
					{deleteModal && (
						<ModalDelete
							modalId={deleteModal}
							fetcher={fetcher}
							isClothe
						/>
					)}
					{loading && (
						<Spinner
							color={'cyan'}
							className={Style.spinner}
						/>
					)}
					<ModalBase clothes={clothe}>
						<>
							<h1>Roupa categoria: {clothe?.category}</h1>
							<ul>
								<li>
									<div className={Style.rowBox}>
										<p>Favorito</p>
										<span>
											<StarIcon
												onClick={async () => {
													setLoading(true);
													const data = (await fetcher(
														`/api/protected/user/${clothe?.userId}/clothe/favorite/${clothe?.id}`,
														{ method: 'PUT', update: true },
													)) as ClothesProps;
													data && setFavorite(data.favorite);
													closeAllModais();
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
													setDeleteModal(clothe?.id ?? null);
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
													setChangeCategoryModal(clothe?.id ?? null);
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
												(workbenchClothe) => workbenchClothe.id === clothe?.id,
											) ? (
												<SmallCloseIcon
													onClick={() => removeClotheFromWorkbench(clothe?.id ?? '')}
													color={'red.500'}
													cursor={'pointer'}
													boxSize={5}
												/>
											) : (
												<SmallAddIcon
													color={'green.500'}
													onClick={() => {
														addClotheToWorkbench(clothe?.id ?? '');
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
