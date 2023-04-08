import clotheModels from '@/models/clotheModels';
import { uploadWithBackground } from '@/utils/middleware';
import { NextApiRequest, NextApiResponse, PageConfig } from 'next';
import { createRouter, expressWrapper } from 'next-connect';

const router = createRouter<NextApiRequest, NextApiResponse>();

export type ExtendedRequest = {
	file?: {
		originalname: string;
		location: string;
	};
} & NextApiRequest;

router.use(
	expressWrapper<NextApiRequest, NextApiResponse>(
		uploadWithBackground.single('image')
	)
);

router.post(async (req: ExtendedRequest, res, next) => {
	// const session = await getSession({ req });
	const session = true;

	if (session) {
		const userId = Number(req.query?.userId);
		const { originalname: key, location: image } = req.file
			? req.file
			: { originalname: '', location: '' };
		const { category, body } = req.body ? req.body : { body: '', category: '' };
		const data = {
			key,
			category,
			body,
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
