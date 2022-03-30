import { to24hr } from '../src/lib/time-util'

describe( 'to24hr', () => {
	it( 'Should handle no-space between time and unit', () => {
		const result = to24hr( '10pm' )
		expect( result ).toBe( 22 )
	} )

	it( 'Should transform 6pm to 18', () => {
		const result = to24hr( '6 pm' )
		expect( result ).toBe( 18 )
	} )

	it( 'Should transform 6am to 6', () => {
		const result = to24hr( '6 am' )
		expect( result ).toBe( 6 )
	} )

	it( 'Should transform 12am to 00', () => {
		const result = to24hr( '12 am' )
		expect( result ).toBe( 0 )
	} )

	it( 'Should transform 12pm to 12', () => {
		const result = to24hr( '12 pm' )
		expect( result ).toBe( 12 )
	} )
} )
