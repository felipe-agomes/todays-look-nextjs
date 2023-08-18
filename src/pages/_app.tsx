import '@/styles/globals.css';
import ProviderRoot from '@/providers/ProviderRoot';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}: AppProps) {
	return (
		<ProviderRoot>
			<ChakraProvider>
				<Component {...pageProps} />
			</ChakraProvider>
		</ProviderRoot>
	);
}
