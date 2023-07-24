import {
	ClothesProps,
	FetcherOptions,
	ModalId,
	OpenOrCloseModalProps,
	SetsProps,
} from '@/@types';
import {
	validateExistingCategory,
	validateNewCategory,
} from '@/utils/validate';
import { Button } from '@chakra-ui/react';
import { useFormik } from 'formik';
import Style from './ChoseCategory.module.css';

type Props = {
	categories: string[];
	clotheOrSetId?: string;
	userId?: string;
	isClothe?: boolean;
	setModal: (newValue: ModalId | null) => void;
	fetcher: (
		url: string,
		options?: FetcherOptions,
	) => Promise<
		SetsProps | SetsProps[] | ClothesProps | ClothesProps[] | undefined
	>;
	setLoading: (boolean: boolean) => void;
};

export default function ChoseCategory({
	categories,
	clotheOrSetId,
	isClothe,
	setModal,
	userId,
	fetcher,
	setLoading,
}: Props) {
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

	async function handleSubmit(values: {
		existingCategory?: String;
		category?: String;
	}) {
		setLoading(true);
		const path = isClothe ? 'updateCategory' : 'updateCategorySet';
		await fetcher(
			`/api/protected/user/${userId}/clothe/${path}/${clotheOrSetId}`,
			{
				method: 'PUT',
				body: JSON.stringify({
					toUpdate: values.existingCategory
						? values.existingCategory
						: values.category,
				}),
				update: true,
			},
		);
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
						value={formikExistingCategory.values.existingCategory}
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
