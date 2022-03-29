import { AppProps } from 'next/app'
import { FC } from 'react'
import '../tailwind.css'
import { Toaster } from 'react-hot-toast';

const App: FC<AppProps> = ( { Component, pageProps } ) => (
	<>
		<Toaster />
		<Component {...pageProps} />
	</>
);

export default App
