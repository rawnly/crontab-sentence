import sentenceToCron from '../src';


describe( 'sentenceToCron', () => {
	describe( 'base', () => {
		it( 'Should throw error if invalid syntax is provided', () => {
			const result = () => sentenceToCron( '--' )
			expect( result ).toThrowError( SyntaxError )
		} )

		it( 'Should not be case sensitive', () => {
			const result = sentenceToCron( 'AT 22:00 IN EVERY 3RD MONTH' );
			expect( result ).toBe( '00 22 * */3 *' );
		} )

		it( 'Should parse a simple time sentence', () => {
			const result = sentenceToCron( 'At 22:00' );
			expect( result ).toBe( '00 22 * * *' );
		} )

		it( 'Should parse time + weekday', () => {
			const result = sentenceToCron( 'At 22:00 on Friday' );
			expect( result ).toBe( '00 22 * * 5' );
		} )

		// it( 'Should parse time + weekday + month', () => {
		// 	const result = sentenceToCron( 'At 22:00 on day-of-month 1 and on Monday' );
		// 	expect( result ).toBe( '00 22 1 * 1' );
		// } )

		it( 'Should parse time + weekday + month + day', () => {
			const result = sentenceToCron( 'At 22:00 on day-of-month 1 in January' );
			expect( result ).toBe( '00 22 1 1 *' );
		} )
	} )

	describe( 'cycles', () => {
		it( 'Should parse the `every month` keyword', () => {
			const result = sentenceToCron( 'At 22:00 in every month' );
			expect( result ).toBe( '00 22 * */1 *' );
		} )

		it( 'Should parse the `every 2th month` keyword', () => {
			const result = sentenceToCron( 'At 22:00 in every 2th month' );
			expect( result ).toBe( '00 22 * */2 *' );
		} )
	} )
} )
