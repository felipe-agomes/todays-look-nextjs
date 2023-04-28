import { Clothes } from '@/@types';
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

export const setModels = { createSet };
