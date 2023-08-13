import { ClothesProps } from '@/@types';
import useModaisContext from '@/hooks/useModaisContext';
import { EditIcon } from '@chakra-ui/icons';
import S from './Row.module.css';

export default function RowChangeCategory({
	clothe,
}: {
	clothe: ClothesProps;
}) {
	const { setChangeCategoryModal } = useModaisContext();

	return (
		<div className={S.row}>
			<p>Alterar categoria</p>
			<span>
				<EditIcon
					onClick={() => {
						setChangeCategoryModal(clothe.id);
					}}
					cursor={'pointer'}
					boxSize={5}
				/>
			</span>
		</div>
	);
}
