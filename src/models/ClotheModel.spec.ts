import connectDb from '@/services/connectDb';
import { ClotheModelMongo } from './ClotheModel';
import Clothe from './colections/clothe';
import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import { JsonSafeFilterValueString } from 'aws-sdk/clients/savingsplans';

const makeSut = () => {
	const clotheModelMongo = new ClotheModelMongo();
	return { clotheModelMongo };
};

describe('ClotheModelMongo', () => {
	describe('connectDb', () => {
		it('should call the mongoose.connect()', async () => {
			const { clotheModelMongo: sut } = makeSut();
			const spyConnect = jest.spyOn(mongoose, 'connect');

			await sut.connectDb();

			expect(spyConnect).toHaveBeenCalledTimes(1);
		});
	});

	describe('getAllByUserId', () => {
		let spyFind: jest.SpyInstance;
		beforeEach(() => {
			jest.restoreAllMocks();
			spyFind = jest.spyOn(Clothe, 'find');
		});

		it('should call the clotheModelMongo.connectDb()', async () => {
			const { clotheModelMongo: sut } = makeSut();
			const spyConnectDb = jest.spyOn(sut, 'connectDb');
			spyFind.mockResolvedValueOnce(undefined);

			await sut.getAllByUserId({ userId: 'userId' });

			expect(spyConnectDb).toHaveBeenCalledTimes(1);
		});

		it('should call the clotheModelMongo.disconnectDb()', async () => {
			const { clotheModelMongo: sut } = makeSut();
			const spyDisconnectDb = jest.spyOn(sut, 'disconnectDb');
			spyFind.mockResolvedValueOnce(undefined);

			await sut.getAllByUserId({ userId: 'userId' });

			expect(spyDisconnectDb).toHaveBeenCalledTimes(1);
		});

		it('should call the Clothe.find()', async () => {
			const { clotheModelMongo: sut } = makeSut();
			spyFind.mockResolvedValueOnce(undefined);

			await sut.getAllByUserId({ userId: 'userId' });

			expect(spyFind).toHaveBeenCalledWith({ userId: 'userId' });
			expect(spyFind).toHaveBeenCalledTimes(1);
		});

		it('should throw a security message error', async () => {
			const { clotheModelMongo: sut } = makeSut();
			spyFind.mockRejectedValueOnce(new Error('erro que o usuário não pode ver'));

			try {
				await sut.getAllByUserId({ userId: 'userId' });
			} catch (error: any) {
				expect(error.message).toBe('Erro ao buscar roupas');
			}
		});

		it('should return a empty array if user does not have any clothe registered', async () => {
			const { clotheModelMongo: sut } = makeSut();
			spyFind.mockResolvedValueOnce(undefined);

			const result = await sut.getAllByUserId({ userId: 'userId' });

			expect(result).toEqual([]);
		});

		it('should return a corrected data on real user', async () => {
			const { clotheModelMongo: sut } = makeSut();

			const result = await sut.getAllByUserId({
				userId: '644c57addf8d27eae6303eb4',
			});

			expect(result[0]).toHaveProperty('id');
			expect(result[0]).toHaveProperty('userId');
			expect(result[0]).toHaveProperty('category');
			expect(result[0]).toHaveProperty('updatedAt');
			expect(result[0]).toHaveProperty('createdAt');
			expect(result[0]).toHaveProperty('favorite');
			expect(result[0]).toHaveProperty('image');
			expect(result[0]).toHaveProperty('key');
		});
	});

	describe('toggleFavoriteByClotheId', () => {
		const originalClotheFindById = Clothe.findById;
		let mockFindById: jest.Mock;
		let mockSave = jest.fn();

		beforeEach(() => {
			jest.resetAllMocks();
			mockFindById = Clothe.findById = jest
				.fn()
				.mockResolvedValueOnce({ favorite: true, save: mockSave });
		});

		it('should call the clotheModelMongo.connectDb()', async () => {
			const { clotheModelMongo: sut } = makeSut();
			const spyConnectDb = jest.spyOn(sut, 'connectDb');

			await sut.toggleFavoriteByClotheId({ clotheId: 'clotheId' });

			expect(spyConnectDb).toHaveBeenCalledTimes(1);
		});

		it('should call the clotheModelMongo.disconnectDb()', async () => {
			const { clotheModelMongo: sut } = makeSut();
			const spyDisconnectDb = jest.spyOn(sut, 'disconnectDb');

			await sut.toggleFavoriteByClotheId({ clotheId: 'clotheId' });

			expect(spyDisconnectDb).toHaveBeenCalledTimes(1);
		});

		it('should call the clothe.save())', async () => {
			const { clotheModelMongo: sut } = makeSut();

			await sut.toggleFavoriteByClotheId({ clotheId: 'clotheId' });

			expect(mockSave).toHaveBeenCalledTimes(1);
		});

		it('should call the Clothe.findById() ', async () => {
			const { clotheModelMongo: sut } = makeSut();

			await sut.toggleFavoriteByClotheId({ clotheId: 'clotheId' });

			expect(mockFindById).toHaveBeenCalledTimes(1);
			expect(mockFindById).toHaveBeenCalledWith('clotheId');
		});

		it('should throw a security message error', async () => {
			const { clotheModelMongo: sut } = makeSut();
			mockFindById.mockRejectedValueOnce(
				new Error('erro que o usuário não pode ver'),
			);

			try {
				await sut.toggleFavoriteByClotheId({ clotheId: 'clotheId' });
			} catch (error: any) {
				expect(error.message).toBe('Erro ao alterar favorito');
			}
		});

		it('should return a corrected data on real user', async () => {
			const { clotheModelMongo: sut } = makeSut();
			Clothe.findById = originalClotheFindById;

			const result = await sut.toggleFavoriteByClotheId({
				clotheId: '644d79b47f42597485614958',
			});

			expect(result).toHaveProperty('id');
			expect(result).toHaveProperty('userId');
			expect(result).toHaveProperty('category');
			expect(result).toHaveProperty('updatedAt');
			expect(result).toHaveProperty('createdAt');
			expect(result).toHaveProperty('favorite');
			expect(result).toHaveProperty('image');
			expect(result).toHaveProperty('key');
		});

		// it('should return a empty array if user does not have any clothe registered', async () => {
		// 	const { clotheModelMongo: sut } = makeSut();
		// 	const spyFind = jest.spyOn(Clothe, 'find');
		// 	(spyFind as jest.SpyInstance).mockResolvedValueOnce(undefined);

		// 	const result = await sut.getAllByUserId({ userId: 'userId' });

		// 	expect(result).toEqual([]);
		// });
	});
});
