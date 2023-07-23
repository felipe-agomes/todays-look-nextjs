import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import ProviderAppContext from '@/contexts/App';

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
	return (
		<SessionProvider session={session}>
			<ProviderAppContext>
				<ChakraProvider>
					<Component {...pageProps} />
				</ChakraProvider>
			</ProviderAppContext>
		</SessionProvider>
	);
}

// TODO: Não esquecer de fazer a segurança para administradores
