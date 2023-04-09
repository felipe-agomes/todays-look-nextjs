import mongoose from 'mongoose';

const { MONGODB_URL } = process.env;

export default async function connectDb() {
	try {
		await mongoose.connect(MONGODB_URL ?? '');
		console.log('Conectado ao banco de dados');
	} catch (error) {
		console.error('Erro ao se conectar com o banco de dados: ' + error);
	}
}
