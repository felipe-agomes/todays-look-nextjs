import { NextApiRequest, NextApiResponse } from 'next';
import handler from '../[clotheId]';

export const handlerWrapper = async (
	req: NextApiRequest,
	res: NextApiResponse,
) => {
	await handler(req, res);
};
