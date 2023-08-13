import { Button, ButtonGroup, Spinner } from '@chakra-ui/react';
import S from './DeleteModal.module.css';
import useModaisController from '@/hooks/useModaisController';
import useModalLoadingContext from '@/hooks/useModalLoadingContext';
import useSetCltohes from '@/hooks/useSetClothes';
import { clotheService } from '@/services/ClotheService';
import { ClothesProps } from '@/@types';

export default function DeleteModal({ clothe }: { clothe: ClothesProps }) {
	const { closeAllModais, closeDeleteModal } = useModaisController();
	const { setLoading, loading } = useModalLoadingContext();
	const { deleteClothe } = useSetCltohes();

	return (
		<div className={S.modalContainer}>
			{loading && (
				<Spinner
					color={'cyan'}
					className={S.spinner}
				/>
			)}
			<h1>Deseja realmente remover a roupa?</h1>
			<ButtonGroup gap={4}>
				<Button
					onClick={() => closeDeleteModal()}
					colorScheme={'gray'}
				>
					Não
				</Button>
				<Button
					color={'white'}
					colorScheme={'red'}
					onClick={async () => {
						setLoading(true);
						const response = await clotheService.deleteById({
							clothe: clothe.id,
							userId: clothe.userId,
						});
						if (response.status === 'error') throw new Error('Erro ao deletar roupa');
						deleteClothe(clothe.id);
						closeAllModais();
						setLoading(false);
					}}
				>
					Sim
				</Button>
			</ButtonGroup>
		</div>
	);
}
