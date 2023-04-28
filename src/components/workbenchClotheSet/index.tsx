import { useEffect, useState } from 'react';
import Style from './workbenchClotheSet.module.css';
import ClotheSet from '../ClotheSet';
import { Clothes, FetcherOptions } from '@/@types';

export type ClothePosition = {
	x: number;
	y: number;
} & Clothes;

type Props = {
	workbench: Clothes[] | [];
	fetcher: (
		url: string,
		options?: FetcherOptions
	) => Promise<Clothes | Clothes[] | undefined>;
};

export default function WorkbenchSet({ workbench, fetcher }: Props) {
	const [clothesPosition, setClothesPosition] = useState<ClothePosition[] | []>(
		[]
	);

	useEffect(() => {
		const initialClothesPosition = workbench.map((clothe) => {
			return { ...clothe, x: 0, y: 0 };
		});
		setClothesPosition(initialClothesPosition);
	}, [workbench]);

	function updateClothePosition(id: string, y: number, x: number) {
		const newClothesPosition = clothesPosition.map((clothe) => {
			if (clothe.id === id) {
				clothe.y = y;
				clothe.x = x;
			}
			return clothe;
		});

		setClothesPosition(newClothesPosition);
	}

	return (
		<div
			className={Style.workbench}
			onTouchStart={(e) => console.log(e.touches[0])}
			onTouchMove={(e) => console.log(e.touches[0])}
		>
			{clothesPosition.map((clothe) => {
				return (
					<ClotheSet
						updateClothePosition={updateClothePosition}
						clothe={clothe}
						key={clothe.id}
					/>
				);
			})}
			<button
				style={{
					position: 'absolute',
					bottom: '50px',
					left: '50%',
				}}
				onClick={() =>
					fetcher(
						`/api/protected/user/${clothesPosition[0].userId}/clothe/createSet`,
						{
							method: 'POST',
							body: JSON.stringify({
								sets: clothesPosition,
							}),
						}
					)
				}
			>
				Enviar
			</button>
		</div>
	);
}
