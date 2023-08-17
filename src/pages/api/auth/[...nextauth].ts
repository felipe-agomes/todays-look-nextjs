import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import { AuthOptions } from 'next-auth/core/types';
import userRepository from '../../../models/Postgre/UserRepository';

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
		async jwt({ token, account }: { token: any; account: any }) {
			// Persist the OAuth access_token to the token right after signin
			if (account) {
				token.accessToken = account.access_token;
			}
			return token;
		},
		async session({ session, token }: { token: any; session: any }) {
			// Send properties to the client, like an access_token from a provider.
			session.accessToken = token.accessToken;
			return session;
		},
		redirect() {
			return '/home';
		},
	},
	// callbacks: {
	// 	async session({ session }: { session: any }) {
	// 		const [user] = await userRepository.create({
	// 			email: session.user.email,
	// 			password: session.user.email,
	// 			image: session.user.image,
	// 		});
	// 		session.user.id = user.id;
	// 		return session;
	// 	},
	// 	redirect() {
	// 		return '/home';
	// 	},
	// },
};

export default NextAuth(authOptions);
