import { ExtendedJWT, ExtendedSession } from '@/@types';
import { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import User from '@/models/colections/user';
import connectDb from '@/services/connectDb';

export const authOptions: AuthOptions = {
	providers: [
		GoogleProvider({
			clientSecret: process.env.CLIENT_SECRET!,
			clientId: process.env.CLIENT_ID!,
		}),
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				email: { type: 'text', label: 'Email' },
				password: { type: 'password', label: 'Password' },
			},
			async authorize(credentials) {
				await connectDb();
				const user = await User.findOne({
					email: credentials?.email,
				});

				if (!user) {
					throw new Error('Nenhum usuario encontrado');
				}

				if (
					!(
						(await bcrypt.compare(
							credentials?.password ?? '',
							user.password ?? ''
						)) && user.email === credentials?.email
					)
				) {
					throw new Error('Email ou senha inválidos');
				}

				const newUser = {
					email: user.email,
					name: user.name,
					id: user.id,
				};
				return newUser;
			},
		}),
	],
	callbacks: {
		jwt({ token, user }) {
			if (user) {
				token.id = user.id;
			}
			return token;
		},
		session({ session, token }) {
			return {
				...session,
				user: {
					...session.user,
					id: token.id,
				},
			};
		},
	},
	// secret: process.env.NEXTAUTH_SECRET,
};
