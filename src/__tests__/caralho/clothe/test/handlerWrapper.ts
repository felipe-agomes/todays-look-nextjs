import { NextApiRequest, NextApiResponse } from 'next';
import handlerPutDelete from '../../../../pages/api/protected/user/[userId]/clothe/[clotheId]';
import handler from '@/pages/api/protected/user/[userId]/clothe';

export const handlerWrapper = async (
	req: NextApiRequest,
	res: NextApiResponse,
) => {
	await handlerPutDelete(req, res);
};

export { handler };
