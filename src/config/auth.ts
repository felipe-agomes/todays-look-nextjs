import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from 'bcrypt';
import { ExtendedJWT, ExtendedSession } from '@/@types';
import User from '@/models/colections/user';
import connectDb from '@/services/connectDb';

export const authOptions: AuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.CLIENT_ID!,
			clientSecret: process.env.CLIENT_SECRET!,
		}),
	],
	// 	CredentialsProvider({
	// 		name: 'credentials',
	// 		credentials: {
	// 			email: { type: 'text', label: 'Email' },
	// 			password: { type: 'password', label: 'Password' },
	// 		},
	// 		async authorize(credentials) {
	// 			await connectDb();
	// 			const user = await User.findOne({
	// 				email: credentials?.email,
	// 			});
	// 			console.log(credentials);

	// 			if (!user) {
	// 				throw new Error('Nenhum usuario encontrado');
	// 			}

	// 			if (
	// 				!(
	// 					(await bcrypt.compare(
	// 						credentials?.password ?? '',
	// 						user.password ?? ''
	// 					)) && user.email === credentials?.email
	// 				)
	// 			) {
	// 				throw new Error('Email ou senha inválidos');
	// 			}

	// 			const newUser = {
	// 				email: user.email,
	// 				name: user.name,
	// 				id: user.id,
	// 			};
	// 			return newUser;
	// 		},
	// 	}),
	// ],
	// callbacks: {
	// 	async jwt({ token, user }: { token: ExtendedJWT; user: { id: string } }) {
	// 		if (user) {
	// 			token.uid = user.id;
	// 		}
	// 		return token;
	// 	},
	// 	async session({
	// 		session,
	// 		token,
	// 	}: {
	// 		session: ExtendedSession;
	// 		token: ExtendedJWT;
	// 	}) {
	// 		if (session?.user) {
	// 			session.user.id = token.uid;
	// 		}
	// 		return session;
	// 	},
	// },
	// secret: process.env.NEXTAUTH_SECRET,
};
