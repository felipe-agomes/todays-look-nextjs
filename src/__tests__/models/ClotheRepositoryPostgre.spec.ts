import { toEditorSettings, transpileModule } from 'typescript';
import { Clothe, User } from '../../models/Postgre/Tables';
import { userNotExist } from './UserRepository.spec';
import { ClotheRepositoryPostgre } from '../../models/Postgre/ClotheRepositoryPostgre';
import { mock } from 'node:test';
import { threadId } from 'worker_threads';

/* instanceof Clothe {
	favorite: false,
	id: 3808,
	category: 'category',
	key: 'key',
	image: 'image',
	updatedAt: 2023-08-11T12:03:01.536Z,
	createdAt: 2023-08-11T12:03:01.536Z,
	userId: null
} */

const makeSut = () => {
	const clotheRepository = new ClotheRepositoryPostgre();
	return { clotheRepository };
};
const newClothe = {
	userId: '1',
	category: 'category',
	key: 'key',
	image: 'image',
};
const mockClotheObj = {
	favorite: false,
	id: '1',
	category: 'category',
	key: 'key',
	image: 'image',
	updatedAt: '2023-08-11T12:03:01.536Z',
	createdAt: '2023-08-11T12:03:01.536Z',
	userId: '1',
};
const mockUserObj = {
	id: '1',
	email: 'user_already_exist@teste.com',
	password: 'password',
	image: 'image',
	updatedAt: '2023-08-11T11:59:51.268Z',
	createdAt: '2023-08-11T11:59:51.268Z',
};
describe('ClotheRepository', () => {
	let mockClothe: any;
	let mockUser: any;
	beforeEach(() => {
		jest.resetAllMocks();
		mockUser = {
			...mockUserObj,
			toJSON: jest.fn(function () {
				return {
					id: this.id,
					email: this.email,
					password: this.password,
					image: this.image,
					updatedAt: this.updatedAt,
					createdAt: this.createdAt,
				};
			}),
		};
		mockClothe = {
			...mockClotheObj,
			save: jest.fn(),
			setUser: jest.fn(),
			toJSON: jest.fn(function () {
				return {
					favorite: this.favorite,
					id: this.id,
					category: this.category,
					key: this.key,
					image: this.image,
					updatedAt: this.updatedAt,
					createdAt: this.createdAt,
					userId: this.userId,
				};
			}),
			destroy: jest.fn(),
		};
		User.findByPk = jest.fn().mockResolvedValue({ ...mockUser });
		Clothe.findByPk = jest.fn().mockResolvedValue({ ...mockClothe });
		Clothe.create = jest.fn().mockResolvedValue({ ...mockClothe });
	});
	describe('create', () => {
		it('should call the Clothe.create()', async () => {
			const { clotheRepository: sut } = makeSut();

			await sut.create(newClothe);

			expect(Clothe.create).toHaveBeenCalledTimes(1);
			expect(Clothe.create).toHaveBeenCalledWith({
				category: newClothe.category,
				key: newClothe.key,
				image: newClothe.image,
			});
		});

		it('should call the Clothe.findByPk()', async () => {
			const { clotheRepository: sut } = makeSut();

			await sut.create(newClothe);

			expect(User.findByPk).toHaveBeenCalledTimes(1);
			expect(User.findByPk).toHaveBeenCalledWith(newClothe.userId);
		});

		it('should throw a error if any error occurs', async () => {
			const { clotheRepository: sut } = makeSut();
			Clothe.create = jest.fn().mockRejectedValueOnce(new Error('erro'));

			await expect(async () => {
				await sut.create(newClothe);
			}).rejects.toThrowError('Erro ao cadastrar roupa: erro');
		});

		it('should return created clothe', async () => {
			const { clotheRepository: sut } = makeSut();

			const result = await sut.create(newClothe);

			expect(result).toHaveProperty('id');
			expect(result).toHaveProperty('userId');
			expect(result).toHaveProperty('category');
			expect(result).toHaveProperty('favorite');
			expect(result).toHaveProperty('image');
			expect(result).toHaveProperty('key');
		});
	});

	describe('getAllByUserId', () => {
		it('should call the User.findByPk()', async () => {
			const { clotheRepository: sut } = makeSut();

			await sut.getAllByUserId({ userId: mockUser.id });

			expect(User.findByPk).toHaveBeenCalledTimes(1);
		});

		it('should throw a security message error', async () => {
			const { clotheRepository: sut } = makeSut();
			User.findByPk = jest.fn().mockRejectedValueOnce(new Error('Erro'));

			await expect(async () => {
				await sut.getAllByUserId({ userId: mockUser.id });
			}).rejects.toThrowError('Erro ao buscar roupas: Erro');
		});

		it('should return a empty array if user does not have any clothe registered', async () => {
			const { clotheRepository: sut } = makeSut();
			User.findByPk = jest.fn().mockResolvedValueOnce({
				toJSON: jest.fn().mockReturnValueOnce({ ...mockClotheObj, clothes: [] }),
			});

			const result = await sut.getAllByUserId({ userId: mockUser.id });

			expect(result).toEqual([]);
		});

		it('should return a corrected data', async () => {
			const { clotheRepository: sut } = makeSut();
			User.findByPk = jest.fn().mockResolvedValueOnce({
				toJSON: jest.fn().mockReturnValueOnce({
					...mockClotheObj,
					clothes: [{ ...mockClotheObj }],
				}),
			});

			const result = await sut.getAllByUserId({
				userId: mockUser.id,
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
		it('should call the Clothe.findByPk() ', async () => {
			const { clotheRepository: sut } = makeSut();

			await sut.toggleFavoriteByClotheId({ clotheId: mockClothe.id });

			expect(Clothe.findByPk).toHaveBeenCalledTimes(1);
			expect(Clothe.findByPk).toHaveBeenCalledWith(mockClothe.id);
		});

		it('should call the clothe.save())', async () => {
			const { clotheRepository: sut } = makeSut();

			await sut.toggleFavoriteByClotheId({
				clotheId: 'clotheId',
			});

			expect(mockClothe.save).toHaveBeenCalledTimes(1);
		});

		it('should return a corrected data on real user', async () => {
			const { clotheRepository: sut } = makeSut();
			Clothe.findByPk = jest.fn().mockResolvedValueOnce({
				...mockClotheObj,
				toJSON: jest
					.fn()
					.mockResolvedValueOnce({ ...mockClotheObj, favorite: transpileModule }),
				save: jest.fn(),
			});

			const result = await sut.toggleFavoriteByClotheId({
				clotheId: mockClothe.id,
			});

			expect(result).toHaveProperty('id');
			expect(result).toHaveProperty('userId');
			expect(result).toHaveProperty('category');
			expect(result).toHaveProperty('updatedAt');
			expect(result).toHaveProperty('createdAt');
			expect(result).toHaveProperty('favorite');
			expect(result).toHaveProperty('image');
			expect(result).toHaveProperty('key');
			expect(result.favorite).toBeTruthy();
		});
	});

	describe('changeCategoryByClotheId', () => {
		it('should call the Clothe.findByPk() ', async () => {
			const { clotheRepository: sut } = makeSut();

			await sut.changeCategoryByClotheId({
				clotheId: mockClothe.id,
				category: 'new_category',
			});

			expect(Clothe.findByPk).toHaveBeenCalledTimes(1);
			expect(Clothe.findByPk).toHaveBeenCalledWith(mockClothe.id);
		});

		it('should throw a security message error', async () => {
			const { clotheRepository: sut } = makeSut();
			Clothe.findByPk = jest.fn().mockRejectedValueOnce(new Error('Erro'));

			await expect(async () => {
				await sut.changeCategoryByClotheId({
					clotheId: mockClothe.id,
					category: 'new_category',
				});
			}).rejects.toThrowError('Erro ao alterar a categoria: Erro');
		});

		it('should call the clothe.save())', async () => {
			const { clotheRepository: sut } = makeSut();

			await sut.changeCategoryByClotheId({
				clotheId: mockClothe.id,
				category: 'new_category',
			});

			expect(mockClothe.save).toHaveBeenCalledTimes(1);
		});

		it('should return a updated category', async () => {
			const { clotheRepository: sut } = makeSut();
			const result = await sut.changeCategoryByClotheId({
				clotheId: mockClothe.id,
				category: 'new_category',
			});
			expect(result.category).toBe('new_category');
		});

		it('should return a corrected data on real user', async () => {
			const { clotheRepository: sut } = makeSut();

			const result = await sut.changeCategoryByClotheId({
				clotheId: mockClothe.id,
				category: 'new_category',
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
	});

	describe('deleteByClotheId', () => {
		it('should call the Clothe.findById() ', async () => {
			const { clotheRepository: sut } = makeSut();

			await sut.deleteByClotheId({ clotheId: mockClothe.id });

			expect(Clothe.findByPk).toHaveBeenCalledTimes(1);
			expect(Clothe.findByPk).toHaveBeenCalledWith(mockClothe.id);
		});

		it('should throw a security message error', async () => {
			const { clotheRepository: sut } = makeSut();
			Clothe.findByPk = jest.fn().mockRejectedValueOnce(new Error('Erro'));

			await expect(async () => {
				await sut.deleteByClotheId({ clotheId: mockClothe.id });
			}).rejects.toThrowError('Erro ao deletar roupa: Erro');
		});

		it('should call the user.destroy()', async () => {
			const { clotheRepository: sut } = makeSut();
			const mockDestroy = jest.fn();
			Clothe.findByPk = jest.fn().mockResolvedValueOnce({
				destroy: mockDestroy,
				...mockClotheObj,
			});

			await sut.deleteByClotheId({ clotheId: mockClothe.id });

			expect(mockDestroy).toHaveBeenCalledTimes(1);
		});

		it('should return a success message', async () => {
			const { clotheRepository: sut } = makeSut();

			const result = await sut.deleteByClotheId({ clotheId: mockClothe.id });

			expect(result).toBe('Roupa deletada com sucesso');
		});
	});
});
