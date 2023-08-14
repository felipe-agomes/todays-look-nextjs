import S from './Set.module.css';

export default function ContentRoot({
	children,
}: {
	children: React.ReactNode;
}) {
	return <div className={S.content}>{children}</div>;
}
