import { Html, Head, Main, NextScript, DocumentProps } from 'next/document'
import { FC } from 'react'

const Document: FC<DocumentProps> = () => (
	<Html>
		<Head />
		<body className='dark:bg-zinc-900 dark:text-zinc-50 bg-zinc-50 text-zinc-900 font-mono transition-colors'>
			<Main />
			<NextScript />
		</body>
	</Html>
)

export default Document
