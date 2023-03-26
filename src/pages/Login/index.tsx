import React, { useState } from 'react';
import './Login.css';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

const SERVER_ROUTER = 'http://localhost:3333';

function Login() {
	const router = useRouter();

	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		try {
			await fetch(`${SERVER_ROUTER}/login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email,
					password,
				}),
			}).then(async (response) => {
				const data = await response.json();
				if (data.error) return;

				localStorage.setItem('token', data.token);
				localStorage.setItem('user', data.userLogged);
				localStorage.setItem('userName', data.userName);

				router.push('/');
			});
		} catch (error) {}

		console.log({ email, password });
		setEmail('');
		setPassword('');
	}

	return (
		<main id='login'>
			<div className='login-box'>
				<div className='image-box'>
					<Image
						src='/next.svg'
						alt='login logo'
						className='img'
						width={1000}
						height={1000}
						layout='responsive'
					/>
				</div>
				<h1>Login</h1>
				<form
					onSubmit={handleSubmit}
					className='login-form'
				>
					<label htmlFor='email'>E-mail</label>
					<input
						type='text'
						name='email'
						id='email'
						value={email}
						onChange={(e) => {
							setEmail(e.target.value);
						}}
					/>
					<label htmlFor='password'>Senha</label>
					<input
						type='password'
						name='password'
						id='password'
						value={password}
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					/>
					<button type='submit'>ENVIAR</button>
					<p>
						Não tem uma conta?{' '}
						<span>
							<Link href='/Register'>Crie sua conta</Link>
						</span>
					</p>
				</form>
			</div>
		</main>
	);
}

export default Login;
