import { ClothesProps } from '@/@types';
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
				const data = req.body as { sets: ClothesProps[]; category: string };
				if (!(userId && data && !Array.isArray(userId))) {
					res.status(400).json({
						error: true,
						message: `Dados faltando userId: ${userId} data: ${data}`,
					});
					return;
				}
				const response = await setModels.createSet(userId, data);
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
