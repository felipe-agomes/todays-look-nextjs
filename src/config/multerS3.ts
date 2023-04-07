import { S3Client } from '@aws-sdk/client-s3';
import multer from 'multer';
import multerS3 from 'multer-s3';
const s3 = new S3Client({
	region: process.env.AWS_DEFAULT_REGION,
});

const localUpload = multer.diskStorage({
	destination: 'uploads/clothes/',
	filename(_req, file, callback) {
		const fileName = file.originalname.replace(' ', '_');

		callback(null, `${Date.now()}_${fileName}`);
	},
});

const s3Upload = multerS3({
	bucket: 'todayslook',
	s3,
	acl: 'public-read',
	key(req, file, callback) {
		const filename = file.originalname.replace(' ', '_');

		callback(null, `${Date.now()}_${filename}`);
	},
	contentType: multerS3.AUTO_CONTENT_TYPE,
});

export const upload = multer({
	storage:
		localUpload /* To dev storageConfig.localUpload or to deploy storageConfig.bucketUpload  */,
	limits: { fileSize: 24_000_000 },
	fileFilter(_req, file, callback) {
		const allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png'];
		if (allowedMimes.includes(file.mimetype)) {
			callback(null, true);
		} else {
			callback(new Error('Invalid file type'));
		}
	},
});

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