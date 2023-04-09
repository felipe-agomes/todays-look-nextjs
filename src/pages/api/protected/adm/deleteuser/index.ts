import { userModels } from '@/models/modelMong/userModels';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function deleteUser(
	req: NextApiRequest,
	res: NextApiResponse
) {
	switch (req.method) {
		case 'DELETE':
			const response = await userModels.deleteUser(req.body.id);

			if (response.error) {
				res.status(400).json(response);
				return;
			}

			res.status(200).json(response);
			break;
		default:
			res.status(400).json({
				error: true,
				message: 'Metodo não permitido',
			});
	}
}
