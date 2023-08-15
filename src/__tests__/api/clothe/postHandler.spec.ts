import clotheRepository from '@/models/Postgre/ClotheRepositoryPostgre';
import { handler } from './test/handlerWrapper';
import { getServerSession } from 'next-auth/next';

jest.mock('@/models/Postgre/ClotheRepositoryPostgre');
jest.mock('next-auth/next');
describe('postHandler', () => {
	let req: any;
	let res: any;
	let clothe: any;
	beforeEach(() => {
		jest.resetAllMocks();
		clothe = {
			category: 'category',
			image: 'image',
			key: 'key',
		};
		req = {
			method: 'POST',
			body: { clothe },
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

	it('should call the clotheRepository.create() with correct params', async () => {
		await handler(req, res);

		expect(clotheRepository.create).toHaveBeenCalledTimes(1);
		expect(clotheRepository.create).toHaveBeenCalledWith({
			category: 'category',
			image: 'image',
			key: 'key',
			userId: 'userId',
		});
	});

	it('should call the res.json() and res.status() with an error message if the method return null ', async () => {
		(clotheRepository.create as jest.Mock).mockResolvedValueOnce(null);

		await handler(req, res);

		expect(res.json).toHaveBeenCalledWith({
			status: 'error',
			message: 'Erro ao cadastrar uma ruopa nova',
		});
		expect(res.status).toHaveBeenCalledWith(400);
	});

	it('should return a new clothe if everything is right', async () => {
		(clotheRepository.create as jest.Mock).mockResolvedValueOnce({
			id: 'clotheId',
			category: 'category',
		});

		await handler(req, res);

		expect(res.json).toHaveBeenCalledWith({
			status: 'success',
			message: 'Sucesso ao cadastrar roupa nova',
			data: { id: 'clotheId', category: 'category' },
		});
		expect(res.status).toHaveBeenCalledWith(200);
	});

	it('should return a new clothe if everything is right', async () => {
		(clotheRepository.create as jest.Mock).mockRejectedValueOnce(
			new Error('erro'),
		);

		try {
			await handler(req, res);
		} catch {
			expect(res.json).toHaveBeenCalledWith({
				status: 'error',
				message: 'Erro ao cadastrar uma ruopa nova',
			});
		}
	});

	it('should call the res.status() and res.json() with a error status if session is undefined', async () => {
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
