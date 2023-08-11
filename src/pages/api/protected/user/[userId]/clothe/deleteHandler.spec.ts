import clotheRepository from '@/models/Postgre/ClotheRepositoryPostgre';
import { handlerWrapper } from './test/handleWrapper';

jest.mock('@/models/Postgre/ClotheRepository');
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
});
