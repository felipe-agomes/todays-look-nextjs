import { signIn } from 'next-auth/react';
import style from './login.module.css';
import { useRouter } from 'next/router';
import { Button } from '@chakra-ui/react';

export default function Login() {
	return (
		<main id={style.login}>
			<div className={style.modal}>
				<h1
					style={{
						fontWeight: '500',
						fontSize: '1.2rem',
					}}
				>
					Você não está logado
				</h1>
				<Button
				colorScheme='blue'
				fontWeight={'bold'}
				width={150}
				height={50}
				onClick={() => signIn('', { callbackUrl: '/home' })}>Login</Button>
			</div>
		</main>
	);
}
