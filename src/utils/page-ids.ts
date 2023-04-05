export function createIdPage(namespace: string, ...args: unknown[]): string {
  return `${namespace};${args.join(';')}`;
}

export function readIdPage(id: string): string[] {
  const [namespace, ...args] = id.split(';');
  return [namespace, ...args];
}