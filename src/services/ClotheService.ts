import { ClotheData, SetData } from '@/@types';
import { FetcherAxios } from './Fetcher';
import { FrontController, Response } from '@/controllers/FrontController';

export interface IClotheService {
	getAllByUserId(data: { userId: string }): Promise<Response>;
	deleteById(data: { userId: string; clothe: string }): Promise<Response>;
	changeCategoryById(data: {
		userId: string;
		clothe: string;
		toUpdate: { category: string };
	}): Promise<Response>;
	toggleFavoriteById(data: {
		userId: string;
		clothe: string;
	}): Promise<Response>;
	create(data: {
		userId: string;
		clothe: ClotheData | SetData;
	}): Promise<Response>;
}

export class ClotheService implements IClotheService {
	constructor(private frontController: FrontController) {}
	async getAllByUserId({ userId }: { userId: string }): Promise<Response> {
		let response: Response;
		try {
			response = await this.frontController.doGet({
				url: `/api/protected/user/${userId}/clothe`,
			});
		} catch (error: any) {
			response = { status: 'error', message: error.message };
		}
		return response;
	}
	async deleteById({
		clothe,
		userId,
	}: {
		userId: string;
		clothe: string;
	}): Promise<Response> {
		let response: Response;
		try {
			response = await this.frontController.doDelete({
				url: `/api/protected/user/${userId}/clothe/${clothe}`,
			});
		} catch (error: any) {
			response = { status: 'error', message: error.message };
		}
		return response;
	}
	async changeCategoryById({
		userId,
		clothe,
		toUpdate,
	}: {
		userId: string;
		clothe: string;
		toUpdate: { category: string };
	}): Promise<Response> {
		let response: Response;
		try {
			response = await this.frontController.doPut({
				url: `/api/protected/user/${userId}/clothe/${clothe}`,
				body: { toUpdate, operation: 'changeCategory' },
			});
		} catch (error: any) {
			response = { status: 'error', message: error.message };
		}
		return response;
	}
	async toggleFavoriteById({
		userId,
		clothe,
	}: {
		userId: string;
		clothe: string;
	}): Promise<Response> {
		let response: Response;
		try {
			response = await this.frontController.doPut({
				url: `/api/protected/user/${userId}/clothe/${clothe}`,
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
		clothe: ClotheData;
	}): Promise<Response> {
		let response: Response;
		console.log('aquiiii', { clothe });
		try {
			response = await this.frontController.doPost({
				url: `/api/protected/user/${userId}/clothe`,
				body: { clothe },
			});
		} catch (error: any) {
			response = { status: 'error', message: error.message };
		}
		return response;
	}
}
const makeClotheService = () => {
	const fetcher = new FetcherAxios();
	const frontController = new FrontController(fetcher);
	return new ClotheService(frontController);
};
export const clotheService = makeClotheService();
