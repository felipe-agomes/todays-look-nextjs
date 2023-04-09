import { NextApiRequest, NextApiResponse } from 'next';
import connectDb from './services/connectDBMong';
import { NextResponse } from 'next/server';

export default function middleware(_req: NextApiRequest) {
	connectDb();
	return NextResponse.next();
}
