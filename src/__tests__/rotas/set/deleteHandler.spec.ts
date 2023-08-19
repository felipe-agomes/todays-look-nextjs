import setRepository from '@/models/Postgre/SetRepositoryPostgre';
import { handlerWrapper } from './test/handlerWrapper';
import jwt from 'jsonwebtoken';

describe('deleteHandler', () => {
	let req: any;
	let res: any;
	beforeEach(() => {
		jest.clearAllMocks();
		req = {
			headers: {
				authorization: 'bearer token',
			},
			method: 'DELETE',
			body: {},
			query: { setId: '1' },
		};
		res = {
			json: jest.fn(function () {
				return this;
			}),
			status: jest.fn(function () {
				return this;
			}),
		};
		setRepository.deleteBySetId = jest.fn();
		jwt.verify = jest.fn().mockReturnValue({ id: 'user_id' });
	});
	it('should call setRepository.deleteBySetId', async () => {
		await handlerWrapper(req, res);

		expect(setRepository.deleteBySetId).toHaveBeenCalledTimes(1);
		expect(setRepository.deleteBySetId).toHaveBeenCalledWith({ setId: '1' });
	});

	it('should call res.json() and res.status() with a success message', async () => {
		await handlerWrapper(req, res);

		expect(res.json).toHaveBeenCalledWith({
			status: 'success',
			message: 'Sucesso ao deletar o set',
		});
		expect(res.status).toHaveBeenCalledWith(200);
	});

	it('should return a error message if the setRepository.deleteBySetId() return null', async () => {
		setRepository.deleteBySetId = jest.fn().mockResolvedValueOnce(null);

		await handlerWrapper(req, res);

		expect(res.json).toHaveBeenCalledWith({
			status: 'error',
			message: 'Erro ao deletar o set',
		});
		expect(res.status).toHaveBeenCalledWith(400);
	});

	it('should return a error message if something throw a error', async () => {
		setRepository.deleteBySetId = jest
			.fn()
			.mockRejectedValueOnce(new Error('Error'));

		try {
			await handlerWrapper(req, res);
		} catch (error) {
			expect(res.json).toHaveBeenCalledWith({
				status: 'error',
				message: 'Erro ao deletar o set',
			});
			expect(res.status).toHaveBeenCalledWith(400);
		}
	});

	it('should not execute any code, and return a error message', async () => {
		jwt.verify = jest.fn().mockReturnValueOnce(false);

		await handlerWrapper(req, res);

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({
			status: 'error',
			message: 'Usuário não autenticado',
		});
	});
});
