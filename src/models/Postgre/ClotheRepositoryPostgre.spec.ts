import { toEditorSettings } from 'typescript';
import { Clothe, User } from './Tables';
import { userNotExist } from './UserRepository.spec';
import { ClotheRepositoryPostgre } from './ClotheRepositoryPostgre';

const makeSut = () => {
	const clotheRepository = new ClotheRepositoryPostgre();
	return { clotheRepository };
};

const newClothe = {
	userId: null,
	category: 'category',
	key: 'key',
	image: 'image',
};

describe('ClotheRepository', () => {
	describe('create', () => {
		let user: any;
		beforeEach(async () => {
			// await Clothe.destroy({
			// 	where: {},
			// 	truncate: false,
			// });
			user = await User.findOne({
				where: { email: 'user_already_exist@teste.com' },
			});
			newClothe.userId = user.id;
			jest.resetAllMocks();
		});
		it('should call the Clothe.create()', async () => {
			const { clotheRepository: sut } = makeSut();
			const spyCreate = jest.spyOn(Clothe, 'create');

			await sut.create(newClothe);

			expect(spyCreate).toHaveBeenCalledTimes(1);
			expect(spyCreate).toHaveBeenCalledWith({
				category: newClothe.category,
				key: newClothe.key,
				image: newClothe.image,
			});
		});

		it('should call the Clothe.findByPk()', async () => {
			const { clotheRepository: sut } = makeSut();
			const spyFindByPk = jest.spyOn(User, 'findByPk');

			await sut.create(newClothe);

			expect(spyFindByPk).toHaveBeenCalledTimes(1);
			expect(spyFindByPk).toHaveBeenCalledWith(newClothe.userId);
		});

		it('should throw a error if any error occurs', async () => {
			const { clotheRepository: sut } = makeSut();
			jest.spyOn(Clothe, 'create').mockRejectedValueOnce(new Error('erro'));

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
		let user: any;
		beforeEach(async () => {
			user = await User.findOne({
				where: { email: 'user_already_exist@teste.com' },
			});
			jest.clearAllMocks();
		});

		it('should call the User.findByPk()', async () => {
			const { clotheRepository: sut } = makeSut();
			const spyFindByPk = jest.spyOn(User, 'findByPk');

			await sut.getAllByUserId({ userId: user.id });

			expect(spyFindByPk).toHaveBeenCalledTimes(1);
		});

		it('should throw a security message error', async () => {
			const { clotheRepository: sut } = makeSut();
			jest.spyOn(User, 'findByPk').mockRejectedValueOnce(new Error('Erro'));

			await expect(async () => {
				await sut.getAllByUserId({ userId: user.id });
			}).rejects.toThrowError('Erro ao buscar roupas: Erro');
		});

		it('should return a empty array if user does not have any clothe registered', async () => {
			const { clotheRepository: sut } = makeSut();
			const user: any = await User.create(userNotExist);

			const result = await sut.getAllByUserId({ userId: user.id });

			expect(result).toEqual([]);
		});

		it('should return a corrected data on real user', async () => {
			const { clotheRepository: sut } = makeSut();

			const result = await sut.getAllByUserId({
				userId: user.id,
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
		let clothe: any;
		let user: any;
		const originalClotheFindByPk = Clothe.findByPk;
		beforeEach(async () => {
			jest.resetAllMocks();
			// await Clothe.destroy({ where: {} });
			user = await User.findOne({
				where: { email: 'user_already_exist@teste.com' },
			});
			clothe = await Clothe.create(newClothe);
			await clothe.setUser(user);
		});

		it('should call the Clothe.findByPk() ', async () => {
			const { clotheRepository: sut } = makeSut();
			const spyFindByPk = jest.spyOn(Clothe, 'findByPk');

			await sut.toggleFavoriteByClotheId({ clotheId: clothe.id });

			expect(spyFindByPk).toHaveBeenCalledTimes(1);
			expect(spyFindByPk).toHaveBeenCalledWith(clothe.id);
		});

		it('should call the clothe.save())', async () => {
			const { clotheRepository: sut } = makeSut();
			const mockSave = jest.fn();
			Clothe.findByPk = jest
				.fn()
				.mockResolvedValueOnce({ save: mockSave, favorite: false });

			await sut.toggleFavoriteByClotheId({
				clotheId: 'clotheId',
			});

			expect(mockSave).toHaveBeenCalledTimes(1);
		});

		it('should return a corrected data on real user', async () => {
			const { clotheRepository: sut } = makeSut();
			Clothe.findByPk = originalClotheFindByPk;

			const result = await sut.toggleFavoriteByClotheId({
				clotheId: clothe.id,
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
		const originalClotheFindByPk = Clothe.findByPk;
		let clothe: any;
		beforeEach(async () => {
			// await Clothe.destroy({ where: {} });
			clothe = await Clothe.create(newClothe);
			jest.resetAllMocks();
		});

		it('should call the Clothe.findByPk() ', async () => {
			const { clotheRepository: sut } = makeSut();
			const spyFindByPk = jest.spyOn(Clothe, 'findByPk');

			await sut.changeCategoryByClotheId({
				clotheId: clothe.id,
				category: 'new_category',
			});

			expect(spyFindByPk).toHaveBeenCalledTimes(1);
			expect(spyFindByPk).toHaveBeenCalledWith(clothe.id);
		});

		it('should throw a security message error', async () => {
			const { clotheRepository: sut } = makeSut();
			jest.spyOn(Clothe, 'findByPk').mockRejectedValueOnce(new Error('Erro'));

			await expect(async () => {
				await sut.changeCategoryByClotheId({
					clotheId: clothe.id,
					category: 'new_category',
				});
			}).rejects.toThrowError('Erro ao alterar a categoria: Erro');
		});

		it('should call the clothe.save())', async () => {
			const { clotheRepository: sut } = makeSut();
			const mockSave = jest.fn();
			Clothe.findByPk = jest
				.fn()
				.mockResolvedValueOnce({ save: mockSave, favorite: false });

			await sut.changeCategoryByClotheId({
				clotheId: clothe.id,
				category: 'new_category',
			});

			expect(mockSave).toHaveBeenCalledTimes(1);
		});

		it('should return a updated category', async () => {
			const { clotheRepository: sut } = makeSut();
			Clothe.findByPk = originalClotheFindByPk;
			const result = await sut.changeCategoryByClotheId({
				clotheId: clothe.id,
				category: 'new_category',
			});
			expect(result.category).toBe('new_category');
		});

		it('should return a corrected data on real user', async () => {
			const { clotheRepository: sut } = makeSut();
			Clothe.findByPk = originalClotheFindByPk;
			const result = await sut.changeCategoryByClotheId({
				clotheId: clothe.id,
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
		let clothe: any;
		const originalClotheFindByPk = Clothe.findByPk;
		beforeEach(async () => {
			// await Clothe.destroy({ where: {} });
			clothe = await Clothe.create(newClothe);
			jest.resetAllMocks();
		});

		it('should call the Clothe.findById() ', async () => {
			const { clotheRepository: sut } = makeSut();
			const spyFindByPk = jest.spyOn(Clothe, 'findByPk');

			await sut.deleteByClotheId({ clotheId: clothe.id });

			expect(spyFindByPk).toHaveBeenCalledTimes(1);
			expect(spyFindByPk).toHaveBeenCalledWith(clothe.id);
		});

		it('should throw a security message error', async () => {
			const { clotheRepository: sut } = makeSut();
			jest.spyOn(Clothe, 'findByPk').mockRejectedValueOnce(new Error('Erro'));

			await expect(async () => {
				await sut.deleteByClotheId({ clotheId: 'clotheId' });
			}).rejects.toThrowError('Erro ao deletar roupa: Erro');
		});

		it('should call the user.destroy()', async () => {
			const { clotheRepository: sut } = makeSut();
			const mockDestroy = jest.fn();
			Clothe.findByPk = jest.fn().mockResolvedValueOnce({ destroy: mockDestroy });

			await sut.deleteByClotheId({ clotheId: clothe.id });

			expect(mockDestroy).toHaveBeenCalledTimes(1);
		});

		it('should return a success message', async () => {
			const { clotheRepository: sut } = makeSut();
			Clothe.findByPk = originalClotheFindByPk;

			const result = await sut.deleteByClotheId({ clotheId: clothe.id });

			expect(result).toBe('Roupa deletada com sucesso');
		});
	});
});
