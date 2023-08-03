// import { S3Client } from '@aws-sdk/client-s3';
// import multer from 'multer';
// import multerS3 from 'multer-s3';
// const s3 = new S3Client({
// 	region: process.env.AWS_DEFAULT_REGION,
// });

// export const s3Upload = multerS3({
// 	bucket: 'todayslook',
// 	s3,
// 	acl: 'public-read',
// 	key(req, file, callback) {
// 		const filename = file.originalname.replace(' ', '_');

// 		callback(null, `${Date.now()}_${filename}`);
// 	},
// 	contentType: multerS3.AUTO_CONTENT_TYPE,
// });
