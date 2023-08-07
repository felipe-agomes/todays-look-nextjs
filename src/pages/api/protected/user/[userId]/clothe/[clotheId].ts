import clotheRepository from '@/models/Postgre/ClotheRepository';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	switch (req.method) {
		case 'PUT':
			const clotheId = req.query.clotheId as string;
			const category = req.body.category as string;
			if (req.body.operation === 'changeCategory') {
				try {
					const clothe = await clotheRepository.changeCategoryByClotheId({
						clotheId,
						category,
					});
					res.status(200).json({
						status: 'success',
						message: 'Propriedade category alterada com sucesso',
						data: clothe,
					});
				} catch {
					res.status(400).json({
						status: 'error',
						message: 'Erro alterar a propriedade category',
					});
				}
			}
			if (req.body.operation === 'toggleFavorite') {
				try {
					const clothe = await clotheRepository.toggleFavoriteByClotheId({
						clotheId,
					});
					res.status(200).json({
						status: 'success',
						message: 'Propriedade favorite alterada com sucesso',
						data: clothe,
					});
				} catch {
					res.status(400).json({
						status: 'error',
						message: 'Erro alterar a propriedade favorite',
					});
				}
			}
	}
}
