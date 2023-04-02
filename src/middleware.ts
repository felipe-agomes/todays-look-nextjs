import { NextRequest, NextResponse } from 'next/server';
import { promisify } from 'util';
import JWT from 'jsonwebtoken';

export async function middleware(req: NextRequest) {
	const authorization = req.headers.get('authorization');

	if (!authorization) {
		return;
	}

	const token = authorization.split(' ')[1];

	const decode = JWT.verify(token, process.env.JWT_SECRETKEY);
	console.log(process.env.JWT_SECRETKEY);

	NextResponse.next();
}

export const config = {
	matcher: [
		'/api/protected/user/clothe/all',
		'/api/protected/user/clothe/delete',
		'/api/protected/user/clothe/favorite',
		'/api/protected/user/clothe/upload',
	],
};
