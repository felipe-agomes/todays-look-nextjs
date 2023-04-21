import { clotheModels } from '@/models/clotheModels';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export default async function toggleFavorite(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const session = await getSession({ req });

	if (session) {
		const clotheId = req.query.clotheId;
		const userId = req.query.userId;

		if (!(typeof clotheId === 'string' && typeof userId === 'string')) {
			res.status(400).json({
				error: true,
				message: 'clotheId ou userId passados de forma incorreta',
			});
			return;
		}
		switch (req.method) {
			case 'PUT':
				const response = await clotheModels.toggleFavorite(userId, clotheId);

				if (response.error) {
					res.status(400).json(response);
					return;
				}
				console.log(response.clothe, 'toggleFavorite');
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
