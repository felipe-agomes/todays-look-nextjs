import { setModels } from '@/models/setModels';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function getAllSet(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const session = true;

	if (session) {
		switch (req.method) {
			case 'GET':
				const { userId } = req.query;

				if (!(typeof userId === 'string')) {
					res.status(400).json({
						error: true,
						message: 'UserId inválido',
					});
					return;
				}

				const response = await setModels.getAllSet(userId);

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
}
