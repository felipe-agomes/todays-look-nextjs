import { handlerWrapper } from './test/handleWrapper';
import clotheRepository from '@/models/Postgre/ClotheRepository';

jest.mock('@/models/Postgre/ClotheRepository');
describe('postHandler', () => {
	let req: any = {
		method: 'POST',
	};
	let res: any = {
		status: jest.fn(() => this),
		json: jest.fn(() => this),
	};

	it('should ', async () => {
		const clothe = {
			category: 'category',
			image: 'image',
			key: 'key',
		};
		req.body = clothe;
		req.query = 'userId';

		await handlerWrapper(req, res);

		expect(clotheRepository.create).toHaveBeenCalledTimes(1);
		expect(clotheRepository.create).toHaveBeenCalledWith({
			category: 'category',
			image: 'image',
			key: 'key',
			userId: 'userId',
		});
	});
});
