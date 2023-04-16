type Props = {
	headerTitle: string;
};

export default function HeaderAddClothePage({ headerTitle }: Props) {
	return (
		<header
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				width: '100%',
				height: '80px',
				backgroundColor: '#8db066',
				position: 'fixed',
				top: '0',
				left: '0',
			}}
		>
			<h1 style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.2rem' }}>
				{headerTitle}
			</h1>
		</header>
	);
}
