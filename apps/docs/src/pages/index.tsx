import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { CopyIcon, DownloadIcon, MoonIcon, SunIcon } from '@components/icons';
import sentenceToCron from 'crontab-sentence'
import toast from 'react-hot-toast';
import ThemeSwitch from '@components/ThemeSwitch';

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
	const [copied, setCopied] = useState( false )
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

	return (
		<div className=' flex flex-col items-center justify-center w-screen h-screen gap-4'>
			<ThemeSwitch />

			<main className="sm:mt-24 w-full max-w-2xl px-4 mx-auto mt-16">
				<h1 className='relative mx-auto mb-8 text-6xl font-bold text-center'>
					<span id='subject'>Sentence Parser</span>
				</h1>
				<div className="fade-in-up flex flex-col items-start w-full gap-2">
					<label className=' text-sm font-semibold' htmlFor="sentence">Sentence</label>
					<div className="flex items-center justify-start w-full gap-4">
						<input
							name='sentence'
							className='flex-1 border-slate-900 dark:border-white focus:border-[#00ffa7] outline-none w-full px-4 py-2  bg-transparent border rounded'
							placeholder='At 22:00'
							type="text"
							onChange={e => setSentence( e.target.value )}
							value={sentence}
						/>

						<button className='dark:bg-white hover:opacity-80 dark:text-black px-4 py-2 text-white bg-black rounded-md' onClick={() => setSentence( sentences[Math.floor( Math.random() * sentences.length )] )}>Random Sentence</button>
					</div>

					<button
						onClick={() => copyToClipboard( output )}
						className='hover:opacity-75 active:opacity-50 flex items-center justify-center px-4 py-2 mx-auto mt-10 text-5xl font-bold bg-transparent rounded-lg'
					>
						{output}
					</button>
				</div>

				<div className='left-1/2 bottom-5 absolute -translate-x-1/2'>
					<span className='fade-in'>
						Made with a <a className='hover:opacity-50' target={'_blank'} href='https://github.com/Rawnly/crontab-sentence/blob/master/apps/syntax/src/index.ts#L5'>regex</a> by <a href="https://fedevitale.dev" className='dark:text-[#00ffa7] hover:opacity-50 text-[#00c079]' target={'_blank'}>@fedevitale</a>
					</span>
				</div>

				<a href='https://github.com/rawnly/crontab-sentence' target={'_blank'} className='hover:opacity-50 bottom-5 right-5 fade-in fixed'>Source Code</a>
			</main>
		</div>
	)
};

Page.displayName = 'IndexPage';

export default Page;
