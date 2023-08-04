import { clotheModelMongo } from '@/models/ClotheModelMongo';
import handler from './index';

jest.mock('@/models/ClotheModelMongo');
describe('getAllClothesHandler', () => {
	const req: any = {
		query: {
			userId: 'userId',
		},
	};
	const res: any = {
		status: jest.fn(function () {
			return this;
		}),
		json: jest.fn(function () {
			return this;
		}),
	};
	beforeEach(() => {
		jest.clearAllMocks();
	});
	it('should call the res.status() and res.json() with a error status if the method is not allowed ', async () => {
		req.method = 'POST';

		await handler(req, res);

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({
			status: 'error',
			message: 'Metodo não permitido',
		});
	});

	it('should call the clotheModelMongo.getAllByUserId()', async () => {
		req.method = 'GET';

		await handler(req, res);

		expect(clotheModelMongo.getAllByUserId).toHaveBeenCalledTimes(1);
		expect(clotheModelMongo.getAllByUserId).toHaveBeenCalledWith({
			userId: 'userId',
		});
	});

	it('should call the res.status() and res.json() with a error status if clotheModelMongo.getAllByUserId() throw a error ', async () => {
		req.method = 'GET';
		(clotheModelMongo.getAllByUserId as jest.Mock).mockRejectedValueOnce(
			new Error('erro'),
		);

		await handler(req, res);
		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({
			status: 'error',
			message: 'Erro ao buscar roupas',
		});
	});

	it('should ', async () => {
		req.method = 'GET';
		(clotheModelMongo.getAllByUserId as jest.Mock).mockResolvedValueOnce([
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
});
