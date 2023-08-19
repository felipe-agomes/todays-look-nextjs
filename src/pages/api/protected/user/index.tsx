import userRepository from '@/models/Postgre/UserRepository';
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	switch (req.method) {
		case 'POST':
			const operation = req.body.operation;
			if (operation === 'register') {
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
				return;
			}
			if (operation === 'login') {
				try {
					const user = req.body.user;
					const response = await userRepository.login(user);
					if (!response) {
						res.status(400).json({
							status: 'error',
							message: 'Usuário não existe',
						});
						return;
					}
					const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
						expiresIn: '7d',
					});
					res.status(200).json({
						status: 'success',
						message: 'Sucesso ao efetuar login',
						data: { ...response, token },
					});
					return;
				} catch {
					res.status(400).json({
						status: 'error',
						message: 'Erro ao efetuar login',
					});
				}
			}
			break;
		default:
			res.status(400).json({
				status: 'error',
				message: 'Metodo não permitido',
			});
	}
}
