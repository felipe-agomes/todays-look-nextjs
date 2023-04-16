import { Request } from 'express';
import { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';

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

export type ExtendedJWT = {
	uid?: string;
} & JWT;

export type FormRegisterErrorValues = {
	username?: string;
	email?: string;
	password?: string;
	cpassword?: string;
};

export type FormLoginValues = {
	email?: string;
	password?: string;
};

export type FormLoginErrorValues = {
	email?: string;
	password?: string;
};

export type FormRegisterValues = {
	username: string;
	email: string;
	password: string;
	cpassword: string;
};

export type UserSession = {
	session: {
		user: {
			email: string;
			user: string;
			id: string;
		};
	};
	clothes: Clothes[] | null;
};

export type Clothes = {
	id: string;
	category: string;
	favorite: false;
	image: string;
	key: string;
	userId: string;
};

export type Response = {
	error: boolean;
	message: string;
	clothe: Clothes[] | null;
};

export type UserRegisterData = {
	name: string;
	email: string;
	password: string;
};

export type UserLoginData = {
	email: string;
	password: string;
};

export type UserModel = {
	name?: string;
	email?: string;
	password?: string;
	createdAt?: string;
	updatedAt?: string;
	_id?: string;
};

export type ClotheModel = {
	category?: string;
	key?: string;
	image?: string;
	userId?: string;
	createdAt?: string;
	updatedAt?: string;
	_id?: string;
};

export type ClotheData = {
	category: string;
	userId: string;
	image: string;
	key: string;
};

export type FormSendImageValues = {
	category?: string;
	file?: string;
};

export type FormSendImageErrorValues = {
	category?: string;
	file?: string;
};

export type SessionProps = {
	user: {
		name: string;
		email: string;
		id: string;
	};
};