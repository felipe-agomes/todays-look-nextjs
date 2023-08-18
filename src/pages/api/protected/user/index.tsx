import userRepository from '@/models/Postgre/UserRepository';
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	switch (req.method) {
		case 'POST':
			try {
				const user = req.body.user;
				const [createdUser, created] = await userRepository.create(user);
				if (!createdUser || !created) {
					res.status(400).json({
						status: 'error',
						message: 'Erro ao cadastrar novo usuário',
					});
					return;
				}
				const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
					expiresIn: '7d',
				});
				res.status(200).json({
					status: 'success',
					message: 'Sucesso ao cadastrar novo usuário',
					data: { ...createdUser, token },
				});
			} catch {
				res.status(400).json({
					status: 'error',
					message: 'Erro ao cadastrar novo usuário',
				});
				return;
			}
			break;
		default:
			res.status(400).json({
				status: 'error',
				message: 'Metodo não permitido',
			});
	}
}
