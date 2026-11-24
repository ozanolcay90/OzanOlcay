export type ThemeMode = 'light' | 'dark';

export const DEFAULT_THEME: ThemeMode = 'dark';

export const THEME_STORAGE_KEY = 'ozan-portfolio-theme-v2';

export function resolveInitialTheme(
  storedValue: string | null | undefined
): ThemeMode {
  if (storedValue === 'light' || storedValue === 'dark') {
    return storedValue;
  }
  return DEFAULT_THEME;
}

export function getNextTheme(current: ThemeMode): ThemeMode {
  return current === 'dark' ? 'light' : 'dark';
}
