import Clothe from './schema/clothe';
import User from './schema/user';

type ClotheModel = {
	category: string;
	body: string;
	key: string;
	image: string;
	userId: number;
};

async function setNewClothe(data: ClotheModel) {
	const user = await User.findByPk(data.userId);

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

async function getAllClothes(userId: number) {
	const clothe = await Clothe.findAll({
		attributes: ['id', 'body', 'category', 'favorite', 'image', 'key', 'userId'],
		where: {
			userId,
		},
	});

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

async function deleteClothe(userId: number, clotheId: number) {
	const clothe = await Clothe.findOne({
		attributes: ['id', 'body', 'category', 'favorite', 'image', 'key', 'userId'],
		where: {
			id: clotheId,
			userId,
		},
	});

	if (!clothe) {
		return {
			error: true,
			message: 'Nenhuma roupa encontrada',
		};
	}

	const copyClothe = { ...clothe };

	await clothe.destroy();
	return {
		error: false,
		message: `Roupa id: ${copyClothe.dataValues.id} do usuario id: ${copyClothe.dataValues.userId} deletada com sucesso`,
	};
}

async function toggleFavorite(userId: number, clotheId: number) {
	const clothe = await Clothe.findOne({
		attributes: ['id', 'body', 'category', 'favorite', 'image', 'key', 'userId'],
		where: {
			id: clotheId,
			userId,
		},
	});

	if (!clothe) {
		return {
			error: true,
			message: 'Nenhuma roupa encontrada',
		};
	}

	await clothe.update({ favorite: !clothe.favorite });

	return {
		error: false,
		message: 'Favorito alterado com sucesso',
	};
}

const clotheModels = {
	setNewClothe,
	getAllClothes,
	deleteClothe,
	toggleFavorite,
};

export default clotheModels;
