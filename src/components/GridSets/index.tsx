import { SetsProps } from '@/@types';
import Style from './GridSets.module.css';
import Image from 'next/image';

type Props = {
	sets: SetsProps[];
};

export default function GridSets({ sets }: Props) {
	return (
		<ul className={Style.boxList}>
			{sets.map((set) => {
				return (
					<li
						style={{
							position: 'relative',
							width: '260px',
							height: '332px',
						}}
						key={set.sets[0].x}
					>
						{set.sets.map((subSet) => {
							return (
								<div
									style={{
										position: 'absolute',
										top: 'calc(50% - 30px)',
										left: 'calc(50% - 30px)',
										width: '64px',
										height: '64px',
										transform: `translate(${subSet.x * 0.72}px, ${subSet.y * 0.72}px)`,
									}}
									key={subSet.y}
								>
									<Image
										width={64}
										height={64}
										src={subSet.image}
										alt='Roupa'
									/>
								</div>
							);
						})}
					</li>
				);
			})}
		</ul>
	);
}
