import S from './Row.module.css';
import useAppContext from '@/hooks/useAppContext';
import useWorkBench from '@/hooks/useWorkBench';
import { ClothesProps } from '@/@types';
import { SmallCloseIcon, SmallAddIcon } from '@chakra-ui/icons';

export default function RowAddToWorkbench({
	clothe,
}: {
	clothe?: ClothesProps;
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
