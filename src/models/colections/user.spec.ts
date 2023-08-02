import mongoose from 'mongoose';
import User from './user';

describe.skip('User model', () => {
	beforeAll(async () => {
		await mongoose.connect('mongodb://localhost:27017');
	});

	afterAll(async () => {
		await mongoose.connection.db.dropDatabase();
		await mongoose.connection.close();
	});
	it('should be created a new user ', async () => {
		const user = await User.create({
			name: 'name',
			email: 'example@email.com',
			password: 'password',
			image: 'image',
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		expect(user).not.toBeNull();
		expect(user._id).toBeDefined();
		expect(user.name).toEqual('name');
		expect(user.email).toEqual('example@email.com');
		expect(user.password).toEqual('password');
		expect(user.image).toEqual('image');
		expect(user.createdAt).toBeDefined();
		expect(user.updatedAt).toBeDefined();
	});
});
