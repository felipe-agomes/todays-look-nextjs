import { SetsProps } from '@/@types';
import Image from 'next/image';

type Pops = {
	set: SetsProps;
	proportion?: {
		x: number;
		y: number;
	};
	size?: {
		height: number;
		width: number;
	};
};

export default function SetImages({
	set,
	size = { height: 64, width: 64 },
	proportion = { x: 0.72, y: 0.72 },
}: Pops) {
	return (
		<>
			{set.sets.map((subSet) => {
				return (
					<div
						style={{
							position: 'absolute',
							top: `calc(50% - ${size.height / 2 - 2}px)`,
							left: `calc(50% - ${size.width / 2 - 2}px)`,
							width: `${size.width}px`,
							height: `${size.height}px`,
							transform: `translate(${subSet.x * proportion.x}px, ${
								subSet.y * proportion.y
							}px)`,
						}}
						key={subSet.y}
					>
						<Image
							width={size?.width}
							height={size?.height}
							src={subSet.image}
							alt='Roupa'
						/>
					</div>
				);
			})}
		</>
	);
}
