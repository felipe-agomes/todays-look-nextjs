import clotheRepository from '@/models/Postgre/ClotheRepositoryPostgre';
import { handlerWrapper } from './test/handlerWrapper';
import { getServerSession } from 'next-auth/next';

jest.mock('@/models/Postgre/ClotheRepositoryPostgre');
jest.mock('next-auth/next');
describe('deleteHandler', () => {
	let req: any;
	let res: any;
	beforeEach(() => {
		jest.resetAllMocks();
		req = {
			method: 'DELETE',
			query: {
				clotheId: 'clotheId',
			},
			body: {},
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

	it('should call the clotheRepository.deleteByClotheId()', async () => {
		await handlerWrapper(req, res);

		expect(clotheRepository.deleteByClotheId).toHaveBeenCalledTimes(1);
		expect(clotheRepository.deleteByClotheId).toHaveBeenCalledWith({
			clotheId: 'clotheId',
		});
	});

	it('should call the res.status() and res.json() with a error status if clotheRepository.deleteByClotheId() throw a error ', async () => {
		(clotheRepository.deleteByClotheId as jest.Mock).mockRejectedValueOnce(
			new Error('erro'),
		);

		await handlerWrapper(req, res);

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({
			status: 'error',
			message: 'Erro ao deletar roupa',
		});
	});

	it('should call the res.status() and res.json() with a success status if clotheRepository.deleteByClotheId() does right return', async () => {
		(clotheRepository.deleteByClotheId as jest.Mock).mockResolvedValueOnce(
			'Roupa deletada com sucesso',
		);

		await handlerWrapper(req, res);

		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith({
			status: 'success',
			message: 'Roupa deletada com sucesso',
		});
	});

	it('should return a error message if clotheRepository.deleteByClotheId() return null', async () => {
		(clotheRepository.deleteByClotheId as jest.Mock).mockResolvedValueOnce(null);

		await handlerWrapper(req, res);

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({
			status: 'error',
			message: 'Erro ao deletar roupa',
		});
	});

	it('should call the res.status() and res.json() with a error status if session is undefined', async () => {
		req.method = 'GET';
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
