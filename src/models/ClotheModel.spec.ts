import connectDb from '@/services/connectDb';
import { ClotheModelMongo } from './ClotheModel';
import Clothe from './colections/clothe';
import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

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
		beforeEach(() => {
			jest.restoreAllMocks();
		});

		it('should call the clotheModelMongo.connectDb()', async () => {
			const { clotheModelMongo: sut } = makeSut();
			const spyConnectDb = jest.spyOn(sut, 'connectDb');
			const spyFind = jest.spyOn(Clothe, 'find');
			(spyFind as jest.SpyInstance).mockResolvedValueOnce([]);

			await sut.getAllByUserId({ userId: 'userId' });

			expect(spyConnectDb).toHaveBeenCalledTimes(1);
		});

		it('should call the Clothe.findById()', async () => {
			const { clotheModelMongo: sut } = makeSut();
			const spyFind = jest.spyOn(Clothe, 'find');
			(spyFind as jest.SpyInstance).mockResolvedValueOnce([]);

			await sut.getAllByUserId({ userId: 'userId' });

			expect(spyFind).toHaveBeenCalledWith({ userId: 'userId' });
			expect(spyFind).toHaveBeenCalledTimes(1);
		});

		it('should throw a security message error', async () => {
			const { clotheModelMongo: sut } = makeSut();
			const spyFind = jest.spyOn(Clothe, 'find');
			(spyFind as jest.SpyInstance).mockRejectedValueOnce(
				new Error('erro que o usuário não pode ver'),
			);

			try {
				await sut.getAllByUserId({ userId: 'userId' });
			} catch (error: any) {
				expect(error.message).toBe('Erro ao buscar roupas');
			}
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

		it('should return a empty array if user does not have any clothe registered', async () => {
			const { clotheModelMongo: sut } = makeSut();
			const spyFind = jest.spyOn(Clothe, 'find');
			(spyFind as jest.SpyInstance).mockResolvedValueOnce(undefined);

			const result = await sut.getAllByUserId({ userId: 'userId' });

			expect(result).toEqual([]);
		});
	});
});
