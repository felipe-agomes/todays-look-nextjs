import { clotheModels } from '@/models/clotheModels_legacy';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export default async function toggleFavorite(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	// const session = await getSession({ req });
	const session = true;

	if (session) {
		const clotheId = req.query.clotheId;

		if (!(typeof clotheId === 'string')) {
			res.status(400).json({
				error: true,
				message: 'clotheId ou userId passados de forma incorreta',
			});
			return;
		}

		switch (req.method) {
			case 'PUT':
				const response = await clotheModels.toggleFavorite(clotheId);

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
		message: 'Usuário precisa estar logado',
	});
}
