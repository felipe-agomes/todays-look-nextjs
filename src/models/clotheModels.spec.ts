import { clotheModels } from './clotheModels';
import User from './colections/user';
import Clothe from './colections/clothe';
import { ClotheData, ClothesProps } from '@/@types';

jest.mock('@/services/connectDb');
jest.mock('./colections/user');
jest.mock('./colections/clothe');

const mockUserFindById = User.findById as jest.Mock;
const mockClotheCreate = Clothe.create as jest.Mock;
const mockClotheFindByUserId = Clothe.find as jest.Mock;
const mockClotheFindById = Clothe.findById as jest.Mock;
const userId = '123';
const mockArrayClothe = [
	{ id: '321', userId, category: 'category', favorite: false },
	{ id: '654', userId, category: 'category', favorite: false },
];
const clothe: ClothesProps = {
	id: '321',
	userId,
	category: 'category',
	image: 'image',
	key: 'key',
	favorite: false,
};
const clotheId = '321';
const mockClothe = { ...clothe, updateOne: jest.fn() };

describe('setNewClothe', () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	it('should create a new clothe', async () => {
		mockUserFindById.mockResolvedValue({ id: userId });
		mockClotheCreate.mockResolvedValue(undefined);

		const result = await clotheModels.setNewClothe(clothe);

		expect(mockUserFindById).toBeCalledWith(userId);
		expect(mockClotheCreate).toBeCalledWith(clothe);
		expect(result).toEqual({
			error: false,
			message: 'Roupa cadastrada com sucesso',
		});
	});

	it('should return an error if an error occurs in the Clothe.create', async () => {
		mockUserFindById.mockResolvedValue({ id: userId });
		mockClotheCreate.mockImplementationOnce(() => {
			throw new Error('error');
		});

		const result = await clotheModels.setNewClothe(clothe);

		expect(mockUserFindById).toBeCalledWith(userId);
		expect(result).toEqual({
			error: true,
			message: `Erro ao cadastrar, dados insuficientes passados Error: error`,
		});
	});

	it('should return an error if not existis userId', async () => {
		mockUserFindById.mockResolvedValue(null);

		const result = await clotheModels.setNewClothe(clothe);

		expect(mockUserFindById).toBeCalledWith(userId);
		expect(mockClotheCreate).not.toBeCalled();
		expect(result).toEqual({
			error: true,
			message: 'Usuario não existe',
		});
	});
});

describe('getAllClothes', () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	it('should return all clothes of a specific user', async () => {
		mockClotheFindByUserId.mockResolvedValue(mockArrayClothe);

		const result = await clotheModels.getAllClothes(userId);

		expect(mockClotheFindByUserId).toBeCalledWith({ userId });
		expect(result).toEqual({
			error: false,
			message: 'Roupas encontradas com sucesso',
			clothe: mockArrayClothe,
		});
	});

	it('should return an error if "clothe.find" is called with wrong userId', async () => {
		mockClotheFindByUserId.mockResolvedValue(null);

		const result = await clotheModels.getAllClothes(userId);

		expect(mockClotheFindByUserId).toBeCalledWith({ userId });
		expect(result).toEqual({
			error: true,
			message: 'Nenhuma roupa desse usuario encontrada',
		});
	});
});

describe('deleteClothe', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should delete the clothe and return a success message if the clothe is found ', async () => {
		mockClotheFindById.mockResolvedValue(clothe);

		const result = await clotheModels.deleteClothe(clotheId);

		expect(mockClotheFindById).toBeCalledWith(clotheId);
		expect(result).toEqual({
			error: false,
			message: `Roupa id: ${clotheId} do usuario id: 123 deletada com sucesso`,
			clothe,
		});
	});

	it('should return an error if no clothe is found for the given id ', async () => {
		mockClotheFindById.mockResolvedValue(null);

		const result = await clotheModels.deleteClothe(clotheId);

		expect(mockClotheFindById).toBeCalledWith(clotheId);
		expect(result).toEqual({
			error: true,
			message: 'Nenhuma roupa encontrada',
		});
	});
});

describe('toggleFavorite', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should toggle the prop favorite and return success message if the clothe is found', async () => {
		mockClotheFindById.mockResolvedValue(mockClothe);

		const newClothe = { favorite: !clothe.favorite };
		const result = await clotheModels.toggleFavorite(clotheId);

		expect(mockClotheFindById).toBeCalledWith(clotheId);
		expect(result).toEqual({
			error: false,
			message: 'Favorito alterado com sucesso',
			clothe: newClothe,
		});
	});

	it('should return an error if no clothe is found for the given id', async () => {
		mockClotheFindById.mockResolvedValue(null);

		const result = await clotheModels.toggleFavorite(clotheId);

		expect(mockClotheFindById).toBeCalledWith(clotheId);
		expect(result).toEqual({ error: true, message: 'Nenhuma roupa encontrada' });
	});
});

describe('updateCategory', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	const toUpdate = 'newCategory';
	it('should update prop category and return success message if the clothe is found', async () => {
		mockClotheFindById.mockResolvedValue(mockClothe);

		const newClothe = { category: toUpdate };

		const result = await clotheModels.updateCategory(clotheId, toUpdate);

		expect(mockClotheFindById).toBeCalledWith(clotheId);
		expect(result).toEqual({
			error: false,
			message: 'Categoria alterada com sucesso',
			clothe: newClothe,
		});
	});

	it('should return an error if no clothe is found for the given id', async () => {
		mockClotheFindById.mockResolvedValue(null);

		const result = await clotheModels.updateCategory(clotheId, toUpdate);

		expect(mockClotheFindById).toBeCalledWith(clotheId);
		expect(result).toEqual({ error: true, message: 'Nenhuma roupa encontrada' });
	});
});
