import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('todays_look', 'postgres', 'password', {
	dialect: 'postgres',
});

export default sequelize;
