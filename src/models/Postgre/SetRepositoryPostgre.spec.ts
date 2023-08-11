import { SetRepositoryPostgre } from './SetRepositoryPostgre';
import { Clothe, Set, User } from './Tables';

const makeSut = () => {
	const setRepository = new SetRepositoryPostgre();
	return { setRepository };
};

const mockClothesObj = [
	{
		favorite: false,
		id: '1',
		category: 'category',
		key: 'key',
		image: 'image',
		updatedAt: new Date('2023-08-11T12:03:01.536Z'),
		createdAt: new Date('2023-08-11T12:03:01.536Z'),
		userId: '1',
	},
	{
		favorite: false,
		id: '1',
		category: 'category',
		key: 'key',
		image: 'image',
		updatedAt: new Date('2023-08-11T12:03:01.536Z'),
		createdAt: new Date('2023-08-11T12:03:01.536Z'),
		userId: '1',
	},
];

const clothesRequest = [
	{ ...mockClothesObj[0], x: 1, y: 11 },
	{ ...mockClothesObj[1], x: 11.3, y: 10.4 },
];

const mockSetObj = {
	id: '1',
	category: 'categoria',
	favorite: false,
};

const mockUserObj = {
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
	beforeEach(() => {
		jest.resetAllMocks();
		mockSet = {
			...mockSetObj,
			addClothes: jest.fn(),
			setUser: jest.fn(),
			getClothes: jest
				.fn()
				.mockResolvedValue([
					{ toJSON: jest.fn().mockReturnValue({ ...mockClothesObj[0] }) },
					{ toJSON: jest.fn().mockReturnValue({ ...mockClothesObj[1] }) },
				]),
		};
		const mockUser = {
			...mockUserObj,
		};
		mockClothe = {
			...mockClothesObj,
		};
		Set.create = jest.fn().mockResolvedValue({ ...mockSet });
		User.findByPk = jest.fn().mockResolvedValue({ ...mockUser });
		Clothe.findByPk = jest
			.fn()
			.mockResolvedValueOnce({ ...mockClothe[0] })
			.mockResolvedValueOnce({ ...mockClothe[1] });
	});
	describe('create', () => {
		beforeEach(() => {});
		it('should call the Set.create() ', async () => {
			const { setRepository: sut } = makeSut();

			await sut.create({
				userId: mockUserObj.id,
				clothes: clothesRequest,
				category: mockSetObj.category,
			});

			expect(Set.create).toHaveBeenCalledTimes(1);
			expect(Set.create).toHaveBeenCalledWith({ category: mockSetObj.category });
		});

		it('should call the User.findByPk()', async () => {
			const { setRepository: sut } = makeSut();

			await sut.create({
				userId: mockUserObj.id,
				clothes: clothesRequest,
				category: mockSetObj.category,
			});

			expect(User.findByPk).toHaveBeenCalledTimes(1);
			expect(User.findByPk).toHaveBeenCalledWith(mockUserObj.id);
		});

		it('should call the result of set, and call the method set.setUser()', async () => {
			const { setRepository: sut } = makeSut();

			await sut.create({
				userId: mockUserObj.id,
				clothes: clothesRequest,
				category: mockSetObj.category,
			});

			expect(mockSet.setUser).toHaveBeenCalledTimes(1);
		});

		it('should call the Clothe.findByPk()', async () => {
			const { setRepository: sut } = makeSut();

			await sut.create({
				userId: mockUserObj.id,
				clothes: clothesRequest,
				category: mockSetObj.category,
			});

			expect(Clothe.findByPk).toHaveBeenCalledTimes(2);
		});

		it('should call the set.addClothes()', async () => {
			const { setRepository: sut } = makeSut();

			await sut.create({
				userId: mockUserObj.id,
				clothes: clothesRequest,
				category: mockSetObj.category,
			});

			expect(mockSet.addClothes).toHaveBeenCalledTimes(2);
			expect(mockSet.addClothes).toHaveBeenNthCalledWith(
				1,
				{
					category: 'category',
					createdAt: new Date('2023-08-11T12:03:01.536Z'),
					favorite: false,
					id: '1',
					image: 'image',
					key: 'key',
					updatedAt: new Date('2023-08-11T12:03:01.536Z'),
					userId: '1',
				},
				{ through: { x: 1, y: 11 } },
			);
		});

		it('should return a array with all clothes of specific set', async () => {
			const { setRepository: sut } = makeSut();

			const result = await sut.create({
				userId: mockUserObj.id,
				clothes: clothesRequest,
				category: mockSetObj.category,
			});

			expect(result).toEqual(mockClothesObj);
		});

		it('should throw a error', async () => {
			const { setRepository: sut } = makeSut();
			Set.create = jest.fn().mockRejectedValueOnce(new Error('Error'));

			await expect(async () => {
				await sut.create({
					userId: mockUserObj.id,
					clothes: clothesRequest,
					category: mockSetObj.category,
				});
			}).rejects.toThrowError('Erro ao cadastrar conjunto: Error');
		});

		it('should return null, if user is not finded', async () => {
			const { setRepository: sut } = makeSut();
			User.findByPk = jest.fn().mockResolvedValueOnce(null);

			const result = await sut.create({
				userId: mockUserObj.id,
				clothes: clothesRequest,
				category: mockSetObj.category,
			});

			expect(result).toBeNull();
		});
	});
});
