import clotheModels from '@/models/clotheModels';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export default async function toggleFavorite(
	req: NextApiRequest,
	res: NextApiResponse
) {
	// const session = await getSession({ req });
	const session = true;

	if (session) {
		const clotheId = Number(req.query.clotheId);
		const userId = Number(req.query.userId);

		switch (req.method) {
			case 'PUT':
				const response = await clotheModels.toggleFavorite(userId, clotheId);

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
		return;
	}

	res.status(400).json({
		error: true,
		message: 'Usuario precisa estar logado',
	});
}