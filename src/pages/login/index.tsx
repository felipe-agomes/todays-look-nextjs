import style from './login.module.css';
import { signIn } from 'next-auth/react';

export default function Login() {
	function handleGoogleSignin(e: SubmitEvent) {
		e.preventDefault();
		signIn('google', {
			callbackUrl: 'http://localhost:3000',
		});
	}

	async function handleTodaysLooksProvider(value: SubmitEvent) {
		value.preventDefault();
		await signIn('todaysLooks', {
			redirect: false,
			email: value.email,
			password: value.password,
		});
	}

	return (
		<main id={style.login}>
			<div className={style.modal}>
				<form
					onSubmit={handleTodaysLooksProvider}
					className={style.form}
				>
					<input
						className={style.input}
						type='text'
						placeholder='Email'
					></input>
					<input
						className={style.input}
						type='text'
						placeholder='Senha'
					></input>
					<button
						className={style.button}
						type='submit'
					>
						Enviar
					</button>
					<button onClick={handleGoogleSignin}>Google</button>
				</form>
			</div>
		</main>
	);
}
