import { getTime, getWeekDay } from '../src/lib/extractors'


describe( 'getTime', () => {
	it( 'Should extract hours and minutes from sentence', () => {
		const result = getTime( 'At 12:30 on Monday' )
		expect( result ).toEqual( { hours: '12', minutes: '30' } )
	} )

	it( 'Should ignore hours repetition', () => {
		const result = getTime( 'Every hour on Monday' )
		expect( result ).toEqual( { hours: '*', minutes: '*' } )
	} )

	it( 'Should return "*" if invalid value is provided', () => {
		const result = getTime( 'at monday' )
		expect( result ).toEqual( { hours: '*', minutes: '*' } )
	} )

	it( 'Should return "* minutes" if only hours are provided', () => {
		const result = getTime( 'at 11 on monday' )
		expect( result ).toEqual( { hours: '11', minutes: '*' } )
	} )

	it( 'Should return "* minutes" and extract time if only hours with AM/PM are provided', () => {
		const result = getTime( 'at 10pm on monday' )
		expect( result ).toEqual( { hours: '22', minutes: '*' } )
	} )
} )

describe( 'getWeekDay', () => {
	const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
	const weekdays_short = weekdays.map( weekday => weekday.slice( 0, 3 ) )

	it( 'Should extract the weekday from sentence', () => {
		const sentences = weekdays.map( day => getWeekDay( `At 11 every ${day}` ) )
		expect( sentences ).toEqual( weekdays )
	} )

	it( 'Should handle short weekdays names', () => {
		const sentences = weekdays_short.map( day => getWeekDay( `At 11 every ${day}` ) )
		expect( sentences ).toEqual( weekdays )
	} )
} )
