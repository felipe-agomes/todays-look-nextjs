import { ClotheData, SetData } from '@/@types/models';
import S from './Row.module.css';
import useModaisContext from '@/hooks/useModaisContext';
import { DeleteIcon } from '@chakra-ui/icons';

export default function RowDelete({
	clothe,
	set,
}: {
	clothe?: ClotheData;
	set?: SetData;
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
