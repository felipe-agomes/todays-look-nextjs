import setRepository from '@/models/Postgre/SetRepositoryPostgre';
import { setObj } from '@/__tests__/models/SetRepositoryPostgre.spec';
import { handlerWrapper } from './test/handlerWrapper';
import { getServerSession } from 'next-auth/next';

jest.mock('next-auth/next');
describe('putHandler', () => {
	let res: any;
	let req: any;
	beforeEach(() => {
		jest.resetAllMocks();
		req = {
			method: 'PUT',
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
		setRepository.toggleFavoriteBySetId = jest
			.fn()
			.mockResolvedValue({ ...setObj });
		setRepository.changeCategoryBySetId = jest
			.fn()
			.mockResolvedValue({ ...setObj });
		(getServerSession as jest.Mock).mockResolvedValue(true);
	});
	describe('toggleFavorite', () => {
		beforeEach(() => {
			req.body = { operation: 'toggleFavorite' };
		});
		it('should call setRepository.toggleFavoriteBySetId()', async () => {
			await handlerWrapper(req, res);

			expect(setRepository.toggleFavoriteBySetId).toHaveBeenCalledTimes(1);
			expect(setRepository.toggleFavoriteBySetId).toHaveBeenCalledWith({
				setId: '1',
			});
		});

		it('should call res.json() and res.status() with a success message', async () => {
			await handlerWrapper(req, res);

			expect(res.json).toHaveBeenCalledWith({
				status: 'success',
				message: 'sucesso ao alterar a propriedade favorito',
				data: setObj,
			});
			expect(res.status).toHaveBeenCalledWith(200);
		});

		it('should return a error message if the method is not allowed', async () => {
			req.method = 'GET';

			await handlerWrapper(req, res);

			expect(res.json).toHaveBeenCalledWith({
				status: 'error',
				message: 'Metodo não permitido',
			});
			expect(res.status).toHaveBeenCalledWith(400);
		});

		it('should return a error message if the setRepository.toggleFavoriteBySetId() return null', async () => {
			setRepository.toggleFavoriteBySetId = jest.fn().mockResolvedValueOnce(null);

			await handlerWrapper(req, res);

			expect(res.json).toHaveBeenCalledWith({
				status: 'error',
				message: 'Erro ao alterar a propriedade favorito',
			});
			expect(res.status).toHaveBeenCalledWith(400);
		});

		it('should return a error message if something throw a error', async () => {
			setRepository.toggleFavoriteBySetId = jest
				.fn()
				.mockRejectedValueOnce(new Error('Error'));

			try {
				await handlerWrapper(req, res);
			} catch (error) {
				expect(res.json).toHaveBeenCalledWith({
					status: 'error',
					message: 'Erro ao alterar a propriedade favorito',
				});
				expect(res.status).toHaveBeenCalledWith(400);
			}
		});
	});

	describe('changeCategory', () => {
		beforeEach(() => {
			req.body = {
				operation: 'changeCategory',
				toUpdate: { category: 'new_category' },
			};
		});
		it('should call setRepository.changeCategoryBySetId()', async () => {
			await handlerWrapper(req, res);

			expect(setRepository.changeCategoryBySetId).toHaveBeenCalledTimes(1);
			expect(setRepository.changeCategoryBySetId).toHaveBeenCalledWith({
				category: 'new_category',
				setId: '1',
			});
		});

		it('should call res.json() and res.status() with a success message', async () => {
			await handlerWrapper(req, res);

			expect(res.json).toHaveBeenCalledWith({
				status: 'success',
				message: 'sucesso ao alterar a propriedade category',
				data: setObj,
			});
			expect(res.status).toHaveBeenCalledWith(200);
		});

		it('should return a error message if the setRepository.changeCategoryBySetId() return null', async () => {
			setRepository.changeCategoryBySetId = jest.fn().mockResolvedValueOnce(null);

			await handlerWrapper(req, res);

			expect(res.json).toHaveBeenCalledWith({
				status: 'error',
				message: 'Erro ao alterar a propriedade category',
			});
			expect(res.status).toHaveBeenCalledWith(400);
		});

		it('should return a error message if something throw a error', async () => {
			setRepository.changeCategoryBySetId = jest
				.fn()
				.mockRejectedValueOnce(new Error('Error'));

			try {
				await handlerWrapper(req, res);
			} catch (error) {
				expect(res.json).toHaveBeenCalledWith({
					status: 'error',
					message: 'Erro ao alterar a propriedade category',
				});
				expect(res.status).toHaveBeenCalledWith(400);
			}
		});
	});

	it('should call the res.status() and res.json() with a error status if session is undefined', async () => {
		(getServerSession as jest.Mock).mockResolvedValue(false);

		await handlerWrapper(req, res);

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({
			status: 'error',
			message: 'Usuario precisa estar logado',
		});
	});
});
