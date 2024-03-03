import { test, expect } from 'vitest'
import { pathJoin } from './path';

test('pathJoin', () => {
  expect(pathJoin('a', 'b')).toBe('a/b');
  expect(pathJoin('a/', 'b')).toBe('a/b');
  expect(pathJoin('a', '/b')).toBe('a/b');
  expect(pathJoin('a/', '/b')).toBe('a/b');
  expect(pathJoin('/a', 'b')).toBe('a/b');
  expect(pathJoin('/a/', 'b')).toBe('a/b');
  expect(pathJoin('/a', '/b')).toBe('a/b');
  expect(pathJoin('/a/', '/b')).toBe('a/b');
  expect(pathJoin('/a/', '/b/')).toBe('a/b');
  expect(pathJoin('/a/', '/b/', '/c')).toBe('a/b/c');
  expect(pathJoin('/a/', '/b/', '/c/')).toBe('a/b/c');
  expect(pathJoin('./a/', '/b/', '/c/')).toBe('a/b/c');
});
