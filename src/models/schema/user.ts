import db from '../../services/connectDB';
import Sequelize, { Model } from 'sequelize';

type UsersAttributes = {
	id: number;
	name: string;
	email: string;
	password: string;
} & Model;

const User = db.define<UsersAttributes>('user', {
	id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true,
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
