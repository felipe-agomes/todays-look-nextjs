import clotheRepository from '@/models/Postgre/ClotheRepository';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	let clotheId: string;
	switch (req.method) {
		case 'PUT':
			clotheId = req.query.clotheId as string;
			if (req.body.operation === 'changeCategory') {
				const category = req.body.toUpdate.category as string;
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
				} catch (error) {
					console.error(error.message);
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
			break;
		case 'DELETE':
			clotheId = req.query.clotheId as string;
			try {
				const isNull = await clotheRepository.deleteByClotheId({
					clotheId,
				});
				if (isNull === null) {
					res.status(400).json({
						status: 'error',
						message: 'Erro ao deletar roupa',
					});
					return;
				}
				res.status(200).json({
					status: 'success',
					message: 'Roupa deletada com sucesso',
				});
			} catch (error) {
				res.status(400).json({
					status: 'error',
					message: 'Erro ao deletar roupa',
				});
			}
			break;
	}
}
