import setRepository from '@/models/Postgre/SetRepositoryPostgre';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const session = await getServerSession(req, res, authOptions);
	if (session) {
		const setId = req.query.setId as string;
		switch (req.method) {
			case 'PUT':
				const operation = req.body.operation as string;
				if (operation === 'toggleFavorite') {
					try {
						const set = await setRepository.toggleFavoriteBySetId({ setId });
						if (!set) {
							res.status(400).json({
								status: 'error',
								message: 'Erro ao alterar a propriedade favorito',
							});
							return;
						}
						res.status(200).json({
							status: 'success',
							message: 'sucesso ao alterar a propriedade favorito',
							data: set,
						});
					} catch (error) {
						res.status(400).json({
							status: 'error',
							message: 'Erro ao alterar a propriedade favorito',
						});
					}
				}
				if (operation === 'changeCategory') {
					try {
						const { category } = req.body.toUpdate as { category: string };
						const set = await setRepository.changeCategoryBySetId({
							setId,
							category,
						});
						if (!set) {
							res.status(400).json({
								status: 'error',
								message: 'Erro ao alterar a propriedade category',
							});
						}
						res.status(200).json({
							status: 'success',
							message: 'sucesso ao alterar a propriedade category',
							data: set,
						});
					} catch (error) {
						res.status(400).json({
							status: 'error',
							message: 'Erro ao alterar a propriedade category',
						});
					}
				}
				break;
			case 'DELETE':
				try {
					const response = await setRepository.deleteBySetId({ setId });
					if (!response) {
						res.status(400).json({
							status: 'error',
							message: 'Erro ao deletar o set',
						});
					}
					res.status(200).json({
						status: 'success',
						message: 'Sucesso ao deletar o set',
					});
				} catch (error) {
					res.status(400).json({
						status: 'error',
						message: 'Erro ao deletar o set',
					});
				}
				break;
			default:
				res.status(400).json({
					status: 'error',
					message: 'Metodo não permitido',
				});
		}
		return;
	}
	res.status(400).json({
		status: 'error',
		message: 'Usuario precisa estar logado',
	});
}
