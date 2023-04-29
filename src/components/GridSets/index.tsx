import {
	Clothes,
	FetcherOptions,
	ModalState,
	OpenOrCloseModalProps,
	SetsProps,
} from '@/@types';
import Style from './GridSets.module.css';
import Image from 'next/image';
import SetModal from '../SetModal';
import SetImages from '../SetImages';

type Props = {
	sets: SetsProps[];
	modal: ModalState;
	fetcher: (
		url: string,
		options?: FetcherOptions
	) => Promise<SetsProps | SetsProps[] | Clothes | Clothes[] | undefined>;
	openOrCloseModal: (
		{ whichModal, operation }: OpenOrCloseModalProps,
		clotheId?: string | null,
		setId?: string | null
	) => void;
};

export default function GridSets({
	sets,
	modal,
	openOrCloseModal,
	fetcher,
}: Props) {
	console.log(sets);
	return (
		<ul className={Style.boxList}>
			{modal.setModal && (
				<SetModal
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
							width: '260px',
							height: '332px',
							cursor: 'pointer',
							overflow: 'hidden',
							background: '#fff',
						}}
						key={set.sets[0].x}
						onClick={() => {
							openOrCloseModal(
								{ whichModal: 'setModal', operation: 'open' },
								null,
								set.id
							);
							console.log('setID: ', set.id);
						}}
					>
						<SetImages
							size={{ height: 92, width: 92 }}
							set={set}
						/>
					</li>
				);
			})}
		</ul>
	);
}
