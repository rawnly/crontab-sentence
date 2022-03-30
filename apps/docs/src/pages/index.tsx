import { CopyIcon, RefreshIcon } from '@components/icons';
import ThemeSwitch from '@components/ThemeSwitch';
import sentenceToCron from 'crontab-sentence';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import React, { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import cx from 'classnames'
import useDarkMode from 'src/hooks/useDarkMode';

const sentences = [
	'At 22:00 on Friday',
	'At 22:00 in every month',
	'At 22:00 in every 3rd month',
	'At 22:00 on every 2nd day-of-month',
	'At 22:00 on every 2nd day-of-week',
	'At 22:00 on day-of-month 3 in january',
	'At 22:00 on tuesday in march',
]


interface PageProps { }

export const copyToClipboard = async ( text: string ) => {
	if ( typeof window === 'undefined' ) return null

	if ( 'clipboard' in navigator ) {
		await navigator.clipboard.writeText( text );
		toast( 'Copied to clipboard', {
			duration: 1250,
			position: 'top-center',
			icon: <CopyIcon />,
			className: '!text-zinc-200 !bg-zinc-900'
		} )
	} else {
		return document.execCommand( 'copy', true, text );
	}
}

const Page: NextPage<PageProps> = _ => {
	const darkMode = useDarkMode()
	const [sentence, setSentence] = useState( '' )
	const [output, setOutput] = useState( '* * * * *' )

	useEffect( () => {
		try {
			setOutput( sentenceToCron( sentence ) )
		} catch ( error ) {
			console.error( error )
			setOutput( '* * * * *' )
		}
	}, [sentence] )

	const themeMeta = useMemo( () => ( {
		name: 'theme-color',
		content: darkMode.enabled ? '#18181b' : '#fafafa'
	} ), [darkMode.enabled] )

	return (
		<div className=' flex flex-col items-center justify-center w-screen h-screen gap-4'>
			<ThemeSwitch />
			<NextSeo
				title='Home'
				titleTemplate='Sentence to Cron | %s'
				description='Convert a sentence to a cron expression'
				additionalMetaTags={[themeMeta]}
				openGraph={{
					title: 'Sentence to Cron',
					description: 'Convert a sentence to a cron expression',
					locale: 'en_US',
					url: 'https://sentencetocron.fedevitale.dev',
					site_name: 'Sentence to Cron',
					images: [
						{
							url: 'https://sentencetocron.fedevitale.dev/assets/banner-dark.png',
							type: 'image/png',
							alt: 'Dark Banner',
						},
						{
							url: 'https://sentencetocron.fedevitale.dev/assets/banner-light.png',
							type: 'image/png',
							alt: 'Light Banner',
						},
					]
				}}
				twitter={{
					site: 'https://sentencetocron.fedevitale.dev',
					handle: '@fedevitaledev',
					cardType: 'summary',
				}}
			/>

			<a href='https://github.com/rawnly/crontab-sentence' target={'_blank'} className='hover:opacity-50 top-5 left-5 fade-in fixed'>Source Code</a>

			<main className="sm:mt-24 w-full max-w-2xl px-4 mx-auto mt-16">
				<h1 className='sm:text-6xl sm:mb-8 relative mx-auto mb-4 text-4xl font-bold text-center'>
					<span data-title='Sentence2Cron' id='subject'>
						Sentence2Cron
					</span>
				</h1>
				<div className="fade-in-up sm:px-0 flex flex-col items-start w-full gap-2 px-6">
					<label className=' text-sm font-semibold' htmlFor="sentence">Sentence</label>
					<div className={cx(
						"sm:flex-row flex flex-col items-center justify-start w-full gap-0 border",
						'rounded overflow-hidden',
						'border-zinc-900/50 focus-within:border-zinc-900',
						'dark:border-zinc-50/50 dark:focus-within:border-zinc-50',
					)}>
						<input
							type="text"
							name='sentence'
							value={sentence}
							onChange={e => setSentence( e.target.value )}
							placeholder={sentences[Math.floor( Math.random() * sentences.length )]}
							className={cx(
								'pl-4 py-2 pr-0 w-full',
								'outline-none bg-transparent',
							)}
						/>
						<button
							type='reset'
							onClick={() => setSentence( sentences[Math.floor( Math.random() * sentences.length )] )}
							className={cx(
								'px-4 py-2',
								'outline-none bg-transparent',
								'dark:hover:text-white/50 hover:text-zinc-900/50',
							)}
						>
							<RefreshIcon />
						</button>
					</div>

					<button
						onClick={() => copyToClipboard( output )}
						className='hover:opacity-75 active:opacity-50 sm:text-5xl flex items-center justify-center px-4 py-2 mx-auto mt-10 text-3xl font-bold bg-transparent rounded-lg'
					>
						{output}
					</button>
				</div>
			</main>

			<footer className='bottom-5 fixed px-4 text-center'>
				Made with a <a className='hover:opacity-50' target={'_blank'} href='https://github.com/Rawnly/crontab-sentence/blob/master/apps/syntax/src/index.ts#L5'>regex</a> by <a href="https://fedevitale.dev" className='dark:text-[#00ffa7] hover:opacity-50 text-[#00c079]' target={'_blank'}>@fedevitale</a>
			</footer>
		</div>
	)
};

Page.displayName = 'IndexPage';

export default Page;
