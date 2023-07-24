import Style from './Header.module.css';

type Props = {
	title: string;
	children?: React.ReactNode;
};

export default function HeaderRoot({ title, children }: Props) {
	return (
		<>
			<header className={Style.headerPage}>
				<div className={Style.topHeader}>
					<h1>{title}</h1>
				</div>
				{children}
			</header>
		</>
	);
}
