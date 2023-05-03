import { useState } from 'react';
import { OpenOrCloseModalProps } from '@/@types';
import Style from './Header.module.css';

type Props = {
	uniqueCategories?: string[];
	categoryes?: boolean;
	title: string;
	setCurrentPage?: (category: string) => void;
	openOrCloseModal?: (
		{ whichModal, operation }: OpenOrCloseModalProps,
		clotheId?: string | null,
		setId?: string | null
	) => void;
};

export default function Header({
	uniqueCategories,
	title,
	categoryes = false,
	setCurrentPage,
	openOrCloseModal,
}: Props) {
	const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

	function handleClickCategory(category: string) {
		if (setCurrentPage) setCurrentPage(category);
	}

	return (
		<>
			<header className={Style.headerPage}>
				<div className={Style.topHeader}>
					<h1>{title}</h1>
				</div>
				{categoryes && (
					<nav className={Style.navegation}>
						<ul className={Style.categories}>
							{uniqueCategories &&
								uniqueCategories.map((category) => {
									return (
										<li
											key={category}
											style={{ cursor: 'pointer' }}
											className={selectedCategory === category ? Style.categoryActive : ''}
											onClick={() => {
												setSelectedCategory(category);
												handleClickCategory(category);
												if (openOrCloseModal)
													openOrCloseModal({
														whichModal: 'clotheModal',
														operation: 'close',
													});
											}}
										>
											{category}
										</li>
									);
								})}
						</ul>
					</nav>
				)}
			</header>
		</>
	);
}
