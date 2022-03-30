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
	console.log(parseSentence('At 23:59 every 2 weeks in march')) //=> 59 23 */14 3 *
	console.log(parseSentence('At 23:59 every 14 days in june')) //=> 59 23 */14 6 *
```

## Disclaimer
This module is not intended to be used in a production environment.
It is buggy and may not correctly parse every "sentence"
