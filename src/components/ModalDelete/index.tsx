import { ClothesProps, FetcherOptions, ModalId, SetsProps } from '@/@types';
import Style from './ModalDelete.module.css';
import { Button, ButtonGroup, Spinner } from '@chakra-ui/react';
import { useState } from 'react';
import { findOneClotheOrSet } from '@/functions/findOneClotheOrSet';
import useAppContext from '@/hooks/useAppContext';

type Props = {
	isClothe?: boolean;
	modalId: ModalId | null;
	setModal: (newValue: ModalId | null) => void;
	deleteSet?: () => Promise<void>;
	fetcher: (
		url: string,
		options?: FetcherOptions,
	) => Promise<
		SetsProps | SetsProps[] | ClothesProps | ClothesProps[] | undefined
	>;
};

export default function ModalDelete({
	setModal,
	modalId,
	fetcher,
	isClothe,
}: Props) {
	const { clothes, sets } = useAppContext();
	const [loading, setLoading] = useState<boolean>(false);
	const clotheOrSet = isClothe
		? findOneClotheOrSet<ClothesProps>(clothes, modalId)
		: findOneClotheOrSet<SetsProps>(sets, modalId);

	return (
		<div className={Style.modalContainer}>
			{loading && (
				<Spinner
					color={'cyan'}
					className={Style.spinner}
				/>
			)}
			<h1>Deseja realmente remover a roupa?</h1>
			<ButtonGroup gap={4}>
				<Button
					onClick={() => setModal(null)}
					colorScheme={'gray'}
				>
					Não
				</Button>
				<Button
					color={'white'}
					colorScheme={'red'}
					onClick={async () => {
						setLoading(true);
						await fetcher(
							`/api/protected/user/${clotheOrSet?.userId}/clothe/${
								isClothe ? 'delete' : 'deleteSet'
							}/${clotheOrSet?.id}`,
							{ method: 'DELETE', update: true },
						);
						setModal(null);
						setLoading(false);
					}}
				>
					Sim
				</Button>
			</ButtonGroup>
		</div>
	);
}
