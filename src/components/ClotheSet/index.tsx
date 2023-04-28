/* eslint-disable @next/next/no-img-element */
import { MouseEventHandler, useEffect, useState } from 'react';
import Style from './ClotheSet.module.css';
import { ClothePosition } from '../workbenchClotheSet';
import Draggable, {
	ControlPosition,
	DraggableData,
	DraggableEvent,
} from 'react-draggable';
import { DraggableProps } from 'framer-motion';

type Props = {
	clothe: ClothePosition;
	updateClothePosition: (id: string, y: number, x: number) => void;
};

export default function ClotheSet({ clothe, updateClothePosition }: Props) {
	const [dragginng, setDragginng] = useState<boolean>(false);

	function handleStop(event: DraggableEvent, data: DraggableData) {
		updateClothePosition(clothe.id, data.y, data.x);
		console.log(data.x, data.y);
	}

	return (
		<Draggable onStop={handleStop}>
			<div className={Style.draggable}>
				<img
					draggable={'false'}
					style={{
						maxWidth: '100%',
						maxHeight: '100%',
					}}
					src={clothe.image}
					alt='Roupa'
				/>
			</div>
		</Draggable>
	);
}
