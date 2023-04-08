import { s3Upload } from '@/config/multerS3';
import multer from 'multer';

export const uploadWithBackground = multer({
	storage: s3Upload,
	limits: { fileSize: 24_000_000 },
	fileFilter(req, file, callback) {
		const allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png'];

		if (allowedMimes.includes(file.mimetype)) {
			callback(null, true);
		} else {
			callback(new Error('Tipo inválido, envie uma imagem'));
		}
	},
});
