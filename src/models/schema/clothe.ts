const db = require('../services/connectDB');
const Sequelize = require('sequelize');
const User = require('./user');

const Clothe = db.define('clothe', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		unique: true,
		allowNull: false,
		autoIncrement: true,
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

// Clothe.sync();

module.exports = Clothe;
