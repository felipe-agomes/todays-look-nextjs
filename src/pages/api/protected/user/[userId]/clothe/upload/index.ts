import { ClotheModel } from '@/@types';
import clotheModels from '@/models/clotheModels';
import { uploadWithBackground } from '@/utils/middleware';
import { Request, Response } from 'express';
import { NextApiRequest, NextApiResponse, PageConfig } from 'next';
import { createRouter, expressWrapper } from 'next-connect';

const router = createRouter<Request, Response>();

export type ExtendedRequest = {
	file?: {
		originalname?: string;
		location?: string;
	};
} & Request;

router.use(expressWrapper(uploadWithBackground.single('image')));

router.post(async (req: ExtendedRequest, res) => {
	// const session = await getSession({ req });
	const session = true;

	if (session) {
		const userId = Number(req.query?.userId);
		const { originalname: key, location: image } = req.file
			? req.file
			: { originalname: '', location: '' };
		const { category } = req.body ? req.body : { category: '' };
		const data: ClotheModel = {
			key,
			category,
			image: image ?? '',
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
		message: 'Usuario precisa estar logado',
	});
});

export default router.handler({
	onError(err, req, res) {
		res.json({
			error: (err as Error).message,
		});
	},
});

export const config: PageConfig = {
	api: {
		bodyParser: false,
	},
};
