import { ClothePosition } from '@/@types';
import { setModels } from './setModels';
import Set from './colections/set';
import connectDb from '@/services/connectDb';

const existingUserId = 'some_user_id';
const existingSetId = 'some_set_id';
const noExistingUserId = 'some_user_id';
const noExistingSetId = 'some_set_id';

const resultSet = {
	id: 'some_set_id',
	category: 'category',
	favorite: false,
	sets: [
		{
			favorite: false,
			image: 'image',
			key: 'key',
			userId: existingUserId,
			x: 0,
			y: 0,
			category: 'category',
			id: 'some_clothe_id',
		} as ClothePosition,
	],
};

const resultAllSets = [
	{
		id: 'some_set_id',
		_id: 'some_set__id',
		category: 'category',
		sets: [
			{
				favorite: false,
				image: 'image',
				key: 'key',
				userId: existingUserId,
				x: 0,
				y: 0,
				category: 'category',
				id: 'some_clothe_id',
			} as ClothePosition,
		],
		toObject: jest.fn().mockResolvedValue(resultSet),
	},
	{
		id: 'some_set_id',
		_id: 'some_set__id',
		category: 'category',
		sets: [
			{
				favorite: false,
				image: 'image',
				key: 'key',
				userId: existingUserId,
				x: 0,
				y: 0,
				category: 'category',
				id: 'some_clothe_id',
			} as ClothePosition,
		],
		toObject: jest.fn().mockResolvedValue(resultSet),
	},
];

jest.mock('./colections/set');
jest.mock('@/services/connectDb');

const setCreateMock = Set.create as jest.Mock;
const setFindMock = Set.find as jest.Mock;
const setFindByIdMock = Set.findById as jest.Mock;

describe('setModels.createSet', () => {
	afterEach(() => {
		(connectDb as jest.Mock).mockResolvedValue(undefined);
	});

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should return a sucess message with new set if all data is passed correctly', async () => {
		setCreateMock.mockResolvedValue(undefined);

		const result = await setModels.createSet(existingUserId, resultSet);

		expect(result).toHaveProperty('error', false);
		expect(result).toHaveProperty('message', 'Conjunto criado com sucesso');
		expect(result.set).toHaveProperty('userId', 'some_user_id');
		expect(result.set.data.sets[0]).toHaveProperty('id', 'some_clothe_id');
	});

	it('should return an error message if the set creation failed', async () => {
		setCreateMock.mockRejectedValue(new Error('Erro ao cadastrar usuário'));

		await expect(
			setModels.createSet(existingUserId, resultSet),
		).rejects.toThrowError();
	});
});

describe('setModels.getAllSet', () => {
	afterEach(() => {
		(connectDb as jest.Mock).mockResolvedValue(undefined);
	});

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should return a sucess message with all sets if all data is passed correctly', async () => {
		setFindMock.mockResolvedValue(resultAllSets);

		const result = await setModels.getAllSet(existingUserId);

		expect(result).toHaveProperty('error', false);
		expect(result).toHaveProperty('message', 'Conjuntos buscados com sucesso');
	});

	it('should return a error message when no set is found', async () => {
		setFindMock.mockResolvedValue([]);

		const result = await setModels.getAllSet(noExistingUserId);

		expect(result).toHaveProperty('error', true);
		expect(result).toHaveProperty('message', 'Nenhum conjunto encontrado');
	});
});

describe('setModels.deleteSet', () => {
	afterEach(() => {
		(connectDb as jest.Mock).mockResolvedValue(undefined);
	});

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should return a sucess message with deleted set if all data is passed correctly', async () => {
		setFindByIdMock.mockResolvedValue(resultSet);

		const result = await setModels.deleteSet(existingSetId);

		expect(result).toHaveProperty('error', false);
		expect(result).toHaveProperty('message', 'Set deletado com sucesso');
		expect(result.set).toEqual(resultSet);
	});

	it('should return a error message when no set is found', async () => {
		setFindByIdMock.mockResolvedValue(null);

		const result = await setModels.deleteSet(noExistingSetId);

		expect(result).toHaveProperty('error', true);
		expect(result).toHaveProperty('message', 'Set não encontrado');
	});
});

describe('setModels.toggleFavorite', () => {
	afterEach(() => {
		(connectDb as jest.Mock).mockResolvedValue(undefined);
	});

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should return a sucess message with deleted set if all data is passed correctly', async () => {
		setFindByIdMock.mockResolvedValue({ ...resultSet, updateOne: jest.fn() });

		const result = await setModels.toggleFAvorite(existingSetId);

		expect(result).toHaveProperty('error', false);
		expect(result).toHaveProperty('message', 'Favorito alterado com sucesso');
		expect(result.set).toEqual({ favorite: !resultSet.favorite });
	});

	it('should return a error message when no set is found', async () => {
		setFindByIdMock.mockResolvedValue(null);

		const result = await setModels.toggleFAvorite(noExistingSetId);

		expect(result).toHaveProperty('error', true);
		expect(result).toHaveProperty('message', 'Conjunto não encontrado');
	});
});

describe('setModels.updateCategorySet', () => {
	const toUpdate = 'teste';

	afterEach(() => {
		(connectDb as jest.Mock).mockResolvedValue(undefined);
	});

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should return a sucess message with updated set if all data is passed correctly', async () => {
		setFindByIdMock.mockResolvedValue({ ...resultSet, updateOne: jest.fn() });

		const result = await setModels.updateCategorySet(existingSetId, toUpdate);

		expect(result).toHaveProperty('error', false);
		expect(result).toHaveProperty('message', 'Categoria alterada com sucesso');
		expect(result.set).toEqual({ category: toUpdate });
	});

	it('should return a error message when no set is found', async () => {
		setFindByIdMock.mockResolvedValue(null);

		const result = await setModels.updateCategorySet(noExistingSetId, toUpdate);

		expect(result).toHaveProperty('error', true);
		expect(result).toHaveProperty('message', 'Set não encontrado');
	});
});
