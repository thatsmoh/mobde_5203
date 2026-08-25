'use client';
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Language } from '@/lib/types';
import { t } from '@/lib/translations';

interface WaitlistSuccessProps {
  lang: Language;
  onAnswerQuestions: () => void;
  onSkip: () => void;
  skipped: boolean;
}

export default function WaitlistSuccess({ lang, onAnswerQuestions, onSkip, skipped }: WaitlistSuccessProps) {
  const tr = t(lang);
  const isRTL = lang === 'ar';

  if (skipped) {
    return (
      <div dir={isRTL ? 'rtl' : 'ltr'} className="animate-fade-in text-center py-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <CheckCircle size={20} className="text-success flex-shrink-0" />
          <span className="text-base font-600 text-foreground">{tr.successTitle}</span>
        </div>
        <p className="text-sm text-muted-foreground">{tr.successSubtitle}</p>
      </div>
    );
  }

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="animate-slide-up">
      <div className={`flex items-start gap-3 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div className="mt-0.5 flex-shrink-0">
          <CheckCircle size={20} className="text-success" />
        </div>
        <div>
          <p className="text-base font-600 text-foreground">{tr.successTitle}</p>
          <p className="text-sm text-muted-foreground mt-0.5">{tr.successSubtitle}</p>
        </div>
      </div>

      <div className="border border-border rounded-md p-4 bg-secondary/40">
        <p className="text-sm text-foreground font-500 mb-3">{tr.questionnairePrompt}</p>
        <div className={`flex flex-col sm:flex-row gap-2 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
          <button
            onClick={onAnswerQuestions}
            className="btn-primary text-sm font-600 px-5 py-2.5 rounded-md flex-1 sm:flex-none"
          >
            {tr.answerQuestions}
          </button>
          <button
            onClick={onSkip}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors px-4 py-2.5 rounded-md border border-border hover:border-foreground/20 bg-white"
          >
            {tr.skipForNow}
          </button>
        </div>
      </div>
    </div>
  );
}