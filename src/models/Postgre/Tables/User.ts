import { DataTypes } from 'sequelize';
import sequelize from '../connection';

const User = sequelize.define('user', {
	id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	image: {
		type: DataTypes.TEXT,
	},
});

export default User;
