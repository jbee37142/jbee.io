export function pathJoin(...args: string[]) {
  return args.map(x => {
    if (x.startsWith('./')) {
      x = x.slice(2);
    }
    if (x.startsWith('/')) {
      x = x.slice(1);
    }
    if (x.endsWith('/')) {
      x = x.slice(0, -1);
    }

    return x;
  }).join('/');
}
