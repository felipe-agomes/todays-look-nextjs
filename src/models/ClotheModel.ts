import mongoose from 'mongoose';
import Clothe from './colections/clothe';
import dotenv from 'dotenv';
dotenv.config();

type ClotheData = {
	id: string;
	category: string;
	favorite: boolean;
	key: string;
	image: string;
	userId: string;
	createdAt: string;
	updatedAt: string;
};

interface IClotheModel {
	getAllByUserId(data: { userId: string }): Promise<ClotheData[]>;
	toggleFavoriteByClotheId(data: { clotheId: string }): Promise<ClotheData>;
	create(): Promise<void>;
	deleteByClotheId(): Promise<void>;
	changeCategoryByClotheId(): Promise<void>;
}

export class ClotheModelMongo implements IClotheModel {
	constructor() {}
	async connectDb() {
		const { MONGODB_URL } = process.env;
		if (!MONGODB_URL)
			throw new Error('Erro ao se conectar ao banco de dados, falta credenciais');
		try {
			await mongoose.connect(MONGODB_URL);
		} catch (error) {
			throw new Error('Erro ao se conectar ao banco de dados');
		}
	}

	async disconnectDb() {
		await mongoose.disconnect();
	}

	async getAllByUserId({ userId }: { userId: string }): Promise<ClotheData[]> {
		await this.connectDb();
		let clothes: any[];
		try {
			clothes = await Clothe.find({ userId });
		} catch (error) {
			throw new Error('Erro ao buscar roupas');
		}
		await this.disconnectDb();
		if (!clothes) return [];
		return clothes;
	}

	async toggleFavoriteByClotheId({
		clotheId,
	}: {
		clotheId: string;
	}): Promise<ClotheData> {
		await this.connectDb();
		let clothe: any;
		try {
			clothe = await Clothe.findById(clotheId);
			clothe.favorite = !clothe.favorite;
			await clothe.save();
		} catch (error) {
			throw new Error('Erro ao alterar favorito');
		}
		await this.disconnectDb();
		return clothe as ClotheData;
	}
	async create(): Promise<void> {}
	async deleteByClotheId(): Promise<void> {}
	async changeCategoryByClotheId(): Promise<void> {}
}

export const makeClotheModelMongo = () => {
	const clotheModelMongo = new ClotheModelMongo();
	return { clotheModelMongo };
};
