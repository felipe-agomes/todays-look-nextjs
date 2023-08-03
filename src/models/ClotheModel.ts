interface IClotheModel {
	getAllByUserId(): Promise<void>;
	create(): Promise<void>;
	deleteByClotheId(): Promise<void>;
	toggleFavoriteByClotheId(): Promise<void>;
	changeCategoryByClotheId(): Promise<void>;
}

export class ClotheModelMongo implements IClotheModel {
	async getAllByUserId(): Promise<void> {}
	async create(): Promise<void> {}
	async deleteByClotheId(): Promise<void> {}
	async toggleFavoriteByClotheId(): Promise<void> {}
	async changeCategoryByClotheId(): Promise<void> {}
}
