import { ClothesProps, FetcherOptions, ModalId, SetsProps } from '@/@types';
import Style from './ModalDelete.module.css';
import { Button, ButtonGroup, Spinner } from '@chakra-ui/react';
import { useState } from 'react';
import { findOneClotheOrSet } from '@/functions/findOneClotheOrSet';
import useAppContext from '@/hooks/useAppContext';
import useModaisController from '@/hooks/useModaisController';

type Props = {
	isClothe?: boolean;
	modalId: ModalId | null;
	deleteSet?: () => Promise<void>;
	fetcher: (
		url: string,
		options?: FetcherOptions,
	) => Promise<
		SetsProps | SetsProps[] | ClothesProps | ClothesProps[] | undefined
	>;
};

export default function ModalDelete({ modalId, fetcher, isClothe }: Props) {
	const { clothes, sets } = useAppContext();
	const { closeAllModais } = useModaisController();
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
					onClick={() => closeAllModais()}
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
						closeAllModais();
						setLoading(false);
					}}
				>
					Sim
				</Button>
			</ButtonGroup>
		</div>
	);
}
