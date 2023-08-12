import { NextApiRequest, NextApiResponse } from 'next';
import handler from '../[setId]';

export const handlerWrapper = async (
	req: NextApiRequest,
	res: NextApiResponse,
) => {
	await handler(req, res);
};
