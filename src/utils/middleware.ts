import { s3Upload } from '@/config/multerS3';
import multer from 'multer';

export const uploadImage = multer({
	storage: s3Upload,
	limits: { fileSize: 24_000_000 },
	fileFilter(req, file, callback) {
		if (file.mimetype.startsWith('image/')) {
			callback(null, true);
		} else {
			callback(new Error('Tipo inválido, envie uma imagem'));
		}
	},
});
