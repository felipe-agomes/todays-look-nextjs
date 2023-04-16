/* eslint-disable @next/next/no-img-element */
import Style from './GridClothes.module.css';
import { Clothes } from '@/@types';

type Props = {
	clothes?: Clothes[];
	openModal: (id: string) => void;
	children: JSX.Element;
};

export default function GridClothes({ children, clothes, openModal }: Props) {
	return (
		<ul className={Style.boxList}>
			{children}
			{clothes &&
				clothes.map((clothe) => {
					return (
						<li
							className={Style.list}
							key={clothe.id}
						>
							<img
								src={clothe.image}
								alt='Roupa'
								onClick={() => openModal(clothe.id)}
							/>
						</li>
					);
				})}
		</ul>
	);
}
