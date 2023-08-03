import { clotheModels } from '@/models/clotheModels';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function updateCategory(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	// const session = await getSession({ req });
	const session = true;

	const { clotheId } = req.query;
	const { toUpdate } = req.body;

	if (session) {
		if (!(typeof clotheId === 'string')) {
			res.status(400).json({
				error: true,
				message: 'clotheId  passados de forma incorreta',
			});
			return;
		}

		switch (req.method) {
			case 'PUT':
				const response = await clotheModels.updateCategory(clotheId, toUpdate);

				if (response.status === 'error') {
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
		return;
	}

	res.status(400).json({
		error: true,
		message: 'Usuário precisa estar logado',
	});
}
