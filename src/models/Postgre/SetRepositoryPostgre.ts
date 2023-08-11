import { ClothePosition } from '@/@types';
import { User } from './Tables';

type CreateSet = {
	userId: string;
} & ClothePosition;

// export type ClothesProps = {
// 	id: string;
// 	category: string;
// 	favorite: false;
// 	image: string;
// 	key: string;
// 	userId: string;
// };

export type SetData = {
	id: number;
	category: string;
	favorite: boolean;
	userId: string;
	x: number;
	y: number;
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

export default class SetRepositoryPostgre implements ISetRepository {
	async create(data: CreateSet): Promise<SetData> {
		const teste = await User.create({
			email: 'teste',
			password: 'pass',
			image: 'image',
		});
		return '' as any;
	}
	async getAllByUserId(data: { userId: string }): Promise<SetData[]> {
		return '' as any;
	}
	async toggleFavoriteBySetId(data: { setId: string }): Promise<SetData> {
		return '' as any;
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
