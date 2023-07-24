import ProviderAppContext from '@/contexts/App';
import ProviderModaisContext from '@/contexts/Modais';

export default function ProviderRoot({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ProviderAppContext>
			<ProviderModaisContext>{children}</ProviderModaisContext>
		</ProviderAppContext>
	);
}
