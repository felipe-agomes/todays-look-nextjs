type Props = {
	children: JSX.Element;
};

export default function ContainerPage({ children }: Props) {
	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				position: 'absolute',
				top: '80px',
				left: '0',
				width: '100%',
				height: 'calc(100vh - 120px)',
				background: '#eee',
			}}
		>
			{children}
		</div>
	);
}
