

export enum Unit {
	Minute = 'minute',
	Hour = 'hour',
	Day = 'day',
	Week = 'week',
	Month = 'month',
	Year = 'year',

	WeekDay = 'weekday'
}
export const WEEKDAYS: Record<string, string | number> = {
	sunday: 0,
	monday: 1,
	tuesday: 2,
	wednesday: 3,
	thursday: 4,
	friday: 5,
	saturday: 6
} as const

export const MONTHS: Record<string, string | number> = {
	january: 1,
	february: 2,
	march: 3,
	april: 4,
	may: 5,
	june: 6,
	july: 7,
	august: 8,
	september: 9,
	october: 10,
	november: 11,
	december: 12,
	every: '*/1'
} as const


export const ALIASES = {
	MONTHS: {
		jan: 'january',
		feb: 'february',
		mar: 'march',
		apr: 'april',
		may: 'may',
		jun: 'june',
		jul: 'july',
		aug: 'august',
		sep: 'september',
		oct: 'october',
		nov: 'november',
		dec: 'december',
	},
	WEEKDAYS: {
		sun: 'sunday',
		mon: 'monday',
		tue: 'tuesday',
		wed: 'wednesday',
		thu: 'thursday',
		fri: 'friday',
		sat: 'saturday',
	},
	WEEKDAYS_INDEXES: {
		monday: 1,
		tuesday: 2,
		wednesday: 3,
		thursday: 4,
		friday: 5,
		saturday: 6,
		sunday: 7,
	},
	get MONTHS_INDEXES() {
		return Object
			.keys( this.MONTHS )
			.reduce( ( acc, k, idx ) => ( { ...acc, [k]: idx + 1 } ), {} )
	},
	TIME: {
		am: 'am',
		pm: 'pm',
		noon: '12:00',
		midnight: '00:00',
		mid: '12:00',
	},
	UNITS: {
		m: Unit.Minute,
		h: Unit.Hour,
		d: Unit.Day,
		w: Unit.Week,
		y: Unit.Year,
		month: Unit.Month,
		months: Unit.Month,
	}
}
