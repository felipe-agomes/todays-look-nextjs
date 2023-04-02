import userModels from '@/models/userModels';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function getAllUsers(
	req: NextApiRequest,
	res: NextApiResponse
) {
	switch (req.method) {
		case 'GET':
			const response = await userModels.getAllUsers();

			if (response.error) {
				res.status(400).json(response);
				return;
			}

			res.status(200).json(response);
			return;
	}
}
