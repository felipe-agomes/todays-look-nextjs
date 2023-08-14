import S from './WorkbenchSet.module.css';
import useAppContext from '@/hooks/useAppContext';
import useModaisController from '@/hooks/useModaisController';
import useSetSets from '@/hooks/useSetSets';
import useWorkBench from '@/hooks/useWorkBench';
import ClotheSet from '../ClotheSet';
import { setService } from '@/services/SetService';
import { Button } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
import { ClothePosition } from '@/@types/models';

export default function WorkbenchSet() {
	const { resetWorkbench } = useWorkBench();
	const { workbench } = useAppContext();
	const { updateSet } = useSetSets();
	const { closeAllModais } = useModaisController();
	const [clothesPosition, setClothesPosition] = useState<ClothePosition[] | []>(
		[],
	);
	const formik = useFormik({
		initialValues: {
			category: '',
		},
		onSubmit: handleSubmit,
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

	async function handleSubmit(values: { category: string }) {
		if (clothesPosition.length === 0) {
			return;
		}
		await setService.create({
			category: values.category,
			clothes: clothesPosition,
			userId: clothesPosition[0].userId,
		});
		resetWorkbench();
		updateSet(clothesPosition[0].userId);
		closeAllModais();
		formik.resetForm({ values: { category: '' } });
	}
	return (
		<div className={S.container}>
			<div className={S.workbench}>
				{clothesPosition.map((clothe: ClothePosition) => {
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
				className={S.form}
				onSubmit={formik.handleSubmit}
			>
				<input
					className={S.input}
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
