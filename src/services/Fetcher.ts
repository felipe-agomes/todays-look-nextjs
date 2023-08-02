import axios from 'axios';
import { Response } from './FrontController';

export interface Ifetcher {
	get(data: { url: string }): Promise<any>;
	post(data: { url: string; body: string }): Promise<any>;
	update(data: { url: string; body: string }): Promise<any>;
	delete(data: { url: string }): Promise<any>;
}

export class FetcherAxios implements Ifetcher {
	constructor() {}
	async get({ url }: { url: string }): Promise<Response> {
		let response: Response;
		try {
			response = await axios.get(url);
		} catch (error: any) {
			response = { status: 'error', message: error.message };
		}
		return response;
	}
	async post({ url, body }: { url: string; body: string }): Promise<Response> {
		let response: Response;
		try {
			response = await axios.post(url, body, {
				headers: { 'Content-Type': 'application/json' },
			});
		} catch (error: any) {
			throw new Error(error.message);
		}
		return response;
	}
	async update(data: { url: string; body: string }): Promise<any> {}
	async delete(data: { url: string }): Promise<any> {}
}
