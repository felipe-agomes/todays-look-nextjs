import { Response } from '@/@types/controller';
import { FrontController } from '@/controllers/FrontController';
import { FetcherAxios } from './Fetcher';

interface IUserService {
	create: (data: {
		name: string;
		email: string;
		password: string;
	}) => Promise<Response>;
	getUserData(): Promise<Response>;

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
	async getUserData() {
		try {
			const response = await this.frontController.doGet({
				url: '/api/protected/user',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			});
			return response;
		} catch {
			return { status: 'error', message: 'Erro ao buscar usuário' };
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
			console.log({ userService: response });
			return response;
		} catch (error) {
			console.log({ userServiceError: error.message });
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
