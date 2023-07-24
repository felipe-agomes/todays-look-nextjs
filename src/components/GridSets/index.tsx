import {
	ClothesProps,
	FetcherOptions,
	ModalId,
	ModalState,
	OpenOrCloseModalProps,
	SetsProps,
	UserId,
} from '@/@types';
import Style from './GridSets.module.css';
import ModalSet from '../ModalSet';
import SetImages from '../SetImages';
import useAppContext from '@/hooks/useAppContext';
import { filterClotheOrSetByCategory } from '@/functions/filterClotheOrSetByCategory';
import { useState } from 'react';

type Props = {
	fetcher: (
		url: string,
		options?: FetcherOptions,
	) => Promise<
		SetsProps | SetsProps[] | ClothesProps | ClothesProps[] | undefined
	>;
};

export default function GridSets({ fetcher }: Props) {
	const { sets, currentCategorySets } = useAppContext();
	const [modalId, setModalId] = useState<ModalId | null>(null);
	const filteredSetsByCategory = filterClotheOrSetByCategory<SetsProps>(
		currentCategorySets,
		sets,
	);

	return (
		<>
			{modalId && (
				<ModalSet
					fetcher={fetcher}
					userId={sets[0].userId}
					modalId={modalId}
					setModalId={setModalId}
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
								setModalId(set.id);
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
