import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import { AuthOptions } from 'next-auth/core/types';
import { User } from '@/models/Postgre/Tables';

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
	callbacks: {
		async session({ session, token }: { session: any; token: any }) {
			session.accessToken = token.accessToken;
			// const [user] = await User.findOrCreate({
			// 	where: { email: session.user.email },
			// 	defaults: {
			// 		email: session.user.email,
			// 		password: session.user.email,
			// 		image: session.user.image,
			// 	},
			// });
			// session.user.id = (user as any).id;
			return session;
		},
		redirect() {
			return '/home';
		},
	},
};

export default NextAuth(authOptions);
