import { signIn } from 'next-auth/react';
import style from './login.module.css';
import { useRouter } from 'next/router';

export default function Login() {
	return (
		<main id={style.login}>
			<div className={style.modal}>
				<button onClick={() => signIn('', { callbackUrl: '/home' })}>Login</button>
			</div>
		</main>
	);
}
