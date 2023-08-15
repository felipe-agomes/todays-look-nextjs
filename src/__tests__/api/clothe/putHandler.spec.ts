import clotheRepository from '@/models/Postgre/ClotheRepositoryPostgre';
import { handlerWrapper } from './test/handlerWrapper';
import { getServerSession } from 'next-auth/next';

jest.mock('@/models/Postgre/ClotheRepositoryPostgre');
jest.mock('next-auth/next');
describe('postHandler', () => {
	let req: any;
	let res: any;
	beforeEach(() => {
		jest.resetAllMocks();
		req = {
			method: 'PUT',
			query: {
				clotheId: 'clotheId',
			},
			body: {
				toUpdate: { category: 'new_category' },
			},
		};
		res = {
			status: jest.fn(function () {
				return this;
			}),
			json: jest.fn(function () {
				return this;
			}),
		};
		(getServerSession as jest.Mock).mockResolvedValue(true);
	});
	it('should call the clotheRepository.toggleFavoriteByClotheId()', async () => {
		req.body.operation = 'toggleFavorite';
		await handlerWrapper(req, res);

		expect(clotheRepository.toggleFavoriteByClotheId).toHaveBeenCalledTimes(1);
		expect(clotheRepository.toggleFavoriteByClotheId).toHaveBeenCalledWith({
			clotheId: 'clotheId',
		});
	});

	it('should call the res.status() and res.json() with a error status if clotheRepository.toggleFavoriteByClotheId() throw a error ', async () => {
		req.body.operation = 'toggleFavorite';
		req.method = 'PUT';
		(
			clotheRepository.toggleFavoriteByClotheId as jest.Mock
		).mockRejectedValueOnce(new Error('erro'));

		await handlerWrapper(req, res);

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({
			status: 'error',
			message: 'Erro alterar a propriedade favorite',
		});
	});

	it('should call the res.status() and res.json() with a success status if clotheRepository.toggleFavoriteByClotheId() does right return', async () => {
		req.body.operation = 'toggleFavorite';
		req.method = 'PUT';
		(
			clotheRepository.toggleFavoriteByClotheId as jest.Mock
		).mockResolvedValueOnce({ obj2: 'obj2' });

		await handlerWrapper(req, res);

		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith({
			status: 'success',
			message: 'Propriedade favorite alterada com sucesso',
			data: { obj2: 'obj2' },
		});
	});

	it('should call the method clotheRepository.changeCategoryByClotheId()', async () => {
		req.method = 'PUT';
		req.body.operation = 'changeCategory';
		req.body.toUpdate.category = 'new_category';

		await handlerWrapper(req, res);

		expect(clotheRepository.changeCategoryByClotheId).toHaveBeenCalledWith({
			clotheId: 'clotheId',
			category: 'new_category',
		});
	});

	it('should call the res.status() and res.json() with a error status if clotheRepository.changeCategoryByClotheId() throw a error ', async () => {
		req.body.operation = 'changeCategory';
		req.method = 'PUT';
		(
			clotheRepository.changeCategoryByClotheId as jest.Mock
		).mockRejectedValueOnce(new Error('erro'));

		await handlerWrapper(req, res);

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({
			status: 'error',
			message: 'Erro alterar a propriedade category',
		});
	});

	it('should call the res.status() and res.json() with a success status if clotheRepository.changeCategoryByClotheId() does right return', async () => {
		req.body.operation = 'changeCategory';
		req.method = 'PUT';
		(
			clotheRepository.changeCategoryByClotheId as jest.Mock
		).mockResolvedValueOnce({ obj2: 'obj2' });

		await handlerWrapper(req, res);

		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith({
			status: 'success',
			message: 'Propriedade category alterada com sucesso',
			data: { obj2: 'obj2' },
		});
	});

	it('should call the res.status() and res.json() with a error status if session is undefined', async () => {
		(clotheRepository.getAllByUserId as jest.Mock).mockResolvedValueOnce([
			{ obj1: 'obj1' },
			{ obj2: 'obj2' },
		]);
		(getServerSession as jest.Mock).mockResolvedValue(false);

		await handlerWrapper(req, res);

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({
			status: 'error',
			message: 'Usuario precisa estar logado',
		});
	});
});
