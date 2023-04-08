import { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';

export type ExtendedSession = {
	user?: {
		email?: string | null;
		id?: string | null;
	};
} & Session;

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
			id: number;
		};
	};
	clothes: Clothes[] | null;
};

export type Clothes = {
	id: number;
	body: string;
	category: string;
	favorite: false;
	image: string;
	key: string;
	userId: number;
};

export type Response = {
	error: boolean;
	message: string;
	clothe: Clothes[] | null;
};

export type ClotheModel = {
	category: string;
	body: string;
	key: string;
	image: string;
	userId: number;
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

export type UserData = {
	id: number;
	email: string;
	name: string;
};
