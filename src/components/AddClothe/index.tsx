/* eslint-disable @next/next/no-img-element */
import { Button } from '@chakra-ui/react';
import style from './AddClothe.module.css';
import { useState } from 'react';
import { useFormik } from 'formik';
import { sendImageValidate } from '@/utils/validate';
import Image from 'next/image';

type FormSendClothe = {
	category: string;
	file: string;
};

type Props = {
	userId: string | null;
	updateClothesAndSets: () => void;
};

export default function AddClothe({ userId, updateClothesAndSets }: Props) {
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
			form.append('category', value.category);
		}

		try {
			await fetch(`/api/protected/user/${userId}/clothe/upload`, {
				method: 'POST',
				body: form,
			});
		} catch (error) {
			throw new Error('Error: ' + error);
		}

		setDisplayImage(null);
		setFormImage(null);
		formik.resetForm({
			values: initialValues,
		});
		setLoading(false);
		updateClothesAndSets();
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
				{displayImage && typeof displayImage === 'string' ? (
					<img
						src={displayImage}
						alt='Imagem'
					/>
				) : (
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							width: '100%',
							height: '100%',
						}}
					>
						<h1
							style={{
								fontWeight: '500',
							}}
						>
							Enviar Imagem
						</h1>
					</div>
				)}
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
