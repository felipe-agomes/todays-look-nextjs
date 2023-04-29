import { ClotheSchemaProps, Clothes } from '@/@types';
import Set from './colections/set';

async function createSet(userId: string, sets: Clothes[]) {
	try {
		await Set.create({ userId, sets });
		return {
			error: false,
			message: 'Conjunto criado com sucesso',
			set: { userId, sets },
		};
	} catch (error) {
		throw new Error(`Error: ${error}`);
	}
}

async function getAllSet(userId: string) {
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

export const setModels = { createSet, getAllSet };
