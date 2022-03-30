# Crontab Sentence
> A simple function that transforms sentences into cron expressions.
> Sentences syntax is partially inspired by [crontab.guru](https://crontab.guru)

## Installation

```sh
	yarn add crontab-sentence
```

## Usage
For syntax reference [check-out tests](/apps/syntax/__tests__/sentence-to-cron.test.ts)

```ts
	import { parseSentence } from 'crontab-sentence'

	// Weeks aliased to days
	console.log(parseSentence('At 23:59 every 2 weeks in March')) //=> 59 23 */14 3 *
	console.log(parseSentence('At 23:59 every 14 days in June')) //=> 59 23 */14 6 *
```

### Supported Units
All weekdays and months are supported in both extended and short way (ex: Mon -> Monday, Jan -> January etc)

- **HOURS**
  - `hours`
  - `hour`
  - `hr`
  - `hrs`
- **MINUTES**
  - `minutes`
  - `minute`
  - `min`
  - `mins`
  - `m`
- **WEEKS**
  - `weeks`
  - `week`
  - `wk`
  - `wks`
- **MONTHS**
  - `months`
  - `month`


### Example Sentences
> The module is not case sensitive

- `At 22:00 on Friday`
- `At 22:00 every Monday`
- `At 1pm on Friday`
- `At 12pm on Monday`
- `At 23 every 2 months`
- `Every Tuesday in June`
- `At 23:59 every 14 days in March`
- `At 3pm every 2 weeks in April`

## ⚠️ Disclaimer
This module is not intended to be used in a production environment.
It is buggy and may not correctly parse every "sentence"
