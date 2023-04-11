/* eslint-disable @next/next/no-img-element */
import { Button, ButtonGroup } from '@chakra-ui/react';
import style from './FormSendClothe.module.css';
import { useState } from 'react';
import { Formik, FormikHelpers, useFormik } from 'formik';
import { sendImageValidate } from '@/utils/validate';

type FormSendClothe = {
	category: string;
	file: string;
};

type Props = {
	userId: string | null;
};

export default function FormSendClothe({ userId }: Props) {
	const [formImage, setFormImage] = useState<File | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [displayImage, setDisplayImage] = useState<string | ArrayBuffer | null>(
		null
	);
	const initialValues: FormSendClothe = {
		category: '',
		file: '',
	};

	const formik = useFormik({
		initialValues,
		validate: sendImageValidate,
		onSubmit: handleSubmit,
	});

	async function handleSubmit(value: FormSendClothe) {
		setLoading(true);
		const form = new FormData();

		if (formImage) {
			form.append('image', formImage);
			console.log(value.category);
			form.append('category', value.category);
		}

		console.log(value.file);

		try {
			const response = await fetch(
				`http://localhost:3000/api/protected/user/${userId}/clothe/upload`,
				{
					method: 'POST',
					body: form,
				}
			);

			const data = await response.json();
			console.log(data);
		} catch (error) {
			throw new Error('Error: ' + error);
		}

		setDisplayImage(null);
		setFormImage(null);
		formik.resetForm({
			values: initialValues,
		});
		setLoading(false);
	}

	function handleDisplayImage(
		file: File | null
	): Promise<string | ArrayBuffer | null | void> {
		return new Promise((resolve, reject) => {
			if (!file) {
				return;
			}
			if (!file.type.startsWith('image/')) {
				reject(new Error('The file is not an image'));
				return;
			}
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.addEventListener('load', (e) => {
				const targetReader = e.target;
				const result = targetReader?.result;
				if (result) {
					resolve(setDisplayImage(result));
				} else {
					reject(new Error('Failed to read the file'));
				}
			});
			reader.addEventListener('error', (e) => {
				reject(new Error('An error occurred while reading the file'));
			});
		});
	}

	return (
		<form
			onSubmit={formik.handleSubmit}
			className={style.boxForm}
		>
			<label
				htmlFor='file'
				className={style.inputFile}
			>
				<img
					style={{
						maxHeight: '100%',
						maxWidth: '100%',
					}}
					src={
						displayImage && typeof displayImage === 'string'
							? displayImage
							: 'https://www.google.com/url?sa=i&url=http%3A%2F%2Fcbissn.ibict.br%2Findex.php%2Fimagens%2F1-galeria-de-imagens-01%2Fdetail%2F3-imagem-3-titulo-com-ate-45-caracteres&psig=AOvVaw1QzcCWeiIXJ2IrxTx3zNoX&ust=1681002664255000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCNii1YeNmf4CFQAAAAAdAAAAABAE'
					}
					alt='Imagem'
				/>
			</label>
			{formik.errors.file && formik.touched.file ? (
				<span style={{ color: 'red' }}>{formik.errors.file}</span>
			) : (
				<></>
			)}
			<input
				type='file'
				id='file'
				name='file'
				onChange={(e) => {
					formik.handleChange(e);
					handleDisplayImage(e.target.files && e.target.files[0]);
					setFormImage(e.target.files && e.target.files[0]);
				}}
				hidden
			/>
			<label
				style={{ alignSelf: 'start' }}
				htmlFor='category'
			>
				Categoria
			</label>
			<input
				className={style.textInput}
				type='text'
				id='category'
				name='category'
				value={formik.values.category}
				onChange={formik.handleChange}
			/>
			{formik.errors.category && formik.touched.category ? (
				<span style={{ color: 'red' }}>
					<p>{formik.errors.category}</p>
				</span>
			) : (
				<></>
			)}
			<Button
				type='submit'
				isLoading={loading}
				loadingText='Salvando'
				colorScheme='teal'
				variant='outline'
				marginTop={10}
			>
				Salvar
			</Button>
		</form>
	);
}
