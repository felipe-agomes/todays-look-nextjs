'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import './Register.css';
import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from 'next/router';

const SERVER_ROUTER = 'http://localhost:3333'

function Register() {
	const router = useRouter()

	const [name, setName] = useState('')
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [password2, setPassword2] = useState('');

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		if (password !== password2) {
			console.log('wrong password')
			return;
		}

		try {
			await fetch(`${SERVER_ROUTER}/register`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name,
					email,
					password
				})
			})
				.then(async response => {
					const data = await response.json()
					if (data.error) return;

					router.push('/Login')
				})
		} catch (error) {
			console.error(error)
		}

		console.log({ email, password, password2 });
		setEmail('');
		setPassword('')
		setPassword2('');
	}

	return (
		<main id='register'>
			<div className='register-box'>
				<div className='image-box'>
					<Image src='/next.svg' alt='login logo' className='img' width={1000} height={1000} layout='responsive' />
				</div>
				<h1>Cadastro</h1>
				<form onSubmit={handleSubmit} className='register-form'>
					<label htmlFor='name'>Nome</label>
					<input type="text" name="name" id="name" onChange={e => { setName(e.target.value) }} />
					<label htmlFor='email'>E-mail</label>
					<input
						type='text'
						name='email'
						id='email'
						value={email}
						onChange={e => {
							setEmail(e.target.value);
						}}
					/>
					<label htmlFor='password'>Senha</label>
					<input
						type='password'
						name='password'
						id='password'
						value={password}
						onChange={e => {
							setPassword(e.target.value);
						}}
					/>
					<label htmlFor='password2'>Repita a senha</label>
					<input
						type='password'
						name='password'
						id='password2'
						value={password2}
						onChange={e => {
							setPassword2(e.target.value);
						}}
					/>
					<button type='submit'>ENVIAR</button>
				</form>
			</div>
		</main>
	);
}

export default Register;
