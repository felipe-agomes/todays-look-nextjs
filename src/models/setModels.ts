import { ClothePosition, ClotheSchemaProps } from '@/@types';
import Set from './colections/set';
import connectDb from '@/services/connectDb';

async function createSet(
	userId: string,
	data: { sets: ClothePosition[]; category: string },
) {
	await connectDb();
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

async function toggleFAvorite(setId: string) {
	const set = await Set.findById(setId);

	if (!set) {
		return {
			error: true,
			message: 'Conjunto não encontrado',
		};
	}

	const newSet = { favorite: !set.favorite };

	await set.updateOne(newSet);
	return {
		error: false,
		message: 'Favorito alterado com sucesso',
		set: newSet,
	};
}

async function updateCategorySet(setId: string, toUpdate: string) {
	const set = await Set.findById(setId);
	if (!set) {
		return {
			error: true,
			message: 'Set não encontrado',
		};
	}

	const newSet = { category: toUpdate };
	await set.updateOne(newSet);
	return {
		error: false,
		message: 'Categoria alterada com sucesso',
		set: newSet,
	};
}

export const setModels = {
	createSet,
	getAllSet,
	deleteSet,
	toggleFAvorite,
	updateCategorySet,
};
