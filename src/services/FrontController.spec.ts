import { FetcherAxios } from './Fetcher';
import { FrontController } from './FrontController';

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

export const doUpdateRequest = {
	url: '/teste',
	body: {
		id: '123',
		toUpdate: { name: 'new-name', email: 'new-email' },
	},
};

export const doUpdateRequestString = {
	url: doUpdateRequest.url,
	body: JSON.stringify(doUpdateRequest.body),
};

export const doUpdateSuccessDataResponse = {
	status: 'success',
	message: 'Dados buscados com sucesso',
	data: JSON.stringify(doUpdateRequest.body),
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

	describe('doUpdate()', () => {
		it('should call fetcher.update({"url": "/teste","body": {"id": "123","toUpdate": { name: "new-name", email: "new-email" }}})', async () => {
			const { frontController: sut, fetcher } = makeSut();
			const spyUpdate = jest.spyOn(fetcher, 'update');

			await sut.doUpdate(doUpdateRequest);

			expect(spyUpdate).toHaveBeenCalledWith(doUpdateRequestString);
			expect(spyUpdate).toHaveBeenCalledTimes(1);
		});

		it('should to throw a error if fetcher throw a error ', async () => {
			const { frontController: sut, fetcher } = makeSut();
			fetcher.update = jest.fn().mockRejectedValueOnce(new Error('erro'));

			const result = await sut.doUpdate(doUpdateRequest);

			expect(result).toEqual(errorMessage);
		});

		it('should return the data of response', async () => {
			const { frontController: sut, fetcher } = makeSut();
			fetcher.update = jest
				.fn()
				.mockResolvedValueOnce(doUpdateSuccessDataResponse);

			const result = await sut.doUpdate(doUpdateRequest);

			expect(result).toEqual(doUpdateSuccessDataResponse);
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
