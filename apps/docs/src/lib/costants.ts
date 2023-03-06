export const EXPLANATION = [
  "# Convert a prompt into a cron-expression",
  "# A cron expression is made as the follwing",
  "# [minute (0-59)] [hour (0-23)] [day (month 0-31)] [month (0-12)] [day (week, 0-5)]",
  "# * => any value",
  "# - => range of values (eg: 1-2)",
  "# / => step values (eg: */2)",
  "#",
  "# Week repetition is expressed in days-of-the-month",
  "# Time has 24h format",
  "# An expression cannot contain an empty value",
];

export const PROMPTS = [
  {
    prompt: "At 15:00 on Friday in every month from January through February",
    cron: "0 15 * 1-2 5",
  },
  {
    prompt: "Every friday at 3pm",
    cron: "0 15 * * 5",
  },
  {
    prompt: "Every hour on Friday",
    cron: "0 * * * 5",
  },
  {
    prompt: "Every day of August at 00:05",
    cron: "5 0 * 8 *",
  },
  {
    prompt: "At 15:30 on the 1st of every month",
    cron: "30 15 1 * *",
  },
  {
    prompt: "At every 30th minute past hour 22 on Monday",
    cron: "*/30 22 * * 1",
  },
  {
    prompt: "At 3pm every 2 weeks in April",
    cron: "* 15 */14 4 *",
  },
  {
    prompt: "Every 12 weeks on Monday",
    cron: "* * */84 1 *",
  },
  {
    prompt: "On 25h from January to June",
    cron: "* * 25 1-6 *",
  },
];

const SUFFIX = `${EXPLANATION.join("\n")}\n\n${PROMPTS.map(
  (p) => `PROMPT: ${p.prompt}\nCRON: ${p.cron}`
).join("\n")}`;
