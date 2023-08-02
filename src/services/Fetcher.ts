import axios from 'axios';
import { Response } from './FrontController';

export interface Ifetcher {
	get(data: { url: string }): Promise<Response>;
	post(data: { url: string; body: string }): Promise<Response>;
	put(data: { url: string; body: string }): Promise<Response>;
	delete(data: { url: string }): Promise<Response>;
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
	async put({ url, body }: { url: string; body: string }): Promise<Response> {
		let response: Response;
		try {
			response = await axios.put(url, body, {
				headers: { 'Content-Type': 'application/json' },
			});
		} catch (error: any) {
			response = { status: 'error', message: error.message };
		}
		return response;
	}
	async delete({ url }: { url: string }): Promise<Response> {
		let response: Response;
		try {
			response = await axios.delete(url);
		} catch (error: any) {
			response = { status: 'error', message: error.message };
		}
		return response;
	}
}
