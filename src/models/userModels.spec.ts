type UserProps = { id: string; name: string; email: string };

const userAlreadyExists = {
	id: 'some_user_id',
	name: 'some_user_name',
	email: 'user_already_exists',
};

interface IUserRepository {
	createUser(data: UserProps): {
		error: boolean;
		message: string;
		user: { id: string; name: string };
	};
}

class UserRepositoryMongo implements IUserRepository {
	createUser(data: UserProps): {
		error: boolean;
		message: string;
		user: { id: string; name: string };
	} {
		return {
			error: false,
			message: 'Usuario cadastrado com sucesso',
			user: { ...data },
		};
	}
}

describe('userModels', () => {
	it('should return a sucsses mesage and the user created if all data if correct', async () => {
		const userRepositoryMongo = new UserRepositoryMongo();

		const result = await userRepositoryMongo.createUser({
			id: 'some_user_id',
			name: 'some_user_name',
			email: 'some_user_email',
		});

		expect(result).toEqual({
			error: false,
			message: 'Usuario cadastrado com sucesso',
			user: {
				id: 'some_user_id',
				name: 'some_user_name',
				email: 'some_user_email',
			} as UserProps,
		});
	});

	it('should return a error message if email already exists', () => {});
});
