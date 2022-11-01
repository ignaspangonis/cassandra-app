import clc from 'cli-color'

export const logMessageBlue = (message: string) =>
  console.log(clc.blue(`\n${message}`))
