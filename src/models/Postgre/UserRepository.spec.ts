import User from './Tables/User';
import { UserRepositoryPostgre } from './UserRepository';
import bcrypt from 'bcrypt';

const makeSut = () => {
	const userRepositoryPostgre = new UserRepositoryPostgre();
	return { userRepositoryPostgre };
};

const userNotExist = {
	email: 'user_not_exist@teste.com',
	image: '/image',
	password: 'password',
};

const userAlreadyExist = {
	email: 'user_already_exist@teste.com',
	image: '/image',
	password: 'password',
};

describe('ClotheRepository', () => {
	describe('create', () => {
		beforeEach(async () => {
			jest.resetAllMocks();
			await User.destroy({
				where: {},
				truncate: false,
			});
			await User.create(userAlreadyExist);
		});

		it('should call User.findOrCreate() with correct params', async () => {
			const { userRepositoryPostgre: sut } = makeSut();
			const spyFindOrCreate = jest.spyOn(User, 'findOrCreate');

			await sut.create(userNotExist);

			expect(spyFindOrCreate).toHaveBeenCalledTimes(1);
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
			jest.spyOn(User, 'findOrCreate').mockRejectedValueOnce(new Error('erro'));

			await expect(async () => {
				await sut.create(userNotExist);
			}).rejects.toThrowError('Erro ao buscar usuário: erro');
		});

		it('should return a created user', async () => {
			const { userRepositoryPostgre: sut } = makeSut();

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
		let user: any;

		beforeEach(async () => {
			jest.resetAllMocks();
			await User.destroy({
				where: {},
				truncate: false,
			});
			await User.create(userAlreadyExist);
			user = await User.findOne({
				where: { email: 'user_already_exist@teste.com' },
			});
		});

		it('should call the User.findByPk()', async () => {
			const { userRepositoryPostgre: sut } = makeSut();
			const spyFindByPk = jest.spyOn(User, 'findByPk');

			await sut.deleteById({ userId: user.id });

			expect(spyFindByPk).toHaveBeenCalledTimes(1);
			expect(spyFindByPk).toHaveBeenCalledWith(user.id);
		});

		it('should throw an error message if any error occurs', async () => {
			const { userRepositoryPostgre: sut } = makeSut();
			jest.spyOn(User, 'findByPk').mockRejectedValueOnce(new Error('erro'));

			await expect(async () => {
				await sut.deleteById(user.id);
			}).rejects.toThrowError('Erro ao deletar usuário: erro');
		});

		it('should delete a user', async () => {
			const { userRepositoryPostgre: sut } = makeSut();

			await sut.deleteById({ userId: user.id });

			expect(await User.findByPk(user.id)).toBeFalsy();
		});

		it('should delete a user', async () => {
			const { userRepositoryPostgre: sut } = makeSut();

			const result = await sut.deleteById({ userId: user.id });

			expect(result).toBe('Usuário deletado com sucesso');
		});
	});

	describe('getAll', () => {
		beforeEach(async () => {
			jest.resetAllMocks();
			await User.destroy({
				where: {},
				truncate: false,
			});
			await User.create(userAlreadyExist);
		});

		it('should call User.findAll() ', async () => {
			const { userRepositoryPostgre: sut } = makeSut();
			const spyFindAll = jest.spyOn(User, 'findAll');

			await sut.getAll();

			expect(spyFindAll).toHaveBeenCalledTimes(1);
		});

		it('should throw an error message if any error occurs', async () => {
			const { userRepositoryPostgre: sut } = makeSut();
			jest.spyOn(User, 'findAll').mockRejectedValueOnce(new Error('erro'));

			await expect(async () => {
				await sut.getAll();
			}).rejects.toThrowError('Erro ao buscar usuários: erro');
		});

		it('should return all users', async () => {
			const { userRepositoryPostgre: sut } = makeSut();
			const expected = await User.findAll();
			const expectedJSON = JSON.stringify(expected);

			const result = await sut.getAll();

			expect(result).toEqual(expectedJSON);
		});
	});

	describe('login', () => {
		let user: any;
		beforeEach(async () => {
			jest.resetAllMocks();
			await User.destroy({
				where: {},
				truncate: false,
			});
			user = await User.create(userAlreadyExist);
		});

		it('should call the User.findOne()', async () => {
			const { userRepositoryPostgre: sut } = makeSut();
			const spyFindOne = jest.spyOn(User, 'findOne');

			await sut.login({
				email: userAlreadyExist.email,
				password: userAlreadyExist.password,
			});

			expect(spyFindOne).toHaveBeenCalledTimes(1);
			expect(spyFindOne).toHaveBeenCalledWith({
				where: {
					email: user.email,
				},
			});
		});

		it('should throw an error message if any error occurs', async () => {
			const { userRepositoryPostgre: sut } = makeSut();
			jest.spyOn(User, 'findOne').mockRejectedValueOnce(new Error('erro'));

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
			const spyCompare = jest.spyOn(bcrypt, 'compare');

			await sut.login({
				email: 'user_already_exist@teste.com',
				password: 'password',
			});

			expect(spyCompare).toHaveBeenCalledTimes(1);
		});

		it('should return a user if all is right', async () => {
			const { userRepositoryPostgre: sut } = makeSut();

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
