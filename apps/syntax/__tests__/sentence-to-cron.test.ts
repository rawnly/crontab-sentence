import { parseSentence } from '../src';


describe( 'parseSentence', () => {
	it( 'should handle simple sentences', () => {
		const sentences = [
			'at 11',
			'at 11:00',
			'every hour',
			'every 2 hours',
			'every week',
			'every month',
			'every tuesday',
			'every tuesday at 11',
			'every day at 22'
		].map( parseSentence )

		const expected = [
			'* 11 * * *',
			'00 11 * * *',
			'* */1 * * *',
			'* */2 * * *',
			'* * */7 * *',
			'* * * */1 *',
			'* * * * */2',
			'* 11 * * */2',
			'* 22 */1 * *',
		]


		expect( sentences ).toStrictEqual( expected )
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
