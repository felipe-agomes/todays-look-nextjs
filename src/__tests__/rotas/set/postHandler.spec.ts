import setRepository from '@/models/Postgre/SetRepositoryPostgre';
import {
	clothesObj,
	setObj,
	userObj,
} from '@/__tests__/models/SetRepositoryPostgre.spec';
import { handler } from './test/handlerWrapper';
import jwt from 'jsonwebtoken';

describe('postHandler', () => {
	let res: any;
	let req: any;
	beforeEach(() => {
		jest.resetAllMocks();
		req = {
			headers: {
				authorization: 'bearer token',
			},
			method: 'POST',
			body: {
				set: {
					clothes: clothesObj,
					category: 'category',
				},
			},
			query: { userId: '1' },
		};
		res = {
			json: jest.fn(function () {
				return this;
			}),
			status: jest.fn(function () {
				return this;
			}),
		};
		setRepository.create = jest.fn().mockResolvedValue({ ...setObj });
		jwt.verify = jest.fn().mockReturnValue({ id: 'user_id' });
	});
	it('should call setRepository.create()', async () => {
		await handler(req, res);

		expect(setRepository.create).toHaveBeenCalledTimes(1);
		expect(setRepository.create).toHaveBeenCalledWith({
			category: 'category',
			clothes: clothesObj,
			userId: userObj.id,
		});
	});

	it('should call res.json() and res.status() with a success message', async () => {
		await handler(req, res);

		expect(res.json).toHaveBeenCalledWith({
			status: 'success',
			message: 'sucesso ao criar conjunto',
			data: setObj,
		});
		expect(res.status).toHaveBeenCalledWith(200);
	});

	it('should return a error message if the method is not allowed', async () => {
		req.method = 'PUT';

		await handler(req, res);

		expect(res.json).toHaveBeenCalledWith({
			status: 'error',
			message: 'Metodo não permitido',
		});
		expect(res.status).toHaveBeenCalledWith(400);
	});

	it('should return a error message if the setRepository.create() return null', async () => {
		setRepository.create = jest.fn().mockResolvedValueOnce(null);

		await handler(req, res);

		expect(res.json).toHaveBeenCalledWith({
			status: 'error',
			message: 'Erro ao criar conjunto',
		});
		expect(res.status).toHaveBeenCalledWith(400);
	});

	it('should return a error message if something throw a error', async () => {
		setRepository.create = jest.fn().mockRejectedValueOnce(new Error('Error'));

		try {
			await handler(req, res);
		} catch (error) {
			expect(res.json).toHaveBeenCalledWith({
				status: 'error',
				message: 'Erro ao criar conjunto',
			});
			expect(res.status).toHaveBeenCalledWith(400);
		}
	});

	it('should not execute any code, and return a error message', async () => {
		jwt.verify = jest.fn().mockReturnValueOnce(false);

		await handler(req, res);

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({
			status: 'error',
			message: 'Usuário não autenticado',
		});
	});
});
