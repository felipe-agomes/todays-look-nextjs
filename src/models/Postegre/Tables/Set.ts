import { DataTypes } from 'sequelize';
import sequelize from '../connection';

const Set = sequelize.define('set', {
	id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
	},
	category: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	favorite: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false,
	},
});

export default Set;
