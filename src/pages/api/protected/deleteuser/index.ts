import userModels from '@/models/userModels';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function deleteUser(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const response = await userModels.deleteUser(req.body.id);

	if (response.error) {
		res.status(400).json(response);
		return;
	}

	res.status(200).json(response);
}
