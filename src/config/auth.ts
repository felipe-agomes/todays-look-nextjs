import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '@/models/schema/user';
import bcrypt from 'bcrypt';
import { ExtendedJWT, ExtendedSession } from '@/@types';

export const authOptions: AuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				email: { type: 'text', label: 'Email' },
				password: { type: 'password', label: 'Password' },
			},
			async authorize(credentials) {
				const user = await User.findOne({
					attributes: ['email', 'name', 'password', 'id'],
					where: {
						email: credentials?.email,
					},
				});

				if (!user) {
					throw new Error('Nenhum usuario encontrado');
				}

				if (
					!(
						(await bcrypt.compare(credentials?.password ?? '', user.password)) &&
						user.email === credentials?.email
					)
				) {
					throw new Error('Email ou senha inválidos');
				}
				return user;
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }: { token: ExtendedJWT; user: { id: string } }) {
			if (user) {
				token.uid = user.id;
			}
			return token;
		},
		async session({
			session,
			token,
		}: {
			session: ExtendedSession;
			token: ExtendedJWT;
		}) {
			if (session?.user) {
				session.user.id = token.uid;
			}
			return session;
		},
	},
};
