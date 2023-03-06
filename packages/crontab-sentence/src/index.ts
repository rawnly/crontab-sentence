import { ALIASES, MONTHS, Unit, WEEKDAYS } from './lib/costants'
import { getRepetition, getMonth, getTime, getWeekDay } from './lib/extractors'
import { deprecate } from 'util'

/** @deprecated in v0.0.3 */
function sentenceToCron( sentence: string ): string {
	const regex = /(at|every\s(?<wkd>\w+))\s(minute (?<minute>\d+)|(?<hh>\d+)\:(?<mm>\d+))(\son?\s(every\s(?<month_day_n>\d+((rd|nd|th)))|day-of-month\s(?<month_day>\d+)|(?<weekday>\w+)))?(\sin\s((every\s)?(?<month_n>\d(rd|nd|th))|(?<month>\w+))(month)?)?/i

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
	const weekday = WEEKDAYS[cron.weekday?.toLowerCase() ?? cron.wkd?.toLowerCase()] ?? '*'


	return `${minute} ${hour} ${month_day} ${month} ${weekday}`
}

export default deprecate( sentenceToCron, 'sentenceToCron() is deprecated. Please use parseSentence() instead.', 'DEPR001' )


export const parseSentence = ( sentence: string ): string => {
	// 'at 11am every monday'
	const time = getTime( sentence )
	const rep = getRepetition( sentence )
	let weekday = ( ALIASES.WEEKDAYS_INDEXES[getWeekDay( sentence ) as keyof typeof ALIASES.WEEKDAYS_INDEXES] )?.toString() ?? '*'
	let months = `${getMonth( sentence ) ?? '*'}`

	let days = '*'

	switch ( rep?.unit ) {
		case Unit.Hour:
			time.hours = `*/${rep.value}`
			break
		case Unit.Minute:
			time.minutes = `*/${rep.value}`
			break
		case Unit.Day:
			days = `*/${rep.value}`
			break
		case Unit.Week:
			days = `*/${parseInt( rep.value ) * 7}`
			break
		case Unit.Month:
			months = `*/${rep.value}`
			break
		case Unit.WeekDay:
			weekday = `*/${weekday}`
		default:
			break
	}


	return `${time.minutes} ${time.hours} ${days} ${months} ${weekday}`
}
