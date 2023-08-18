import style from './login.module.css';

export default function Login() {
	return (
		<main id={style.login}>
			<div className={style.modal}>
				<form>
					<input
						type='text'
						placeholder='email'
					/>
					<input
						type='text'
						placeholder='password'
					/>
					<button type='submit'>Login</button>
				</form>
				<a href='/register'>Registrar</a>
			</div>
		</main>
	);
}
