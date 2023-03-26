import React, { useEffect, useState } from 'react';
import { type Body, type Message } from '../../types';
import './AddCloth.css';

type Prop = {
	modal: 'active' | '';
	updateClothes: () => void;
};

function AddCloth({ modal, updateClothes }: Prop): JSX.Element {
	const [image, setImage] = useState<File>();
	const [urlImage, setUrlImage] = useState<string>('');
	const [displayedImage, setDisplayedImage] = useState<string>('');
	const [category, setCategory] = useState<string>('');

	const user = localStorage.getItem('user');
	const token = localStorage.getItem('token');

	const SERVER_ROUTER = 'http://localhost:3333';

	useEffect(() => {
		if (image) {
			fileReader(image);
		}
	}, [image]);

	function fileReader(img: File): void {
		const reader = new FileReader();
		reader.readAsDataURL(img);
		reader.addEventListener('load', (e) => {
			const targetReader = e.target;
			const result = targetReader?.result;
			if (result && typeof result === 'string') {
				setDisplayedImage(result);
			}
		});
	}

	function setBody(): Body {
		if (category === 'CALÇA' || category === 'SHORTS/SAIA') {
			return 'legs';
		}

		if (category === 'BLUSA' || category === 'CAMISETA') {
			return 'body';
		}

		if (category === 'CALÇADO') {
			return 'shoes';
		}

		return 'bodyLegs';
	}

	async function handleSubmit(
		event: React.FormEvent<HTMLFormElement>
	): Promise<void> {
		event.preventDefault();
		const formData = new FormData();

		if (category === '') {
			return;
		}

		if (image) {
			formData.append('category', category);
			formData.append('body', setBody());
			formData.append('image', image);

			const response = await fetch(`${SERVER_ROUTER}/users/${user}/upload`, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`,
				},
				body: formData,
			});
			const data = (await response.json()) as Message;
			if (data.error) {
				console.log(data.error);
				return;
			}
		}

		if (urlImage !== '') {
			const response = await fetch(`${SERVER_ROUTER}/uploadbg`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					category,
					body: setBody(),
					image: urlImage,
				}),
			});
			const data = (await response.json()) as Message;
			if (data.error) {
				console.log(data.error);
				return;
			}
		}

		console.log('aqui');
		updateClothes();
		setUrlImage('');
		setDisplayedImage('');
		setImage(undefined);
		setCategory('');
	}

	async function backgroundRemove(
		event: React.MouseEvent<HTMLButtonElement>
	): Promise<void> {
		event.preventDefault();
		const formData = new FormData();
		if (!image) {
			return;
		}

		formData.append('image', image);
		const response = await fetch(`${SERVER_ROUTER}/bgrm`, {
			method: 'POST',
			body: formData,
		});
		const data = (await response.json()) as Message;
		if (data.message && data.body) {
			setDisplayedImage(data.body);
			setImage(undefined);
			setUrlImage(data.body);
			return;
		}

		console.log(data.error);
	}

	return (
		<div
			id='addCloth'
			className={`${modal}`}
		>
			<div className='addCloth-box'>
				<form
					className='addCloth-form'
					onSubmit={async (e) => {
						await handleSubmit(e);
					}}
				>
					<label htmlFor='file'>
						{displayedImage ? <img src={displayedImage} /> : 'IMAGEM'}
					</label>
					<input
						hidden
						type='file'
						id='file'
						onChange={(e) => {
							setImage(e.target.files?.[0]);
						}}
					/>
					<select
						onChange={(e) => {
							setCategory(e.target.value);
						}}
						name='category'
						id='category'
					>
						<option defaultChecked>CATEGORIA</option>
						<option value='CAMISETA'>CAMISETA</option>
						<option value='BLUSA'>BLUSA</option>
						<option value='VESTIDO'>VESTIDO</option>
						<option value='CALÇA'>CALÇA</option>
						<option value='SHORTS/SAIA'>SHORT</option>
						<option value='SHORTS/SAIA'>SAIA</option>
						<option value='CALÇADO'>CALÇADO</option>
					</select>
					<button onClick={backgroundRemove}>REMOVER FUNDO</button>
					<button type='submit'>ENVIAR</button>
				</form>
			</div>
		</div>
	);
}

export default AddCloth;
