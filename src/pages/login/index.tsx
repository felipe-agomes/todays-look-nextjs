import style from './login.module.css';
import { signIn } from 'next-auth/react';
import { useFormik } from 'formik';
import { FormLoginValues, loginValidate } from '@/utils/validate';

export default function Login() {
	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validate: loginValidate,
		onSubmit,
	});
	async function handleGoogleSignin() {
		const status = await signIn('google', {
			callbackUrl: 'http://localhost:3000',
		});
	}

	async function onSubmit(values: FormLoginValues) {
		const status = await signIn('credentials', {
			redirect: true,
			email: values.email,
			password: values.password,
			callbackUrl: '/',
		});
		console.log(status);
	}

	return (
		<main id={style.login}>
			<div className={style.modal}>
				<form
					onSubmit={formik.handleSubmit}
					className={style.form}
				>
					<input
						className={style.input}
						type='text'
						name='email'
						placeholder='Email'
						onChange={formik.handleChange}
					></input>
					<input
						className={style.input}
						type='text'
						name='password'
						placeholder='Senha'
						onChange={formik.handleChange}
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
