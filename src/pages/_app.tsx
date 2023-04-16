import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
	return (
		<SessionProvider session={session}>
			<ChakraProvider>
				<Component {...pageProps} />
			</ChakraProvider>
		</SessionProvider>
	);
}

// TODO: Não esquecer de fazer a segurança para administradores
