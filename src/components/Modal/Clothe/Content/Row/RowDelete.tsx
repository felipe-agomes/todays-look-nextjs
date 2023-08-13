import { DeleteIcon } from '@chakra-ui/icons';
import S from './Row.module.css';
import useModaisContext from '@/hooks/useModaisContext';
import { ClothesProps } from '@/@types';

export default function RowDelete({ clothe }: { clothe: ClothesProps }) {
	const { setDeleteModal } = useModaisContext();
	return (
		<div className={S.row}>
			<p>Deletar Roupa</p>
			<span>
				<DeleteIcon
					onClick={() => {
						setDeleteModal(clothe.id);
					}}
					cursor={'pointer'}
					color={'red'}
					boxSize={5}
				/>
			</span>
		</div>
	);
}
