import { uploadWithBackground } from '@/config/multerS3';
import clotheModels from '@/models/clotheModels';
import { NextApiRequest, NextApiResponse, PageConfig } from 'next';
import { createRouter, expressWrapper } from 'next-connect';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.use(expressWrapper(uploadWithBackground.single('image')));

router.post(async (req, res, next) => {
	// const session = await getSession({ req });
	const session = true;

	if (session) {
		const userId = Number(req.query.userId);
		const { originalname: key, location: image } = req.file;
		const { category, body } = req.body;
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
		res.status(500).json({
			error: (err as Error).message,
		});
	},
});

export const config: PageConfig = {
	api: {
		bodyParser: false,
	},
};
