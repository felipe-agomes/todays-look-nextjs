import { ClotheData } from '@/@types';
import User from './colections/user';
import Clothe from './colections/clothe';
import connectDb from '@/services/connectDb';
import { Response } from '@/controllers/FrontController';

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
	const clothes = await Clothe.find({ userId });

	if (!clothes) {
		return {
			error: true,
			message: 'Nenhuma roupa desse usuario encontrada',
		};
	}

	return {
		error: false,
		message: 'Roupas encontradas com sucesso',
		clothes,
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

async function updateCategory(
	clotheId: String,
	{ category }: { category: string },
): Promise<Response> {
	await connectDb();
	const clothe = await Clothe.findById(clotheId);
	if (!clothe) {
		throw new Error('Nenhuma roupa encontrada');
	}
	await clothe.updateOne({ category });
	clothe.category = category;
	return {
		status: 'success',
		message: 'Categoria alterada com sucesso',
		data: clothe,
	};
}

export const clotheModels = {
	setNewClothe,
	getAllClothes,
	deleteClothe,
	toggleFavorite,
	updateCategory,
};
