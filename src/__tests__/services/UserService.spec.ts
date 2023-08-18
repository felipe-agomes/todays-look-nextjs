import { FrontController } from '@/controllers/FrontController';
import { FetcherAxios } from '@/services/Fetcher';
import { UserService } from '@/services/UserService';

const makeSut = () => {
	const fetcherAxios = new FetcherAxios();
	const frontController = new FrontController(fetcherAxios);
	const userService = new UserService(frontController);
	return { userService, fetcherAxios, frontController };
};

const userResponse = {
	status: 'success',
	message: 'Sucesso ao cadastrar novo usuário',
	data: {
		id: 11681,
		email: 'test_user@test.com',
		name: 'test_name',
		image: 'image',
		updatedAt: new Date('2023-08-11T11:59:51.268Z'),
		createdAt: new Date('2023-08-11T11:59:51.268Z'),
		token: 'token',
	},
};

describe('UserService', () => {
	describe('create', () => {
		beforeEach(() => {
			jest.resetAllMocks();
		});
		it('should return a success message with a user created', async () => {
			const { userService: sut, frontController } = makeSut();
			frontController.doPost = jest.fn().mockResolvedValueOnce(userResponse);

			const result = await sut.create({
				name: 'name',
				email: 'test_user@test.com',
				password: 'password',
			});

			expect(result).toEqual(userResponse);
		});

		it('should call the frontController.doPost()', async () => {
			const { userService: sut, frontController } = makeSut();
			frontController.doPost = jest.fn();

			await sut.create({
				name: 'name',
				email: 'test_user@test.com',
				password: 'password',
			});

			expect(frontController.doPost).toHaveBeenCalledTimes(1);
			expect(frontController.doPost).toHaveBeenCalledWith({
				url: `/api/protected/user`,
				body: {
					user: {
						name: 'name',
						email: 'test_user@test.com',
						password: 'password',
					},
					operation: 'register',
				},
			});
		});

		it('should throw a error', async () => {
			const { userService: sut, frontController } = makeSut();
			frontController.doPost = jest.fn().mockRejectedValueOnce(new Error('Error'));
			let result: any;

			try {
				result = await sut.create({
					name: 'name',
					email: 'test_user@test.com',
					password: 'password',
				});
			} catch {}

			expect(result).toEqual({
				status: 'error',
				message: 'Erro ao cadastrar usuário',
			});
		});
	});

	describe('login', () => {
		it('should call the frontController.doPost()', async () => {
			const { userService: sut, frontController } = makeSut();
			frontController.doPost = jest.fn();

			await sut.login({ email: 'test_user@test.com', password: 'password' });

			expect(frontController.doPost).toHaveBeenCalledTimes(1);
			expect(frontController.doPost).toHaveBeenCalledWith({
				url: `/api/protected/user`,
				body: {
					user: {
						email: 'test_user@test.com',
						password: 'password',
					},
					operation: 'login',
				},
			});
		});

		it('should return a response of frontController.doPost()', async () => {
			const { userService: sut, frontController } = makeSut();
			frontController.doPost = jest.fn().mockResolvedValueOnce(userResponse);

			const result = await sut.login({
				email: 'test_user@test.com',
				password: 'password',
			});

			expect(result).toEqual(userResponse);
		});

		it('should throw a error', async () => {
			const { userService: sut, frontController } = makeSut();
			frontController.doPost = jest.fn().mockRejectedValueOnce(new Error());
			let result: any;

			try {
				result = await sut.login({
					email: 'test_user@test.com',
					password: 'password',
				});
			} catch {}

			expect(result).toEqual({
				status: 'error',
				message: 'Erro ao logar usuário',
			});
		});
	});
});
