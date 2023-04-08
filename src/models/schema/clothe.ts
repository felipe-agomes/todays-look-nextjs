import { Model } from 'sequelize';

import db from '../../services/connectDB';
import Sequelize from 'sequelize';
import User from './user';

type ClotheAttributes = {
	id: number;
	category: string;
	favorite: boolean;
	key: string;
	image: string;
	userId: number;
} & Model;

const Clothe = db.define<ClotheAttributes>('clothe', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		allowNull: false,
		autoIncrement: true,
	},
	category: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	favorite: {
		type: Sequelize.BOOLEAN,
		defaultValue: false,
		allowNull: false,
	},
	key: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	image: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false,
	},
	userId: {
		type: Sequelize.INTEGER,
		references: {
			model: User,
			key: 'id',
		},
	},
});

// Clothe.sync({ force: true});

export default Clothe;
