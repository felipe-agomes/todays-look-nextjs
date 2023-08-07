import { Sequelize } from 'sequelize';
import { config } from 'dotenv';
config();

const { POSTGRE_PASSWORD, POSTGRE_DATABASE, POSTGRE_USER } = process.env;

if (!(POSTGRE_PASSWORD && POSTGRE_DATABASE && POSTGRE_USER))
	throw new Error('Faltam variaveis de ambiente POSTGRE');

const sequelize = new Sequelize(
	POSTGRE_DATABASE,
	POSTGRE_USER,
	POSTGRE_PASSWORD,
	{
		dialect: 'postgres',
	},
);

export default sequelize;
