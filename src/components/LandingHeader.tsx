'use client';
import React from 'react';

import AppLogo from '@/components/ui/AppLogo';
import { Language } from '@/lib/types';
import { t } from '@/lib/translations';

interface LandingHeaderProps {
  lang: Language;
  onLangChange: (l: Language) => void;
  onJoinClick: () => void;
}

export default function LandingHeader({ lang, onLangChange, onJoinClick }: LandingHeaderProps) {
  const tr = t(lang);
  const isRTL = lang === 'ar';

  return (
    <header
      className="sticky top-0 z-50 bg-white border-b border-border"
      dir={isRTL ? 'rtl' : 'ltr'}
      role="banner"
    >
      <div className="max-w-wide mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <AppLogo
            src="/assets/images/Mobde-1787628974719.png"
            size={36}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          />
        </div>

        {/* Right side actions */}
        <div className={`flex items-center gap-3 sm:gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {/* Language switcher */}
          <div className="flex items-center gap-1 text-sm">
            <button
              onClick={() => onLangChange('en')}
              className={`px-2 py-1 rounded transition-colors ${
                lang === 'en' ?'text-foreground font-600' :'text-muted-foreground hover:text-foreground'
              }`}
              aria-label="Switch to English"
            >
              EN
            </button>
            <span className="text-border select-none">|</span>
            <button
              onClick={() => onLangChange('ar')}
              className={`px-2 py-1 rounded transition-colors font-arabic ${
                lang === 'ar' ?'text-foreground font-600' :'text-muted-foreground hover:text-foreground'
              }`}
              aria-label="التبديل إلى العربية"
            >
              ع
            </button>
          </div>

          {/* How it works — desktop only */}
          <a
            href="#how-it-works"
            className="hidden sm:block text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {tr.howItWorks}
          </a>

          {/* CTA */}
          <button
            onClick={onJoinClick}
            className="btn-primary text-sm font-600 px-4 py-2 rounded-md"
          >
            {tr.joinWaitlist}
          </button>
        </div>
      </div>
    </header>
  );
}