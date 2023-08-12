import { ModalId } from '@/@types';
import {
	validateExistingCategory,
	validateNewCategory,
} from '@/utils/validate';
import { Button } from '@chakra-ui/react';
import { useFormik } from 'formik';
import Style from './ChoseCategory.module.css';
import { clotheService } from '@/services/ClotheService';
import { setService } from '@/services/SetService';
import { Response } from '@/controllers/FrontController';
import useSetCltohes from '@/hooks/useSetClothes';
import useSetSets from '@/hooks/useSetSets';

type Props = {
	categories: string[];
	clotheOrSetId?: string;
	userId?: string;
	isClothe?: boolean;
	setModal: (newValue: ModalId | null) => void;
	setLoading: (boolean: boolean) => void;
};

export default function ChoseCategory({
	categories,
	clotheOrSetId,
	isClothe,
	setModal,
	userId,
	setLoading,
}: Props) {
	const { replaceClothes } = useSetCltohes();
	const { replaceSets } = useSetSets();
	const formikExistingCategory = useFormik({
		initialValues: {
			existingCategory: '',
		},
		validate: validateExistingCategory,
		onSubmit: handleSubmit,
	});

	const formikNewCategory = useFormik({
		initialValues: {
			category: '',
		},
		validate: validateNewCategory,
		onSubmit: handleSubmit,
	});

	async function handleSubmit({
		existingCategory,
		category,
	}: {
		existingCategory?: string;
		category?: string;
	}) {
		if (!existingCategory && !category) return;
		if (!clotheOrSetId || !userId) throw new Error('Usuário não conectado');
		setLoading(true);
		try {
			if (isClothe) {
				const response = await clotheService.changeCategoryById({
					userId,
					clothe: clotheOrSetId,
					toUpdate: { category: existingCategory ? existingCategory : category! },
				});
				if (response.status === 'error')
					throw new Error('Erro ao mudar a categoria');
				replaceClothes(response.data);
			}
			if (!isClothe) {
				const response = await setService.changeCategoryById({
					userId,
					set: clotheOrSetId,
					toUpdate: { category: existingCategory ? existingCategory : category! },
				});
				if (response.status === 'error')
					throw new Error('Erro ao mudar a categoria');
				replaceSets(response.data);
			}
		} catch (error) {
			throw new Error('Erro ao alterar a categoria');
		}
		setModal(null);
		setLoading(false);
	}

	return (
		<>
			<form onSubmit={formikExistingCategory.handleSubmit}>
				<h2>Categoria existente</h2>
				<div className={Style.rowBox}>
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
				{formikExistingCategory.errors.existingCategory &&
				formikExistingCategory.touched.existingCategory ? (
					<span style={{ color: 'red' }}>
						<p>{formikExistingCategory.errors.existingCategory}</p>
					</span>
				) : (
					<></>
				)}
			</form>
			<form onSubmit={formikNewCategory.handleSubmit}>
				<h2>Nova categoria</h2>
				<div className={Style.rowBox}>
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
				{formikNewCategory.errors.category && formikNewCategory.touched.category ? (
					<span style={{ color: 'red' }}>
						<p>{formikNewCategory.errors.category}</p>
					</span>
				) : (
					<></>
				)}
			</form>
		</>
	);
}
