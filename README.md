# Crontab Sentence
> A simple function that transforms sentences into cron expressions.
> Sentences syntax is inspired by [crontab.guru](https://crontab.guru)

## Installation

```sh
	yarn add crontab-sentence
```

## Usage
```ts
	import sentenceToCron from 'crontab-sentence'

	console.log(sentenceToCron('At 22:00 on every 3rd day-of-month')) //=> 00 22 */3 * *
```

## Disclaimer
This module is not intended to be used in a production environment. It is buggy and may not correctly parse every "sentence"
