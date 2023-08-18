import setRepository from '@/models/Postgre/SetRepositoryPostgre';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	switch (req.method) {
		case 'POST':
			try {
				const userId = req.query.userId as string;
				const setData = req.body.set;
				const response = await setRepository.create({ userId, ...setData });
				if (!response) {
					res.status(400).json({
						status: 'error',
						message: 'Erro ao criar conjunto',
					});
					return;
				}
				res.status(200).json({
					status: 'success',
					message: 'sucesso ao criar conjunto',
					data: response,
				});
			} catch (error) {
				res.status(400).json({
					status: 'error',
					message: 'Erro ao criar conjunto',
				});
			}
			break;
		case 'GET':
			try {
				const userId = req.query.userId as string;
				const response = await setRepository.getAllByUserId({ userId });
				if (!response) {
					res.status(400).json({
						status: 'error',
						message: 'Erro ao buscar conjuntos',
					});
					return;
				}
				res.status(200).json({
					status: 'success',
					message: 'Sucesso ao buscar conjuntos',
					data: response,
				});
			} catch (error) {
				res.status(400).json({
					status: 'error',
					message: 'Erro ao buscar conjuntos',
				});
			}
			break;
		default:
			res.status(400).json({
				status: 'error',
				message: 'Metodo não permitido',
			});
	}
}
