import { ClothesProps } from '@/@types';
import { setModels } from './setModels';

const set = {
	id: 'someSetId',
	userId: 'someUserId',
	favorite: false,
	category: 'category',
	sets: [
		{
			id: 'someClotheId',
			category: 'category',
			favorite: false,
			image: 'image',
			key: 'key',
			userId: 'someUserId',
		},
		{
			id: 'someClotheId',
			category: 'category',
			favorite: false,
			image: 'image',
			key: 'key',
			userId: 'someUserId',
		},
	] as ClothesProps[],
};
const userId = 'someId';

describe('createSet', () => {
	it('should ', async () => {
		const result = await setModels.createSet(userId, set);

		expect(result).toEqual({
			error: false,
			message: 'Conjunto criado com sucesso',
			set: { userId, set },
		});
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

// describe('getAllSet', () => {

// });
// describe('deleteSet', () => {

// });
// describe('toggleFAvorite', () => {

// });
// describe('updateCategorySet', () => {

// });
