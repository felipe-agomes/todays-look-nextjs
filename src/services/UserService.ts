import { Response } from '@/@types/controller';
import { FrontController } from '@/controllers/FrontController';
import { FetcherAxios } from './Fetcher';

interface IUserService {
	create: (data: {
		name: string;
		email: string;
		password: string;
	}) => Promise<Response>;
	login: (data: { email: string; password: string }) => Promise<Response>;
}

export class UserService implements IUserService {
	constructor(private frontController: FrontController) {}
	async create(data: {
		name: string;
		email: string;
		password: string;
	}): Promise<Response> {
		try {
			const response = await this.frontController.doPost({
				url: '/api/protected/user',
				body: { user: data, operation: 'register' },
			});
			return response;
		} catch {
			return { status: 'error', message: 'Erro ao cadastrar usuário' };
		}
	}
	async login(data: { email: string; password: string }): Promise<Response> {
		try {
			const response = await this.frontController.doPost({
				url: '/api/protected/user',
				body: {
					user: data,
					operation: 'login',
				},
			});
			return response;
		} catch {
			return {
				status: 'error',
				message: 'Erro ao logar usuário',
			};
		}
	}
}

const makeUserService = () => {
	const fetcherAxios = new FetcherAxios();
	const frontController = new FrontController(fetcherAxios);
	const userService = new UserService(frontController);
	return userService;
};
const userService = makeUserService();
export { userService };
