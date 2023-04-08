import User, { UsersAttributes } from './schema/user';
import bcrypt from 'bcrypt';
import { UserLoginData, UserRegisterData } from '@/@types';

const { JWT_SECRETKEY } = process.env;

async function createUser(data: UserRegisterData) {
	data.password = await bcrypt.hash(data.password, 8);
	const user = await User.findOne({
		where: {
			email: data.email,
		},
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
	const user = await User.findOne({
		attributes: ['id', 'name', 'email', 'password'],
		where: {
			email: data.email,
		},
	});

	if (!user) {
		return {
			error: true,
			message: 'Email ou senha inválidos: email inválido',
		};
	}

	if (!(await bcrypt.compare(data.password, user.password))) {
		return {
			error: true,
			message: 'Email ou senha inválidos: Senha errada',
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
	const user = await User.findOne({
		attributes: ['id', 'name', 'email'],
		where: {
			id,
		},
	});

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

	await User.destroy({
		where: {
			id,
		},
	});

	return response;
}

async function getAllUsers(): Promise<{
	error: boolean;
	message: string;
	users?: UsersAttributes[];
}> {
	const users = await User.findAll({
		attributes: ['id', 'name', 'email'],
	});

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

const userModels = {
	createUser,
	userLogin,
	deleteUser,
	getAllUsers,
};

export default userModels;
