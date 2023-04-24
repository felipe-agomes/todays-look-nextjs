import { useFormik } from 'formik';
import Style from './ChangeCategoryModal.module.css';
import {
	validateExistingCategory,
	validateNewCategory,
} from '@/utils/validate';
import { Clothes, FetcherOptions } from '@/@types';
import { CloseIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';

type Props = {
	categories: string[];
	clothe: Clothes;
	fetcher: (
		url: string,
		options?: FetcherOptions
	) => Promise<Clothes | Clothes[] | undefined>;
	openOrCloseModal: (
		{
			whichModal,
			operation,
		}: {
			whichModal: 'clotheModal' | 'deleteModal' | 'changeCategoryModal';
			operation: 'open' | 'close';
		},
		clotheId?: string
	) => void;
};

export default function ChangeCategoryModal({
	categories,
	clothe,
	openOrCloseModal,
	fetcher,
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
			`/api/protected/user/${clothe.userId}/clothe/updateCategory/${clothe.id}`,
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
		<div className={Style.modalContainer}>
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
		</div>
	);
}
