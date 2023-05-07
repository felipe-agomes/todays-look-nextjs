import { NextApiRequest, NextApiResponse } from 'next';
import getAllSet from '.';
import { setModels } from '@/models/setModels';
import { getSession } from 'next-auth/react';

jest.mock('@/models/setModels');
jest.mock('next-auth/react');

describe('getAllSet', () => {
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

	it('should return all sets for a user', async () => {
		(getSession as jest.Mock).mockResolvedValueOnce({ user: {} });
		(setModels.getAllSet as jest.Mock).mockResolvedValueOnce({
			error: false,
			set: [
				{
					userId: '123',
					id: '321',
					sets: [
						{ id: '1', name: 'shirt' },
						{ id: '2', name: 'short' },
					],
				},
			],
		});

		await getAllSet(req, res);

		expect(res.status).toBeCalledWith(200);
		expect(res.json).toBeCalledWith({
			error: false,
			set: [
				{
					userId: '123',
					id: '321',
					sets: [
						{ id: '1', name: 'shirt' },
						{ id: '2', name: 'short' },
					],
				},
			],
		});
	});

	it.skip('should return an error if the user is not logged in', async () => {
		(getSession as jest.Mock).mockResolvedValueOnce(null);
		(setModels.getAllSet as jest.Mock).mockResolvedValueOnce({
			error: false,
			set: [
				{
					userId: '123',
					id: '321',
					sets: [
						{ id: '1', name: 'shirt' },
						{ id: '2', name: 'short' },
					],
				},
			],
		});

		await getAllSet(req, res);

		expect(res.status).toBeCalledWith(400);
		expect(res.json).toBeCalledWith({ error: true });
	});

	it('should return an error if the userId is invalid', async () => {
		(getSession as jest.Mock).mockResolvedValueOnce({ user: {} });
		req.query.userId = undefined;

		await getAllSet(req, res);

		expect(res.status).toBeCalledWith(400);
		expect(res.json).toBeCalledWith({ error: true, message: 'UserId inválido' });
	});

	it('should return an error if the method is not allowed', async () => {
		(getSession as jest.Mock).mockResolvedValueOnce({ user: {} });
		req.method = 'POST';

		await getAllSet(req, res);

		expect(res.status).toBeCalledWith(400);
		expect(res.json).toBeCalledWith({
			error: true,
			message: 'Metodo não permitido',
		});
	});
});
