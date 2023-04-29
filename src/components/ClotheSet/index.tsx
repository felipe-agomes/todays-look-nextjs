import Style from './ClotheSet.module.css';
import { ClothePosition } from '../workbenchClotheSet';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import Image from 'next/image';

type Props = {
	clothe: ClothePosition;
	updateClothePosition: (id: string, y: number, x: number) => void;
};

export default function ClotheSet({ clothe, updateClothePosition }: Props) {
	function handleStop(event: DraggableEvent, data: DraggableData) {
		updateClothePosition(clothe.id, data.y, data.x);
	}

	return (
		<Draggable onStop={handleStop}>
			<div className={Style.draggable}>
				<Image
					draggable={'false'}
					width={128}
					height={128}
					src={clothe.image}
					alt='Roupa'
				/>
			</div>
		</Draggable>
	);
}
