import S from './ProfilePage.module.css';

type Props = {
	userName: string;
};

export default function ProfilePage({ userName }: Props) {
	return (
		<div className={S.container}>
			<button onClick={() => {}}>Sair</button>
			<h2>{userName}</h2>
		</div>
	);
}
