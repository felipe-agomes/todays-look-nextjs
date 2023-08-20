import Link from 'next/link';
import style from './login.module.css';
import { useForm } from 'react-hook-form';
import { userService } from '@/services/UserService';
import { useRouter } from 'next/router';

type LoginInput = {
	password: string;
	email: string;
};

export default function Login() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginInput>();
	const router = useRouter();
	const onSubmit = async (data: LoginInput) => {
		const response = await userService.login(data);
		if (response.status === 'success') {
			console.log(response);
			localStorage.setItem('token', response.data.token);
			router.push('/home');
		}
	};

	return (
		<main id={style.login}>
			<div className={style.modal}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<input
						type='text'
						placeholder='email'
						{...register('email')}
					/>
					<input
						type='password'
						placeholder='password'
						{...register('password')}
					/>
					<button type='submit'>Login</button>
				</form>
				<Link href='/register'>Registrar</Link>
			</div>
		</main>
	);
}
