import mongoose from 'mongoose';
import Clothe from './colections/clothe';
import dotenv from 'dotenv';
dotenv.config();

type CreateClothe = {
	category: string;
	key: string;
	image: string;
	userId: string;
};

export type ClotheData = {
	id: number;
	category: string;
	favorite: boolean;
	key: string;
	image: string;
	userId: string;
	createdAt: string;
	updatedAt: string;
};

export interface IClotheRepository {
	getAllByUserId(data: { userId: string }): Promise<ClotheData[]>;
	toggleFavoriteByClotheId(data: { clotheId: string }): Promise<ClotheData>;
	changeCategoryByClotheId(data: {
		clotheId: string;
		category: string;
	}): Promise<ClotheData>;
	deleteByClotheId(data: { clotheId: string }): Promise<string>;
	create(data: CreateClothe): Promise<ClotheData>;
}

export class ClotheModelMongo implements IClotheRepository {
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
			throw new Error('Erro ao buscar roupas: ' + error.message);
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
			throw new Error('Erro ao alterar favorito: ' + error.message);
		}
		await this.disconnectDb();
		return clothe as ClotheData;
	}
	async changeCategoryByClotheId({
		clotheId,
		category,
	}: {
		clotheId: string;
		category: string;
	}): Promise<ClotheData> {
		await this.connectDb();
		let clothe: any;
		try {
			clothe = await Clothe.findById(clotheId);
			clothe.category = category;
			await clothe.save();
		} catch (error) {
			throw new Error('Erro ao alterar a categoria: ' + error.message);
		}
		await this.disconnectDb();
		return clothe as ClotheData;
	}
	async deleteByClotheId({ clotheId }: { clotheId: string }): Promise<string> {
		await this.connectDb();
		try {
			await Clothe.findByIdAndDelete(clotheId);
		} catch (error) {
			throw new Error('Erro ao deletar roupa: ' + error.message);
		}
		await this.disconnectDb();
		return 'Roupa deletada com sucesso';
	}
	async create(data: CreateClothe): Promise<ClotheData> {
		await this.connectDb();
		let clothe: any;
		try {
			clothe = await Clothe.create(data);
		} catch (error) {
			throw new Error('Erro ao cadastrar roupa: ' + error.message);
		}
		await this.disconnectDb();
		return clothe as ClotheData;
	}
}

export const clotheModelMongo = new ClotheModelMongo();
