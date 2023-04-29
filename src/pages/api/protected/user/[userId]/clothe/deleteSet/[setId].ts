import { setModels } from '@/models/setModels';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function deleteSet(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const session = true;

	if (session) {
		switch (req.method) {
			case 'DELETE':
				const { setId } = req.query;
				if (!setId || Array.isArray(setId)) return;
				const response = await setModels.deleteSet(setId);

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
