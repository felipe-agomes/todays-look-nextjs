import { Request } from 'express';
import mongoose from 'mongoose';
import { Session } from 'next-auth';

export type UserId = string;
export type ModalId = string;

export type ExtendedSession = {
	user?: {
		id: string;
	};
} & Session;

export type ExtendedRequest = {
	file?: {
		originalname?: string;
		location?: string;
	};
} & Request;

export type FormRegisterErrorValues = {
	username?: string;
	email?: string;
	password?: string;
	cpassword?: string;
};

export type FormRegisterValues = {
	username: string;
	email: string;
	password: string;
	cpassword: string;
};

export type FormLoginErrorValues = {
	email?: string;
	password?: string;
};

export type FormLoginValues = {
	email?: string;
	password?: string;
};

export type FormSendImageValues = {
	category?: string;
	file: File | null;
};

export type FormSendImageErrorValues = {
	category?: string;
	file?: string;
};

export type ClothesProps = {
	id: string;
	category: string;
	favorite: boolean;
	image: string;
	key: string;
	createdAt: Date;
	updatedAt: Date;
	userId: string;
};

export type SetsProps = {
	userId: string;
	id: string;
	category: string;
	favorite: boolean;
	sets: ClothePosition[];
};

export type UserProps = {
	name?: string;
	email?: string;
	password?: string;
	createdAt?: string;
	updatedAt?: string;
	_id?: string;
};

export type SetData = {
	userId: string;
	id: string;
	category: string;
	sets: ClothePosition[];
};

export type ClotheData = {
	category: string;
	image: string;
	key: string;
};

export type Response = {
	error: boolean;
	message: string;
	clothe: ClothesProps[] | null;
};

export type UserRegisterData = {
	name: string;
	email: string;
	password: string;
	image: string;
};

export type UserLoginData = {
	email: string;
	password: string;
};

export type SessionProps = {
	user: {
		name: string;
		email: string;
		id: string;
		image: string;
	};
};

export type ClotheResponse = {
	error: string;
	message: string;
	clothe: ClothesProps | ClothesProps[];
};

export type FetcherOptions = {
	method?: string;
	body?: string;
	update?: boolean;
};

export type ModalState = {
	changeCategoryModal: boolean;
	setModal: boolean;
	deleteModal: boolean;
	clotheModal: boolean;
	clothe: ClothesProps | null;
	set: SetsProps | null;
};

export type ClotheSchemaProps = {
	createdAt: NativeDate;
	updatedAt: NativeDate;
} & {
	favorite: boolean;
	category?: string | undefined;
	key?: string | undefined;
	image?: string | undefined;
	userId?: mongoose.Types.ObjectId | undefined;
};

export type SetsResponse = {
	error: string;
	message: string;
	sets: SetsProps | SetsProps[];
};

export type WhichModalProps =
	| 'clotheModal'
	| 'deleteModal'
	| 'changeCategoryModal'
	| 'setModal';

export type OpenOrCloseModalProps = {
	whichModal: WhichModalProps;
	operation: 'open' | 'close';
};

export type ClothePosition = {
	x: number;
	y: number;
} & ClothesProps;
