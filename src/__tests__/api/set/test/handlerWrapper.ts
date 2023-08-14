import { NextApiRequest, NextApiResponse } from 'next';
import handlerPutDelete from '../../../../pages/api/protected/user/[userId]/set/[setId]';
import handler from '@/pages/api/protected/user/[userId]/set';

export const handlerWrapper = async (
	req: NextApiRequest,
	res: NextApiResponse,
) => {
	await handlerPutDelete(req, res);
};

export { handler };
