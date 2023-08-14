import S from './Row.module.css';
import useModaisContext from '@/hooks/useModaisContext';
import { ClothesProps, SetsProps } from '@/@types';
import { DeleteIcon } from '@chakra-ui/icons';

export default function RowDelete({
	clothe,
	set,
}: {
	clothe?: ClothesProps;
	set?: SetsProps;
}) {
	const { setDeleteModal } = useModaisContext();
	const isClothe = !!clothe ? true : false;

	return (
		<div className={S.row}>
			<p>Deletar Roupa</p>
			<span>
				<DeleteIcon
					onClick={() => {
						setDeleteModal(isClothe ? clothe.id : set.id);
					}}
					cursor={'pointer'}
					color={'red'}
					boxSize={5}
				/>
			</span>
		</div>
	);
}
