import {
	Clothes,
	FetcherOptions,
	ModalState,
	OpenOrCloseModalProps,
	SetsProps,
} from '@/@types';
import {
	CloseIcon,
	DeleteIcon,
	EditIcon,
	SmallAddIcon,
	SmallCloseIcon,
	StarIcon,
} from '@chakra-ui/icons';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Style from './BaseModal.module.css';
import SetImages from '../SetImages';

type Props = {
	modal: ModalState;
	set?: SetsProps | null;
	clothes?: Clothes | null;
	workbench?: Clothes[] | [];
	children: JSX.Element;
	clotheOrSet: 'clothe' | 'set';
	openOrCloseModal: (
		{ whichModal, operation }: OpenOrCloseModalProps,
		clotheId?: string | null,
		setId?: string | null
	) => void;
};

export default function BaseModal({
	clotheOrSet,
	set,
	clothes,
	children,
	modal,
	openOrCloseModal,
}: Props) {
	return (
		<>
			<CloseIcon
				onClick={() => {
					openOrCloseModal({ whichModal: 'clotheModal', operation: 'close' });
				}}
				cursor={'pointer'}
				position={'absolute'}
				right={'20px'}
				top={'20px'}
			/>
			{clothes && (
				<div
					style={{
						position: 'relative',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						width: '128px',
						height: '128px',
					}}
				>
					<Image
						width={128}
						height={128}
						src={clothes.image}
						alt='Roupa'
					/>
				</div>
			)}
			{set && (
				<div
					style={{
						position: 'relative',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						height: '242px',
						width: '190px',
						background: '#fff',
						overflow: 'hidden',
					}}
				>
					<SetImages
						size={{ height: 43, width: 43 }}
						set={set}
						proportion={{ x: 0.50, y: 0.50 }}
					/>
				</div>
			)}
			<div
				style={{
					width: '100%',
				}}
			>
				{children}
			</div>
		</>
	);
}
