import { signIn } from 'next-auth/react';
import style from './login.module.css';
import { useRouter } from 'next/router';

export default function Login() {
	const router = useRouter();

	return (
		<main id={style.login}>
			<div className={style.modal}>
				<form
					className={style.form}
				>
					<input
						className={style.input}
						type='text'
						name='email'
						placeholder='Email'
					></input>
					<input
						className={style.input}
						type='text'
						name='password'
						placeholder='Senha'
					></input>
					<a
						className={style.button}
						onClick={async (e) => {
							e.preventDefault();
							await signIn();
							router.push('/home');
						}}
					>
						Enviar
					</a>
				</form>
			</div>
		</main>
	);
}
