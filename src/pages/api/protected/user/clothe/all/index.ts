import clotheModels from '@/models/clotheModels';
import { NextApiRequest, NextApiResponse } from 'next';

type BodyRequest = {
	id: number;
};

export default async function getAllClothes(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { id } = req.body as BodyRequest;

	switch (req.method) {
		case 'GET':
			const response = await clotheModels.getAllClothes(id);

			if (response.error) {
				res.status(400).json(response);
				return;
			}

			res.status(200).json(response);
			return;
	}
}
