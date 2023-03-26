import Sequelize from 'sequelize';

import db from '../connect';
import User from './user';

const Clothe = db.define('clothe', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		unique: true,
		primaryKey: true,
		allowNull: false,
	},
	category: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	body: {
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
		allowNull: false,
	},
	userId: {
		type: Sequelize.INTEGER,
		allowNull: false,
		references: {
			model: User,
			key: 'id',
		},
	},
});

Clothe.sync();

export default Clothe;
