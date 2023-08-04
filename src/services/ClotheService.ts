import { ClotheData, SetData } from '@/@types';
import { FetcherAxios } from './Fetcher';
import { FrontController, Response } from '@/controllers/FrontController';

export interface IService {
	getAllByUserId(data: { userId: string }): Promise<Response>;
	deleteById(data: { userId: string; clotheOrSetId: string }): Promise<Response>;
	changeCategoryById(data: {
		userId: string;
		clotheOrSetId: string;
		body: {
			toUpdate: { [key: string]: string };
			operation: string;
		};
	}): Promise<Response>;
	toggleFavoriteById(data: {
		userId: string;
		clotheOrSetId: string;
	}): Promise<Response>;
	create(data: {
		userId: string;
		toCreate: ClotheData | SetData;
	}): Promise<Response>;
}

export class ClotheService implements IService {
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
		clotheOrSetId,
		userId,
	}: {
		userId: string;
		clotheOrSetId: string;
	}): Promise<Response> {
		let response: Response;
		try {
			response = await this.frontController.doDelete({
				url: `/api/protected/user/${userId}/clothe/${clotheOrSetId}`,
			});
		} catch (error: any) {
			response = { status: 'error', message: error.message };
		}
		return response;
	}
	async changeCategoryById({
		userId,
		clotheOrSetId,
		body,
	}: {
		userId: string;
		clotheOrSetId: string;
		body: {
			toUpdate: { [key: string]: string };
			operation: string;
		};
	}): Promise<Response> {
		let response: Response;
		try {
			response = await this.frontController.doPut({
				url: `/api/protected/user/${userId}/clothe/${clotheOrSetId}`,
				body: { ...body, operation: 'changeCategory' },
			});
		} catch (error: any) {
			response = { status: 'error', message: error.message };
		}
		return response;
	}
	async toggleFavoriteById({
		clotheOrSetId,
		userId,
	}: {
		userId: string;
		clotheOrSetId: string;
	}): Promise<Response> {
		let response: Response;
		try {
			response = await this.frontController.doPut({
				url: `/api/protected/user/${userId}/clothe/${clotheOrSetId}`,
			});
		} catch (error: any) {
			response = { status: 'error', message: error.message };
		}
		return response;
	}
	async create({
		userId,
		toCreate,
	}: {
		userId: string;
		toCreate: ClotheData;
	}): Promise<Response> {
		let response: Response;
		try {
			response = await this.frontController.doPost({
				url: `/api/protected/user/${userId}/clothe/upload`,
				body: { toCreate },
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
