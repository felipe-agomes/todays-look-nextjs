import { DataTypes } from 'sequelize';
import sequelize from '../connection';

const ClotheSet = sequelize.define('clotheSet', {
	id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
	},
	setId: {
		type: DataTypes.INTEGER,
		unique: true,
	},
	clotheId: {
		type: DataTypes.INTEGER,
		unique: true,
	},
	x: {
		type: DataTypes.REAL,
		allowNull: false,
	},
	y: {
		type: DataTypes.REAL,
		allowNull: false,
	},
});

export default ClotheSet;
