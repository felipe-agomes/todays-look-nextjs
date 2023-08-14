import { Op } from 'sequelize';
import { User } from '../../models/Postgre/Tables';
import { UserRepositoryPostgre } from '../../models/Postgre/UserRepository';
import bcrypt from 'bcrypt';

/* instanceof User {
	id: 11681,
	email: 'test_user@test.com',
	password: 'password',
	image: 'image',
	updatedAt: 2023-08-11T11:59:51.268Z,
	createdAt: 2023-08-11T11:59:51.268Z
} */

const makeSut = () => {
	const userRepositoryPostgre = new UserRepositoryPostgre();
	return { userRepositoryPostgre };
};

export const userNotExist = {
	email: 'user_not_exist@teste.com',
	image: '/image',
	password: 'password',
};

const userAlreadyExist = {
	email: 'user_already_exist@teste.com',
	image: '/image',
	password: 'password',
};

const mockUserObj = {
	id: '1',
	email: 'user_already_exist@teste.com',
	password: 'password',
	image: 'image',
	updatedAt: '2023-08-11T11:59:51.268Z',
	createdAt: '2023-08-11T11:59:51.268Z',
};

describe('ClotheRepository', () => {
	let mockUser: any;
	beforeEach(() => {
		jest.resetAllMocks();
		mockUser = {
			...mockUserObj,
			toJSON: jest.fn(function () {
				if (this.password) {
					return {
						id: this.id,
						email: this.email,
						password: this.password,
						image: this.image,
						updatedAt: this.updatedAt,
						createdAt: this.createdAt,
					};
				}
				return {
					id: this.id,
					email: this.email,
					image: this.image,
					updatedAt: this.updatedAt,
					createdAt: this.createdAt,
				};
			}),
			destroy: jest.fn(),
		};
		User.findOrCreate = jest.fn().mockResolvedValue([{ ...mockUser }, false]);
		User.findByPk = jest.fn().mockResolvedValue({ ...mockUser });
		User.findOne = jest.fn().mockResolvedValue({ ...mockUser });
		User.findAll = jest
			.fn()
			.mockResolvedValue([{ ...mockUser }, { ...mockUser, id: 2 }]);
	});

	describe('create', () => {
		it('should call User.findOrCreate() with correct params', async () => {
			const { userRepositoryPostgre: sut } = makeSut();

			await sut.create(userNotExist);

			expect(User.findOrCreate).toHaveBeenCalledTimes(1);
		});

		it('should create a new user and find him', async () => {
			const { userRepositoryPostgre: sut } = makeSut();

			await sut.create(userNotExist);

			expect(
				await User.findOne({
					where: {
						email: userNotExist.email,
					},
				}),
			).toBeTruthy();
		});

		it('should throw a error message if user already exist', async () => {
			const { userRepositoryPostgre: sut } = makeSut();

			const result = await sut.create(userAlreadyExist);

			expect(result).toBeNull();
		});

		it('should throw an error message if any error occurs', async () => {
			const { userRepositoryPostgre: sut } = makeSut();
			User.findOrCreate = jest.fn().mockRejectedValueOnce(new Error('erro'));

			await expect(async () => {
				await sut.create(userNotExist);
			}).rejects.toThrowError('Erro ao buscar usuário: erro');
		});

		it('should return a created user', async () => {
			const { userRepositoryPostgre: sut } = makeSut();
			User.findOrCreate = jest.fn().mockResolvedValueOnce([{ ...mockUser }, true]);

			const result = await sut.create(userNotExist);

			expect(result).toHaveProperty('id');
			expect(result).toHaveProperty('email');
			expect(result).not.toHaveProperty('password');
			expect(result).toHaveProperty('id');
		});

		it('should call the User.findOrCreate() with a encrypted password', async () => {
			const { userRepositoryPostgre: sut } = makeSut();
			bcrypt.hash = jest.fn().mockResolvedValueOnce('encrypted_password');

			await sut.create(userNotExist);

			expect(bcrypt.hash).not.toHaveBeenCalledWith(userNotExist.password, 10);
		});
	});

	describe('deleteById', () => {
		it('should call the User.findByPk()', async () => {
			const { userRepositoryPostgre: sut } = makeSut();

			await sut.deleteById({ userId: mockUser.id });

			expect(User.findByPk).toHaveBeenCalledTimes(1);
			expect(User.findByPk).toHaveBeenCalledWith(mockUser.id);
		});

		it('should throw an error message if any error occurs', async () => {
			const { userRepositoryPostgre: sut } = makeSut();
			User.findByPk = jest.fn().mockRejectedValueOnce(new Error('erro'));

			await expect(async () => {
				await sut.deleteById(mockUser.id);
			}).rejects.toThrowError('Erro ao deletar usuário: erro');
		});

		it('should delete a user', async () => {
			const { userRepositoryPostgre: sut } = makeSut();

			await sut.deleteById({ userId: mockUser.id });

			expect(mockUser.destroy).toHaveBeenCalledTimes(1);
		});

		it('should delete a user', async () => {
			const { userRepositoryPostgre: sut } = makeSut();

			const result = await sut.deleteById({ userId: mockUser.id });

			expect(result).toBe('Usuário deletado com sucesso');
		});
	});

	describe('getAll', () => {
		it('should call User.findAll() ', async () => {
			const { userRepositoryPostgre: sut } = makeSut();

			await sut.getAll();

			expect(User.findAll).toHaveBeenCalledTimes(1);
		});

		it('should throw an error message if any error occurs', async () => {
			const { userRepositoryPostgre: sut } = makeSut();
			User.findAll = jest.fn().mockRejectedValueOnce(new Error('erro'));

			await expect(async () => {
				await sut.getAll();
			}).rejects.toThrowError('Erro ao buscar usuários: erro');
		});

		it('should return all users', async () => {
			const { userRepositoryPostgre: sut } = makeSut();

			const result = await sut.getAll();

			expect(result[0]).toHaveProperty('id');
			expect(result[0]).toHaveProperty('email');
			expect(result[0]).toHaveProperty('image');
			expect(result[0]).not.toHaveProperty('password');
		});
	});

	describe('login', () => {
		it('should call the User.findOne()', async () => {
			const { userRepositoryPostgre: sut } = makeSut();
			bcrypt.compare = jest.fn().mockResolvedValueOnce(true);

			await sut.login({
				email: userAlreadyExist.email,
				password: userAlreadyExist.password,
			});

			expect(User.findOne).toHaveBeenCalledTimes(1);
			expect(User.findOne).toHaveBeenCalledWith({
				where: {
					email: mockUser.email,
				},
			});
		});

		it('should throw an error message if any error occurs', async () => {
			const { userRepositoryPostgre: sut } = makeSut();
			User.findOne = jest.fn().mockRejectedValueOnce(new Error('erro'));

			await expect(async () => {
				await sut.login({
					email: userAlreadyExist.email,
					password: userAlreadyExist.password,
				});
			}).rejects.toThrowError('Erro ao fazer login: erro');
		});

		it('should return null, if user not exist', async () => {
			const { userRepositoryPostgre: sut } = makeSut();

			const result = await sut.login({
				email: userNotExist.email,
				password: 'user_not_exist',
			});

			expect(result).toBeNull();
		});

		it('should call the bycrypt.compare()', async () => {
			const { userRepositoryPostgre: sut } = makeSut();
			const spyBcryptCompare = jest.spyOn(bcrypt, 'compare');

			await sut.login({
				email: 'user_already_exist@teste.com',
				password: 'password',
			});

			expect(spyBcryptCompare).toHaveBeenCalledTimes(1);
		});

		it('should return a user if all is right', async () => {
			const { userRepositoryPostgre: sut } = makeSut();
			bcrypt.compare = jest.fn().mockResolvedValueOnce(true);

			const result = await sut.login({
				email: userAlreadyExist.email,
				password: 'password',
			});

			expect(result).toHaveProperty('id');
			expect(result).toHaveProperty('email');
			expect(result).not.toHaveProperty('password');
		});

		it('should return null, if password is wrong', async () => {
			const { userRepositoryPostgre: sut } = makeSut();

			const result = await sut.login({
				email: userAlreadyExist.email,
				password: 'wrong_password',
			});

			expect(result).toBeNull();
		});
	});
});
