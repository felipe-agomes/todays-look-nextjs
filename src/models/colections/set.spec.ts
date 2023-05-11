import mongoose from 'mongoose';
import Set from './set';

describe('Set model', () => {
	beforeAll(async () => {
		await mongoose.connect('mongodb://localhost:27017');
	});

	afterAll(async () => {
		await mongoose.connection.db.dropDatabase();
		await mongoose.connection.close();
	});
	it('should be created a new set ', async () => {
		const set = await Set.create({
			userId: 'some_user_id',
			category: 'category',
			favorite: false,
			sets: [{ id: 'some_clothe_id', name: 'clothe', x: 0, y: 0 }],
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		expect(set).not.toBeNull();
		expect(set._id).toBeDefined();
		expect(set.userId).toBeDefined();
		expect(set.category).toEqual('category');
		expect(set.favorite).toEqual(false);
		expect(set.sets && set.sets[0]).toBeDefined();
		expect(set.createdAt).toBeDefined();
		expect(set.updatedAt).toBeDefined();
	});
});
