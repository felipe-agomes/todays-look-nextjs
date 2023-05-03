import { ClotheSchemaProps, ClothesProps } from '@/@types';
import Set from './colections/set';
import connectDb from '@/services/connectDb';

async function createSet(
	userId: string,
	data: { sets: ClothesProps[]; category: string }
) {
	await connectDb();
	console.log(data);
	try {
		await Set.create({ userId, sets: data.sets, category: data.category });
		return {
			error: false,
			message: 'Conjunto criado com sucesso',
			set: { userId, data },
		};
	} catch (error) {
		throw new Error(`Error: ${error}`);
	}
}

async function getAllSet(userId: string) {
	await connectDb();
	const set = await Set.find({
		userId,
	});

	if (!set) {
		return {
			error: true,
			message: 'Nenhum conjunto encontrado',
		};
	}

	const setObj = set.map((doc) => {
		const obj = doc.toObject() as {
			createdAt: NativeDate;
			updatedAt: NativeDate;
		} & {
			userId?: string | undefined;
			sets?: ClotheSchemaProps[] | undefined;
		} & { id?: string; _id?: string };

		obj.id = obj._id;
		delete obj._id;
		return obj;
	});

	return {
		error: false,
		message: 'Conjuntos buscados com sucesso',
		set: setObj,
	};
}

async function deleteSet(setId: string) {
	await connectDb();
	const set = await Set.findById(setId);
	if (!set) {
		return {
			error: true,
			message: 'Set não encontrado',
		};
	}

	await Set.findByIdAndDelete(setId);
	return {
		error: false,
		message: 'Set deletado com sucesso',
		set,
	};
}

export const setModels = { createSet, getAllSet, deleteSet };
