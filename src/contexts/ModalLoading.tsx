import { Dispatch, SetStateAction, createContext, useState } from 'react';

type ModalLoadingContext = {
	loading: boolean;
	setLoading: Dispatch<SetStateAction<boolean>>;
};

export const ModalLoadingContext = createContext<ModalLoadingContext>({
	loading: false,
	setLoading() {},
});

export default function ProviderModalLoading({
	children,
}: {
	children: React.ReactNode;
}) {
	const [loading, setLoading] = useState<boolean>(false);

	return (
		<ModalLoadingContext.Provider value={{ loading, setLoading }}>
			{children}
		</ModalLoadingContext.Provider>
	);
}
