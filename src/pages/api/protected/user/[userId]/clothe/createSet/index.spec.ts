import createSet from '.';
import { setModels } from '@/models/setModels';

jest.mock('@/models/setModels');

describe.skip('createSet', () => {
	let req: any;
	let res: any;

	beforeEach(() => {
		req = {
			method: 'POST',
			query: {
				userId: '123',
			},
			body: {
				sets: [{ name: 'Set 1' }, { name: 'Set 2' }],
				category: 'Casual',
			},
		};

		res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		};
	});

	it('should return 400 if userId or data is missing', async () => {
		req.query.userId = null;

		await createSet(req, res);

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({
			error: true,
			message: `Dados faltando userId: ${null} data: ${req.body}`,
		});
	});

	it('should call setModels.createSet with the correct parameters and return 200', async () => {
		(setModels.createSet as jest.Mock).mockResolvedValueOnce({
			id: '1',
			name: 'Set 1',
		});

		await createSet(req, res);

		expect(setModels.createSet).toHaveBeenCalledWith('123', req.body);
		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith({ id: '1', name: 'Set 1' });
	});

	it('should return 400 if setModels.createSet returns an error', async () => {
		(setModels.createSet as jest.Mock).mockResolvedValueOnce({
			error: true,
			message: 'Error',
		});

		await createSet(req, res);

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({ error: true, message: 'Error' });
	});

	it('should return 400 if method is not POST', async () => {
		req.method = 'GET';

		await createSet(req, res);

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({
			error: true,
			message: 'Metodo não permitido',
		});
	});
});
