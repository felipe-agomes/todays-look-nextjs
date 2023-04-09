import { useFormik } from 'formik';
import style from './register.module.css';
import { registerValidate } from '../../utils/validate';
import { useRouter } from 'next/router';
import { FormRegisterValues } from '@/@types';
import connectDb from '@/services/connectDb';
import { GetServerSidePropsContext } from 'next';

export default function Register() {
	const router = useRouter();
	const formik = useFormik({
		initialValues: {
			username: '',
			email: '',
			password: '',
			cpassword: '',
		},
		validate: registerValidate,
		onSubmit,
	});

	async function onSubmit(values: FormRegisterValues) {
		const { username: name, email, password } = values;
		const userData = { name, email, password };
		const response = await fetch('http://localhost:3000/api/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userData),
		});

		const data = await response.json();

		if (data.error) {
			console.log(data.message);
			return;
		}

		router.push('/login');
	}

	return (
		<main id={style.register}>
			<div className={style.modal}>
				<form
					className={style.form}
					onSubmit={formik.handleSubmit}
				>
					<input
						type='text'
						name='username'
						className={style.input}
						placeholder='Usuario'
						onChange={formik.handleChange}
					/>
					{formik.errors.username && formik.touched.username ? (
						<span style={{ color: 'red' }}>{formik.errors.username}</span>
					) : (
						<></>
					)}
					<input
						type='text'
						name='email'
						className={style.input}
						placeholder='Email'
						onChange={formik.handleChange}
					/>
					{formik.errors.email && formik.touched.email ? (
						<span style={{ color: 'red' }}>{formik.errors.email}</span>
					) : (
						<></>
					)}
					<input
						type='password'
						name='password'
						className={style.input}
						placeholder='Senha'
						onChange={formik.handleChange}
					/>
					{formik.errors.password && formik.touched.password ? (
						<span style={{ color: 'red' }}>{formik.errors.password}</span>
					) : (
						<></>
					)}
					<input
						type='password'
						name='cpassword'
						className={style.input}
						placeholder='Repita a senha'
						onChange={formik.handleChange}
					/>
					{formik.errors.cpassword && formik.touched.cpassword ? (
						<span style={{ color: 'red' }}>{formik.errors.cpassword}</span>
					) : (
						<></>
					)}
					<button
						type='submit'
						className={style.button}
					>
						Enviar
					</button>
				</form>
			</div>
		</main>
	);
}
