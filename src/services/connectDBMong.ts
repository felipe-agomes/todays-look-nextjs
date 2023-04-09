import mongoose from 'mongoose';

// const { MONGODB_URL } = process.env;

export default async function connectDb() {
	// if (!MONGODB_URL) {
	// 	console.error(
	// 		new Error('Falta definir a variavel de ambiente do MONGODB_URL em .env')
	// 	);
	// 	return;
	// }
	try {
		await mongoose.connect('mongodb+srv://falmeidagomes13:jAqXsonpHB5S9hKN@cluster0.6yzyzud.mongodb.net/?retryWrites=true&w=majority');
		console.log('Conectado ao banco de dados');
	} catch (error) {
		console.error('Erro ao se conectar com o banco de dados: ' + error);
	}
}
