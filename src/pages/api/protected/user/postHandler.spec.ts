import userRepository from '@/models/Postgre/UserRepository';
import handler from '.';
import jwt from 'jsonwebtoken';

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

describe('postHandler', () => {
	describe('operation: "register"', () => {
		let req: any;
		let res: any;
		beforeEach(() => {
			jest.resetAllMocks();
			req = {
				method: 'POST',
				body: {
					operation: 'register',
					user: {
						name: 'user_test',
						email: 'user_test@teste.com',
						password: 'password',
					},
				},
			};
			res = {
				json: jest.fn(function () {
					return this;
				}),
				status: jest.fn(function () {
					return this;
				}),
			};
			userRepository.create = jest.fn().mockResolvedValue([
				{
					id: 11681,
					email: 'test_user@test.com',
					name: 'test_name',
					image: 'image',
					updatedAt: new Date('2023-08-11T11:59:51.268Z'),
					createdAt: new Date('2023-08-11T11:59:51.268Z'),
				},
				true,
			]);
			jwt.sign = jest.fn().mockReturnValue('token');
		});
		it('should call res.status() and res.json() with a success params', async () => {
			await handler(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledWith(userResponse);
		});

		it('should call the userRepository.create()', async () => {
			await handler(req, res);

			expect(userRepository.create).toHaveBeenCalledTimes(1);
			expect(userRepository.create).toHaveBeenCalledWith({
				email: 'user_test@teste.com',
				name: 'user_test',
				password: 'password',
			});
		});

		it('should send a error response if a user is not found', async () => {
			userRepository.create = jest.fn().mockResolvedValueOnce(null);
			await handler(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
			expect(res.json).toHaveBeenCalledWith({
				status: 'error',
				message: 'Erro ao cadastrar novo usuário',
			});
		});

		it('should send a error response if throw a error', async () => {
			userRepository.create = jest.fn().mockRejectedValueOnce(new Error('Error'));

			try {
				await handler(req, res);
			} catch {}

			expect(res.status).toHaveBeenCalledWith(400);
			expect(res.json).toHaveBeenCalledWith({
				status: 'error',
				message: 'Erro ao cadastrar novo usuário',
			});
		});

		it('should send a error message if a user already exist', async () => {
			userRepository.create = jest.fn().mockResolvedValueOnce([
				{
					id: 11681,
					email: 'test_user@test.com',
					name: 'test_name',
					image: 'image',
					updatedAt: new Date('2023-08-11T11:59:51.268Z'),
					createdAt: new Date('2023-08-11T11:59:51.268Z'),
				},
				false,
			]);

			await handler(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
			expect(res.json).toHaveBeenCalledWith({
				status: 'error',
				message: 'Erro ao cadastrar novo usuário',
			});
		});

		it('should return a error message if the method is not allowed', async () => {
			req.method = 'DELETE';

			await handler(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
			expect(res.json).toHaveBeenCalledWith({
				status: 'error',
				message: 'Metodo não permitido',
			});
		});
	});
});
