import { useRouter } from 'next/router';
import S from './ProfilePage.module.css';

type Props = {
	userName: string;
};

export default function ProfilePage({ userName }: Props) {
	const router = useRouter();

	return (
		<div className={S.container}>
			<button
				onClick={() => {
					router.push('/login');
				}}
			>
				Sair
			</button>
			<h2>{userName}</h2>
		</div>
	);
}
