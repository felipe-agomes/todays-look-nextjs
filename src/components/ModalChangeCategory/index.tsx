import Style from './ModalChangeCategory.module.css';
import {
	ClothesProps,
	FetcherOptions,
	ModalId,
	OpenOrCloseModalProps,
	SetsProps,
} from '@/@types';
import { CloseIcon } from '@chakra-ui/icons';
import ChoseCategory from '../ChoseCategory';
import { Spinner } from '@chakra-ui/react';
import { useState } from 'react';
import useAppContext from '@/hooks/useAppContext';
import { categoriesClotheOrSet } from '@/functions/categoriesClotheOrSet';
import { findOneClotheOrSet } from '@/functions/findOneClotheOrSet';

type Props = {
	modalId: ModalId | null;
	isClothe?: boolean;
	setModal: (newValue: ModalId | null) => void;
	fetcher: (
		url: string,
		options?: FetcherOptions,
	) => Promise<
		SetsProps | SetsProps[] | ClothesProps | ClothesProps[] | undefined
	>;
};

export default function ModalChangeCategory({
	isClothe,
	modalId,
	setModal,
	fetcher,
}: Props) {
	const { clothes, sets } = useAppContext();
	const [loading, setLoading] = useState<boolean>(false);
	const clotheOrSet = isClothe
		? findOneClotheOrSet<ClothesProps>(clothes, modalId)
		: findOneClotheOrSet<SetsProps>(sets, modalId);
	const categories = isClothe
		? categoriesClotheOrSet<ClothesProps>(clothes)
		: categoriesClotheOrSet<SetsProps>(sets);

	return (
		<div className={Style.modalContainer}>
			{loading && (
				<Spinner
					color={'cyan'}
					className={Style.spinner}
				/>
			)}
			<CloseIcon
				onClick={() => {
					setModal(null);
				}}
				cursor={'pointer'}
				position={'absolute'}
				right={'20px'}
				top={'20px'}
			/>
			<ChoseCategory
				setLoading={setLoading}
				isClothe={isClothe}
				fetcher={fetcher}
				setModal={setModal}
				categories={categories}
				clotheOrSetId={clotheOrSet?.id}
				userId={clotheOrSet?.userId}
			/>
		</div>
	);
}
