import bcrypt from 'bcrypt';
import { User } from './Tables';
import { UserInput, UserData } from '@/@types/models';

interface IUserRepository {
	create(data: UserInput): Promise<UserData | null>;
	deleteById(data: { userId: number }): Promise<string>;
	getAll(): Promise<UserData[]>;
	login(data: { email: string; password: string }): Promise<UserData>;
}

export class UserRepositoryPostgre implements IUserRepository {
	constructor() {}
	async create(data: UserInput): Promise<UserData | null> {
		try {
			data.password = await bcrypt.hash(data.password, 10);
			const [user, created] = await User.findOrCreate({
				where: {
					email: data.email,
				},
				defaults: { ...data },
			});
			if (!created) return null;
			const userJSON = user.toJSON();
			delete userJSON.password;
			return userJSON as UserData;
		} catch (error) {
			throw new Error('Erro ao buscar usuário: ' + error.message);
		}
	}
	async deleteById({ userId }: { userId: number }): Promise<string> {
		try {
			const user = await User.findByPk(userId);
			await user.destroy({ force: true });
			return 'Usuário deletado com sucesso';
		} catch (error) {
			throw new Error('Erro ao deletar usuário: ' + error.message);
		}
	}
	async getAll(): Promise<UserData[]> {
		try {
			const users = await User.findAll();
			return users.map((user: any) => {
				delete user.password;
				return user.toJSON();
			});
		} catch (error) {
			throw new Error('Erro ao buscar usuários: ' + error.message);
		}
	}
	async login({
		email,
		password,
	}: {
		email: string;
		password: string;
	}): Promise<UserData> {
		try {
			const user: any = await User.findOne({ where: { email } });
			if (!user) return null;
			if (await bcrypt.compare(password, user.password)) {
				const userJSON = user.toJSON();
				delete userJSON.password;
				return userJSON as UserData;
			} else {
				return null;
			}
		} catch (error) {
			throw new Error('Erro ao fazer login: ' + error.message);
		}
	}
}

const userRepository = new UserRepositoryPostgre();
export default userRepository;
