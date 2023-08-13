import S from './Modal.module.css';

export default function ModalTitle({
	title,
	category,
}: {
	title: string;
	category: string;
}) {
	return (
		<div className={S.title}>
			<p>
				{title}: {category}
			</p>
		</div>
	);
}
