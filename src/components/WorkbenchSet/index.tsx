import { useEffect, useState } from 'react';
import ClotheSet from '../ClotheSet';
import {
	ClothePosition,
	ClothesProps,
	FetcherOptions,
	SetsProps,
} from '@/@types';
import { Button } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { validateNewCategory } from '@/utils/validate';
import Style from './WorkbenchSet.module.css';
import useAppContext from '@/hooks/useAppContext';

type Props = {
	fetcher: (
		url: string,
		options?: FetcherOptions,
	) => Promise<
		SetsProps | SetsProps[] | ClothesProps | ClothesProps[] | undefined
	>;
	resetWorkbench: () => void;
};

export default function WorkbenchSet({ fetcher, resetWorkbench }: Props) {
	const { workbench } = useAppContext();
	const [clothesPosition, setClothesPosition] = useState<ClothePosition[] | []>(
		[],
	);
	const formik = useFormik({
		initialValues: {
			category: '',
		},
		onSubmit: handleSubmit,
		validate: validateNewCategory,
	});

	useEffect(() => {
		setClothesPosition(workbench);
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

	function handleSubmit(values: { category: string }) {
		if (clothesPosition.length === 0) {
			return;
		}
		const data = {
			category: values.category,
			sets: clothesPosition,
		};
		fetcher(`/api/protected/user/${clothesPosition[0].userId}/clothe/createSet`, {
			method: 'POST',
			body: JSON.stringify(data),
			update: true,
		});
		resetWorkbench();
		formik.resetForm({ values: { category: '' } });
	}
	return (
		<div className={Style.container}>
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
			<form
				className={Style.form}
				onSubmit={formik.handleSubmit}
			>
				<input
					className={Style.input}
					placeholder='Categoria'
					type='text'
					name='category'
					value={formik.values.category}
					onChange={formik.handleChange}
				/>
				<Button
					type='submit'
					width={'70px'}
					colorScheme='cyan'
				>
					Enviar
				</Button>
				<Button
					colorScheme='red'
					width={'70px'}
					onClick={() => {
						resetWorkbench();
						formik.resetForm({ values: { category: '' } });
					}}
				>
					Resetar
				</Button>
			</form>
			{formik.errors.category && formik.touched.category ? (
				<span style={{ color: 'red' }}>{formik.errors.category}</span>
			) : (
				<></>
			)}
		</div>
	);
}
