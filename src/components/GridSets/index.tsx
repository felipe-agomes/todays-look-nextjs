import {
	ClothesProps,
	FetcherOptions,
	ModalState,
	OpenOrCloseModalProps,
	SetsProps,
} from '@/@types';
import Style from './GridSets.module.css';
import ModalSet from '../ModalSet';
import SetImages from '../SetImages';

type Props = {
	sets: SetsProps[];
	modal: ModalState;
	uniqueCategories: string[];
	fetcher: (
		url: string,
		options?: FetcherOptions
	) => Promise<
		SetsProps | SetsProps[] | ClothesProps | ClothesProps[] | undefined
	>;
	openOrCloseModal: (
		{ whichModal, operation }: OpenOrCloseModalProps,
		clotheId?: string | null,
		setId?: string | null
	) => void;
};

export default function GridSets({
	sets,
	modal,
	uniqueCategories,
	openOrCloseModal,
	fetcher,
}: Props) {
	return (
		<ul className={Style.boxList}>
			{modal.setModal && (
				<ModalSet
					categories={uniqueCategories.filter(
						(category) => category !== 'Todos' && category !== 'Favoritos'
					)}
					fetcher={fetcher}
					userId={modal.set?.userId!}
					setId={modal.set?.id!}
					modal={modal}
					openOrCloseModal={openOrCloseModal}
				/>
			)}
			{sets.map((set) => {
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
							openOrCloseModal(
								{ whichModal: 'setModal', operation: 'open' },
								null,
								set.id
							);
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
	);
}
