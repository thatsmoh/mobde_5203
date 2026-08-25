'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import LandingHeader from '@/components/LandingHeader';
import WaitlistForm from '@/components/WaitlistForm';
import WaitlistSuccess from '@/components/WaitlistSuccess';
import ProductPreview from '@/components/ProductPreview';
import { Language } from '@/lib/types';
import { t } from '@/lib/translations';

export default function LandingPage() {
  const router = useRouter();
  const [lang, setLang] = useState<Language>('ar');
  const [waitlistState, setWaitlistState] = useState<'idle' | 'success' | 'skipped'>('idle');
  const [entryId, setEntryId] = useState<string | null>(null);
  const [utmParams, setUtmParams] = useState<Record<string, string>>({});
  const heroFormRef = useRef<HTMLDivElement>(null);
  const finalCtaRef = useRef<HTMLDivElement>(null);

  const tr = t(lang);
  const isRTL = lang === 'ar';

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const utm: Record<string, string> = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'].forEach((key) => {
      const val = params.get(key);
      if (val) utm[key] = val;
    });
    setUtmParams(utm);
  }, []);

  const handleJoinClick = useCallback(() => {
    heroFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, []);

  const handleSuccess = useCallback((id: string) => {
    setEntryId(id);
    setWaitlistState('success');
  }, []);

  const handleAnswerQuestions = useCallback(() => {
    // Backend integration point: POST /api/analytics/questionnaire-start
    if (entryId) {
      router.push(`/questionnaire-screen?entryId=${entryId}&lang=${lang}`);
    }
  }, [entryId, lang, router]);

  const handleSkip = useCallback(() => {
    setWaitlistState('skipped');
    // Backend integration point: POST /api/analytics/questionnaire-skip
  }, []);

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-white">
      <LandingHeader lang={lang} onLangChange={setLang} onJoinClick={handleJoinClick} />

      <main>
        {/* ─── HERO ─── */}
        <section className="max-w-wide mx-auto px-5 sm:px-8 pt-14 pb-16 sm:pt-20 sm:pb-24">
          <div className="max-w-content">
            {/* Headline */}
            <h1
              className={`text-3xl sm:text-4xl lg:text-5xl font-800 text-foreground leading-tight tracking-tight mb-5 text-balance
                ${isRTL ? 'text-right font-arabic' : 'text-left'}`}
            >
              {tr.heroHeadline}
            </h1>

            {/* Sub-headline */}
            <p
              className={`text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl
                ${isRTL ? 'text-right font-arabic' : 'text-left'}`}
            >
              {tr.heroSubheadline}
            </p>

            {/* Form area */}
            <div ref={heroFormRef} className="max-w-lg">
              {waitlistState === 'idle' ? (
                <WaitlistForm
                  lang={lang}
                  onSuccess={handleSuccess}
                  utmParams={utmParams}
                />
              ) : (
                <WaitlistSuccess
                  lang={lang}
                  onAnswerQuestions={handleAnswerQuestions}
                  onSkip={handleSkip}
                  skipped={waitlistState === 'skipped'}
                />
              )}
            </div>
          </div>
        </section>

        {/* ─── DIVIDER ─── */}
        <div className="max-w-wide mx-auto px-5 sm:px-8">
          <div className="gold-divider" />
        </div>

        {/* ─── PROBLEM / VALUE ─── */}
        <section id="how-it-works" className="max-w-wide mx-auto px-5 sm:px-8 py-16 sm:py-20">
          <div className={`max-w-content ${isRTL ? 'mr-0 ml-auto text-right' : ''}`}>
            <h2
              className={`text-xl sm:text-2xl font-700 text-foreground mb-4 leading-snug
                ${isRTL ? 'font-arabic' : ''}`}
            >
              {tr.problemTitle}
            </h2>
            <p
              className={`text-base text-muted-foreground leading-relaxed
                ${isRTL ? 'font-arabic' : ''}`}
            >
              {tr.problemBody}
            </p>
          </div>
        </section>

        {/* ─── PRODUCT PREVIEW ─── */}
        <section className="max-w-wide mx-auto px-5 sm:px-8 pb-16 sm:pb-20">
          <div className={`mb-6 ${isRTL ? 'text-right' : ''}`}>
            <p className={`text-xs font-600 text-muted-foreground uppercase tracking-widest ${isRTL ? 'font-arabic' : ''}`}>
              {lang === 'ar' ? 'معاينة المنتج' : 'Product preview'}
            </p>
          </div>
          <ProductPreview />
        </section>

        <div className="max-w-wide mx-auto px-5 sm:px-8">
          <hr className="section-divider" />
        </div>

        {/* ─── WHO IT'S FOR ─── */}
        <section className="max-w-wide mx-auto px-5 sm:px-8 py-16 sm:py-20">
          <div className={`mb-8 ${isRTL ? 'text-right' : ''}`}>
            <h2 className={`text-xl sm:text-2xl font-700 text-foreground ${isRTL ? 'font-arabic' : ''}`}>
              {tr.whoTitle}
            </h2>
          </div>

          <div className={`flex flex-wrap gap-2.5 ${isRTL ? 'justify-end flex-row-reverse' : 'justify-start'}`}>
            {tr.audienceTypes.map((type) => (
              <span
                key={`audience-${type}`}
                className={`text-sm font-500 text-foreground border border-border px-3.5 py-1.5 rounded-full
                  ${isRTL ? 'font-arabic' : ''}`}
              >
                {type}
              </span>
            ))}
          </div>

          <div className="mt-8 max-w-content">
            <p className={`text-sm text-muted-foreground leading-relaxed ${isRTL ? 'text-right font-arabic' : ''}`}>
              {lang === 'ar' ?'الكريتورز هم الجمهور الأساسي اللي بنبدأ بيه، لكن موبدي مش هيفضل محدود عليهم بس.' :'Creators are our primary initial focus, but Mobde is being designed to serve anyone who wants to build recurring income from an audience or customer base.'}
            </p>
          </div>
        </section>

        <div className="max-w-wide mx-auto px-5 sm:px-8">
          <hr className="section-divider" />
        </div>

        {/* ─── WHY EGYPT ─── */}
        <section className="max-w-wide mx-auto px-5 sm:px-8 py-16 sm:py-20">
          <div className="grid sm:grid-cols-2 gap-8 items-start">
            <div className={isRTL ? 'text-right order-2' : 'order-1'}>
              <div className={`flex items-center gap-2 mb-4 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                <span className="inline-block w-4 h-px bg-primary" />
                <span className="text-xs font-600 text-primary uppercase tracking-widest">
                  {lang === 'ar' ? 'مصر أولاً' : 'Egypt first'}
                </span>
              </div>
              <h2 className={`text-xl sm:text-2xl font-700 text-foreground mb-4 leading-snug ${isRTL ? 'font-arabic' : ''}`}>
                {tr.whyEgyptTitle}
              </h2>
              <p className={`text-base text-muted-foreground leading-relaxed ${isRTL ? 'font-arabic' : ''}`}>
                {tr.whyEgyptBody}
              </p>
            </div>

            <div className={`${isRTL ? 'order-1' : 'order-2'}`}>
              <div className="space-y-3">
                {[
                  {
                    en: 'Local payment behavior',
                    ar: 'سلوك الدفع المحلي',
                    detail_en: 'Designed around how Egyptians actually pay',
                    detail_ar: 'مصمم حوالين طريقة المصريين في الدفع فعلاً'
                  },
                  {
                    en: 'Egyptian pricing expectations',
                    ar: 'توقعات التسعير المصري',
                    detail_en: 'Pricing models that make sense in EGP',
                    detail_ar: 'نماذج تسعير منطقية بالجنيه المصري'
                  },
                  {
                    en: 'Local user workflows',
                    ar: 'سير عمل المستخدم المحلي',
                    detail_en: 'Built around how Egyptian creators actually work',
                    detail_ar: 'مبني حوالين طريقة الكريتورز المصريين في الشغل'
                  },
                ].map((item, i) => (
                  <div
                    key={`why-egypt-${i}`}
                    className={`flex items-start gap-3 py-3 border-b border-border last:border-0 ${isRTL ? 'flex-row-reverse' : ''}`}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <div className={isRTL ? 'text-right' : ''}>
                      <div className={`text-sm font-600 text-foreground ${isRTL ? 'font-arabic' : ''}`}>
                        {isRTL ? item.ar : item.en}
                      </div>
                      <div className={`text-xs text-muted-foreground mt-0.5 ${isRTL ? 'font-arabic' : ''}`}>
                        {isRTL ? item.detail_ar : item.detail_en}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-wide mx-auto px-5 sm:px-8">
          <hr className="section-divider" />
        </div>

        {/* ─── THREE CORE BENEFITS ─── */}
        <section className="max-w-wide mx-auto px-5 sm:px-8 py-16 sm:py-20">
          <div className={`mb-10 ${isRTL ? 'text-right' : ''}`}>
            <h2 className={`text-xl sm:text-2xl font-700 text-foreground ${isRTL ? 'font-arabic' : ''}`}>
              {tr.benefitsTitle}
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-8 sm:gap-10">
            {[
              { title: tr.benefit1Title, body: tr.benefit1Body, num: '01' },
              { title: tr.benefit2Title, body: tr.benefit2Body, num: '02' },
              { title: tr.benefit3Title, body: tr.benefit3Body, num: '03' },
            ].map((b) => (
              <div key={`benefit-${b.num}`} className={isRTL ? 'text-right' : ''}>
                <div className="text-xs font-600 text-primary/60 tabular-nums mb-3">{b.num}</div>
                <h3 className={`text-base font-700 text-foreground mb-2 ${isRTL ? 'font-arabic' : ''}`}>
                  {b.title}
                </h3>
                <p className={`text-sm text-muted-foreground leading-relaxed ${isRTL ? 'font-arabic' : ''}`}>
                  {b.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="max-w-wide mx-auto px-5 sm:px-8">
          <hr className="section-divider" />
        </div>

        {/* ─── FAQ ─── */}
        <section className="max-w-wide mx-auto px-5 sm:px-8 py-16 sm:py-20">
          <div className={`mb-8 ${isRTL ? 'text-right' : ''}`}>
            <h2 className={`text-xl sm:text-2xl font-700 text-foreground ${isRTL ? 'font-arabic' : ''}`}>
              {tr.faqTitle}
            </h2>
          </div>

          <div className="max-w-content space-y-0">
            {tr.faqs.map((faq, i) => (
              <FAQItem key={`faq-${i}`} question={faq.q} answer={faq.a} isRTL={isRTL} />
            ))}
          </div>
        </section>

        <div className="max-w-wide mx-auto px-5 sm:px-8">
          <div className="gold-divider" />
        </div>

        {/* ─── FINAL CTA ─── */}
        <section ref={finalCtaRef} className="max-w-wide mx-auto px-5 sm:px-8 py-16 sm:py-20">
          <div className={`max-w-content ${isRTL ? 'mr-0 ml-auto text-right' : ''}`}>
            <h2 className={`text-xl sm:text-2xl font-700 text-foreground mb-2 ${isRTL ? 'font-arabic' : ''}`}>
              {tr.finalCtaTitle}
            </h2>
            <p className={`text-base text-muted-foreground mb-6 ${isRTL ? 'font-arabic' : ''}`}>
              {tr.finalCtaBody}
            </p>

            {waitlistState === 'idle' ? (
              <WaitlistForm
                lang={lang}
                onSuccess={handleSuccess}
                utmParams={utmParams}
                compact
              />
            ) : (
              <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <svg className="w-4 h-4 text-success flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className={`text-sm font-500 text-foreground ${isRTL ? 'font-arabic' : ''}`}>
                  {tr.successTitle}
                </span>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-border">
        <div
          className={`max-w-wide mx-auto px-5 sm:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4
            ${isRTL ? 'sm:flex-row-reverse' : ''}`}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <div className="flex items-center gap-2">
            <AppLogo src="/assets/images/Mobde-1787628974719.png" size={28} />
          </div>

          <div className={`flex items-center gap-5 text-xs text-muted-foreground ${isRTL ? 'flex-row-reverse font-arabic' : ''}`}>
            <Link href="/privacy-page" className="hover:text-foreground transition-colors">
              {tr.privacy}
            </Link>
            <a
              href="https://www.instagram.com/mobdeapp"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              {tr.instagramNote}
            </a>
            <span>©{new Date().getFullYear()} Mobde</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setLang('en')}
                className={`hover:text-foreground transition-colors ${lang === 'en' ? 'text-foreground font-500' : ''}`}
              >
                EN
              </button>
              <span>·</span>
              <button
                onClick={() => setLang('ar')}
                className={`hover:text-foreground transition-colors font-arabic ${lang === 'ar' ? 'text-foreground font-500' : ''}`}
              >
                ع
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FAQItem({ question, answer, isRTL }: { question: string; answer: string; isRTL: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`w-full py-4 flex items-start justify-between gap-3 text-left hover:text-primary transition-colors
          ${isRTL ? 'flex-row-reverse text-right' : ''}`}
        aria-expanded={open}
      >
        <span className={`text-sm font-600 text-foreground ${isRTL ? 'font-arabic' : ''}`}>
          {question}
        </span>
        <svg
          className={`w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className={`pb-4 ${isRTL ? 'text-right' : ''}`}>
          <p className={`text-sm text-muted-foreground leading-relaxed ${isRTL ? 'font-arabic' : ''}`}>
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}