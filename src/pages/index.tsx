import { useSession, getSession, signOut } from 'next-auth/react';
import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from 'next/router';

export default function Home({ session }) {
	const router = useRouter();

	function handleGoogleSignOut() {
		signOut({ callbackUrl: '/' });
	}

	return (
		<>
			<ul>
				<li>{session?.user?.email}</li>
				<li>{session?.user?.image}</li>
				<li>{session?.user?.name}</li>
			</ul>
			<button onClick={handleGoogleSignOut}>sair</button>
		</>
	);
}

export async function getServerSideProps({ req }) {
	const session = await getSession({ req });

	if (!session) {
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		};
	}

	return {
		props: { session },
	};
}
