import clc from 'cli-color'

export const logBlue = (message: string) =>
  console.log(clc.blue(`\n${message}`))
