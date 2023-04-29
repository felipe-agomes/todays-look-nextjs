import { useEffect, useState } from 'react';
import Style from './workbenchClotheSet.module.css';
import ClotheSet from '../ClotheSet';
import { Clothes, FetcherOptions, SetsProps } from '@/@types';
import { Button } from '@chakra-ui/react';

export type ClothePosition = {
	x: number;
	y: number;
} & Clothes;

type Props = {
	workbench: Clothes[] | [];
	fetcher: (
		url: string,
		options?: FetcherOptions
	) => Promise<SetsProps | SetsProps[] | Clothes | Clothes[] | undefined>;
	resetWorkbench: () => void;
};

export default function WorkbenchSet({
	workbench,
	fetcher,
	resetWorkbench,
}: Props) {
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
		<>
			<div className={Style.workbench}>
				{clothesPosition.map((clothe) => {
					return (
						<ClotheSet
							updateClothePosition={updateClothePosition}
							clothe={clothe}
							key={clothe.id}
						/>
					);
				})}
			</div>
			<Button
				colorScheme='red'
				width={100}
				style={{
					position: 'absolute',
					bottom: '110px',
					right: '10px',
				}}
				onClick={resetWorkbench}
			>
				Resetar
			</Button>
			<Button
				width={100}
				colorScheme='cyan'
				style={{
					position: 'absolute',
					bottom: '60px',
					right: '10px',
				}}
				onClick={() => {
					if (clothesPosition.length === 0) {
						return;
					}
					fetcher(
						`/api/protected/user/${clothesPosition[0].userId}/clothe/createSet`,
						{
							method: 'POST',
							body: JSON.stringify({
								sets: clothesPosition,
							}),
							update: true,
						}
					);
					resetWorkbench();
				}}
			>
				Enviar
			</Button>
		</>
	);
}
