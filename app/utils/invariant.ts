const isProduction: boolean = process.env.NODE_ENV === 'production';
const prefix: string = 'Invariant error';

export function invariant(
  condition: unknown,
  message?: string | (() => string),
): asserts condition {
  if (condition) {
    return;
  }

  if (isProduction) {
    throw new Error(prefix);
  }

  const provided: string | undefined = typeof message === 'function' ? message() : message;
  const value: string = provided ? `${prefix}: ${provided}` : prefix;

  throw new Error(value);
}
