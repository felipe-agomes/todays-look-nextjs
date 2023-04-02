import userModels from '@/models/userModels';
import { NextApiRequest, NextApiResponse } from 'next';
import JWT from 'jsonwebtoken';
import tokenGenerate from '@/utils/tokenGenerate';

export default async function userLogin(
	req: NextApiRequest,
	res: NextApiResponse
) {
	switch (req.method) {
		case 'POST':
			const response = await userModels.userLogin(req.body);
			if (response.error) {
				res.status(400).json(response);
				return;
			}
			const token = tokenGenerate(response.userLogged!);

			res.status(200).json({ ...response, token });
			return;
	}
}
