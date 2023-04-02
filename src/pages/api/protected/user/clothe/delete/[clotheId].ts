import clotheModels from '@/models/clotheModels';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function deleteClothe(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const clotheId = Number(req.query.clotheId);
	const { id: userId } = req.body;

	switch (req.method) {
		case 'DELETE':
			const response = await clotheModels.deleteClothe(userId, clotheId);
			if (response.error) {
				res.status(400).json(response);
				return;
			}

			res.status(200).json(response);
			return;
	}
}
