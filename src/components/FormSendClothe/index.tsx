import { Button, ButtonGroup } from '@chakra-ui/react';
import style from './FormSendClothe.module.css';
import { useState } from 'react';
import { FormikHelpers, useFormik } from 'formik';

type FormSendClothe = {
	category: string;
	file: string;
};

export default function FormSendClothe() {
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
		validate,
		onSubmit: handleSubmit,
	});

	function validate(value: FormSendClothe) {
		console.log(value);
	}

	function handleSubmit(
		event: FormSendClothe,
		formikHelper: FormikHelpers<FormSendClothe>
	) {
		setLoading(true);
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
			<input
				type='file'
				id='file'
				name='file'
				onChange={(e) => {
					formik.handleChange(e);
					handleDisplayImage(e.target.files && e.target.files[0]);
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
				onChange={formik.handleChange}
			/>
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