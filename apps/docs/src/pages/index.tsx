import { CopyIcon } from '@components/icons';
import ThemeSwitch from '@components/ThemeSwitch';
import sentenceToCron from 'crontab-sentence';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import React, { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
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
			className: 'dark:text-black dark:bg-white text-black bg-white'
		} )
	} else {
		return document.execCommand( 'copy', true, text );
	}
}

const Page: NextPage<PageProps> = _ => {
	const darkMode = useDarkMode()
	const [sentence, setSentence] = useState( 'at 22:00' )
	const [output, setOutput] = useState( () => {
		try {
			return sentenceToCron( sentence )
		} catch ( error ) {
			return error.message
		}
	} )

	useEffect( () => {
		try {
			setOutput( sentenceToCron( sentence ) )
		} catch ( error ) {
			setOutput( error.message )
		}
	}, [sentence] )

	const themeMeta = useMemo( () => ( {
		name: 'theme-color',
		content: darkMode.enabled ? 'black' : 'white'
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
					<div className="sm:flex-row flex flex-col items-center justify-start w-full gap-4">
						<input
							name='sentence'
							className='border-slate-900/50 focus:border-slate-900 dark:border-white/50 dark:focus:border-white flex-1 w-full px-4 py-2 bg-transparent border rounded outline-none'
							placeholder={sentences[Math.floor( Math.random() * sentences.length )]}
							type="text"
							onChange={e => setSentence( e.target.value )}
							value={sentence}
						/>

						<button className='dark:bg-white hover:opacity-80 dark:text-black px-4 py-2 text-white bg-black rounded-md' onClick={() => setSentence( sentences[Math.floor( Math.random() * sentences.length )] )}>Random Sentence</button>
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
