/* eslint-disable @next/next/no-img-element */
import {
	ClothesProps,
	ModalId,
	ModalState,
	OpenOrCloseModalProps,
	SetsProps,
} from '@/@types';
import { CloseIcon } from '@chakra-ui/icons';
import SetImages from '../SetImages';
import useModaisController from '@/hooks/useModaisController';

type Props = {
	set?: SetsProps | null;
	clothes?: ClothesProps | null;
	workbench?: ClothesProps[] | [];
	children: JSX.Element;
};

export default function ModalBase({ set, clothes, children }: Props) {
	const { closeAllModais } = useModaisController();

	return (
		<>
			<CloseIcon
				onClick={() => {
					closeAllModais();
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
					<img
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
						width: '242px',
						height: '309.22px',
						background: '#fff',
						overflow: 'hidden',
					}}
				>
					<SetImages
						size={{ height: 86.04, width: 86.04 }}
						set={set}
						proportion={{ x: 0.67, y: 0.67 }}
					/>
					<div>
						<ul></ul>
					</div>
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
