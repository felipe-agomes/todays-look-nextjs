import clotheRepository from '@/models/Postgre/ClotheRepositoryPostgre';
import { handler } from './test/handlerWrapper';
import { getServerSession } from 'next-auth/next';

jest.mock('next-auth/next');
jest.mock('@/models/Postgre/ClotheRepositoryPostgre');
describe('getAllClothesHandler', () => {
	let req: any;
	let res: any;
	beforeEach(() => {
		jest.clearAllMocks();
		req = {
			query: { userId: 'userId' },
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
	it('should call the res.status() and res.json() with a error status if the method is not allowed ', async () => {
		req.method = 'PUT';

		await handler(req, res);

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({
			status: 'error',
			message: 'Metodo não permitido',
		});
	});

	it('should call the clotheRepository.getAllByUserId()', async () => {
		req.method = 'GET';

		await handler(req, res);

		expect(clotheRepository.getAllByUserId).toHaveBeenCalledTimes(1);
		expect(clotheRepository.getAllByUserId).toHaveBeenCalledWith({
			userId: 'userId',
		});
	});

	it('should call the res.status() and res.json() with a error status if clotheRepository.getAllByUserId() throw a error ', async () => {
		req.method = 'GET';
		(clotheRepository.getAllByUserId as jest.Mock).mockRejectedValueOnce(
			new Error('erro'),
		);

		await handler(req, res);

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({
			status: 'error',
			message: 'Erro ao buscar roupas',
		});
	});

	it('should call the res.status() and res.json() with a success status if clotheRepository.getAllByUserId() does right return', async () => {
		req.method = 'GET';
		(clotheRepository.getAllByUserId as jest.Mock).mockResolvedValueOnce([
			{ obj1: 'obj1' },
			{ obj2: 'obj2' },
		]);

		await handler(req, res);

		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith({
			status: 'success',
			message: 'Roupas buscadas com sucesso',
			data: [{ obj1: 'obj1' }, { obj2: 'obj2' }],
		});
	});

	it('should call the res.status() and res.json() with a error status if session is undefined', async () => {
		req.method = 'GET';
		(clotheRepository.getAllByUserId as jest.Mock).mockResolvedValueOnce([
			{ obj1: 'obj1' },
			{ obj2: 'obj2' },
		]);
		(getServerSession as jest.Mock).mockResolvedValue(false);

		await handler(req, res);

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({
			status: 'error',
			message: 'Usuario precisa estar logado',
		});
	});
});
