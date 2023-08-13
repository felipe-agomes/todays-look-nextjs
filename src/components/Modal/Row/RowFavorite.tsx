import { StarIcon } from '@chakra-ui/icons';
import S from './Row.module.css';
import { Dispatch, SetStateAction } from 'react';
import { clotheService } from '@/services/ClotheService';
import { ClotheData, ClothesProps } from '@/@types';
import useSetCltohes from '@/hooks/useSetClothes';
import useModaisController from '@/hooks/useModaisController';
import useModalLoadingContext from '@/hooks/useModalLoadingContext';

export default function RowFavorite({ clothe }: { clothe: ClothesProps }) {
	const { replaceClothes } = useSetCltohes();
	const { closeAllModais } = useModaisController();
	const { setLoading } = useModalLoadingContext();

	return (
		<div className={S.row}>
			<p>Favorito</p>
			<span>
				<StarIcon
					onClick={async () => {
						setLoading(true);
						const response = await clotheService.toggleFavoriteById({
							clothe: clothe?.id,
							userId: clothe?.userId,
						});
						if (response.status === 'error')
							throw new Error('Erro ao mudar a propriedade favorito');
						replaceClothes(response.data);
						// closeAllModais();
						setLoading(false);
					}}
					cursor={'pointer'}
					boxSize={5}
					color={clothe.favorite ? 'gold' : 'whiteAlpha.600'}
				/>
			</span>
		</div>
	);
}
