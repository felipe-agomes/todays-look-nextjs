import clotheModels from '@/models/clotheModels';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { getSession } from 'next-auth/react';

export default async function getAllClothes(
	req: NextApiRequest,
	res: NextApiResponse
) {
	// const session = await getSession({ req });
	const session = true;

	if (session) {
		const userId = Number(req.query.userId);

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
