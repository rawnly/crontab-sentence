import sentenceToCron, { parseSentence } from '../src';


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

		it( 'Should parse basic sentence', () => {
			const result = sentenceToCron( 'every day at 22:00' )
			expect( result ).toBe( '00 22 * * *' )
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


describe( 'parseSentence', () => {
	it( 'should handle simple sentence', () => {
		const result = parseSentence( 'at 11am every monday' )
		expect( result ).toBe( '* 11 * * */1' )
	} )

	it( 'should handle simple sentence', () => {
		const result = parseSentence( 'At 23 every 2 months' )
		expect( result ).toBe( '* 23 * */2 *' )
	} )

	it( 'should handle combination of hour + every N months + day', () => {
		const result = parseSentence( 'At 23 every 2 months on monday' )
		expect( result ).toBe( '* 23 * */2 1' )
	} )

	it( 'should handle combination of hour + minutes + every N months + day', () => {
		const result = parseSentence( 'At 23:59 every 2 months on monday' )
		expect( result ).toBe( '59 23 * */2 1' )
	} )

	it( 'should handle combination of hour + minutes + every N months + day', () => {
		const result = parseSentence( 'At 23:59 every tuesday in march' )
		expect( result ).toBe( '59 23 * 3 */2' )
	} )

	it( 'should handle weeks as an alias of days', () => {
		const result = parseSentence( 'At 23:59 every 2 weeks in march' )
		expect( result ).toBe( '59 23 */14 3 *' )

		const result2 = parseSentence( 'At 23:59 every 14 days in march' )
		expect( result2 ).toBe( '59 23 */14 3 *' )
	} )
} )
