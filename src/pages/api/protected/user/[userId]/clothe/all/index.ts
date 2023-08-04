import { Response } from '@/controllers/FrontController';
import { ClotheData, clotheModelMongo } from '@/models/ClotheModelMongo';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function getAllClothes(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const userId = req.query.userId as string;
	switch (req.method) {
		case 'GET':
			let clothes: ClotheData[];
			try {
				clothes = await clotheModelMongo.getAllByUserId({ userId });
			} catch (error) {
				res.status(400).json({
					status: 'error',
					message: 'Erro ao buscar roupas',
				});
			}

			res.status(200).json({
				status: 'success',
				message: 'Roupas buscadas com sucesso',
				data: clothes,
			});
			break;
		default:
			res.status(400).json({
				status: 'error',
				message: 'Metodo não permitido',
			});
	}
}
