import { ModalId, SetsProps } from '@/@types';
import ModalBase from '../ModalBase';
import Style from './ModalSet.module.css';
import { Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { DeleteIcon, EditIcon, StarIcon } from '@chakra-ui/icons';
import ModalDelete from '../ModalDelete';
import ModalChangeCategory from '../ModalChangeCategory';
import useAppContext from '@/hooks/useAppContext';
import useModaisContext from '@/hooks/useModaisContext';
import { setService } from '@/services/SetService';
import useSetSets from '@/hooks/useSetSets';

type Props = {
	modalId: ModalId;
	setModalId: (newValue: ModalId | null) => void;
};

export default function ModalSet({ modalId, setModalId }: Props) {
	const { sets } = useAppContext();
	const {
		changeCategoryModal,
		setChangeCategoryModal,
		deleteModal,
		setDeleteModal,
	} = useModaisContext();
	const { replaceSets } = useSetSets();
	const [loading, setLoading] = useState<boolean>(false);
	const [favorite, setFavorite] = useState<boolean>(false);
	const set = sets.find((set) => set.id === modalId);

	useEffect(() => {
		setFavorite(set?.favorite ?? false);
	}, [set]);

	return (
		<div className={Style.modalContainer}>
			{changeCategoryModal && (
				<ModalChangeCategory
					modalId={changeCategoryModal}
					setModal={setChangeCategoryModal}
				/>
			)}
			{deleteModal && <ModalDelete modalId={deleteModal} />}
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
				Conjunto: {set?.category}
			</h1>
			<ModalBase set={set}>
				<ul>
					<li>
						<p>Favoritar conjunto</p>
						<StarIcon
							cursor={'pointer'}
							boxSize={5}
							color={favorite ? 'gold' : 'whiteAlpha.600'}
							onClick={async () => {
								setLoading(true);
								const response = await setService.toggleFavoriteById({
									userId: set.userId,
									set: set.id,
								});
								if (response.status === 'error')
									throw new Error('Erro ao mudar a propriedade favorito');
								replaceSets(response.data);
								setModalId(null);
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
								setDeleteModal(set?.id ?? null);
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
