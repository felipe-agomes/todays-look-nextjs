import { Response } from '@/@types/controller';
import axios from 'axios';

export interface IFetcher {
	get(data: { url: string }): Promise<Response>;
	post(data: { url: string; body: string }): Promise<Response>;
	put(data: { url: string; body: string }): Promise<Response>;
	delete(data: { url: string }): Promise<Response>;
}

export class FetcherAxios implements IFetcher {
	constructor() {}
	async get({ url }: { url: string }): Promise<Response> {
		let response: Response;
		try {
			const { data } = await axios.get(url);
			response = data as Response;
		} catch (error: any) {
			throw new Error('Erro ao buscar dados: ' + error.message);
		}
		return response;
	}
	async post({ url, body }: { url: string; body: string }): Promise<Response> {
		let response: Response;
		try {
			const { data } = await axios.post(url, body, {
				headers: { 'Content-Type': 'application/json' },
			});
			response = data as Response;
		} catch (error: any) {
			throw new Error('Erro ao enviar dados: ' + error.message);
		}
		return response;
	}
	async put({ url, body }: { url: string; body: string }): Promise<Response> {
		let response: Response;
		try {
			const { data } = await axios.put(url, body, {
				headers: { 'Content-Type': 'application/json' },
			});
			response = data as Response;
		} catch (error: any) {
			throw new Error('Erro ao atualizar dados: erro' + error.message);
		}
		return response;
	}
	async delete({ url }: { url: string }): Promise<Response> {
		let response: Response;
		try {
			const { data } = await axios.delete(url);
			response = data as Response;
		} catch (error: any) {
			throw new Error('Erro ao deletar dados: ' + error.message);
		}
		return response;
	}
}
