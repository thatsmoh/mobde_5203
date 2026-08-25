export type Language = 'en' | 'ar';

export interface WaitlistEntry {
  id: string;
  email: string | null;
  phone: string | null;
  firstName: string | null;
  category: string | null;
  audienceSize: string | null;
  monetizationMethods: string[];
  paymentMethods: string[];
  recurringPaymentProblems: string[];
  intendedUse: string | null;
  creatorMembershipExperience: string | null;
  creatorMembershipPlatform: string | null;
  openEndedResponse: string | null;
  questionnaireStarted: boolean;
  questionnaireCompleted: boolean;
  questionnaireSkipped: boolean;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmContent: string | null;
  referrer: string | null;
  source: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AdminStats {
  totalSignups: number;
  newSignupsToday: number;
  creatorSignups: number;
  nonCreatorSignups: number;
  questionnaireStarts: number;
  questionnaireCompletions: number;
  questionnaireSkips: number;
  questionnaireAbandonment: number;
  completionRate: number;
  categoryBreakdown: { category: string; count: number }[];
  sourceBreakdown: { source: string; count: number }[];
  dailySignups: { date: string; count: number }[];
  topProblems: { problem: string; count: number }[];
  paymentMethodBreakdown: { method: string; count: number }[];
}

export interface QuestionnaireData {
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

export type QuestionnaireStatus = 'started' | 'completed' | 'skipped' | 'abandoned';