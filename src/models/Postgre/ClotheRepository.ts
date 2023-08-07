import { ClotheData, IClotheRepository } from '../Mongo/ClotheModelMongo';
import { Clothe, User } from './Tables';

export class ClotheRepository implements IClotheRepository {
	constructor() {}
	async create({
		category,
		key,
		image,
		userId,
	}: {
		category: string;
		key: string;
		image: string;
		userId: string;
	}): Promise<ClotheData> {
		try {
			const user = await User.findByPk(userId);
			const clothe: any = await Clothe.create({ category, key, image });
			await clothe.setUser(user);
			return clothe.toJSON();
		} catch (error) {
			throw new Error('Erro ao cadastrar roupa: ' + error.message);
		}
	}
	async getAllByUserId({ userId }: { userId: string }): Promise<ClotheData[]> {
		try {
			const user = await User.findByPk(userId, {
				include: Clothe,
			});
			return user.toJSON().clothes;
		} catch (error) {
			throw new Error('Erro ao buscar roupas: ' + error.message);
		}
	}
	async toggleFavoriteByClotheId({
		clotheId,
	}: {
		clotheId: string;
	}): Promise<ClotheData> {
		try {
			const clothe: any = await Clothe.findByPk(clotheId);
			if (!clothe) return null;
			clothe.favorite = !clothe.favorite;
			await clothe.save();
			const clotheJSON = JSON.stringify(clothe) as any;
			return JSON.parse(clotheJSON);
		} catch (error) {
			throw new Error('Erro ao alterar a propriedade favorito: ' + error.message);
		}
	}
	async changeCategoryByClotheId({
		clotheId,
		category,
	}: {
		clotheId: string;
		category: string;
	}): Promise<ClotheData> {
		try {
			const clothe: any = await Clothe.findByPk(clotheId);
			if (!clothe) return null;
			clothe.category = category;
			await clothe.save();
			const clotheJSON = JSON.stringify(clothe);
			return JSON.parse(clotheJSON);
		} catch (error) {
			throw new Error('Erro ao alterar a categoria: ' + error.message);
		}
	}
	async deleteByClotheId({ clotheId }: { clotheId: string }): Promise<string> {
		try {
			const clothe = await Clothe.findByPk(clotheId);
			if (!clothe) return null;
			await clothe.destroy();
			return 'Roupa deletada com sucesso';
		} catch (error) {
			throw new Error('Erro ao deletar roupa: ' + error.message);
		}
	}
}
