import { ClothePosition } from '@/@types';
import { setModels } from './setModels';
import Set from './colections/set';

const ExistingUserId = 'some_user_id';
const resultSet = {
	category: 'category',
	sets: [
		{
			favorite: false,
			image: 'image',
			key: 'key',
			userId: ExistingUserId,
			x: 0,
			y: 0,
			category: 'category',
			id: 'some_clothe_id',
		} as ClothePosition,
	],
};
describe('setModels.createSet', () => {
	it('should return a sucess message with new user if all data is passed correctly ', async () => {
		Set.create = jest.fn().mockResolvedValue(undefined);

		const result = await setModels.createSet(ExistingUserId, resultSet);

		expect(result).toHaveProperty('error', false);
		expect(result).toHaveProperty('message', 'Conjunto criado com sucesso');
		expect(result.set).toHaveProperty('userId', 'some_user_id');
		expect(result.set.data.sets[0]).toHaveProperty('id', 'some_clothe_id');
	});

	it('should return an error message if the set creation failed', async () => {
		Set.create = jest
			.fn()
			.mockRejectedValue(new Error('Erro ao cadastrar usuário'));

		await expect(
			setModels.createSet(ExistingUserId, resultSet),
		).rejects.toThrowError();
	});
});

// async function createSet(
// 	userId: string,
// 	data: { sets: ClothesProps[]; category: string }
// ) {
// 	await connectDb();
// 	try {
// 		await Set.create({ userId, sets: data.sets, category: data.category });
// 		return {
// 			error: false,
// 			message: 'Conjunto criado com sucesso',
// 			set: { userId, data },
// 		};
// 	} catch (error) {
// 		throw new Error(`Error: ${error}`);
// 	}
// }

// describe('setModels.getAllSet', () => {});
// describe('setModels.deleteSet', () => {});
// describe('setModels.toggleFavorite', () => {});
// describe('setModels.updateCategorySet', () => {});
