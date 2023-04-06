import clotheModels from '@/models/clotheModels';
import { NextApiRequest, NextApiResponse, PageConfig } from 'next';
import { getSession } from 'next-auth/react';

export default async function setNewClothe(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const session = await getSession({ req });

	if (session) {
		const userId = Number(req.query.userId);
		const { key, category, body, favorite, image } = req.body;
		const data = {
			key,
			category,
			body,
			favorite,
			image,
			userId,
		};
		switch (req.method) {
			case 'POST':
				const response = await clotheModels.setNewClothe(data);
				if (response.error) {
					res.status(400).json(response);
					return;
				}
				res.status(200).json(response);
				return;
		}
		return;
	}
	res.status(400).json({
		error: true,
		message: 'Usuario precisa estar logado',
	});
}

// export const config: PageConfig = {
// 	api: {
// 		bodyParser: false,
// 	},
// };
