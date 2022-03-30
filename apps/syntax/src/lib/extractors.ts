import { ALIASES, Unit } from './costants';
import { to24hr } from './time-util'



type Time = { minutes: string; hours: string }
export function getTime( sentence: string ): Time {
	const regex = /((?<hours>\d{1,2})\:(?<minutes>\d{1,2})|(?<time>\d+\s(a|p)m))|(at\s(?<hr>\d{1,2}((a|p)m)?)\s)/i
	const groups = sentence.match( regex )?.groups

	if ( !groups ) {
		return {
			hours: '*',
			minutes: '*'
		}
	}

	if ( groups.time || groups.hr ) {
		let hours = groups.time ?? groups.hr

		if ( hours.endsWith( 'm' ) ) {
			hours = to24hr( hours as any )?.toString()
		}

		return {
			hours: hours ?? '*',
			minutes: '*'
		}
	}


	return {
		hours: groups.hours,
		minutes: groups.minutes
	}
}

export function getWeekDay( sentence: string ) {
	const regex = /\s(?<weekday>Sun(day)?|Mon(day)?|Tue(sday)?|Wed(nesday)?|Thu(rsday)?|Fri(day)?|Sat(urday)?)(\s|$)/i
	const weekday = sentence.match( regex )?.groups?.weekday?.toLowerCase() ?? ''
	return ALIASES.WEEKDAYS[weekday.slice( 0, 3 ) as keyof typeof ALIASES.WEEKDAYS] ?? '*'
}

export function getMonth( source: string ) {
	const regex = /\s(?<month>Jan(uary)?|Feb(ruary)?|Mar(ch)?|Apr(il)?|May|Jun(e)?|Jul(y)?|Aug(ust)?|Sep(tember)?|Oct(ober)?|Nov(ember)?|Dec(ember)?)(\s|$)/i
	const month = source.match( regex )?.groups?.month?.toLowerCase() ?? ''
	const month_name = ALIASES.MONTHS[month.slice( 0, 3 ) as keyof typeof ALIASES.MONTHS] ?? '*'
	return ALIASES.MONTHS_INDEXES[month_name.slice( 0, 3 ) as keyof typeof ALIASES.MONTHS_INDEXES] ?? '*'
}


export function getRepetition( source: string ) {
	const weekday_regex = /Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday/i
	const regex = /every\s(?<value>\d+)?\s?(?<unit>(months?|Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|m(in(ute)?s?)?|h(our|r)?s?|y(ear|r)?s?|d(ay)?s?|w(eek|k)?s?))/i
	const groups = source.match( regex )?.groups

	if ( !groups ) {
		return null
	}

	if ( weekday_regex.test( groups.unit ) ) {
		return {
			value: groups.value ?? '1',
			unit: Unit.WeekDay
		}
	}

	return {
		value: groups.value ?? '1',
		unit: ALIASES.UNITS[groups.unit as keyof typeof ALIASES.UNITS] ?? ALIASES.UNITS[groups.unit[0].toLowerCase() as keyof typeof ALIASES.UNITS] ?? groups.unit[0].toLowerCase(),
	}
}
