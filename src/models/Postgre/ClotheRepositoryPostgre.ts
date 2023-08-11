import { Clothe, User } from './Tables';

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
	toggleFavoriteByClotheId(data: {
		clotheId: string;
	}): Promise<ClotheData | null>;
	changeCategoryByClotheId(data: {
		clotheId: string;
		category: string;
	}): Promise<ClotheData | null>;
	deleteByClotheId(data: { clotheId: string }): Promise<string | null>;
	create(data: CreateClothe): Promise<ClotheData | null>;
}

export class ClotheRepositoryPostgre implements IClotheRepository {
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
	}): Promise<ClotheData | null> {
		try {
			const user = await User.findByPk(userId);
			if (!user) return null;
			const clothe: any = await Clothe.create({ category, key, image });
			await clothe.setUser(user);
			return clothe.toJSON();
		} catch (error) {
			throw new Error('Erro ao cadastrar roupa: ' + error.message);
		}
	}
	async getAllByUserId({ userId }: { userId: string }): Promise<ClotheData[]> {
		try {
			const user: any = await User.findByPk(userId, {
				include: Clothe,
			});
			if (!user) return null;
			return user.toJSON().clothes;
		} catch (error) {
			throw new Error('Erro ao buscar roupas: ' + error.message);
		}
	}
	async toggleFavoriteByClotheId({
		clotheId,
	}: {
		clotheId: string;
	}): Promise<ClotheData | null> {
		try {
			const clothe: any = await Clothe.findByPk(clotheId);
			if (!clothe) return null;
			clothe.favorite = !clothe.favorite;
			await clothe.save();
			return clothe.toJSON();
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
	}): Promise<ClotheData | null> {
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
	async deleteByClotheId({
		clotheId,
	}: {
		clotheId: string;
	}): Promise<string | null> {
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
const clotheRepository = new ClotheRepositoryPostgre();
export default clotheRepository;
