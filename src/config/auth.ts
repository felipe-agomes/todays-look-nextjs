import { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import User from '@/models/colections/user';
import connectDb from '@/services/connectDb';
import { userModels } from '@/models/userModels';

export const authOptions: AuthOptions = {
	providers: [
		GoogleProvider({
			clientSecret: process.env.CLIENT_SECRET!,
			clientId: process.env.CLIENT_ID!,
		}),
		// CredentialsProvider({
		// 	name: 'credentials',
		// 	credentials: {
		// 		email: { type: 'text', label: 'Email' },
		// 		password: { type: 'password', label: 'Password' },
		// 	},
		// 	async authorize(credentials) {
		// 		await connectDb();
		// 		const user = await User.findOne({
		// 			email: credentials?.email,
		// 		});

		// 		if (!user) {
		// 			throw new Error('Nenhum usuario encontrado');
		// 		}

		// 		if (
		// 			!(
		// 				(await bcrypt.compare(
		// 					credentials?.password ?? '',
		// 					user.password ?? ''
		// 				)) && user.email === credentials?.email
		// 			)
		// 		) {
		// 			throw new Error('Email ou senha inválidos');
		// 		}

		// 		const newUser = {
		// 			email: user.email,
		// 			name: user.name,
		// 			id: user.id,
		// 		};
		// 		return newUser;
		// 	},
		// }),
	],
	callbacks: {
		async signIn({ account, profile }) {
			if (account?.provider === 'google') {
				await connectDb();
				let user = await User.findOne({
					email: profile?.email,
				});
				const { picture } = profile as { picture: string };

				if (!user) {
					await userModels.createUser({
						email: profile?.email!,
						name: profile?.name!,
						password: '',
						image: picture,
					});
				}
				user = await User.findOne({
					email: profile?.email,
				});
			}
			return true;
		},
		async jwt({ token, user }) {
			if (user) {
				await connectDb();
				const userBd = await User.findOne({
					email: user.email,
				});
				token.id = userBd?.id;
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
	secret: process.env.NEXTAUTH_SECRET,
	
};
