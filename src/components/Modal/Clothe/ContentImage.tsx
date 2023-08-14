/* eslint-disable @next/next/no-img-element */
import S from './Clothe.module.css';

export default function ContentImage({
	image,
	category,
}: {
	image: string;
	category: string;
}) {
	return (
		<div className={S.imageContain}>
			<img
				src={image}
				alt={`Roupa: ${category}`}
			/>
		</div>
	);
}
