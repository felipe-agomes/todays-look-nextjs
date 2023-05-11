import Style from './ModalChangeCategory.module.css';
import {
	ClothesProps,
	FetcherOptions,
	OpenOrCloseModalProps,
	SetsProps,
} from '@/@types';
import { CloseIcon } from '@chakra-ui/icons';
import ChoseCategory from '../ChoseCategory';
import { Spinner } from '@chakra-ui/react';
import { useState } from 'react';

type Props = {
	categories: string[];
	clotheOrSet: ClothesProps | SetsProps;
	clothesOrSets: 'clothes' | 'sets';
	fetcher: (
		url: string,
		options?: FetcherOptions,
	) => Promise<
		SetsProps | SetsProps[] | ClothesProps | ClothesProps[] | undefined
	>;
	openOrCloseModal: (
		{ whichModal, operation }: OpenOrCloseModalProps,
		clotheId?: string | null,
		setId?: string | null,
	) => void;
};

export default function ModalChangeCategory({
	categories,
	clothesOrSets,
	clotheOrSet,
	openOrCloseModal,
	fetcher,
}: Props) {
	const [loading, setLoading] = useState<boolean>(false);

	function handleSetLoading(boolean: boolean) {
		setLoading(boolean);
	}

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
					openOrCloseModal({
						whichModal: 'changeCategoryModal',
						operation: 'close',
					});
				}}
				cursor={'pointer'}
				position={'absolute'}
				right={'20px'}
				top={'20px'}
			/>
			<ChoseCategory
				handleSetLoading={handleSetLoading}
				clothesOrSets={clothesOrSets}
				fetcher={fetcher}
				openOrCloseModal={openOrCloseModal}
				categories={categories}
				clotheOrSetId={clotheOrSet.id}
				userId={clotheOrSet.userId}
			/>
		</div>
	);
}
