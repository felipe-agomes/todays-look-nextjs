import setRepository from '@/models/Postgre/SetRepositoryPostgre';
import handler from '.';
import {
	clothesObj,
	setObj,
	userObj,
} from '@/models/Postgre/SetRepositoryPostgre.spec';

describe('postHandler', () => {
	let res: any;
	let req: any;
	beforeEach(() => {
		jest.resetAllMocks();
		req = {
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
});
