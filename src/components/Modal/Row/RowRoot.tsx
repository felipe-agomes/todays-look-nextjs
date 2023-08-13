import S from './Row.module.css';

export default function RowRoot({ children }: { children: React.ReactNode }) {
	return <div className={S.rowContain}>{children}</div>;
}
