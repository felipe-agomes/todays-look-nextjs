import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { ChakraProvider } from '@chakra-ui/react';
import connectDb from '@/services/connectDBMong';
// connectDb();

export default function App({ Component, pageProps }: AppProps) {
	return (
		<SessionProvider session={pageProps.session}>
			<ChakraProvider>
				<Component {...pageProps} />
			</ChakraProvider>
		</SessionProvider>
	);
}

// TODO: Não esquecer de fazer a segurança para administradores
