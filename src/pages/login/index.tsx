import style from './login.module.css';
import { getSession, signIn } from 'next-auth/react';
import { useFormik } from 'formik';
import { loginValidate } from '@/utils/validate';
import { FormLoginValues } from '@/@types';
import connectDb from '@/services/connectDb';
import { GetServerSidePropsContext } from 'next';

export default function Login() {
	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validate: loginValidate,
		onSubmit,
	});

	async function onSubmit(values: FormLoginValues) {
		await signIn('credentials', {
			redirect: true,
			email: values.email,
			password: values.password,
			callbackUrl: '/home',
		});
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
				</form>
			</div>
		</main>
	);
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	await connectDb();
	return {
		props: {},
	};
}
