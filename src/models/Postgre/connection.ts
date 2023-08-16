import { Sequelize } from 'sequelize';
import { config } from 'dotenv';
config();

const { DATABASE_CONNECTION } = process.env;

if (!DATABASE_CONNECTION)
	throw new Error('Faltam variaveis de ambiente DATABASE_CONNECTION');

const sequelize = new Sequelize(DATABASE_CONNECTION);

export default sequelize;
