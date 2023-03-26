import Sequelize from 'sequelize';

import db from '../connect';

const User = db.define('user', {
	id: {
		type: Sequelize.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false,
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false,
	},
});

User.sync();

export default User;
