import { Html, Head, Main, NextScript, DocumentProps } from 'next/document'
import { FC } from 'react'

const Document: FC<DocumentProps> = () => (
	<Html>
		<Head />
		<body className='dark:bg-black dark:text-white bg-slate-50 text-slate-900 font-mono transition-colors'>
			<Main />
			<NextScript />
		</body>
	</Html>
)

export default Document
