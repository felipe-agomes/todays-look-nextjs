import S from './Row.module.css';
import useModaisController from '@/hooks/useModaisController';
import useModalLoadingContext from '@/hooks/useModalLoadingContext';
import useSetCltohes from '@/hooks/useSetClothes';
import useSetSets from '@/hooks/useSetSets';
import { ClothesProps, SetsProps } from '@/@types';
import { clotheService } from '@/services/ClotheService';
import { setService } from '@/services/SetService';
import { StarIcon } from '@chakra-ui/icons';

export default function RowFavorite({
	clothe,
	set,
}: {
	clothe?: ClothesProps;
	set?: SetsProps;
}) {
	const { replaceClothes } = useSetCltohes();
	const { replaceSets } = useSetSets();
	const { closeAllModais } = useModaisController();
	const { setLoading } = useModalLoadingContext();
	const isClothe = !!clothe ? true : false;

	return (
		<div className={S.row}>
			<p>Favorito</p>
			<span>
				<StarIcon
					onClick={async () => {
						setLoading(true);
						if (isClothe) {
							const response = await clotheService.toggleFavoriteById({
								clothe: clothe.id,
								userId: clothe.userId,
							});
							if (response.status === 'error')
								throw new Error('Erro ao mudar a propriedade favorito');
							replaceClothes(response.data);
						}
						if (!isClothe) {
							const response = await setService.toggleFavoriteById({
								set: set.id,
								userId: set.userId,
							});
							if (response.status === 'error')
								throw new Error('Erro ao mudar a propriedade favorito');
							replaceSets(response.data);
						}
						closeAllModais();
						setLoading(false);
					}}
					cursor={'pointer'}
					boxSize={5}
					color={
						isClothe
							? clothe.favorite
								? 'gold'
								: 'whiteAlpha.600'
							: set.favorite
							? 'gold'
							: 'whiteAlpha.600'
					}
				/>
			</span>
		</div>
	);
}
