import { useEffect, useState } from 'react';
import Style from './workbenchClotheSet.module.css';
import ClotheSet from '../ClotheSet';
import { Clothes } from '@/@types';

export type ClothePosition = {
	left: number;
	top: number;
} & Clothes;

type Props = {
	workbench: Clothes[] | [];
};

export default function WorkbenchSet({ workbench }: Props) {
	const [clothesPosition, setClothesPosition] = useState<ClothePosition[] | []>(
		[]
	);

	useEffect(() => {
		const initialClothesPosition = workbench.map((clothe) => {
			return { ...clothe, left: 0, top: 0 };
		});
		setClothesPosition(initialClothesPosition);
	}, [workbench]);

	function updateClothePosition(id: string, top: number, left: number) {
		const newClothesPosition = clothesPosition.map((clothe) => {
			if (clothe.id === id) {
				clothe.top = top;
				clothe.left = left;
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
						key={clothe.id}
						clothe={clothe}
					/>
				);
			})}
		</div>
	);
}
