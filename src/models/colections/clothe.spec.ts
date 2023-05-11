import mongoose from 'mongoose';
import Clothe from './clothe';

describe('Clothe model', () => {
	beforeAll(async () => {
		await mongoose.connect('mongodb://localhost:27017');
	});

	afterAll(async () => {
		await mongoose.connection.db.dropDatabase();
		await mongoose.connection.close();
	});
	it('should be created a new clothe ', async () => {
		const clothe = await Clothe.create({
			category: 'category',
			favorite: false,
			image: 'image',
			key: 'key',
			userId: 'some_user_id',
		});

		expect(clothe).not.toBeNull();
		expect(clothe._id).toBeDefined();
		expect(clothe.category).toEqual('category');
		expect(clothe.image).toEqual('image');
		expect(clothe.key).toEqual('key');
		expect(clothe.image).toEqual('image');
		expect(clothe.createdAt).toBeDefined();
		expect(clothe.updatedAt).toBeDefined();
	});
});
