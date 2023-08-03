import { clotheModels } from '@/models/clotheModels_legacy';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function deleteClothe(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	// const session = await getSession({ req });
	const session = true;

	if (session) {
		const clotheId = req.query.clotheId;

		if (!(typeof clotheId === 'string')) {
			res.status(400).json({
				error: true,
				message: 'clotheId ou userId passados de forma incorreta',
			});
			return;
		}

		switch (req.method) {
			case 'DELETE':
				const response = await clotheModels.deleteClothe(clotheId);
				if (response.error) {
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
}
