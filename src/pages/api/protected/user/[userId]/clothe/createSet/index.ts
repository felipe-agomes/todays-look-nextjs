import { setModels } from '@/models/setModels';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function createSet(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const session = true;

	if (session) {
		switch (req.method) {
			case 'POST':
				const { userId } = req.query;
				const { sets } = req.body;
				if (!(userId && sets && !Array.isArray(userId))) {
					res.status(400).json({
						error: true,
						message: `Dados faltando userId: ${userId} sets: ${sets}`,
					});
					return;
				}
				const response = await setModels.createSet(userId, sets);
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
