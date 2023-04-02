import clotheModels from '@/models/clotheModels';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function setNewClothe(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { key, category, body, favorite, image, id } = req.body;
	const data = {
		key,
		category,
		body,
		favorite,
		image,
		userId: id,
	};

	switch (req.method) {
		case 'POST':
			const response = await clotheModels.setNewClothe(data);

			if (response.error) {
				res.status(400).json(response);
				return;
			}

			res.status(200).json(response);
			return;
	}
}
