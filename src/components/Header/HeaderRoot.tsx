import S from './Header.module.css';

type Props = {
	title: string;
	children?: React.ReactNode;
};

export default function HeaderRoot({ title, children }: Props) {
	return (
		<>
			<header className={S.headerPage}>
				<div className={S.topHeader}>
					<h1>{title}</h1>
				</div>
				{children}
			</header>
		</>
	);
}
