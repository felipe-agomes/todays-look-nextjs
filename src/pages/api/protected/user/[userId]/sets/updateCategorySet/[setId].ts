import { setModels } from '@/models/setModels';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function updateCategorySet(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const session = true;

	if (session) {
		switch (req.method) {
			case 'PUT':
				const { setId } = req.query;
				const { toUpdate } = req.body as { toUpdate: string };
				if (!setId || Array.isArray(setId)) return;
				const response = await setModels.updateCategorySet(setId, toUpdate);
				if (response.error) {
					res.status(400).json(response);
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
