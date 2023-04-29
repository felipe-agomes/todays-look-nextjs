import {
	Clothes,
	FetcherOptions,
	ModalState,
	OpenOrCloseModalProps,
	SetsProps,
} from '@/@types';
import BaseModal from '../BaseModal';
import Style from './SetModal.module.css';
import { StarIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';

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
	) => Promise<SetsProps | SetsProps[] | Clothes | Clothes[] | undefined>;
};

export default function SetModal({
	modal,
	setId,
	userId,
	openOrCloseModal,
	fetcher,
}: Props) {
	return (
		<div className={Style.modalContainer}>
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
				clotheOrSet='set'
				openOrCloseModal={openOrCloseModal}
				modal={modal}
			>
				<ul>
					<li>
						<Button colorScheme='cyan'>Visualizar</Button>
						<Button
							onClick={() => {
								fetcher(`/api/protected/user/${userId}/clothe/deleteSet/${setId}`, {
									update: true,
									method: 'DELETE',
								});
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
