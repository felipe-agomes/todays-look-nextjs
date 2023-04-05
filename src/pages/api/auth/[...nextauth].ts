import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '@/models/schema/user';
import bcrypt from 'bcrypt';

type CredentialsType = {
	email: string;
	password: string;
};

export const authOptions = {
	providers: [
		// GoogleProvider({
		// 	clientId: process.env.GOOGLE_ID!,
		// 	clientSecret: process.env.GOOGLE_SECRET!,
		// }),
		CredentialsProvider({
			name: 'credentials',
			async authorize(credentials, _req) {
				const user = await User.findOne({
					attributes: ['email', 'name', 'password', 'id'],
					where: {
						email: credentials.email,
					},
				});

				if (!user) {
					throw new Error('Nenhum usuario encontrado');
				}

				if (
					!(
						(await bcrypt.compare(credentials.password, user.password)) &&
						user.email === credentials.email
					)
				) {
					throw new Error('Email ou senha inválidos');
				}
				return user;
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.uid = user.id;
			}
			return token;
		},
		async session({ session, token }) {
			if (session?.user) {
				session.user.id = token.uid;
			}
			return session;
		},
	},
};

export default NextAuth(authOptions);
