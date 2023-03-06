import { Unit } from '../src/lib/costants'
import { getRepetition } from '../src/lib/extractors'

describe( 'getRepetition', () => {
	it( 'Should return null if invalid value is provided', () => {
		const result = getRepetition( 'every on week' )
		expect( result ).toBe( null )
	} )

	describe( 'minutes', () => {
		// shorthands: m, min, minutes
		it( 'Should handle the MINUTE unit without value', () => {
			const result = getRepetition( 'every minute' )
			expect( result ).toEqual( { value: '1', unit: Unit.Minute } )
		} )

		it( 'Should handle the "m" shorthand', () => {
			const result = getRepetition( 'Every 1m on Monday' )
			expect( result ).toEqual( { value: '1', unit: Unit.Minute } )
		} )

		it( 'Should handle the "min" shorthand', () => {
			const result = getRepetition( 'Every 1 min on Monday' )
			expect( result ).toEqual( { value: '1', unit: Unit.Minute } )
		} )

		it( 'Should handle the "minutes" shorthand', () => {
			const result = getRepetition( 'Every 30 minutes on Monday' )
			expect( result ).toEqual( { value: '30', unit: Unit.Minute } )
		} )

		it( 'Should handle the standard "minute" with a value', () => {
			const result = getRepetition( 'Every 1 minute on Monday' )
			expect( result ).toEqual( { value: '1', unit: Unit.Minute } )
		} )
	} )

	describe( 'hours', () => {
		// shorthands: h, hr, hours

		it( 'Should handle the HOUR unit without value', () => {
			const result = getRepetition( 'every hour' )
			expect( result ).toEqual( { value: '1', unit: Unit.Hour } )
		} )

		it( 'Should handle the "h" shorthand', () => {
			const result = getRepetition( 'Every 1h on Monday' )
			expect( result ).toEqual( { value: '1', unit: Unit.Hour } )
		} )

		it( 'Should handle the "hr" shorthand', () => {
			const result = getRepetition( 'Every 1 hr on Monday' )
			expect( result ).toEqual( { value: '1', unit: Unit.Hour } )
		} )

		it( 'Should handle the "hours" shorthand', () => {
			const result = getRepetition( 'Every 2 hours on Monday' )
			expect( result ).toEqual( { value: '2', unit: Unit.Hour } )
		} )

		it( 'Should handle the standard "hour" with a value', () => {
			const result = getRepetition( 'Every 1 hour on Monday' )
			expect( result ).toEqual( { value: '1', unit: Unit.Hour } )
		} )
	} )


	describe( 'days', () => {
		// shorthands: d, day, days

		it( 'Should handle the DAY unit without value', () => {
			const result = getRepetition( 'every day' )
			expect( result ).toEqual( { value: '1', unit: Unit.Day } )
		} )

		it( 'Should handle the "d" shorthand', () => {
			const result = getRepetition( 'Every 1d on Monday' )
			expect( result ).toEqual( { value: '1', unit: Unit.Day } )
		} )


		it( 'Should handle the "days" shorthand', () => {
			const result = getRepetition( 'Every 2 days on Monday' )
			expect( result ).toEqual( { value: '2', unit: Unit.Day } )
		} )

		it( 'Should handle the standard "day" with a value', () => {
			const result = getRepetition( 'Every 1 day on Monday' )
			expect( result ).toEqual( { value: '1', unit: Unit.Day } )
		} )
	} )

	describe( 'weeks', () => {
		// shorthands: w, wk, weeks
		it( 'Should handle the WEEK unit without value', () => {
			const result = getRepetition( 'every week' )
			expect( result ).toEqual( { value: '1', unit: Unit.Week } )
		} )

		it( 'Should handle the "w" shorthand', () => {
			const result = getRepetition( 'Every 1w on Monday' )
			expect( result ).toEqual( { value: '1', unit: Unit.Week } )
		} )

		it( 'Should handle the "wk" shorthand', () => {
			const result = getRepetition( 'Every 1 wk on Monday' )
			expect( result ).toEqual( { value: '1', unit: Unit.Week } )
		} )

		it( 'Should handle the "weeks" shorthand', () => {
			const result = getRepetition( 'Every 2 weeks on Monday' )
			expect( result ).toEqual( { value: '2', unit: Unit.Week } )
		} )
	} )

	describe( 'months', () => {
		it( 'Should handle the standard "month"', () => {
			const result = getRepetition( 'Every month' )
			expect( result ).toEqual( { value: '1', unit: Unit.Month } )
		} )

		it( 'Should handle the "months" shorthand', () => {
			const result = getRepetition( 'Every 2 months' )
			expect( result ).toEqual( { value: '2', unit: Unit.Month } )
		} )
	} )

	describe( 'years', () => {
		it( 'Should handle the standard "year"', () => {
			const result = getRepetition( 'Every year' )
			expect( result ).toEqual( { value: '1', unit: Unit.Year } )
		} )

		it( 'Should handle the "years" shorthand', () => {
			const result = getRepetition( 'Every 2 years' )
			expect( result ).toEqual( { value: '2', unit: Unit.Year } )
		} )

		it( 'Should handle the "y" shorthand', () => {
			const result = getRepetition( 'Every 2y' )
			expect( result ).toEqual( { value: '2', unit: Unit.Year } )
		} )

		it( 'Should handle the "yrs" shorthand', () => {
			const result = getRepetition( 'Every 2yrs' )
			expect( result ).toEqual( { value: '2', unit: Unit.Year } )
		} )
	} )
} )
