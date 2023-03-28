import userModels from '../../../models/userModels';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function register(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const response = await userModels.createUser(req.body);
	if (response.error) {
		res.status(400).json(response);
		return;
	}

	res.status(200).json(response);
}
