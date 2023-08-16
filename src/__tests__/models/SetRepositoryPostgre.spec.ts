import { SetRepositoryPostgre } from '../../models/Postgre/SetRepositoryPostgre';
import { Clothe, Set, User } from '../../models/Postgre/Tables';

const makeSut = () => {
	const setRepository = new SetRepositoryPostgre();
	return { setRepository };
};

export const clothesObj: any = [
	{
		favorite: false,
		id: '1',
		category: 'category',
		key: 'key',
		image: 'image',
		updatedAt: '2023-08-11T12:03:01.536Z',
		createdAt: '2023-08-11T12:03:01.536Z',
		userId: '1',
	},
	{
		favorite: false,
		id: '1',
		category: 'category',
		key: 'key',
		image: 'image',
		updatedAt: '2023-08-11T12:03:01.536Z',
		createdAt: '2023-08-11T12:03:01.536Z',
		userId: '1',
	},
];

export const clothesRequest = [
	{ ...clothesObj[0], x: 1, y: 11 },
	{ ...clothesObj[1], x: 11.3, y: 10.4 },
];

const clothesResponse = [
	{ ...clothesObj[0], clotheSet: { x: 1, y: 11 } },
	{ ...clothesObj[1], clotheSet: { x: 11.3, y: 10.4 } },
];

export const setObj = {
	id: '1',
	category: 'categoria',
	favorite: false,
	clothes: clothesResponse,
};

export const userObj = {
	id: '1',
	email: 'user_already_exist@teste.com',
	password: 'password',
	image: 'image',
	updatedAt: '2023-08-11T11:59:51.268Z',
	createdAt: '2023-08-11T11:59:51.268Z',
};

describe('SetRepository', () => {
	let mockSet: any;
	let mockClothe: any;
	let mockUser: any;
	beforeEach(() => {
		jest.resetAllMocks();
		clothesResponse[0].clotheSet = { x: 1, y: 11 };
		clothesResponse[1].clotheSet = { x: 11.3, y: 10.4 };
		mockSet = {
			...setObj,
			addClothes: jest.fn(),
			save: jest.fn(),
			setUser: jest.fn(),
			toJSON: jest.fn(function () {
				return { ...setObj, favorite: this.favorite, category: this.category };
			}),
			destroy: jest.fn(),
			getClothes: jest
				.fn()
				.mockResolvedValue([
					{ toJSON: jest.fn().mockReturnValue({ ...clothesObj[0] }) },
					{ toJSON: jest.fn().mockReturnValue({ ...clothesObj[1] }) },
				]),
		};
		mockUser = {
			...userObj,
			toJSON: jest.fn().mockReturnValue({ sets: [{ ...setObj }, { ...setObj }] }),
		};
		mockClothe = {
			...clothesObj,
		};
		Set.findByPk = jest.fn().mockResolvedValue({ ...mockSet });
		Set.create = jest.fn().mockResolvedValue({ ...mockSet });
		User.findByPk = jest.fn().mockResolvedValue({ ...mockUser });
		Set.findAll = jest.fn().mockResolvedValue([{ ...setObj }, { ...setObj }]);
		Clothe.findByPk = jest
			.fn()
			.mockResolvedValueOnce({ ...mockClothe[0] })
			.mockResolvedValueOnce({ ...mockClothe[1] });
	});
	describe('create', () => {
		it('should call the Set.create() ', async () => {
			const { setRepository: sut } = makeSut();

			await sut.create({
				userId: userObj.id,
				clothes: clothesRequest,
				category: setObj.category,
			});

			expect(Set.create).toHaveBeenCalledTimes(1);
			expect(Set.create).toHaveBeenCalledWith({ category: setObj.category });
		});

		it('should call the User.findByPk()', async () => {
			const { setRepository: sut } = makeSut();

			await sut.create({
				userId: userObj.id,
				clothes: clothesRequest,
				category: setObj.category,
			});

			expect(User.findByPk).toHaveBeenCalledTimes(1);
			expect(User.findByPk).toHaveBeenCalledWith(userObj.id);
		});

		it('should call the result of set, and call the method set.setUser()', async () => {
			const { setRepository: sut } = makeSut();

			await sut.create({
				userId: userObj.id,
				clothes: clothesRequest,
				category: setObj.category,
			});

			expect(mockSet.setUser).toHaveBeenCalledTimes(1);
		});

		it('should call the Clothe.findByPk()', async () => {
			const { setRepository: sut } = makeSut();

			await sut.create({
				userId: userObj.id,
				clothes: clothesRequest,
				category: setObj.category,
			});

			expect(Clothe.findByPk).toHaveBeenCalledTimes(2);
		});

		it('should call the set.addClothes()', async () => {
			const { setRepository: sut } = makeSut();

			await sut.create({
				userId: userObj.id,
				clothes: clothesRequest,
				category: setObj.category,
			});

			expect(mockSet.addClothes).toHaveBeenCalledTimes(2);
			expect(mockSet.addClothes).toHaveBeenNthCalledWith(
				1,
				{
					category: 'category',
					createdAt: '2023-08-11T12:03:01.536Z',
					favorite: false,
					id: '1',
					image: 'image',
					key: 'key',
					updatedAt: '2023-08-11T12:03:01.536Z',
					userId: '1',
				},
				{ through: { x: 1, y: 11 } },
			);
		});

		it('should call set.toJSON()', async () => {
			const { setRepository: sut } = makeSut();

			await sut.create({
				userId: userObj.id,
				clothes: clothesRequest,
				category: setObj.category,
			});

			expect(mockSet.toJSON).toHaveBeenCalledTimes(1);
		});

		it('should return a specific set object', async () => {
			const { setRepository: sut } = makeSut();

			const result = await sut.create({
				userId: userObj.id,
				clothes: clothesRequest,
				category: setObj.category,
			});

			expect(result).toEqual(setObj);
		});

		it('should throw a error', async () => {
			const { setRepository: sut } = makeSut();
			Set.create = jest.fn().mockRejectedValueOnce(new Error('Error'));

			await expect(async () => {
				await sut.create({
					userId: userObj.id,
					clothes: clothesRequest,
					category: setObj.category,
				});
			}).rejects.toThrowError('Erro ao cadastrar conjunto: Error');
		});

		it('should return null, if user is not finded', async () => {
			const { setRepository: sut } = makeSut();
			User.findByPk = jest.fn().mockResolvedValueOnce(null);

			const result = await sut.create({
				userId: userObj.id,
				clothes: clothesRequest,
				category: setObj.category,
			});

			expect(result).toBeNull();
		});
	});

	describe('getAllByUserId', () => {
		it('should call Set.findAll()', async () => {
			const { setRepository: sut } = makeSut();

			await sut.getAllByUserId({ userId: userObj.id });

			expect(Set.findAll).toHaveBeenCalledTimes(1);
		});

		it('should return all sets of specific user', async () => {
			const { setRepository: sut } = makeSut();

			const result = await sut.getAllByUserId({ userId: userObj.id });

			expect(result).toEqual([
				{
					...setObj,
					clothes: clothesRequest,
				},
				{
					...setObj,
					clothes: clothesRequest,
				},
			]);
		});

		it('should throw a error', async () => {
			const { setRepository: sut } = makeSut();
			Set.findAll = jest.fn().mockRejectedValueOnce(new Error('Error'));

			await expect(async () => {
				await sut.getAllByUserId({ userId: userObj.id });
			}).rejects.toThrowError('Erro ao encontrar conjuntos: Error');
		});

		it('should return null if user not exists', async () => {
			const { setRepository: sut } = makeSut();
			Set.findAll = jest.fn().mockResolvedValueOnce(null);

			const result = await sut.getAllByUserId({ userId: userObj.id });

			expect(result).toBeNull();
		});
	});

	describe('toggleFavoriteBySetId', () => {
		it('should call Set.findByPk()', async () => {
			const { setRepository: sut } = makeSut();

			await sut.toggleFavoriteBySetId({ setId: setObj.id });

			expect(Set.findByPk).toHaveBeenCalledTimes(1);
		});

		it('should call set.save()', async () => {
			const { setRepository: sut } = makeSut();

			await sut.toggleFavoriteBySetId({ setId: setObj.id });

			expect(mockSet.save).toHaveBeenCalledTimes(1);
		});

		it('should call the set.toJSON()', async () => {
			const { setRepository: sut } = makeSut();

			await sut.toggleFavoriteBySetId({ setId: setObj.id });

			expect(mockSet.toJSON).toHaveBeenCalledTimes(1);
		});

		it('should return a set with the inverse favorite property', async () => {
			const { setRepository: sut } = makeSut();

			const result = await sut.toggleFavoriteBySetId({ setId: setObj.id });

			expect(result).toBeTruthy();
		});

		it('should throw a error', async () => {
			const { setRepository: sut } = makeSut();
			Set.findByPk = jest.fn().mockRejectedValueOnce(new Error('Error'));

			await expect(async () => {
				await sut.toggleFavoriteBySetId({ setId: setObj.id });
			}).rejects.toThrowError('Erro ao alterar a propriedade favorito: Error');
		});

		it('should return null, if setId is not exist', async () => {
			const { setRepository: sut } = makeSut();
			Set.findByPk = jest.fn().mockResolvedValueOnce(null);

			const result = await sut.toggleFavoriteBySetId({ setId: setObj.id });

			expect(result).toBeNull();
		});
	});

	describe('changeCategoryBySetId', () => {
		it('should call Set.findByPk()', async () => {
			const { setRepository: sut } = makeSut();

			await sut.changeCategoryBySetId({
				setId: setObj.id,
				category: 'new_category',
			});

			expect(Set.findByPk).toHaveBeenCalledTimes(1);
		});

		it('should call set.save()', async () => {
			const { setRepository: sut } = makeSut();

			await sut.changeCategoryBySetId({
				setId: setObj.id,
				category: 'new_category',
			});

			expect(mockSet.save).toHaveBeenCalledTimes(1);
		});

		it('should call the set.toJSON()', async () => {
			const { setRepository: sut } = makeSut();

			await sut.changeCategoryBySetId({
				setId: setObj.id,
				category: 'new_category',
			});

			expect(mockSet.toJSON).toHaveBeenCalledTimes(1);
		});

		it('should return a set with the new category property', async () => {
			const { setRepository: sut } = makeSut();

			const result = await sut.changeCategoryBySetId({
				setId: setObj.id,
				category: 'new_category',
			});
			expect(result.category).toBe('new_category');
		});

		it('should throw a error', async () => {
			const { setRepository: sut } = makeSut();
			Set.findByPk = jest.fn().mockRejectedValueOnce(new Error('Error'));

			await expect(async () => {
				await sut.changeCategoryBySetId({
					setId: setObj.id,
					category: 'new_category',
				});
			}).rejects.toThrowError('Erro ao alterar a propriedade categoria: Error');
		});

		it('should return null, if setId is not exist', async () => {
			const { setRepository: sut } = makeSut();
			Set.findByPk = jest.fn().mockResolvedValueOnce(null);

			const result = await sut.changeCategoryBySetId({
				setId: setObj.id,
				category: 'new_category',
			});

			expect(result).toBeNull();
		});
	});

	describe('deleteBySetId', () => {
		it('should call Set.findByPk()', async () => {
			const { setRepository: sut } = makeSut();

			await sut.deleteBySetId({ setId: setObj.id });

			expect(Set.findByPk).toHaveBeenCalledTimes(1);
			expect(Set.findByPk).toHaveBeenCalledWith(setObj.id);
		});

		it('should call the set.destroy()', async () => {
			const { setRepository: sut } = makeSut();

			await sut.deleteBySetId({ setId: setObj.id });

			expect(mockSet.destroy).toHaveBeenCalledTimes(1);
		});

		it('should return a success message', async () => {
			const { setRepository: sut } = makeSut();

			const result = await sut.deleteBySetId({ setId: setObj.id });

			expect(result).toBe('Sucesso ao deletar o conjunto');
		});

		it('should return null, if the setId is not exist', async () => {
			const { setRepository: sut } = makeSut();
			Set.findByPk = jest.fn().mockResolvedValueOnce(null);

			const result = await sut.deleteBySetId({ setId: setObj.id });

			expect(result).toBeNull();
		});

		it('should throw a error', async () => {
			const { setRepository: sut } = makeSut();
			Set.findByPk = jest.fn().mockRejectedValueOnce(new Error('Error'));

			await expect(async () => {
				await sut.deleteBySetId({ setId: setObj.id });
			}).rejects.toThrowError('Erro ao deletar conjunto: Error');
		});
	});
});
