import { ClothesProps, FetcherOptions, ModalId, SetsProps } from '@/@types';
import Style from './ModalDelete.module.css';
import { Button, ButtonGroup, Spinner } from '@chakra-ui/react';
import { useState } from 'react';
import { findOneClotheOrSet } from '@/functions/findOneClotheOrSet';
import useAppContext from '@/hooks/useAppContext';
import useModaisController from '@/hooks/useModaisController';
import { clotheService } from '@/services/ClotheService';
import useSetCltohes from '@/hooks/useSetClothes';

type Props = {
	isClothe?: boolean;
	modalId: ModalId | null;
	deleteSet?: () => Promise<void>;
};

export default function ModalDelete({ modalId, isClothe }: Props) {
	const { deleteClothe } = useSetCltohes();
	const { clothes, sets } = useAppContext();
	const { closeAllModais } = useModaisController();
	const [loading, setLoading] = useState<boolean>(false);
	const clotheOrSet = isClothe
		? findOneClotheOrSet<ClothesProps>(clothes, modalId)
		: findOneClotheOrSet<SetsProps>(sets, modalId);

	return (
		<div className={Style.modalContainer}>
			{loading && (
				<Spinner
					color={'cyan'}
					className={Style.spinner}
				/>
			)}
			<h1>Deseja realmente remover a roupa?</h1>
			<ButtonGroup gap={4}>
				<Button
					onClick={() => closeAllModais()}
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
							clothe: clotheOrSet.id,
							userId: clotheOrSet.userId,
						});
						if (response.status === 'error') throw new Error('Erro ao deletar roupa');
						deleteClothe(clotheOrSet.id);
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
