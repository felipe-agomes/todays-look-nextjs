/* eslint-disable @next/next/no-img-element */
import Style from './ClotheSet.module.css';
import { ClothePosition } from '../workbenchClotheSet';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';

type Props = {
	clothe: ClothePosition;
	updateClothePosition: (id: string, y: number, x: number) => void;
};

export default function ClotheSet({ clothe, updateClothePosition }: Props) {
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
