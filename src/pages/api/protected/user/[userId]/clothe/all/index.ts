import { clotheModels } from '@/models/clotheModels';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export default async function getAllClothes(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	// const session = await getSession({ req });
	const session = true;
	if (session) {
		const userId = req.query.userId;
		if (!(typeof userId === 'string')) {
			res.status(400).json({
				error: true,
				message: 'UserId inválido',
			});
			return;
		}
		switch (req.method) {
			case 'GET':
				const response = await clotheModels.getAllClothes(userId);

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
	} else {
		res.status(400).json({
			error: true,
			message: 'Usuario precisa estar logado',
		});
	}
}
