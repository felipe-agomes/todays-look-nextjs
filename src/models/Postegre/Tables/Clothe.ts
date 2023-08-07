import { DataTypes } from 'sequelize';
import sequelize from '../connection';

const Clothe = sequelize.define('clothe', {
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
	key: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	image: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
});

export default Clothe;
