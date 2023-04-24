import { MouseEventHandler, useEffect, useState } from 'react';
import Style from './ClotheSet.module.css';
import { ClothePosition } from '../workbenchClotheSet';

type Props = {
	clothe: ClothePosition;
	updateClothePosition: (id: string, top: number, left: number) => void;
};

export default function ClotheSet({ clothe, updateClothePosition }: Props) {
	const [dragginng, setDragginng] = useState<boolean>(false);

	function handleMouseDown() {
		setDragginng(true);
	}

	function handleMouseUp() {
		setDragginng(false);
	}

	function handleMouseMove(e: React.MouseEvent<HTMLImageElement>) {
		if (dragginng) {
			const x = clothe.left + e.movementX;
			const y = clothe.top + e.movementY;

			updateClothePosition(clothe.id, y, x);
		}
	}

	let lastTouchX: number;
	let lastTouchY: number;

	function handleOnTouchStart(event: React.TouchEvent<HTMLImageElement>) {
		const touch = event.touches[0];
		lastTouchX = touch.clientX;
		lastTouchY = touch.clientY;
	}

	function handleOnTouchMove(event: React.TouchEvent<HTMLImageElement>) {
		const touch = event.touches[0];
		const element = event.currentTarget;

		const width = element.clientWidth;
		const height = element.clientHeight;

		const x = touch.clientX - clothe.left + clothe.left - width / 2;
		const y = touch.clientY - clothe.top + clothe.top - height;

		updateClothePosition(clothe.id, y, x);
	}

	return (
		<div
			style={{
				position: 'absolute',
				top: clothe.top,
				left: clothe.left,
				width: '128px',
				height: '128px',
			}}
		>
			<img
				onTouchStart={handleOnTouchStart}
				onTouchEnd={handleMouseUp}
				onTouchMove={handleOnTouchMove}
				onMouseDown={handleMouseDown}
				onMouseUp={handleMouseUp}
				onMouseMove={handleMouseMove}
				onMouseLeave={handleMouseUp}
				draggable={'false'}
				style={{
					maxWidth: '100%',
					maxHeight: '100%',
				}}
				src={clothe.image}
			/>
		</div>
	);
}
