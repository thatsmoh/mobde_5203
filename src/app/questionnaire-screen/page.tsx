'use client';
import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import AppLogo from '@/components/ui/AppLogo';
import { Language } from '@/lib/types';
import { isCreatorCategory } from '@/lib/translations';

type Step =
  | 'q1_category' |'q2_monetization' |'q3_payments' |'q4_problems' |'q5_intended_use' |'q_audience_size' |'q_membership_tried' |'q_membership_platform' |'q6_open' |'done';

interface QAnswers {
  category: string | null;
  monetizationMethods: string[];
  paymentMethods: string[];
  recurringPaymentProblems: string[];
  intendedUse: string | null;
  openEndedResponse: string;
  audienceSize: string | null;
  creatorMembershipExperience: string | null;
  creatorMembershipPlatform: string | null;
}

const INITIAL_ANSWERS: QAnswers = {
  category: null,
  monetizationMethods: [],
  paymentMethods: [],
  recurringPaymentProblems: [],
  intendedUse: null,
  openEndedResponse: '',
  audienceSize: null,
  creatorMembershipExperience: null,
  creatorMembershipPlatform: null,
};

export default function QuestionnairePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QuestionnaireInner />
    </Suspense>
  );
}

function QuestionnaireInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [lang, setLang] = useState<Language>('ar');
  const [currentStep, setCurrentStep] = useState<Step>('q1_category');
  const [answers, setAnswers] = useState<QAnswers>(INITIAL_ANSWERS);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const langParam = searchParams.get('lang');
    if (langParam === 'en' || langParam === 'ar') setLang(langParam);
  }, [searchParams]);

  const isRTL = lang === 'ar';

  const STEP_FLOW: Step[] = (() => {
    const base: Step[] = ['q1_category', 'q2_monetization', 'q3_payments', 'q4_problems', 'q5_intended_use'];
    if (isCreatorCategory(answers.category)) {
      base.push('q_audience_size', 'q_membership_tried');
      if (answers.creatorMembershipExperience === 'Yes') {
        base.push('q_membership_platform');
      }
    }
    base.push('q6_open', 'done');
    return base;
  })();

  const currentIndex = STEP_FLOW.indexOf(currentStep);
  const totalSteps = STEP_FLOW.length - 1; // exclude 'done'
  const progress = currentStep === 'done' ? 100 : Math.round((currentIndex / totalSteps) * 100);

  const goNext = useCallback(() => {
    const idx = STEP_FLOW.indexOf(currentStep);
    if (idx < STEP_FLOW.length - 1) {
      setCurrentStep(STEP_FLOW[idx + 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentStep, STEP_FLOW]);

  const goBack = useCallback(() => {
    const idx = STEP_FLOW.indexOf(currentStep);
    if (idx > 0) {
      setCurrentStep(STEP_FLOW[idx - 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentStep, STEP_FLOW]);

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    try {
      // Backend integration point: PUT /api/waitlist/:entryId/questionnaire
      await new Promise((r) => setTimeout(r, 800));
      setCurrentStep('done');
    } catch {
      toast.error(lang === 'ar' ? 'حدث خطأ. حاول مرة تانية.' : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [lang, answers]);

  const toggleMulti = (key: keyof QAnswers, value: string) => {
    setAnswers((prev) => {
      const arr = prev[key] as string[];
      return {
        ...prev,
        [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
      };
    });
  };

  const setSingle = (key: keyof QAnswers, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  if (currentStep === 'done') {
    return (
      <DoneScreen
        lang={lang}
        isRTL={isRTL}
        onHome={() => router.push('/')}
        onEditAnswers={() => setCurrentStep('q1_category')}
      />
    );
  }

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-content mx-auto px-5 sm:px-8 h-14 flex items-center justify-between">
          <AppLogo src="/assets/images/Mobde-1787628974719.png" size={30} onClick={() => router.push('/')} />
          <div className="flex items-center gap-1 text-sm">
            <button
              onClick={() => setLang('en')}
              className={`px-2 py-1 ${lang === 'en' ? 'text-foreground font-600' : 'text-muted-foreground'}`}
            >EN</button>
            <span className="text-border">|</span>
            <button
              onClick={() => setLang('ar')}
              className={`px-2 py-1 font-arabic ${lang === 'ar' ? 'text-foreground font-600' : 'text-muted-foreground'}`}
            >ع</button>
          </div>
        </div>
      </header>

      <div className="max-w-content mx-auto px-5 sm:px-8 py-8 sm:py-12">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-500 text-muted-foreground ${isRTL ? 'font-arabic' : ''}`}>
              {lang === 'ar'
                ? `${currentIndex + 1} من ${totalSteps}`
                : `${currentIndex + 1} of ${totalSteps}`}
            </span>
            <span className="text-xs font-500 text-muted-foreground tabular-nums">{progress}%</span>
          </div>
          <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Step content */}
        <div className="animate-slide-up">
          {currentStep === 'q1_category' && (
            <SingleSelectStep
              lang={lang}
              isRTL={isRTL}
              question={lang === 'ar' ? 'إيه اللي بتعمله بشكل أساسي؟' : 'What best describes what you do?'}
              options={[
                { value: 'YouTube / Content Creator', label_en: 'YouTube / Content Creator', label_ar: 'يوتيوبر / كريتور محتوى' },
                { value: 'Streamer / Gamer', label_en: 'Streamer / Gamer', label_ar: 'ستريمر / جيمر' },
                { value: 'Podcaster', label_en: 'Podcaster', label_ar: 'بودكاستر' },
                { value: 'Coach / Consultant', label_en: 'Coach / Consultant', label_ar: 'كوتش / مستشار' },
                { value: 'Educator / Course Creator', label_en: 'Educator / Course Creator', label_ar: 'مدرس / صانع كورسات' },
                { value: 'Community Owner', label_en: 'Community Owner', label_ar: 'صاحب مجتمع' },
                { value: 'Freelancer / Service Provider', label_en: 'Freelancer / Service Provider', label_ar: 'فريلانسر / مزود خدمة' },
                { value: 'Digital Product Seller', label_en: 'Digital Product Seller', label_ar: 'بائع منتجات رقمية' },
                { value: 'Small Business', label_en: 'Small Business', label_ar: 'بيزنس صغير' },
                { value: 'Other', label_en: 'Other', label_ar: 'غير ذلك' },
              ]}
              selected={answers.category}
              onSelect={(v) => setSingle('category', v)}
            />
          )}

          {currentStep === 'q2_monetization' && (
            <MultiSelectStep
              lang={lang}
              isRTL={isRTL}
              question={lang === 'ar' ? 'إزاي بتكسب فلوس من جمهورك أو عملائك دلوقتي؟' : 'How do you currently make money from your audience or customers?'}
              hint={lang === 'ar' ? 'اختار كل اللي ينطبق' : 'Select all that apply'}
              options={[
                { value: 'Ads', label_en: 'Ads', label_ar: 'إعلانات' },
                { value: 'Sponsorships', label_en: 'Sponsorships', label_ar: 'سبونسرشيب' },
                { value: 'Paid memberships', label_en: 'Paid memberships', label_ar: 'ميمبرشيبات مدفوعة' },
                { value: 'Donations / tips', label_en: 'Donations / tips', label_ar: 'تبرعات / تيبس' },
                { value: 'Selling courses', label_en: 'Selling courses', label_ar: 'بيع كورسات' },
                { value: 'Selling digital products', label_en: 'Selling digital products', label_ar: 'بيع منتجات رقمية' },
                { value: 'Selling services', label_en: 'Selling services', label_ar: 'بيع خدمات' },
                { value: 'Subscriptions handled manually', label_en: 'Subscriptions handled manually', label_ar: 'اشتراكات بإدارة يدوية' },
                { value: "I don't monetize yet", label_en: "I don't monetize yet", label_ar: 'مش بكسب فلوس منهم لسه' },
                { value: 'Other', label_en: 'Other', label_ar: 'غير ذلك' },
              ]}
              selected={answers.monetizationMethods}
              onToggle={(v) => toggleMulti('monetizationMethods', v)}
            />
          )}

          {currentStep === 'q3_payments' && (
            <MultiSelectStep
              lang={lang}
              isRTL={isRTL}
              question={lang === 'ar' ? 'لو عندك عملاء أو داعمين بيدفعوا، بيدفعوا إزاي عادةً؟' : 'If you currently have paying customers or supporters, how do they usually pay you?'}
              hint={lang === 'ar' ? 'اختار كل اللي ينطبق' : 'Select all that apply'}
              options={[
                { value: 'Bank card', label_en: 'Bank card', label_ar: 'كارت بنكي' },
                { value: 'Vodafone Cash', label_en: 'Vodafone Cash', label_ar: 'Vodafone Cash' },
                { value: 'Other mobile wallet', label_en: 'Other mobile wallet', label_ar: 'محفظة موبايل تانية' },
                { value: 'InstaPay', label_en: 'InstaPay', label_ar: 'InstaPay' },
                { value: 'Bank transfer', label_en: 'Bank transfer', label_ar: 'تحويل بنكي' },
                { value: 'Fawry', label_en: 'Fawry', label_ar: 'Fawry' },
                { value: 'Cash', label_en: 'Cash', label_ar: 'كاش' },
                { value: 'Multiple methods', label_en: 'Multiple methods', label_ar: 'طرق متعددة' },
                { value: "I don't currently have paying customers", label_en: "I don't currently have paying customers", label_ar: 'مفيش عندي عملاء بيدفعوا دلوقتي' },
                { value: 'Other', label_en: 'Other', label_ar: 'غير ذلك' },
              ]}
              selected={answers.paymentMethods}
              onToggle={(v) => toggleMulti('paymentMethods', v)}
            />
          )}

          {currentStep === 'q4_problems' && (
            <MultiSelectStep
              lang={lang}
              isRTL={isRTL}
              question={lang === 'ar' ? 'إيه أكبر مشكلة عندك في تحصيل مدفوعات متكررة؟' : "What's the biggest problem you have with collecting recurring payments?"}
              hint={lang === 'ar' ? 'اختار كل اللي ينطبق' : 'Select all that apply'}
              options={[
                { value: 'Customers forget to renew', label_en: 'Customers forget to renew', label_ar: 'العملاء بينسوا يجددوا' },
                { value: 'I have to manually verify payments', label_en: 'I have to manually verify payments', label_ar: 'لازم أتحقق من المدفوعات يدوياً' },
                { value: 'I manually give/remove access', label_en: 'I manually give/remove access', label_ar: 'بدي وباخد الأكسس يدوياً' },
                { value: 'International payment methods are difficult', label_en: 'International payment methods are difficult', label_ar: 'طرق الدفع الدولية صعبة' },
                { value: 'Customers ask for local payment methods', label_en: 'Customers ask for local payment methods', label_ar: 'العملاء بيطلبوا طرق دفع محلية' },
                { value: "I don't have a way to offer subscriptions", label_en: "I don't have a way to offer subscriptions", label_ar: 'مفيش طريقة عندي أعرض اشتراكات' },
                { value: 'Managing subscribers is messy', label_en: 'Managing subscribers is messy', label_ar: 'إدارة المشتركين فوضى' },
                { value: 'Payment fees', label_en: 'Payment fees', label_ar: 'رسوم الدفع' },
                { value: "I don't currently have this problem", label_en: "I don't currently have this problem", label_ar: 'مفيش مشكلة عندي دلوقتي' },
                { value: 'Other', label_en: 'Other', label_ar: 'غير ذلك' },
              ]}
              selected={answers.recurringPaymentProblems}
              onToggle={(v) => toggleMulti('recurringPaymentProblems', v)}
            />
          )}

          {currentStep === 'q5_intended_use' && (
            <SingleSelectStep
              lang={lang}
              isRTL={isRTL}
              question={lang === 'ar' ? 'لو موبدي موجود دلوقتي، هتستخدمه بشكل أساسي لإيه؟' : 'If Mobde existed today, what would you mainly want to use it for?'}
              options={[
                { value: 'Paid memberships', label_en: 'Paid memberships', label_ar: 'ميمبرشيبات مدفوعة' },
                { value: 'Exclusive content', label_en: 'Exclusive content', label_ar: 'محتوى حصري' },
                { value: 'Private community', label_en: 'Private community', label_ar: 'مجتمع خاص' },
                { value: 'Courses', label_en: 'Courses', label_ar: 'كورسات' },
                { value: 'Coaching', label_en: 'Coaching', label_ar: 'كوتشينج' },
                { value: 'Digital products', label_en: 'Digital products', label_ar: 'منتجات رقمية' },
                { value: 'Recurring services', label_en: 'Recurring services', label_ar: 'خدمات متكررة' },
                { value: 'Something else', label_en: 'Something else', label_ar: 'حاجة تانية' },
              ]}
              selected={answers.intendedUse}
              onSelect={(v) => setSingle('intendedUse', v)}
            />
          )}

          {currentStep === 'q_audience_size' && (
            <SingleSelectStep
              lang={lang}
              isRTL={isRTL}
              question={lang === 'ar' ? 'جمهورك تقريباً كام واحد؟' : 'How large is your audience?'}
              options={[
                { value: 'Under 1,000', label_en: 'Under 1,000', label_ar: 'أقل من 1,000' },
                { value: '1,000–10,000', label_en: '1,000–10,000', label_ar: '1,000–10,000' },
                { value: '10,000–50,000', label_en: '10,000–50,000', label_ar: '10,000–50,000' },
                { value: '50,000–100,000', label_en: '50,000–100,000', label_ar: '50,000–100,000' },
                { value: '100,000–500,000', label_en: '100,000–500,000', label_ar: '100,000–500,000' },
                { value: '500,000+', label_en: '500,000+', label_ar: '500,000+' },
                { value: 'Prefer not to say', label_en: 'Prefer not to say', label_ar: 'أفضل عدم الإفصاح' },
              ]}
              selected={answers.audienceSize}
              onSelect={(v) => setSingle('audienceSize', v)}
            />
          )}

          {currentStep === 'q_membership_tried' && (
            <SingleSelectStep
              lang={lang}
              isRTL={isRTL}
              question={lang === 'ar' ? 'جربت قبل كده تقدم ميمبرشيبات أو اشتراكات مدفوعة؟' : 'Have you ever tried offering paid memberships or subscriptions?'}
              options={[
                { value: 'Yes', label_en: 'Yes', label_ar: 'أيوه' },
                { value: 'No', label_en: 'No', label_ar: 'لأ' },
                { value: "I'm considering it", label_en: "I'm considering it", label_ar: 'بفكر فيها' },
              ]}
              selected={answers.creatorMembershipExperience}
              onSelect={(v) => setSingle('creatorMembershipExperience', v)}
            />
          )}

          {currentStep === 'q_membership_platform' && (
            <MultiSelectStep
              lang={lang}
              isRTL={isRTL}
              question={lang === 'ar' ? 'استخدمت إيه؟' : 'What did you use?'}
              hint={lang === 'ar' ? 'اختار كل اللي ينطبق' : 'Select all that apply'}
              options={[
                { value: 'YouTube Memberships', label_en: 'YouTube Memberships', label_ar: 'YouTube Memberships' },
                { value: 'Patreon', label_en: 'Patreon', label_ar: 'Patreon' },
                { value: 'Ko-fi', label_en: 'Ko-fi', label_ar: 'Ko-fi' },
                { value: 'Sponsorships', label_en: 'Sponsorships', label_ar: 'Sponsorships' },
                { value: 'My own system', label_en: 'My own system', label_ar: 'نظامي الخاص' },
                { value: 'Other', label_en: 'Other', label_ar: 'غير ذلك' },
              ]}
              selected={answers.creatorMembershipPlatform ? [answers.creatorMembershipPlatform] : []}
              onToggle={(v) => setSingle('creatorMembershipPlatform', v)}
            />
          )}

          {currentStep === 'q6_open' && (
            <OpenEndedStep
              lang={lang}
              isRTL={isRTL}
              question={lang === 'ar' ? 'إيه أكبر حاجة عايز موبدي يحلها ليك؟' : "What's the biggest thing you'd want Mobde to solve for you?"}
              hint={lang === 'ar' ? 'اختياري — بس ده أهم سؤال بالنسبالنا' : 'Optional — but this is the most important question for us'}
              value={answers.openEndedResponse}
              onChange={(v) => setAnswers((prev) => ({ ...prev, openEndedResponse: v }))}
            />
          )}
        </div>

        {/* Navigation */}
        <div className={`mt-8 flex items-center justify-between gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {currentIndex > 0 ? (
            <button
              onClick={goBack}
              className={`text-sm font-500 text-muted-foreground hover:text-foreground transition-colors px-4 py-2.5 rounded-md border border-border hover:border-foreground/20 ${isRTL ? 'font-arabic' : ''}`}
            >
              {lang === 'ar' ? 'رجوع' : 'Back'}
            </button>
          ) : (
            <div />
          )}

          {currentStep === 'q6_open' ? (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="btn-primary text-sm font-600 px-6 py-2.5 rounded-md flex items-center gap-2 disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  {lang === 'ar' ? 'جاري الإرسال...' : 'Submitting...'}
                </>
              ) : (
                lang === 'ar' ? 'إرسال' : 'Submit'
              )}
            </button>
          ) : (
            <button
              onClick={goNext}
              className="btn-primary text-sm font-600 px-6 py-2.5 rounded-md"
            >
              {lang === 'ar' ? 'التالي' : 'Next'}
            </button>
          )}
        </div>

        {/* Skip entirely */}
        <div className={`mt-4 text-center ${isRTL ? 'font-arabic' : ''}`}>
          <button
            onClick={() => router.push('/')}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            {lang === 'ar' ? 'تخطي الأسئلة' : 'Skip all questions'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Step sub-components ───

interface Option {
  value: string;
  label_en: string;
  label_ar: string;
}

function SingleSelectStep({
  lang, isRTL, question, options, selected, onSelect,
}: {
  lang: Language; isRTL: boolean; question: string;
  options: Option[]; selected: string | null; onSelect: (v: string) => void;
}) {
  return (
    <div>
      <h2 className={`text-lg sm:text-xl font-700 text-foreground mb-6 ${isRTL ? 'text-right font-arabic' : ''}`}>
        {question}
      </h2>
      <div className="space-y-2">
        {options.map((opt) => (
          <button
            key={`opt-${opt.value}`}
            onClick={() => onSelect(opt.value)}
            className={`w-full text-left px-4 py-3 rounded-lg border text-sm font-500 transition-all
              ${isRTL ? 'text-right font-arabic' : ''}
              ${selected === opt.value
                ? 'border-primary bg-primary/6 text-foreground'
                : 'border-border bg-white text-foreground hover:border-foreground/30'
              }`}
          >
            <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className={`w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center
                ${selected === opt.value ? 'border-primary bg-primary' : 'border-border'}`}>
                {selected === opt.value && (
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                )}
              </div>
              {isRTL ? opt.label_ar : opt.label_en}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function MultiSelectStep({
  lang, isRTL, question, hint, options, selected, onToggle,
}: {
  lang: Language; isRTL: boolean; question: string; hint?: string;
  options: Option[]; selected: string[]; onToggle: (v: string) => void;
}) {
  return (
    <div>
      <h2 className={`text-lg sm:text-xl font-700 text-foreground mb-1 ${isRTL ? 'text-right font-arabic' : ''}`}>
        {question}
      </h2>
      {hint && (
        <p className={`text-xs text-muted-foreground mb-5 ${isRTL ? 'text-right font-arabic' : ''}`}>{hint}</p>
      )}
      <div className="space-y-2">
        {options.map((opt) => {
          const checked = selected.includes(opt.value);
          return (
            <button
              key={`multi-${opt.value}`}
              onClick={() => onToggle(opt.value)}
              className={`w-full text-left px-4 py-3 rounded-lg border text-sm font-500 transition-all
                ${isRTL ? 'text-right font-arabic' : ''}
                ${checked
                  ? 'border-primary bg-primary/6 text-foreground'
                  : 'border-border bg-white text-foreground hover:border-foreground/30'
                }`}
            >
              <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center
                  ${checked ? 'border-primary bg-primary' : 'border-border'}`}>
                  {checked && (
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                {isRTL ? opt.label_ar : opt.label_en}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function OpenEndedStep({
  lang, isRTL, question, hint, value, onChange,
}: {
  lang: Language; isRTL: boolean; question: string; hint?: string;
  value: string; onChange: (v: string) => void;
}) {
  return (
    <div>
      <h2 className={`text-lg sm:text-xl font-700 text-foreground mb-1 ${isRTL ? 'text-right font-arabic' : ''}`}>
        {question}
      </h2>
      {hint && (
        <p className={`text-xs text-muted-foreground mb-5 ${isRTL ? 'text-right font-arabic' : ''}`}>{hint}</p>
      )}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        dir={isRTL ? 'rtl' : 'ltr'}
        rows={5}
        placeholder={lang === 'ar' ? 'اكتب هنا...' : 'Write here...'}
        className={`w-full px-4 py-3 text-sm border border-border rounded-lg bg-white text-foreground placeholder:text-muted-foreground resize-none input-focus-gold transition-all
          ${isRTL ? 'font-arabic text-right' : ''}`}
      />
      <p className={`mt-2 text-xs text-muted-foreground ${isRTL ? 'text-right font-arabic' : ''}`}>
        {lang === 'ar' ? `${value.length} حرف` : `${value.length} characters`}
      </p>
    </div>
  );
}

function DoneScreen({ lang, isRTL, onHome, onEditAnswers }: { lang: Language; isRTL: boolean; onHome: () => void; onEditAnswers: () => void }) {
  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-white flex flex-col">
      <header className="border-b border-border">
        <div className="max-w-content mx-auto px-5 sm:px-8 h-14 flex items-center">
          <AppLogo src="/assets/images/Mobde-1787628974719.png" size={30} onClick={onHome} />
        </div>
      </header>
      <div className="flex-1 flex items-center justify-center px-5 py-16">
        <div className={`max-w-sm text-center animate-slide-up ${isRTL ? 'font-arabic' : ''}`}>
          <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-5">
            <svg className="w-6 h-6 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-xl font-700 text-foreground mb-2">
            {lang === 'ar' ? 'شكراً، ده بيساعد فعلاً.' : 'Thanks, that helps.'}
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed mb-8">
            {lang === 'ar' ?'ردودك هتساعدنا نبني موبدي حوالين اللي المستخدمين المصريين المحتملين محتاجينه فعلاً.'
              : "Your responses will help us shape Mobde around what potential Egyptian users actually need."}
          </p>
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-3 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
            <button
              onClick={onEditAnswers}
              className="text-sm font-500 text-foreground hover:text-primary transition-colors border border-border px-5 py-2.5 rounded-md hover:border-primary/40"
            >
              {lang === 'ar' ? 'تعديل إجاباتي' : 'Edit my answers'}
            </button>
            <button
              onClick={onHome}
              className="text-sm font-500 text-muted-foreground hover:text-foreground transition-colors px-5 py-2.5 rounded-md"
            >
              {lang === 'ar' ? 'العودة للرئيسية' : 'Back to home'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}