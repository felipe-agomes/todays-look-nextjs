import { userService } from '@/services/UserService';
import S from './Register.module.css';
import { useForm } from 'react-hook-form';

type RegisterInput = {
	name: string;
	email: string;
	password: string;
	passwordConfirmation: string;
};

export default function Register() {
	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm<RegisterInput>();
	const onSubmit = async ({ passwordConfirmation, ...data }: RegisterInput) => {
		console.log(await userService.create(data));
	};

	return (
		<div className={S.formContainer}>
			<div className={S.formModal}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<input
						type='text'
						placeholder='Nome'
						{...register('name', { required: 'Nome deve ser inserido' })}
					/>
					{errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
					<input
						type='text'
						placeholder='Email'
						{...register('email', {
							required: 'Email deve ser inserido',
							validate: {
								emailValidate: (value) => {
									const regex = /[A-Za-z0-9]+@[A-Za-z]+\.[A-Za-z]{2,5}/;
									return !!value.match(regex) || 'Email inválido';
								},
							},
						})}
					/>
					{errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
					<input
						type='password'
						placeholder='Senha'
						{...register('password', {
							required: 'Senha deve ser inserido',
						})}
					/>
					{errors.password && (
						<p style={{ color: 'red' }}>{errors.password.message}</p>
					)}
					<input
						type='password'
						placeholder='Repita a senha'
						{...register('passwordConfirmation', {
							required: 'Confirme a senha',
							validate: {
								matchesPreviousPassword: (value) => {
									const { password } = getValues();
									return password === value || 'As senhas não conferem';
								},
							},
						})}
					/>
					{errors.passwordConfirmation && (
						<p style={{ color: 'red' }}>{errors.passwordConfirmation.message}</p>
					)}
					<button type='submit'>Registrar</button>
				</form>
			</div>
		</div>
	);
}
