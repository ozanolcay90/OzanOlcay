import test from 'node:test';
import assert from 'node:assert/strict';
import { DEFAULT_THEME, getNextTheme, resolveInitialTheme } from './theme';

test('resolveInitialTheme defaults to dark when preference is unset or invalid', () => {
  assert.equal(DEFAULT_THEME, 'dark');
  assert.equal(resolveInitialTheme(null), 'dark');
  assert.equal(resolveInitialTheme(undefined), 'dark');
  assert.equal(resolveInitialTheme(''), 'dark');
  assert.equal(resolveInitialTheme('invalid'), 'dark');
});

test('resolveInitialTheme honors explicit stored user preference', () => {
  assert.equal(resolveInitialTheme('light'), 'light');
  assert.equal(resolveInitialTheme('dark'), 'dark');
});

test('getNextTheme flips cleanly between light and dark', () => {
  assert.equal(getNextTheme('dark'), 'light');
  assert.equal(getNextTheme('light'), 'dark');
});
