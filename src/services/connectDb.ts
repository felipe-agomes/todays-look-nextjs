import mongoose from 'mongoose';

const { MONGODB_URL } = process.env;

export default async function connectDb() {
	try {
		await mongoose.connect(MONGODB_URL ?? '');
	} catch (error) {
		console.error('Erro ao se conectar com o banco de dados: ' + error);
	}
}
