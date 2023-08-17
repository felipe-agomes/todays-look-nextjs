import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import { AuthOptions } from 'next-auth/core/types';
import { User } from '@/models/Postgre/Tables';
import userRepository from '@/models/Postgre/UserRepository';
import SequelizeAdapter from '@auth/sequelize-adapter';
import sequelize from '@/models/Postgre/connection';

export const authOptions: AuthOptions = {
	providers: [
		// GoogleProvider({
		// 	clientId: process.env.GOOGLE_ID,
		// 	clientSecret: process.env.GOOGLE_SECRET,
		// }),
		GithubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	adapter: SequelizeAdapter(sequelize, {
		models: {
			User: sequelize.define('user', {
				...(sequelize.models.User as any),
			}),
		},
	}) as any,
	callbacks: {
		async session({ session, token }: { session: any; token: any }) {
			session.accessToken = token.accessToken;
			const [user] = await userRepository.create({
				email: session.user.email,
				password: session.user.email,
				image: session.user.image,
			});
			session.user.id = user.id;
			return session;
		},
		redirect() {
			return '/home';
		},
	},
};

export default NextAuth(authOptions);
