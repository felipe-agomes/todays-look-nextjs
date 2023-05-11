import mongoose from 'mongoose';
import connectDb from './connectDb';

const mongooseConnectMock = mongoose.connect as jest.Mock;

jest.mock('mongoose');

describe('connectDb', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should create a database connection if no error occurs', async () => {
		mongooseConnectMock.mockResolvedValue(undefined);

		await connectDb();

		expect(mongooseConnectMock).toHaveBeenCalled();
	});

	it('should throw an exception in case of any connection error', async () => {
		mongooseConnectMock.mockRejectedValue(
			new Error('Falha ao conectar com o banco de dados'),
		);

		console.error = jest.fn();
		await connectDb();

		expect(console.error).toHaveBeenCalled();
	});
});
