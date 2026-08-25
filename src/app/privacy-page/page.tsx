'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import { Language } from '@/lib/types';

export default function PrivacyPage() {
  const [lang, setLang] = useState<Language>('ar');
  const isRTL = lang === 'ar';

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-wide mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <AppLogo src="/assets/images/Mobde-1787628974719.png" size={32} />
          </Link>
          <div className="flex items-center gap-1 text-sm">
            <button
              onClick={() => setLang('en')}
              className={`px-2 py-1 transition-colors ${lang === 'en' ? 'text-foreground font-600' : 'text-muted-foreground hover:text-foreground'}`}
            >
              EN
            </button>
            <span className="text-border">|</span>
            <button
              onClick={() => setLang('ar')}
              className={`px-2 py-1 font-arabic transition-colors ${lang === 'ar' ? 'text-foreground font-600' : 'text-muted-foreground hover:text-foreground'}`}
            >
              ع
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-content mx-auto px-5 sm:px-8 py-12 sm:py-16">
        {isRTL ? <PrivacyArabic /> : <PrivacyEnglish />}
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12">
        <div className="max-w-wide mx-auto px-5 sm:px-8 py-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <AppLogo src="/assets/images/Mobde-1787628974719.png" size={24} />
          </Link>
          <Link
            href="/"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            {lang === 'ar' ? 'العودة للرئيسية' : 'Back to home'}
          </Link>
        </div>
      </footer>
    </div>
  );
}

function PrivacyEnglish() {
  return (
    <div className="prose prose-sm max-w-none text-foreground">
      <div className="mb-8">
        <p className="text-xs font-600 text-muted-foreground uppercase tracking-widest mb-3">Privacy</p>
        <h1 className="text-2xl font-800 text-foreground mb-2">Privacy notice</h1>
        <p className="text-sm text-muted-foreground">Last updated: August 2026</p>
      </div>
      <div className="space-y-8">
        <section>
          <h2 className="text-base font-700 text-foreground mb-3">What is this?</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Mobde is a pre-launch platform. This page explains how we handle the information you provide when you join our early-access waitlist.
          </p>
        </section>

        <hr className="section-divider" />

        <section>
          <h2 className="text-base font-700 text-foreground mb-3">What we collect</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            When you join the Mobde waitlist, we may collect:
          </p>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            {[
              'Your email address or Egyptian mobile number (at least one is required)',
              'Your first name (optional)',
              'Your answers to the optional questionnaire',
              'The source and referrer of your visit (e.g. Instagram, UTM parameters)',
              'Basic technical information such as your browser language',
            ]?.map((item, i) => (
              <li key={`en-collect-${i}`} className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <hr className="section-divider" />

        <section>
          <h2 className="text-base font-700 text-foreground mb-3">How we use it</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            We use this information solely to:
          </p>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            {[
              'Manage early-access signups and contact you about Mobde',
              'Understand who is interested in Mobde and what they need',
              'Improve the product based on what potential users tell us',
              'Measure whether our marketing is reaching the right people',
            ]?.map((item, i) => (
              <li key={`en-use-${i}`} className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <hr className="section-divider" />

        <section>
          <h2 className="text-base font-700 text-foreground mb-3">What we don't do</h2>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            {[
              'We do not sell your information to third parties',
              'We do not share your contact details with advertisers',
              'We do not collect payment information at this stage',
              'We do not collect your national ID, address, or other sensitive personal data',
            ]?.map((item, i) => (
              <li key={`en-not-${i}`} className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-muted-foreground/40 mt-2 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <hr className="section-divider" />

        <section>
          <h2 className="text-base font-700 text-foreground mb-3">How long we keep it</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We keep your information for as long as it is needed to manage the waitlist and validate the product concept. If Mobde does not proceed, or if you ask us to remove your data, we will delete it.
          </p>
        </section>

        <hr className="section-divider" />

        <section>
          <h2 className="text-base font-700 text-foreground mb-3">Your rights</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            You can ask us to access, correct, or delete your data at any time. We will respond to reasonable requests within a reasonable timeframe.
          </p>
        </section>

        <hr className="section-divider" />

        <section>
          <h2 className="text-base font-700 text-foreground mb-3">Contact</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            If you have any questions about how we handle your information, contact us at{' '}
            <a href="mailto:mobdeapp@gmail.com" className="text-foreground underline underline-offset-2 hover:text-primary transition-colors">
              mobdeapp@gmail.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}

function PrivacyArabic() {
  return (
    <div className="font-arabic text-right">
      <div className="mb-8">
        <p className="text-xs font-600 text-muted-foreground uppercase tracking-widest mb-3">الخصوصية</p>
        <h1 className="text-2xl font-800 text-foreground mb-2">إشعار الخصوصية</h1>
        <p className="text-sm text-muted-foreground">آخر تحديث: أغسطس 2026</p>
      </div>
      <div className="space-y-8">
        <section>
          <h2 className="text-base font-700 text-foreground mb-3">إيه ده؟</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            موبدي منصة في مرحلة ما قبل الإطلاق. الصفحة دي بتشرح إزاي بنتعامل مع المعلومات اللي بتقدمها لما بتنضم لقائمة الانتظار.
          </p>
        </section>

        <hr className="section-divider" />

        <section>
          <h2 className="text-base font-700 text-foreground mb-3">إيه اللي بنجمعه</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            لما بتنضم لقائمة انتظار موبدي، ممكن نجمع:
          </p>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            {[
              'إيميلك أو رقم موبايلك المصري (واحد على الأقل مطلوب)',
              'اسمك الأول (اختياري)',
              'إجاباتك على الاستبيان الاختياري',
              'مصدر وزيارتك (مثلاً Instagram، بارامترات UTM)',
              'معلومات تقنية بسيطة زي لغة المتصفح',
            ]?.map((item, i) => (
              <li key={`ar-collect-${i}`} className="flex items-start gap-2 flex-row-reverse">
                <span className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <hr className="section-divider" />

        <section>
          <h2 className="text-base font-700 text-foreground mb-3">إزاي بنستخدمها</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            بنستخدم المعلومات دي بس عشان:
          </p>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            {[
              'إدارة قائمة الانتظار والتواصل معاك بخصوص موبدي',
              'فهم مين مهتم بموبدي وإيه اللي محتاجه',
              'تحسين المنتج بناءً على اللي المستخدمين المحتملين بيقولوه',
              'قياس هل تسويقنا بيوصل للناس الصح',
            ]?.map((item, i) => (
              <li key={`ar-use-${i}`} className="flex items-start gap-2 flex-row-reverse">
                <span className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <hr className="section-divider" />

        <section>
          <h2 className="text-base font-700 text-foreground mb-3">إيه اللي مش بنعمله</h2>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            {[
              'مش بنبيع معلوماتك لأطراف تانية',
              'مش بنشارك بياناتك مع المعلنين',
              'مش بنجمع معلومات الدفع في المرحلة دي',
              'مش بنجمع رقم هويتك أو عنوانك أو أي بيانات حساسة تانية',
            ]?.map((item, i) => (
              <li key={`ar-not-${i}`} className="flex items-start gap-2 flex-row-reverse">
                <span className="w-1 h-1 rounded-full bg-muted-foreground/40 mt-2 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <hr className="section-divider" />

        <section>
          <h2 className="text-base font-700 text-foreground mb-3">بنحتفظ بيها قد إيه</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            بنحتفظ بمعلوماتك طول ما هي محتاجة لإدارة قائمة الانتظار والتحقق من فكرة المنتج. لو موبدي ما اتكملش، أو لو طلبت منا نحذف بياناتك، هنحذفها.
          </p>
        </section>

        <hr className="section-divider" />

        <section>
          <h2 className="text-base font-700 text-foreground mb-3">حقوقك</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            تقدر تطلب منا الوصول لبياناتك أو تعديلها أو حذفها في أي وقت. هنرد على الطلبات المعقولة في وقت معقول.
          </p>
        </section>

        <hr className="section-divider" />

        <section>
          <h2 className="text-base font-700 text-foreground mb-3">تواصل معنا</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            لو عندك أي سؤال عن طريقة تعاملنا مع بياناتك، تواصل معنا على{' '}
            <a href="mailto:mobdeapp@gmail.com" className="text-foreground underline underline-offset-2 hover:text-primary transition-colors">
              mobdeapp@gmail.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}