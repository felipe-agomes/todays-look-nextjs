import {
	ClothesProps,
	FetcherOptions,
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
	clotheId: string;
	userId: string;
	fetcher: (
		url: string,
		options?: FetcherOptions
	) => Promise<SetsProps | SetsProps[] | ClothesProps | ClothesProps[] | undefined>;
	openOrCloseModal: (
		{ whichModal, operation }: OpenOrCloseModalProps,
		clotheId?: string
	) => void;
};

export default function ChoseCategory({
	categories,
	clotheId,
	userId,
	fetcher,
	openOrCloseModal,
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
			newCategory: '',
		},
		validate: validateNewCategory,
		onSubmit: handleSubmit,
	});

	async function handleSubmit(values: {
		existingCategory?: String;
		newCategory?: String;
	}) {
		await fetcher(
			`/api/protected/user/${userId}/clothe/updateCategory/${clotheId}`,
			{
				method: 'PUT',
				body: JSON.stringify({
					toUpdate: values.existingCategory
						? values.existingCategory
						: values.newCategory,
				}),
				update: true,
			}
		);
		openOrCloseModal({ whichModal: 'changeCategoryModal', operation: 'close' });
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
						id='newCategory'
						name='newCategory'
						onChange={formikNewCategory.handleChange}
						value={formikNewCategory.values.newCategory}
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
				{formikNewCategory.errors.newCategory &&
				formikNewCategory.touched.newCategory ? (
					<span style={{ color: 'red' }}>
						<p>{formikNewCategory.errors.newCategory}</p>
					</span>
				) : (
					<></>
				)}
			</form>
		</>
	);
}
