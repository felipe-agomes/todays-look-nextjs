import S from './GridSets.module.css';
import useAppContext from '@/hooks/useAppContext';
import useModaisContext from '@/hooks/useModaisContext';
import SetImages from '../SetImages';
import { filterClotheOrSetByCategory } from '@/functions/filterClotheOrSetByCategory';
import { ClotheModal } from '../Modal/Clothe';
import { SetModal } from '../Modal/Set';
import { SetData } from '@/@types/models';

export default function GridSets() {
	const { sets, currentCategorySets } = useAppContext();
	const { setModal, setSetModal } = useModaisContext();
	const filteredSetByCategory: SetData[] = filterClotheOrSetByCategory<SetData>(
		currentCategorySets,
		sets,
	);
	const currentSet = sets.find((set) => set.id === setModal);

	return (
		<>
			{setModal && (
				<SetModal.Root
					category={currentSet.category}
					title='Conjunto categoria'
					set={currentSet}
				>
					<SetModal.Content.Root>
						<SetModal.Content.Image set={currentSet} />
						<SetModal.Content.Row.Root>
							<ClotheModal.Content.Row.Favorite set={currentSet} />
							<ClotheModal.Content.Row.Delete set={currentSet} />
							<ClotheModal.Content.Row.ChangeCategory set={currentSet} />
						</SetModal.Content.Row.Root>
					</SetModal.Content.Root>
				</SetModal.Root>
			)}
			<ul className={S.boxList}>
				{filteredSetByCategory.map((set) => {
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
								setSetModal(set.id);
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
