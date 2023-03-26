import React from 'react';
import { type Clothe } from '../../types';
import SuspenseIcon from '../SuspenseIcon/SuspenseIcon';
import { trash } from '../svg';
import './ClothesSet.css';

type Prop = {
	selectedClothes: Clothe[];
	removeCloth: (id: string) => void;
};

function ClothesSet({ selectedClothes, removeCloth }: Prop): JSX.Element {
	const body = selectedClothes.filter((clothe) =>
		clothe.body === 'body' || clothe.body === 'bodyLegs' ? clothe : undefined
	)[0];
	const legs = selectedClothes.filter((clothe) =>
		clothe.body === 'legs' ? clothe : undefined
	)[0];
	const shoes = selectedClothes.filter((clothe) =>
		clothe.body === 'shoes' ? clothe : undefined
	)[0];

	return (
		<div id='clothesSet'>
			<div
				className={`
				image 
				body
				${body?.body === 'bodyLegs' ? 'bodyLegs' : ''}`}
			>
				<img
					src={body?.image}
					alt={body?.category}
				/>
				{body ? (
					<SuspenseIcon
						clothe={body}
						icon={trash}
						handleClick={removeCloth}
					/>
				) : undefined}
			</div>
			<div
				className='image legs'
				style={
					body?.body === 'bodyLegs' ? { display: 'none' } : { display: 'block' }
				}
			>
				<img
					src={legs?.image}
					alt={legs?.category}
				/>
				{legs ? (
					<SuspenseIcon
						clothe={legs}
						icon={trash}
						handleClick={removeCloth}
					/>
				) : undefined}
			</div>
			<div className='image shoes'>
				{shoes ? (
					<SuspenseIcon
						clothe={shoes}
						icon={trash}
						handleClick={removeCloth}
					/>
				) : undefined}
				<img
					src={shoes?.image}
					alt={shoes?.category}
				/>
			</div>
		</div>
	);
}

export default ClothesSet;
