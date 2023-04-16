import { signOut } from 'next-auth/react';
import Style from './ProfilePage.module.css';

type Props = {
	userName: string;
};

export default function ProfilePage({ userName }: Props) {
	return (
		<div className={Style.container}>
			<h2 className={Style.userName}>{userName}</h2>
			<button className={Style.button} onClick={() => signOut()}>Sair</button>
		</div>
	);
}
