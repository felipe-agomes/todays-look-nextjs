import { ClotheData, ClotheModel } from '@/@types';
import User from './colections/user';
import Clothe from './colections/clothe';
import connectDb from '@/services/connectDb';

async function setNewClothe(data: ClotheData) {
	await connectDb();
	const user = await User.findById(data.userId);

	if (!user) {
		return {
			error: true,
			message: 'Usuario não existe',
		};
	}

	try {
		await Clothe.create(data);
		return {
			error: false,
			message: 'Roupa cadastrada com sucesso',
		};
	} catch (error) {
		return {
			error: true,
			message: 'Erro ao cadastrar, dados insuficientes passados ' + error,
		};
	}
}

async function getAllClothes(userId: string) {
	await connectDb();
	const clothe = await Clothe.find({ userId });

	if (!clothe) {
		return {
			error: true,
			message: 'Nenhuma roupa desse usuario encontrada',
		};
	}

	return {
		error: false,
		message: 'Roupas encontrada com sucesso',
		clothe,
	};
}

async function deleteClothe(clotheId: string) {
	await connectDb();
	const clothe = await Clothe.findById(clotheId);

	if (!clothe) {
		return {
			error: true,
			message: 'Nenhuma roupa encontrada',
		};
	}

	await Clothe.findByIdAndDelete(clotheId);
	return {
		error: false,
		message: `Roupa id: ${clothe.id} do usuario id: ${clothe.userId} deletada com sucesso`,
		clothe,
	};
}

async function toggleFavorite(clotheId: string) {
	await connectDb();
	const clothe = await Clothe.findById(clotheId);

	if (!clothe) {
		return {
			error: true,
			message: 'Nenhuma roupa encontrada',
		};
	}

	const newClothe = { favorite: !clothe.favorite };

	await clothe.updateOne(newClothe);

	return {
		error: false,
		message: 'Favorito alterado com sucesso',
		clothe: newClothe,
	};
}

async function updateCategory(clotheId: String, toUpdate: String) {
	const clothe = await Clothe.findById(clotheId);

	if (!clothe) {
		return {
			error: true,
			message: 'Nenhuma roupa encontrada',
		};
	}

	const newClothe = { category: toUpdate };
	await clothe.updateOne(newClothe);
	return {
		error: false,
		message: 'Categoria alterada com sucesso',
		clothe: newClothe,
	};
}

export const clotheModels = {
	setNewClothe,
	getAllClothes,
	deleteClothe,
	toggleFavorite,
	updateCategory,
};
