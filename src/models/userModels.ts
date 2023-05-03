import bcrypt from 'bcrypt';
import { UserLoginData, UserProps, UserRegisterData } from '@/@types';
import User from './colections/user';
import connectDb from '@/services/connectDb';

async function createUser(data: UserRegisterData) {
	await connectDb();
	data.password = await bcrypt.hash(data.password, 8);
	const user = await User.findOne({
		email: data.email,
	});

	if (user) {
		return {
			error: true,
			message: 'Email já cadastrado',
		};
	}

	try {
		await User.create(data);
		return {
			error: false,
			message: 'Usuario cadastrado com sucesso!',
		};
	} catch (error) {
		return {
			error: true,
			message: error,
		};
	}
}

async function userLogin(data: UserLoginData) {
	await connectDb();
	const user = await User.findOne({
		email: data.email,
	});

	if (!user) {
		return {
			error: true,
			message: 'Email ou senha inválidos',
		};
	}

	if (!user.password) {
		return {
			error: true,
			message: 'Usuario sem password',
		};
	}

	if (!(await bcrypt.compare(data.password, user.password))) {
		return {
			error: true,
			message: 'Email ou senha inválidos',
		};
	}

	return {
		error: false,
		message: 'Logado com sucesso',
		userLogged: user.id,
		userEmail: user.email,
		userName: user.name,
	};
}

async function deleteUser(id: number) {
	const user = await User.findById(id);

	if (!user) {
		return {
			error: true,
			message: 'Usuário não encontrado',
		};
	}

	const response = {
		error: false,
		message: `Usuario ${user.name} com o id ${user.id} deletado com sucesso `,
	};

	await User.findByIdAndDelete(id);

	return response;
}

async function getAllUsers(): Promise<{
	error: boolean;
	message: string;
	users?: UserProps[];
}> {
	const users: UserProps[] = await User.find();

	if (users.length === 0) {
		return {
			error: true,
			message: 'Nenhum usuario cadastrado',
		};
	}

	return {
		error: false,
		message: 'Requisição de todos os usuarios com sucesso',
		users,
	};
}

export const userModels = {
	createUser,
	userLogin,
	deleteUser,
	getAllUsers,
};
