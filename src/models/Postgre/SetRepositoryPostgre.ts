type CreateSet = {
	category: string;
	key: string;
	image: string;
	userId: string;
};

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
	getAllByUserId(data: { userId: string }): Promise<SetData[]>;
	toggleFavoriteBySetId(data: { setId: string }): Promise<SetData | null>;
	changeCategoryBySetId(data: {
		setId: string;
		category: string;
	}): Promise<SetData | null>;
	deleteBySetId(data: { setId: string }): Promise<string | null>;
	create(data: CreateSet): Promise<SetData | null>;
}

export default class SetRepositoryPostgre implements ISetRepository {
	async create(data: CreateSet): Promise<SetData> {
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
