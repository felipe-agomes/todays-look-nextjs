import { ClothePosition } from '@/@types';
import { Clothe, Set, User } from './Tables';

type CreateSet = {
	userId: string;
	category: string;
	clothes: ClothePosition[];
};

export type SetData = {
	id: number;
	category: string;
	favorite: boolean;
	userId: string;
	set: ClothePosition[];
	createdAt: string;
	updatedAt: string;
};

export interface ISetRepository {
	create(data: CreateSet): Promise<SetData | null>;
	getAllByUserId(data: { userId: string }): Promise<SetData[]>;
	toggleFavoriteBySetId(data: { setId: string }): Promise<SetData | null>;
	changeCategoryBySetId(data: {
		setId: string;
		category: string;
	}): Promise<SetData | null>;
	deleteBySetId(data: { setId: string }): Promise<string | null>;
}

export class SetRepositoryPostgre implements ISetRepository {
	async create({ category, clothes, userId }: CreateSet): Promise<SetData> {
		try {
			const set: any = await Set.create({ category });
			const user = await User.findByPk(userId);
			if (!user) return null;
			await set.setUser(user);
			clothes.forEach(async (clothe) => {
				const newClothe = await Clothe.findByPk(clothe.id);
				await set.addClothes(newClothe, { through: { x: clothe.x, y: clothe.y } });
			});
			const arrayClothes = await set.getClothes();
			return arrayClothes.map((clothe: any) => clothe.toJSON());
		} catch (error) {
			throw new Error('Erro ao cadastrar conjunto: ' + error.message);
		}
	}
	async getAllByUserId({ userId }: { userId: string }): Promise<SetData[]> {
		try {
			const sets = await User.findByPk(userId, {
				attributes: [],
				include: { association: 'sets' },
			});
			if (!sets) return null;
			return sets.toJSON();
		} catch (error) {
			throw new Error('Erro ao encontrar conjuntos: ' + error.message);
		}
	}
	async toggleFavoriteBySetId({ setId }: { setId: string }): Promise<SetData> {
		try {
			const sets: any = await Set.findByPk(setId);
			if (!sets) return null;
			sets.favorite = !sets.favorite;
			await sets.save();
			return sets.toJSON();
		} catch (error) {
			throw new Error('Erro ao alterar a propriedade favorito: ' + error.message);
		}
	}
	async deleteBySetId(data: { setId: string }): Promise<string> {
		return '' as any;
	}
	async changeCategoryBySetId(data: {
		setId: string;
		category: string;
	}): Promise<SetData> {
		return '' as any;
	}
}

const setRepository = new SetRepositoryPostgre();
export default setRepository;
