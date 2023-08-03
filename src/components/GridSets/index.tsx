import { ClothesProps, FetcherOptions, ModalId, SetsProps } from '@/@types';
import Style from './GridSets.module.css';
import ModalSet from '../ModalSet';
import SetImages from '../SetImages';
import useAppContext from '@/hooks/useAppContext';
import { filterClotheOrSetByCategory } from '@/functions/filterClotheOrSetByCategory';
import useModaisContext from '@/hooks/useModaisContext';

export default function GridSets() {
	const { sets, currentCategorySets } = useAppContext();
	const { mainModal, setMainModal } = useModaisContext();
	const filteredSetsByCategory = filterClotheOrSetByCategory<SetsProps>(
		currentCategorySets,
		sets,
	);

	return (
		<>
			{mainModal && (
				<ModalSet
					modalId={mainModal}
					setModalId={setMainModal}
				/>
			)}
			<ul className={Style.boxList}>
				{filteredSetsByCategory.map((set) => {
					return (
						<li
							style={{
								position: 'relative',
								width: '160px',
								height: '204.44px',
								cursor: 'pointer',
								overflow: 'hidden',
								background: '#fff',
							}}
							key={set.id}
							onClick={() => {
								setMainModal(set.id);
							}}
						>
							<SetImages
								size={{ height: 56.88, width: 56.88 }}
								proportion={{ x: 0.44, y: 0.44 }}
								set={set}
							/>
						</li>
					);
				})}
			</ul>
		</>
	);
}
