import S from './Set.module.css';
import ProviderModalLoading from '@/contexts/ModalLoading';
import useModaisContext from '@/hooks/useModaisContext';
import useModaisController from '@/hooks/useModaisController';
import useModalLoadingContext from '@/hooks/useModalLoadingContext';
import ChangeCategory from '../ChangeCategory';
import DeleteModal from '../Delete';
import { SetsProps } from '@/@types';
import { CloseIcon } from '@chakra-ui/icons';
import { Spinner } from '@chakra-ui/react';

export default function SetRoot({
	title,
	category,
	set,
	children,
}: {
	title: string;
	category: string;
	set: SetsProps;
	children: React.ReactNode;
}) {
	const { closeAllModais } = useModaisController();
	const { deleteModal, changeCategoryModal } = useModaisContext();
	const { loading } = useModalLoadingContext();

	return (
		<ProviderModalLoading>
			<div className={S.modalRoot}>
				<div className={S.title}>
					<p>
						{title}: {category}
					</p>
				</div>
				<CloseIcon
					onClick={() => {
						closeAllModais();
					}}
					cursor={'pointer'}
					position={'absolute'}
					right={'20px'}
					top={'20px'}
				/>
				{loading && (
					<Spinner
						color={'cyan'}
						className={S.spinner}
					/>
				)}
				{changeCategoryModal && <ChangeCategory set={set} />}
				{deleteModal && <DeleteModal set={set} />}
				{children}
			</div>
		</ProviderModalLoading>
	);
}
