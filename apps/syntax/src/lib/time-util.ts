export function to24hr( time: string ) {
	let hour: string = ''
	let ampm: string = '';

	if ( !time.includes( ' ' ) ) {
		const g = time.match( /(?<hour>^\d+)(?<ampm>(a|p)m)/i )?.groups

		hour = g?.hour ?? ''
		ampm = g?.ampm ?? ''
	} else {
		const arr = time.split( ' ' )

		hour = arr[0]
		ampm = arr[1]
	}


	const hour24 = parseInt( hour, 10 )

	if ( ampm === 'pm' ) {
		return hour24 === 12 ? 12 : hour24 + 12
	}

	return hour24 === 12 ? 0 : hour24
}
