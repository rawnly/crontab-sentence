import { MONTHS, WEEKDAYS } from './costants'


function sentenceToCron( sentence: string ): string {
	const regex = /^at\s(minute (?<minute>\d+)|(?<hh>\d+)\:(?<mm>\d+))(\son?\s(every\s(?<month_day_n>\d+((rd|nd|th)))|day-of-month\s(?<month_day>\d+)|(?<weekday>\w+)))?(\sin\s((every\s)?(?<month_n>\d(rd|nd|th))|(?<month>\w+))(month)?)?/i

	if ( !regex.test( sentence ) ) {
		throw new SyntaxError( "Invalid sentence syntax." )
	}

	const cron = sentence.match( regex )?.groups

	if ( !cron ) {
		throw new Error( 'Invalid regex' )
	}

	const parseRepeteition = ( str: string ) => str?.replace( /(\d+)(rd|nd|th)$/i, '*/$1' )

	const hour = cron.hh ?? '*'
	const minute = cron.mm ?? cron.minute ?? '*'
	const month_day = parseRepeteition( cron.month_day_n ) ?? cron.month_day ?? '*'
	const month = parseRepeteition( cron.month_n ) ?? MONTHS[cron.month?.toLowerCase()] ?? '*'
	const weekday = WEEKDAYS[cron.weekday?.toLowerCase()] ?? '*'

	return `${minute} ${hour} ${month_day} ${month} ${weekday}`
}

export default sentenceToCron
