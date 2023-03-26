import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const { DB_HOST, DB_USER, DB_NAME, DB_PASSWORD } = process.env;

const sequelize = new Sequelize(DB_NAME ?? '', DB_USER ?? '', DB_PASSWORD, {
	host: DB_HOST,
	dialect: 'mysql',
});

sequelize
	.authenticate()
	.then(() => {
		console.log('Connection has been established successfully.');
	})
	.catch((err) => {
		console.log('Unable to connect to the database:', err);
	});

export default sequelize;
