import { SmallAddIcon, SmallCloseIcon } from '@chakra-ui/icons';
import S from './Row.module.css';
import useAppContext from '@/hooks/useAppContext';
import { ClothesProps } from '@/@types';
import useWorkBench from '@/hooks/useWorkBench';

export default function RowAddToWorkbench({
	clothe,
}: {
	clothe: ClothesProps;
}) {
	const { workbench } = useAppContext();
	const { removeClotheFromWorkbench, addClotheToWorkbench } = useWorkBench();

	return (
		<div className={S.row}>
			<p>Adicionar ao conjunto</p>
			<span>
				{workbench.find((workbenchClothe) => workbenchClothe.id === clothe.id) ? (
					<SmallCloseIcon
						onClick={() => removeClotheFromWorkbench(clothe.id)}
						color={'red.500'}
						cursor={'pointer'}
						boxSize={5}
					/>
				) : (
					<SmallAddIcon
						color={'green.500'}
						onClick={() => {
							addClotheToWorkbench(clothe.id);
						}}
						cursor={'pointer'}
						boxSize={5}
					/>
				)}
			</span>
		</div>
	);
}
