import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';

type Data = {
	error: boolean;
	message: string;
};

type User = {
	email: string;
	name: string;
	password: string;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const user: User = req.body;
	user.password = await bcrypt.hash(user.password, 8);
	
}
