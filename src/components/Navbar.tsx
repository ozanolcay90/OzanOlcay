import { useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';
import type { ThemeMode } from '../utils/theme';

const NAV_LINKS = [
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#methodology', label: 'Profile' },
  { href: '#credentials', label: 'Credentials' },
  { href: '#contact', label: 'Contact' },
] as const;

interface NavbarProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
}

export function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isDark = theme === 'dark';

  return (
    <header className="sticky top-0 z-40 bg-[#FAFAFA]/95 dark:bg-[#0C0E11]/95 backdrop-blur-sm border-b border-[#E4E6EA] dark:border-[#252A33] transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
        <a
          href="#top"
          className="font-display text-lg font-bold tracking-tight text-[#111315] dark:text-[#F2F4F7] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D94826] dark:focus-visible:outline-[#F06A4A]"
        >
          {PROFILE.fullName}
        </a>

        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#525860] dark:text-[#949CA8]"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="py-1 whitespace-nowrap shrink-0 hover:text-[#111315] dark:hover:text-[#F2F4F7] transition-colors duration-150 border-b border-transparent hover:border-[#111315] dark:hover:border-[#F2F4F7] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D94826] dark:focus-visible:outline-[#F06A4A]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-pressed={isDark}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="inline-flex items-center justify-center w-10 h-10 rounded-md text-[#424850] dark:text-[#C2C8D1] hover:text-[#111315] dark:hover:text-[#F2F4F7] hover:bg-[#ECEEF2] dark:hover:bg-[#1B1F26] transition-colors duration-150 shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D94826] dark:focus-visible:outline-[#F06A4A]"
          >
            {isDark ? (
              <Sun className="w-[18px] h-[18px]" aria-hidden="true" />
            ) : (
              <Moon className="w-[18px] h-[18px]" aria-hidden="true" />
            )}
          </button>

          <a
            href="#contact"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white dark:text-[#0C0E11] bg-[#111315] dark:bg-[#F2F4F7] rounded-md hover:bg-[#272B30] dark:hover:bg-[#DCE0E6] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D94826] dark:focus-visible:outline-[#F06A4A]"
          >
            Get in Touch
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-menu"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-md text-[#111315] dark:text-[#F2F4F7] hover:bg-[#F3F4F6] dark:hover:bg-[#1B1F26] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D94826] dark:focus-visible:outline-[#F06A4A]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav
          id="mobile-nav-menu"
          aria-label="Mobile navigation"
          className="md:hidden border-t border-[#E4E6EA] dark:border-[#252A33] bg-white dark:bg-[#13161B] px-6 py-4 space-y-1"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 text-base font-medium text-[#111315] dark:text-[#F2F4F7] hover:text-[#B5381A] dark:hover:text-[#F06A4A] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-[#E4E6EA] dark:border-[#252A33]">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex w-full items-center justify-center px-4 py-2.5 text-sm font-medium text-white dark:text-[#0C0E11] bg-[#111315] dark:bg-[#F2F4F7] rounded-md hover:bg-[#272B30] dark:hover:bg-[#DCE0E6] transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
