import { FetcherAxios } from '../../services/Fetcher';
import { FrontController } from '../../controllers/FrontController';

export const makeSut = () => {
	const fetcher = new FetcherAxios();
	const frontController = new FrontController(fetcher);
	return { frontController, fetcher };
};

export const doGetSuccessDataResponse = {
	status: 'success',
	message: 'Dados buscados com sucesso',
	data: [
		{ id: '123', name: 'teste' },
		{ id: '123', name: 'teste' },
	],
};

export const doGetSuccessDataResponseString = {
	status: 'success',
	message: 'Dados buscados com sucesso',
	data: JSON.stringify(doGetSuccessDataResponse.data),
};

export const emptySuccessDataResponse = {
	status: 'success',
	message: 'Dados buscados com sucesso',
	data: [],
};

export const doGetAndDoDeleteUrl = { url: '/teste' };

export const doDeleteSuccessDataResponse = {
	status: 'success',
	message: 'Sucesso ao deletar usuário',
};

export const doPutRequest = {
	url: '/teste',
	body: {
		toUpdate: { name: 'new-name', email: 'new-email' },
		operation: 'changeCategory',
	},
};

export const doPutRequestString = {
	url: doPutRequest.url,
	body: JSON.stringify(doPutRequest.body),
};

export const doPutSuccessDataResponse = {
	status: 'success',
	message: 'Dados buscados com sucesso',
	data: JSON.stringify(doPutRequest.body),
};

export const doPostRequest = {
	url: '/teste',
	body: { userName: 'user', email: 'email' },
};

export const doPostRequestString = {
	url: doPostRequest.url,
	body: JSON.stringify(doPostRequest.body),
};

export const doPostSuccessDataResponse = {
	status: 'success',
	message: 'Usuário cadastrado com sucesso',
	data: JSON.stringify(doPostRequest.url),
};

export const errorMessage = {
	status: 'error',
	message: 'erro',
};

describe('FrontController', () => {
	describe('doGet()', () => {
		it('should call fetcher.get({url: "/teste"})', async () => {
			const { frontController: sut, fetcher } = makeSut();
			const spyGet = jest.spyOn(fetcher, 'get');

			await sut.doGet(doGetAndDoDeleteUrl);

			expect(spyGet).toHaveBeenCalledWith(doGetAndDoDeleteUrl);
			expect(spyGet).toHaveBeenCalledTimes(1);
		});

		it('should to throw a error if fetcher throw a error ', async () => {
			const { frontController: sut, fetcher } = makeSut();
			fetcher.get = jest.fn().mockRejectedValueOnce(new Error('erro'));

			const result = await sut.doGet(doGetAndDoDeleteUrl);

			expect(result).toEqual(errorMessage);
		});

		it('should return the data of response if find the data', async () => {
			const { frontController: sut, fetcher } = makeSut();
			fetcher.get = jest.fn().mockResolvedValueOnce(doGetSuccessDataResponse);

			const result = await sut.doGet(doGetAndDoDeleteUrl);

			expect(result).toEqual(doGetSuccessDataResponse);
		});

		it('should return the data of response with the prop data empty if nothing to find', async () => {
			const { frontController: sut, fetcher } = makeSut();
			fetcher.get = jest.fn().mockResolvedValueOnce(emptySuccessDataResponse);

			const result = await sut.doGet(doGetAndDoDeleteUrl);

			expect(result).toEqual(emptySuccessDataResponse);
		});
	});

	describe('doPost()', () => {
		it('should call fetcher.post({url: "/teste", body: {"userName": "user", "email": "email"}})', async () => {
			const { frontController: sut, fetcher } = makeSut();
			const spyPost = jest.spyOn(fetcher, 'post');

			await sut.doPost(doPostRequest);

			expect(spyPost).toHaveBeenCalledWith(doPostRequestString);
			expect(spyPost).toHaveBeenCalledTimes(1);
		});

		it('should to throw a error if fetcher throw a error ', async () => {
			const { frontController: sut, fetcher } = makeSut();
			fetcher.post = jest.fn().mockRejectedValueOnce(new Error('erro'));

			const result = await sut.doPost(doPostRequest);

			expect(result).toEqual(errorMessage);
		});

		it('should return the data of response', async () => {
			const { frontController: sut, fetcher } = makeSut();
			fetcher.post = jest.fn().mockResolvedValueOnce(doPostSuccessDataResponse);

			const result = await sut.doPost(doPostRequest);

			expect(result).toEqual(doPostSuccessDataResponse);
		});
	});

	describe('doPut()', () => {
		it('should call fetcher.put({"url": "/teste","body": {"id": "123","toPut": { name: "new-name", email: "new-email" }}})', async () => {
			const { frontController: sut, fetcher } = makeSut();
			const spyPut = jest.spyOn(fetcher, 'put');

			await sut.doPut(doPutRequest);

			expect(spyPut).toHaveBeenCalledWith(doPutRequestString);
			expect(spyPut).toHaveBeenCalledTimes(1);
		});

		it('should to throw a error if fetcher throw a error', async () => {
			const { frontController: sut, fetcher } = makeSut();
			fetcher.put = jest.fn().mockRejectedValueOnce(new Error('erro'));

			const result = await sut.doPut(doPutRequest);

			expect(result).toEqual(errorMessage);
		});

		it('should return the data of response', async () => {
			const { frontController: sut, fetcher } = makeSut();
			fetcher.put = jest.fn().mockResolvedValueOnce(doPutSuccessDataResponse);

			const result = await sut.doPut(doPutRequest);

			expect(result).toEqual(doPutSuccessDataResponse);
		});
	});

	describe('doDelete()', () => {
		it('should call fetcher.delete({url: "/teste"})', async () => {
			const { frontController: sut, fetcher } = makeSut();
			const spyDelete = jest.spyOn(fetcher, 'delete');

			await sut.doDelete(doGetAndDoDeleteUrl);

			expect(spyDelete).toHaveBeenCalledWith(doGetAndDoDeleteUrl);
			expect(spyDelete).toHaveBeenCalledTimes(1);
		});

		it('should to throw a error if fetcher throw a error ', async () => {
			const { frontController: sut, fetcher } = makeSut();
			fetcher.delete = jest.fn().mockRejectedValueOnce(new Error('erro'));

			const result = await sut.doDelete(doGetAndDoDeleteUrl);

			expect(result).toEqual(errorMessage);
		});

		it('should return the data of response', async () => {
			const { frontController: sut, fetcher } = makeSut();
			fetcher.delete = jest
				.fn()
				.mockResolvedValueOnce(doDeleteSuccessDataResponse);

			const result = await sut.doDelete(doGetAndDoDeleteUrl);

			expect(result).toEqual(doDeleteSuccessDataResponse);
		});
	});
});
