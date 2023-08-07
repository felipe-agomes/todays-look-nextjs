import { Sequelize } from 'sequelize';

describe('connection', () => {
	it('should establish a successful database connection', async () => {
		const sequelize = new Sequelize('todays_look', 'postgres', 'password', {
			dialect: 'postgres',
		});

		await expect(sequelize.authenticate()).resolves.not.toThrowError();
	});
});
