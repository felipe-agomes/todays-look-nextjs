import { clotheModels } from '@/models/clotheModels';
import deleteClothe from './[clotheId]';
import { NextApiRequest, NextApiResponse } from 'next';

jest.mock('@/models/clotheModels');

describe('deleteClothe', () => {
	let req: NextApiRequest;
	let res: NextApiResponse;

	beforeEach(() => {
		req = {
			method: 'DELETE',
			query: {
				clotheId: '1',
			},
		} as any;

		res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		} as any;
	});

	it('should return 400 if clotheId is missing', async () => {
		req.query.clotheId = undefined;

		await deleteClothe(req, res);

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({
			error: true,
			message: 'clotheId ou userId passados de forma incorreta',
		});
	});

	it('should call clotheModels.deleteClothe with the correct parameter and return 200', async () => {
		(clotheModels.deleteClothe as jest.Mock).mockResolvedValueOnce({
			success: true,
		});

		await deleteClothe(req, res);

		expect(clotheModels.deleteClothe).toHaveBeenCalledWith('1');
		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith({ success: true });
	});

	it('should return 400 if clotheModels.deleteClothe returns an error', async () => {
		(clotheModels.deleteClothe as jest.Mock).mockResolvedValueOnce({
			error: true,
			message: 'Error',
		});

		await deleteClothe(req, res);

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({ error: true, message: 'Error' });
	});

	it('should return 400 if method is not DELETE', async () => {
		req.method = 'GET';

		await deleteClothe(req, res);

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({
			error: true,
			message: 'Metodo não permitido',
		});
	});

	it.skip('should return 400 if user is not logged in', async () => {
		await deleteClothe(req, res);

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({
			error: true,
			message: 'Usuario precisa estar logado',
		});
	});
});
