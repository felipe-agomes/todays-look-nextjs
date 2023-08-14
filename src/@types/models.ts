export type UserInput = {
	email: string;
	password: string;
	image: string;
};
export type ClotheInput = {
	category: string;
	key: string;
	image: string;
	userId: string;
};
export type SetInput = {
	userId: string;
	category: string;
	clothes: Array<ClotheData & { x: number; y: number }>;
};
export type UserData = {
	id: string;
	email: string;
	image: string;
	updatedAt: Date;
	createdAt: Date;
};
export type ClotheData = {
	favorite: boolean;
	id: string;
	category: string;
	key: string;
	image: string;
	updatedAt: Date;
	createdAt: Date;
	userId: string;
};
export type SetData = {
	id: string;
	userId: string;
	category: string;
	favorite: boolean;
	createdAt: Date;
	updatedAt: Date;
	clothes: ClothePosition[];
};

export type ClothePosition = { x: number; y: number } & ClotheData;
