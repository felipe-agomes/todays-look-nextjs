import axios from 'axios';
import {
	doDeleteSuccessDataResponse,
	doGetAndDoDeleteUrl,
	doGetSuccessDataResponse,
	doPostRequestString,
	doPostSuccessDataResponse,
	doPutRequest,
	doPutRequestString,
	doPutSuccessDataResponse,
	emptySuccessDataResponse,
	errorMessage,
} from '../controllers/FrontController.spec';
import { FetcherAxios } from '@/services/Fetcher';

const makeSut = () => {
	const fetcherAxios = new FetcherAxios();
	return { fetcherAxios };
};

const doDeleteSuccessDataResponseAxios = {
	data: {
		...doDeleteSuccessDataResponse,
	},
};

const doPutSuccessDataResponseAxios = {
	data: {
		...doPutSuccessDataResponse,
	},
};

const doPostSuccessDataResponseAxios = {
	data: {
		...doPostSuccessDataResponse,
	},
};

const emptySuccessDataResponseAxios = {
	data: {
		...emptySuccessDataResponse,
	},
};

const doGetSuccessDataResponseAxios = {
	data: {
		...doGetSuccessDataResponse,
	},
};

describe('FetcherAxios', () => {
	describe('get()', () => {
		it('should call the metodo axios.get()', async () => {
			const { fetcherAxios: sut } = makeSut();
			const spyGet = jest.spyOn(axios, 'get');
			(spyGet as jest.SpyInstance).mockResolvedValue({ data: {} });

			await sut.get(doGetAndDoDeleteUrl);

			expect(spyGet).toHaveBeenCalledWith('/teste');
			expect(spyGet).toHaveBeenCalledTimes(1);
		});

		it('should to throw a error if fetcher throw a error ', async () => {
			const { fetcherAxios: sut } = makeSut();
			axios.get = jest.fn().mockRejectedValueOnce(new Error('erro'));

			const result = await sut.get(doGetAndDoDeleteUrl);

			expect(result).toEqual(errorMessage);
		});

		it('should return the data of response if find the data', async () => {
			const { fetcherAxios: sut } = makeSut();
			axios.get = jest.fn().mockResolvedValueOnce(doGetSuccessDataResponseAxios);

			const result = await sut.get(doGetAndDoDeleteUrl);

			expect(result).toEqual(doGetSuccessDataResponse);
		});

		it('should return the data of response with the prop data empty if nothing to find', async () => {
			const { fetcherAxios: sut } = makeSut();
			axios.get = jest.fn().mockResolvedValueOnce(emptySuccessDataResponseAxios);

			const result = await sut.get(doGetAndDoDeleteUrl);

			expect(result).toEqual(emptySuccessDataResponse);
		});
	});

	describe('post()', () => {
		it('should call axios.post() with correct params', async () => {
			const { fetcherAxios: sut } = makeSut();
			const spyPost = jest.spyOn(axios, 'post');
			(spyPost as jest.SpyInstance).mockResolvedValueOnce({ data: {} });

			await sut.post(doPostRequestString);

			expect(spyPost).toHaveBeenCalledWith('/teste', doPostRequestString.body, {
				headers: { 'Content-Type': 'application/json' },
			});
			expect(spyPost).toHaveBeenCalledTimes(1);
		});

		it('should to throw a error if fetcher throw a error ', async () => {
			const { fetcherAxios: sut } = makeSut();
			axios.post = jest.fn().mockRejectedValueOnce(new Error('erro'));

			await expect(sut.post(doPostRequestString)).rejects.toThrow();
		});

		it('should return the data of response', async () => {
			const { fetcherAxios: sut } = makeSut();
			axios.post = jest.fn().mockResolvedValueOnce(doPostSuccessDataResponseAxios);

			const result = await sut.post(doPostRequestString);

			expect(result).toEqual(doPostSuccessDataResponse);
		});
	});

	describe('put()', () => {
		it('should call axios.put()', async () => {
			const { fetcherAxios: sut } = makeSut();
			const spyPut = jest.spyOn(axios, 'put');
			(spyPut as jest.SpyInstance).mockResolvedValueOnce({ data: {} });

			await sut.put(doPutRequestString);

			expect(spyPut).toHaveBeenCalledWith(
				doPutRequestString.url,
				doPutRequestString.body,
				{
					headers: { 'Content-Type': 'application/json' },
				},
			);
			expect(spyPut).toHaveBeenCalledTimes(1);
		});

		it('should to throw a error if fetcher throw a error ', async () => {
			const { fetcherAxios: sut } = makeSut();
			axios.put = jest.fn().mockRejectedValueOnce(new Error('erro'));

			const result = await sut.put(doPutRequestString);

			expect(result).toEqual(errorMessage);
		});

		it('should return the data of response', async () => {
			const { fetcherAxios: sut } = makeSut();
			axios.put = jest.fn().mockResolvedValueOnce(doPutSuccessDataResponseAxios);

			const result = await sut.put(doPutRequestString);

			expect(result).toEqual(doPutSuccessDataResponse);
		});
	});

	describe('delete()', () => {
		it('should call axios.delete()', async () => {
			const { fetcherAxios: sut } = makeSut();
			const spyDelete = jest.spyOn(axios, 'delete');
			(spyDelete as jest.SpyInstance).mockResolvedValueOnce({ data: {} });

			await sut.delete(doGetAndDoDeleteUrl);

			expect(spyDelete).toHaveBeenCalledWith(doGetAndDoDeleteUrl.url);
			expect(spyDelete).toHaveBeenCalledTimes(1);
		});

		it('should to throw a error if fetcher throw a error ', async () => {
			const { fetcherAxios: sut } = makeSut();
			axios.delete = jest.fn().mockRejectedValueOnce(new Error('erro'));

			const result = await sut.delete(doGetAndDoDeleteUrl);

			expect(result).toEqual(errorMessage);
		});

		it('should return the data of response', async () => {
			const { fetcherAxios: sut } = makeSut();
			axios.delete = jest
				.fn()
				.mockResolvedValueOnce(doDeleteSuccessDataResponseAxios);

			const result = await sut.delete(doGetAndDoDeleteUrl);

			expect(result).toEqual(doDeleteSuccessDataResponse);
		});
	});
});
