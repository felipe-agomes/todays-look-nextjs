import { clotheModels } from './clotheModels';
import User from './colections/user';
import Clothe from './colections/clothe';
import { ClotheData } from '@/@types';

jest.mock('@/services/connectDb');
jest.mock('./colections/user');
jest.mock('./colections/clothe');

const mockUserFindById = User.findById as jest.Mock;
const mockClotheCreate = Clothe.create as jest.Mock;
const mockClotheFindByUserId = Clothe.find as jest.Mock;
const mockClotheFindById = Clothe.findById as jest.Mock;
const mockArrayClothe = [
	{ id: '321', userId: '123', category: 'category', favorite: false },
	{ id: '654', userId: '123', category: 'category', favorite: false },
];
const clothe = {
	id: '321',
	userId: '123',
	category: 'category',
	favorite: false,
};
const clotheId = '321';
const userId = '123';
const mockClothe = { ...clothe, updateOne: jest.fn() };

describe('setNewClothe', () => {
	beforeEach(() => {
		mockUserFindById.mockResolvedValue({ id: '123' });
		mockClotheCreate.mockResolvedValue(undefined);
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it('should create a new clothe', async () => {
		const data: ClotheData = {
			userId: '123',
			category: 'category',
			image: 'image',
			key: 'key',
		};

		const result = await clotheModels.setNewClothe(data);

		expect(mockUserFindById).toBeCalledWith('123');
		expect(mockClotheCreate).toBeCalledWith(data);
		expect(result).toEqual({
			error: false,
			message: 'Roupa cadastrada com sucesso',
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

		expect(mockClotheFindByUserId).toBeCalledWith({ userId: '123' });
		expect(result).toEqual({
			error: false,
			message: 'Roupas encontradas com sucesso',
			clothe: mockArrayClothe,
		});
	});

	it('should return an error if "clothe.find" is called with wrong userId', async () => {
		mockClotheFindByUserId.mockResolvedValue(null);

		const result = await clotheModels.getAllClothes(userId);

		expect(mockClotheFindByUserId).toBeCalledWith({ userId: '123' });
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

// async function updateCategory(clotheId: String, toUpdate: String) {
// 	const clothe = await Clothe.findById(clotheId);

// 	if (!clothe) {
// 		return {
// 			error: true,
// 			message: 'Nenhuma roupa encontrada',
// 		};
// 	}

// 	const newClothe = { category: toUpdate };
// 	await clothe.updateOne(newClothe);
// 	return {
// 		error: false,
// 		message: 'Categoria alterada com sucesso',
// 		clothe: newClothe,
// 	};
// }
