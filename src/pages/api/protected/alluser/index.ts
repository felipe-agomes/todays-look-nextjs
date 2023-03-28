import userModels from '@/models/userModels';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function getAllUsers(
	_req: NextApiRequest,
	res: NextApiResponse
) {
	const response = await userModels.getAllUsers();

	if (response.error) {
		res.status(400).json(response);
		return;
	}

	res.status(200).json(response);
}
