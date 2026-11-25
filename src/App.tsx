/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { CertificatesSection } from './components/CertificatesSection';
import { ContactSection } from './components/ContactSection';
import {
  getNextTheme,
  resolveInitialTheme,
  THEME_STORAGE_KEY,
  type ThemeMode,
} from './utils/theme';

function readInitialTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'dark';
  let stored: string | null = null;
  try {
    stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  } catch {
    stored = null;
  }
  return resolveInitialTheme(stored);
}

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>(readInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => {
      const next = getNextTheme(prev);
      try {
        window.localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch {
        // Ignore storage failures in restricted browsing contexts
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#0C0E11] text-[#111315] dark:text-[#F2F4F7] transition-colors duration-200">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#111315] dark:focus:bg-[#F2F4F7] focus:text-white dark:focus:text-[#0C0E11] focus:rounded-md focus:text-sm"
      >
        Skip to content
      </a>
      <Navbar theme={theme} onToggleTheme={handleToggleTheme} />
      <main id="main-content">
        <HeroSection />
        <ProjectsSection />
        <ExperienceSection />
        <CertificatesSection />
        <ContactSection />
      </main>
    </div>
  );
}
