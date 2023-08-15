import S from './ProfilePage.module.css';
import { signOut } from 'next-auth/react';

type Props = {
	userName: string;
};

export default function ProfilePage({ userName }: Props) {
	return (
		<div className={S.container}>
			<button
				onClick={() => {
					signOut();
				}}
			>
				Sair
			</button>
			<h2>{userName}</h2>
		</div>
	);
}
