export const sleep = (seconds: number) => new Promise((res, rej) => setTimeout(res, seconds * 1000))
