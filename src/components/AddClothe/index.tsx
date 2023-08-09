/* eslint-disable @next/next/no-img-element */
import { Button } from '@chakra-ui/react';
import style from './AddClothe.module.css';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { clotheService } from '@/services/ClotheService';

type FormInput = {
	category: string;
	url: string;
};

type Props = {
	userId: string | null;
	updateClothesAndSets: () => void;
};

export default function AddClothe({ userId, updateClothesAndSets }: Props) {
	const [loading, setLoading] = useState<boolean>(false);
	const displayRef = useRef(null);
	const { register, handleSubmit, watch } = useForm<FormInput>();
	async function onSubmit({ category, url }: FormInput) {
		setLoading(true);
		await clotheService.create({
			userId,
			clothe: { category, image: url, key: url },
		});
		displayRef.current = null;
		setLoading(false);
		updateClothesAndSets();
	}
	displayRef.current = watch('url');

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className={style.boxForm}
		>
			<div className={style.inputFile}>
				<img
					ref={displayRef}
					src={displayRef.current}
					alt='Imagem'
				/>
			</div>
			{false ? (
				<span style={{ color: 'red' }}>{'Deve ser enviado uma imagem'}</span>
			) : (
				<></>
			)}
			<label
				style={{ alignSelf: 'start' }}
				htmlFor='category'
			>
				URL
			</label>
			<input
				className={style.textInput}
				{...register('url')}
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
				{...register('category')}
			/>
			{false ? (
				<span style={{ color: 'red' }}>
					<p>{''}</p>
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
