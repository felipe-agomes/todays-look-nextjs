import clotheRepository from '@/models/Postgre/ClotheRepositoryPostgre';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const session = await getServerSession(req, res, authOptions);
	if (session) {
		let userId: string;
		switch (req.method) {
			case 'GET':
				userId = req.query.userId as string;
				try {
					const clothes = await clotheRepository.getAllByUserId({ userId });
					res.status(200).json({
						status: 'success',
						message: 'Roupas buscadas com sucesso',
						data: clothes,
					});
				} catch {
					res.status(400).json({
						status: 'error',
						message: 'Erro ao buscar roupas',
					});
				}
				break;
			case 'POST':
				const newClothe = req.body.clothe;
				userId = req.query.userId as string;
				try {
					const clothe = await clotheRepository.create({ ...newClothe, userId });
					if (!clothe) {
						res.status(400).json({
							status: 'error',
							message: 'Erro ao cadastrar uma ruopa nova',
						});
						return;
					}
					res.status(200).json({
						status: 'success',
						message: 'Sucesso ao cadastrar roupa nova',
						data: { ...clothe },
					});
				} catch (error) {
					res.status(400).json({
						status: 'error',
						message: 'Erro ao cadastrar uma ruopa nova',
					});
				}
			default:
				if (req.method !== 'GET') {
					res.status(400).json({
						status: 'error',
						message: 'Metodo não permitido',
					});
					return;
				}
				break;
		}
		return;
	}
	res.status(400).json({
		status: 'error',
		message: 'Usuario precisa estar logado',
	});
}
