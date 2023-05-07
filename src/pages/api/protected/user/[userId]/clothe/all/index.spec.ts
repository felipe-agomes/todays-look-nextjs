import { clotheModels } from '@/models/clotheModels';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import getAllClothes from '.';

jest.mock('@/models/clotheModels');
jest.mock('next-auth/react');

describe('getAllClothes', () => {
	let req: NextApiRequest;
	let res: NextApiResponse;

	beforeEach(() => {
		req = {
			method: 'GET',
			query: {
				userId: '123',
			},
		} as any;
		res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		} as any;
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it('should return all clothes for a user', async () => {
		(getSession as jest.Mock).mockResolvedValueOnce({ user: {} });
		(clotheModels.getAllClothes as jest.Mock).mockResolvedValueOnce({
			error: false,
			data: [{ id: '1', name: 'shirt' }],
		});

		await getAllClothes(req, res);

		expect(res.status).toBeCalledWith(200);
		expect(res.json).toBeCalledWith({
			error: false,
			data: [{ id: '1', name: 'shirt' }],
		});
	});

	it('should return an error if the user is not logged in', async () => {
		(getSession as jest.Mock).mockResolvedValueOnce(null);

		await getAllClothes(req, res);

		expect(res.status).toBeCalledWith(400);
		expect(res.json).toBeCalledWith({
			error: true,
			message: 'Usuario precisa estar logado',
		});
	});

	it('should return an error if the userId is invalid', async () => {
		(getSession as jest.Mock).mockResolvedValueOnce({ user: {} });
		req.query.userId = undefined;

		await getAllClothes(req, res);

		expect(res.status).toBeCalledWith(400);
		expect(res.json).toBeCalledWith({
			error: true,
			message: 'UserId inválido',
		});
	});

	it('should return an error if the method is not allowed', async () => {
		(getSession as jest.Mock).mockResolvedValueOnce({ user: {} });
		req.method = 'POST';

		await getAllClothes(req, res);

		expect(res.status).toBeCalledWith(400);
		expect(res.json).toBeCalledWith({
			error: true,
			message: 'Metodo não permitido',
		});
	});
});
