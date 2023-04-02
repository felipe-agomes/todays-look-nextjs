import clotheModels from '@/models/clotheModels';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function toggleFavorite(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const clotheId = Number(req.query.clotheId);
	const { id: userId } = req.body;

	switch (req.method) {
		case 'PUT':
			const response = await clotheModels.toggleFavorite(userId, clotheId);

			if (response.error) {
				res.status(400).json(response);
				return;
			}

			res.status(200).json(response);
			return;
	}
}
