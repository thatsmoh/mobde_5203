import { Language } from './types';

export const t = (lang: Language) => ({
  // Header
  howItWorks: lang === 'ar' ? 'كيف يعمل' : 'How it works',
  joinWaitlist: lang === 'ar' ? 'انضم للقائمة' : 'Join the waitlist',

  // Hero
  heroHeadline: lang === 'ar' ?'حوّل جمهورك لدخل متكرر' :'Turn your audience into recurring income.',
  heroSubheadline: lang === 'ar' ?'موبدي منصة مصرية بتتبنى احتياجات الكريتورز والبيزنسات اللي عايزين يبنوا مصدر دخل ثابت من جمهورهم أو عملائهم.' :'Mobde is being built for Egyptian creators, coaches, educators, and businesses who want a more predictable way to earn from the people who already value what they do.',
  heroTrustLine: lang === 'ar' ?'تحديثات الوصول المبكر فقط. لا سبام.' :'Early access updates only. No spam.',

  // Form
  emailOrPhone: lang === 'ar' ? 'إيميلك أو رقم موبايلك المصري' : 'Your email or Egyptian mobile number',
  emailOrPhonePlaceholder: lang === 'ar' ? 'example@email.com أو 01xxxxxxxxx' : 'example@email.com or 01xxxxxxxxx',
  firstName: lang === 'ar' ? 'الاسم الأول (اختياري)' : 'First name (optional)',
  firstNamePlaceholder: lang === 'ar' ? 'اسمك' : 'Your name',
  joinCTA: lang === 'ar' ? 'انضم للقائمة' : 'Join the waitlist',
  submitting: lang === 'ar' ? 'جاري التسجيل...' : 'Joining...',

  // Validation
  contactRequired: lang === 'ar' ?'أدخل إيميلك أو رقم موبايلك المصري للانضمام للقائمة.' :'Enter your email or Egyptian mobile number to join the waitlist.',
  contactInvalid: lang === 'ar' ?'من فضلك أدخل إيميل صحيح أو رقم موبايل مصري صحيح.' :'Please enter a valid email address or Egyptian mobile number.',
  alreadyRegistered: lang === 'ar' ?'أنت بالفعل على قائمة انتظار موبدي.' : "You're already on the Mobde waitlist.",
  networkError: lang === 'ar' ?'حدث خطأ في الاتصال. حاول مرة تانية.' :'Connection error. Please try again.',
  serverError: lang === 'ar' ?'حدث خطأ. حاول مرة تانية.' :'Something went wrong. Please try again.',

  // Success
  successTitle: lang === 'ar' ? 'أنت على القائمة.' : "You're on the list.",
  successSubtitle: lang === 'ar' ?'هنتواصل معاك بتحديثات الوصول المبكر.' : "We'll reach out with early access updates.",
  questionnairePrompt: lang === 'ar' ?'عندك دقيقة؟ أسئلة قليلة هتساعدنا نبني موبدي صح.' :'Have a minute? A few quick questions would really help us shape Mobde.',
  answerQuestions: lang === 'ar' ? 'أجب على الأسئلة' : 'Answer a few questions',
  skipForNow: lang === 'ar' ? 'مش دلوقتي' : 'Skip for now',

  // Problem section
  problemTitle: lang === 'ar' ? 'المنصات الدولية مش دايماً مناسبة للسوق المصري' : 'International platforms aren\'t built for Egypt.',
  problemBody: lang === 'ar' ?'منصات الميمبرشيب العالمية موجودة، لكنها مش بتفكر في طرق الدفع المحلية، أسعار السوق المصري، أو طريقة تعامل الجمهور المصري مع المحتوى. موبدي بتتبني مصر من الأول.' :'Global membership and subscription platforms exist. But they aren\'t designed around local payment habits, Egyptian pricing expectations, or how Egyptian audiences actually behave. Mobde is being designed around Egypt from the beginning.',

  // Who it's for
  whoTitle: lang === 'ar' ? 'موبدي لمين؟' : "Who Mobde is for",
  audienceTypes: lang === 'ar'
    ? ['يوتيوبرز وكريتورز', 'ستريمرز وجيمرز', 'بودكاسترز', 'كوتشيز ومستشارين', 'مدرسين وصانعي كورسات', 'أصحاب مجتمعات', 'فريلانسرز', 'بائعو منتجات رقمية', 'أصحاب بيزنسات صغيرة']
    : ['YouTube / Content Creators', 'Streamers / Gamers', 'Podcasters', 'Coaches / Consultants', 'Educators / Course Creators', 'Community Owners', 'Freelancers', 'Digital Product Sellers', 'Small Businesses'],

  // Why Egypt
  whyEgyptTitle: lang === 'ar' ? 'ليه مصر تحديداً؟' : 'Built around Egypt.',
  whyEgyptBody: lang === 'ar' ?'موبدي مش مجرد ترجمة عربية لمنصة غربية. بنبنيها من الأساس حوالين طرق الدفع المحلية، توقعات التسعير المصري، وسلوك المستخدم المصري. الهدف إن الكريتور المصري يلاقي تجربة مصممة ليه.' :'Mobde isn\'t a translation of a Western platform. It\'s being built from the ground up around local payment behavior, Egyptian pricing expectations, and how Egyptian users actually work. The goal is for Egyptian creators and businesses to have a platform that was actually designed for them.',

  // Benefits
  benefitsTitle: lang === 'ar' ? 'ليه موبدي؟' : 'Why Mobde',
  benefit1Title: lang === 'ar' ? 'دخل متكرر' : 'Recurring income',
  benefit1Body: lang === 'ar' ?'ابني طريقة أكثر استقراراً للكسب من الناس اللي بالفعل بتقدر قيمة اللي بتقدمه.' :'Build a more predictable way to earn from people who already value what you offer.',
  benefit2Title: lang === 'ar' ? 'مبني حوالين جمهورك' : 'Built around your audience',
  benefit2Body: lang === 'ar' ?'ادي جمهورك طريقة واضحة يدعموك بيها بعيداً عن الإعلانات والسبونسرشيب والمدفوعات اللحظية.' :'Give your audience a clear way to support you beyond ads, sponsorships, and one-time payments.',
  benefit3Title: lang === 'ar' ? 'مصمم لمصر' : 'Designed for Egypt',
  benefit3Body: lang === 'ar' ?'ابني على أساس طرق الدفع، توقعات التسعير، وسير العمل بتاع السوق المصري.' :'Build around the payment habits, pricing expectations, and workflows of the Egyptian market.',

  // FAQ
  faqTitle: lang === 'ar' ? 'أسئلة شائعة' : 'Questions',
  faqs: lang === 'ar' ? [
    {
      q: 'إيه هو موبدي؟',
      a: 'موبدي منصة بتتبنيها للكريتورز والبيزنسات المصرية عشان يقدروا يبنوا دخل متكرر من جمهورهم أو عملائهم عن طريق ميمبرشيبات واشتراكات.'
    },
    {
      q: 'موبدي لمين؟',
      a: 'للكريتورز، الكوتشيز، المدرسين، الفريلانسرز، وأي حد عنده جمهور أو عملاء وعايز يبني مصدر دخل ثابت منهم.'
    },
    {
      q: 'امتى موبدي هيتلونش؟',
      a: 'لسه بنبني ونتحقق من الأفكار. دلوقتي بنجمع قائمة الانتظار عشان نفهم احتياجات المستخدمين ونبني الصح من البداية.'
    },
    {
      q: 'موبدي متاح دلوقتي؟',
      a: 'لأ، موبدي لسه في مرحلة ما قبل الإطلاق. انضم للقائمة عشان تكون من أوائل المستخدمين.'
    },
    {
      q: 'بكام هيبقى موبدي؟',
      a: 'إنشاء حساب على موبدي مجاني لأي حد. لسه بنحدد تفاصيل نموذج التسعير للميزات المدفوعة، وهنعلن عنها لما نتقدم في البناء.'
    },
    {
      q: 'موبدي هيدعم إيه من طرق الدفع؟',
      a: 'موبدي دلوقتي بتبحث وتتحقق من أفضل بنية دفع محلية. طرق الدفع المحددة هتتعلن لما الإنتيجريشن تتأكد.'
    },
  ] : [
    {
      q: 'What is Mobde?',
      a: 'Mobde is a platform being built for Egyptian creators and businesses to build recurring income from their audience or customers through memberships and subscriptions.'
    },
    {
      q: 'Who is Mobde for?',
      a: 'Creators, coaches, educators, freelancers, and anyone with an audience or customers who wants a more predictable income from them.'
    },
    {
      q: 'When will Mobde launch?',
      a: "We're still building and validating. Right now we're collecting early-access signups to understand what users actually need before we build."
    },
    {
      q: 'Is Mobde available now?',
      a: 'No. Mobde is in pre-launch. Join the waitlist to be among the first to access it.'
    },
    {
      q: 'How much will it cost?',
      a: "Creating an account on Mobde is free for anyone. We're still working out the pricing details for paid features, and we'll share more as the product takes shape."
    },
    {
      q: 'What payment methods will Mobde support?',
      a: 'Mobde is currently researching and validating the best local payment infrastructure. Specific payment methods will be announced as integrations are finalized.'
    },
  ],

  // Footer
  privacy: lang === 'ar' ? 'الخصوصية' : 'Privacy',
  allRightsReserved: lang === 'ar' ? 'جميع الحقوق محفوظة' : 'All rights reserved',

  // Final CTA
  finalCtaTitle: lang === 'ar' ? 'انضم للقائمة' : 'Join the waitlist',
  finalCtaBody: lang === 'ar' ?'كن من أوائل من يعرفوا لما موبدي يكون جاهز.' :'Be among the first to know when Mobde is ready.',

  // Instagram follow note
  instagramNote: lang === 'ar' ? 'تابعنا على Instagram للتحديثات' : 'Follow us on Instagram for updates',
});

export const CREATOR_CATEGORIES = [
  'YouTube / Content Creator',
  'Streamer / Gamer',
  'Podcaster',
  'Educator / Course Creator',
  'Community Owner',
];

export const isCreatorCategory = (category: string | null): boolean => {
  if (!category) return false;
  return CREATOR_CATEGORIES.includes(category);
};