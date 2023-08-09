import { FrontController, Response } from '@/controllers/FrontController';
import { ClotheData, SetData, SetsProps } from '@/@types';
import { FetcherAxios } from './Fetcher';

export interface ISetService {
	getAllByUserId(data: { userId: string }): Promise<Response>;
	deleteById(data: { userId: string; set: string }): Promise<Response>;
	changeCategoryById(data: {
		userId: string;
		set: string;
		toUpdate: { category: string };
	}): Promise<Response>;
	toggleFavoriteById(data: {
		userId: string;
		set: string;
	}): Promise<Response>;
	create(data: {
		userId: string;
		clothe: ClotheData | SetData;
	}): Promise<Response>;
}

export class SetService implements ISetService {
	constructor(private frontController: FrontController) {}
	async getAllByUserId({ userId }: { userId: string }): Promise<Response> {
		let response: Response;
		try {
			response = await this.frontController.doGet({
				url: `/api/protected/user/${userId}/set/allSets`,
			});
		} catch (error: any) {
			response = { status: 'error', message: error.message };
		}
		return response;
	}
	async deleteById({
		set,
		userId,
	}: {
		userId: string;
		set: string;
	}): Promise<Response> {
		let response: Response;
		try {
			response = await this.frontController.doDelete({
				url: `/api/protected/user/${userId}/set/deleteSet/${set}`,
			});
		} catch (error: any) {
			response = { status: 'error', message: error.message };
		}
		return response;
	}
	async changeCategoryById({
		toUpdate,
		set,
		userId,
	}: {
		userId: string;
		set: string;
		toUpdate: { [key: string]: string };
	}): Promise<Response> {
		let response: Response;
		try {
			response = await this.frontController.doPut({
				url: `/api/protected/user/${userId}/set/updateCategorySet/${set}`,
				body: { toUpdate, operation: 'changeCategory' },
			});
		} catch (error: any) {
			response = { status: 'error', message: error.message };
		}
		return response;
	}
	async toggleFavoriteById({
		userId,
		set,
	}: {
		userId: string;
		set: string;
	}): Promise<Response> {
		let response: Response;
		try {
			response = await this.frontController.doPut({
				url: `/api/protected/user/${userId}/set/favoriteSet/${set}`,
				body: { operation: 'toggleFavorite' },
			});
		} catch (error: any) {
			response = { status: 'error', message: error.message };
		}
		return response;
	}
	async create({
		userId,
		clothe,
	}: {
		userId: string;
		clothe: SetData;
	}): Promise<Response> {
		let response: Response;
		try {
			response = await this.frontController.doPost({
				url: `/api/protected/user/${userId}/set/createSet`,
				body: { clothe },
			});
		} catch (error: any) {
			response = { status: 'error', message: error.message };
		}
		return response;
	}
}
const makeSetService = () => {
	const fetcher = new FetcherAxios();
	const frontController = new FrontController(fetcher);
	return new SetService(frontController);
};
export const setService = makeSetService();
