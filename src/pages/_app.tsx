import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import ProviderRoot from '@/providers/ProviderRoot';

export default function App({
	Component,
	pageProps: { ...pageProps },
}: AppProps) {
	return (
		<ProviderRoot>
			<ChakraProvider>
				<Component {...pageProps} />
			</ChakraProvider>
		</ProviderRoot>
	);
}
