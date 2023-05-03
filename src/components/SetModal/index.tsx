import {
	ClothesProps,
	FetcherOptions,
	ModalState,
	OpenOrCloseModalProps,
	SetsProps,
} from '@/@types';
import BaseModal from '../BaseModal';
import Style from './SetModal.module.css';
import { Button, Spinner } from '@chakra-ui/react';
import { useState } from 'react';

type Props = {
	modal: ModalState;
	userId: string;
	setId: string;
	openOrCloseModal: (
		{ whichModal, operation }: OpenOrCloseModalProps,
		clotheId?: string | null,
		setId?: string | null
	) => void;
	fetcher: (
		url: string,
		options?: FetcherOptions
	) => Promise<SetsProps | SetsProps[] | ClothesProps | ClothesProps[] | undefined>;
};

export default function SetModal({
	modal,
	setId,
	userId,
	openOrCloseModal,
	fetcher,
}: Props) {
	const [loading, setLoading] = useState<boolean>(false);
	return (
		<div className={Style.modalContainer}>
			{loading && (
				<Spinner
					style={{
						position: 'absolute',
						zIndex: 2,
						top: '50%',
						left: '50%',
					}}
				/>
			)}
			<h1
				style={{
					fontWeight: '500',
					fontSize: '1.2rem',
				}}
			>
				Conjunto
			</h1>
			<BaseModal
				set={modal.set}
				openOrCloseModal={openOrCloseModal}
			>
				<ul>
					<li>
						<Button
							onClick={async () => {
								setLoading(true);
								await fetcher(
									`/api/protected/user/${userId}/clothe/deleteSet/${setId}`,
									{
										update: true,
										method: 'DELETE',
									}
								);
								setLoading(false);
								openOrCloseModal({ whichModal: 'setModal', operation: 'close' });
							}}
							colorScheme='red'
						>
							Deletar
						</Button>
					</li>
				</ul>
			</BaseModal>
		</div>
	);
}
