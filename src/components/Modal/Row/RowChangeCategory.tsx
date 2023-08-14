import S from './Row.module.css';
import useModaisContext from '@/hooks/useModaisContext';
import { ClothesProps, SetsProps } from '@/@types';
import { EditIcon } from '@chakra-ui/icons';

export default function RowChangeCategory({
	clothe,
	set,
}: {
	clothe?: ClothesProps;
	set?: SetsProps;
}) {
	const { setChangeCategoryModal } = useModaisContext();
	const isClothe = !!clothe ? true : false;

	return (
		<div className={S.row}>
			<p>Alterar categoria</p>
			<span>
				<EditIcon
					onClick={() => {
						setChangeCategoryModal(isClothe ? clothe.id : set.id);
					}}
					cursor={'pointer'}
					boxSize={5}
				/>
			</span>
		</div>
	);
}
