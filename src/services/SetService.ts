import { FrontController, Response } from '@/controllers/FrontController';
import { IService } from './ClotheService';
import { ClotheData, SetData, SetsProps } from '@/@types';
import { FetcherAxios } from './Fetcher';

export class SetService implements IService {
	constructor(private frontController: FrontController) {}
	async getAllByUserId({ userId }: { userId: string }): Promise<Response> {
		let response: Response;
		try {
			response = await this.frontController.doGet({
				url: `/api/protected/user/${userId}/clothe/allSets`,
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
				url: `/api/protected/user/${userId}/clothe/deleteSet/${clotheOrSetId}`,
			});
		} catch (error: any) {
			response = { status: 'error', message: error.message };
		}
		return response;
	}
	async changeCategoryById({
		userId,
		clotheOrSetId,
		toUpdate,
	}: {
		userId: string;
		clotheOrSetId: string;
		toUpdate: { [key: string]: string };
	}): Promise<Response> {
		let response: Response;
		try {
			response = await this.frontController.doPut({
				url: `/api/protected/user/${userId}/clothe/updateCategorySet/${clotheOrSetId}`,
				toUpdate,
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
				url: `/api/protected/user/${userId}/clothe/favoriteSet/${clotheOrSetId}`,
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
		toCreate: SetData;
	}): Promise<Response> {
		let response: Response;
		try {
			response = await this.frontController.doPost({
				url: `/api/protected/user/${userId}/clothe/createSet`,
				body: { toCreate },
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
