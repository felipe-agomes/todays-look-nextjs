import { ClothePosition } from '@/@types';
import { setModels } from './setModels';
import Set from './colections/set';
import { existsSync } from 'fs';
import getAllSet from '@/pages/api/protected/user/[userId]/clothe/allSets';
import connectDb from '@/services/connectDb';

const ExistingUserId = 'some_user_id';
const resultSet = {
	id: 'some_set_id',
	category: 'category',
	sets: [
		{
			favorite: false,
			image: 'image',
			key: 'key',
			userId: ExistingUserId,
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
				userId: ExistingUserId,
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
				userId: ExistingUserId,
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

describe('setModels.createSet', () => {
	afterEach(() => {
		(connectDb as jest.Mock).mockResolvedValue(undefined);
	});

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should return a sucess message with new set if all data is passed correctly', async () => {
		setCreateMock.mockResolvedValue(undefined);

		const result = await setModels.createSet(ExistingUserId, resultSet);

		expect(result).toHaveProperty('error', false);
		expect(result).toHaveProperty('message', 'Conjunto criado com sucesso');
		expect(result.set).toHaveProperty('userId', 'some_user_id');
		expect(result.set.data.sets[0]).toHaveProperty('id', 'some_clothe_id');
	});

	it('should return an error message if the set creation failed', async () => {
		setCreateMock.mockRejectedValue(new Error('Erro ao cadastrar usuário'));

		await expect(
			setModels.createSet(ExistingUserId, resultSet),
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

		const result = await setModels.getAllSet(ExistingUserId);

		expect(result).toHaveProperty('error', false);
		expect(result).toHaveProperty('message', 'Conjuntos buscados com sucesso');
	});

	it('should return a error message when no set is found', async () => {
		setFindMock.mockResolvedValue(null);

		const result = await setModels.getAllSet(ExistingUserId);

		expect(result).toHaveProperty('error', true);
		expect(result).toHaveProperty('message', 'Nenhum conjunto encontrado');
	});
});

// describe('setModels.deleteSet', () => {});
// describe('setModels.toggleFavorite', () => {});
// describe('setModels.updateCategorySet', () => {});
