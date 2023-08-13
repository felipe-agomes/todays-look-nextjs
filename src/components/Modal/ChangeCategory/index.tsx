import { ClothesProps, ModalId, SetsProps } from '@/@types';
import { categoriesClotheOrSet } from '@/functions/categoriesClotheOrSet';
import { findOneClotheOrSet } from '@/functions/findOneClotheOrSet';
import useAppContext from '@/hooks/useAppContext';
import { useState } from 'react';
import S from './ChangeCategory.module.css';
import { Button, Spinner } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import ChoseCategory from '@/components/ChoseCategory';
import useModaisController from '@/hooks/useModaisController';
import useModalLoadingContext from '@/hooks/useModalLoadingContext';
import { useFormik } from 'formik';
import useSetSets from '@/hooks/useSetSets';
import useSetCltohes from '@/hooks/useSetClothes';
import { clotheService } from '@/services/ClotheService';

type Props = {
	modalId: ModalId | null;
	isClothe?: boolean;
	setModal: (newValue: ModalId | null) => void;
};

export default function ChangeCategory({ clothe }: { clothe: ClothesProps }) {
	const { clothes } = useAppContext();
	const { closeChangeCategoryModal } = useModaisController();
	const { setLoading, loading } = useModalLoadingContext();
	const categories = categoriesClotheOrSet<ClothesProps>(clothes);
	const { replaceClothes } = useSetCltohes();
	const { replaceSets } = useSetSets();
	const formikExistingCategory = useFormik({
		initialValues: {
			existingCategory: '',
		},
		onSubmit: handleSubmit,
	});

	const formikNewCategory = useFormik({
		initialValues: {
			category: '',
		},
		onSubmit: handleSubmit,
	});

	async function handleSubmit({
		existingCategory,
		category,
	}: {
		existingCategory?: string;
		category?: string;
	}) {
		setLoading(true);
		try {
			const response = await clotheService.changeCategoryById({
				userId: clothe.userId,
				clothe: clothe.id,
				toUpdate: { category: existingCategory ? existingCategory : category! },
			});
			if (response.status === 'error')
				throw new Error('Erro ao mudar a categoria');
			replaceClothes(response.data);
		} catch (error) {
			throw new Error('Erro ao alterar a categoria');
		}
		closeChangeCategoryModal();
		setLoading(false);
	}

	return (
		<div className={S.modalContainer}>
			{loading && (
				<Spinner
					color={'cyan'}
					className={S.spinner}
				/>
			)}
			<CloseIcon
				onClick={() => {
					closeChangeCategoryModal();
				}}
				cursor={'pointer'}
				position={'absolute'}
				right={'20px'}
				top={'20px'}
			/>
			<form onSubmit={formikExistingCategory.handleSubmit}>
				<h2>Categoria existente</h2>
				<div className={S.row}>
					<select
						onChange={formikExistingCategory.handleChange}
						value={formikExistingCategory.values.existingCategory!}
						name='existingCategory'
						id='existingCategory'
					>
						<option value=''></option>
						{categories.map((category) => {
							return (
								<option
									key={category}
									value={category}
								>
									{category}
								</option>
							);
						})}
					</select>
					<Button
						type='submit'
						colorScheme='teal'
						variant='outline'
						marginLeft={10}
					>
						Salvar
					</Button>
				</div>
			</form>
			<form onSubmit={formikNewCategory.handleSubmit}>
				<h2>Nova categoria</h2>
				<div className={S.row}>
					<input
						type='text'
						id='category'
						name='category'
						onChange={formikNewCategory.handleChange}
						value={formikNewCategory.values.category}
					/>
					<Button
						type='submit'
						colorScheme='teal'
						variant='outline'
						marginLeft={10}
					>
						Salvar
					</Button>
				</div>
			</form>
		</div>
	);
}
