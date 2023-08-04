import { IFetcher } from '@/services/Fetcher';

export type Response = {
	status: string;
	message: string;
	data?: any;
};

export class FrontController {
	constructor(private fetcher: IFetcher) {}
	async doGet({ url }: { url: string }): Promise<Response> {
		let response: Response;
		try {
			response = await this.fetcher.get({ url });
		} catch (error: any) {
			response = { message: error.message, status: 'error' };
		}

		return response;
	}
	async doPost({
		url,
		body,
	}: {
		url: string;
		body: { [key: string]: any };
	}): Promise<Response> {
		let response: Response;
		try {
			response = await this.fetcher.post({ url, body: JSON.stringify(body) });
		} catch (error: any) {
			response = { message: error.message, status: 'error' };
		}

		return response;
	}
	async doPut({
		url,
		body,
	}: {
		url: string;
		body?: { [key: string]: any };
	}): Promise<Response> {
		let response: Response;
		try {
			response = await this.fetcher.put({
				url,
				body: JSON.stringify(body),
			});
		} catch (error: any) {
			response = { status: 'error', message: error.message };
		}
		return response;
	}
	async doDelete({ url }: { url: string }): Promise<Response> {
		let response: Response;
		try {
			response = await this.fetcher.delete({ url });
		} catch (error: any) {
			response = { status: 'error', message: error.message };
		}
		return response;
	}
}
