'use client';
import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Language } from '@/lib/types';
import { t } from '@/lib/translations';
import { validateContact } from '@/lib/validation';

interface WaitlistFormData {
  contact: string;
  firstName: string;
}

interface WaitlistFormProps {
  lang: Language;
  onSuccess: (entryId: string) => void;
  utmParams?: Record<string, string>;
  compact?: boolean;
}

export default function WaitlistForm({ lang, onSuccess, utmParams, compact }: WaitlistFormProps) {
  const tr = t(lang);
  const isRTL = lang === 'ar';
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<WaitlistFormData>({ mode: 'onBlur' });

  const onSubmit = useCallback(async (data: WaitlistFormData) => {
    const result = validateContact(data.contact.trim());

    if (!result.valid) {
      setError('contact', { message: tr.contactInvalid });
      return;
    }

    setIsSubmitting(true);

    try {
      // Backend integration point: POST /api/waitlist
      await new Promise((resolve) => setTimeout(resolve, 900));

      // Mock duplicate check
      if (data.contact.toLowerCase().includes('duplicate')) {
        setError('contact', { message: tr.alreadyRegistered });
        setIsSubmitting(false);
        return;
      }

      const mockEntryId = `entry-${Date.now()}`;
      setSubmitted(true);
      onSuccess(mockEntryId);
    } catch {
      toast.error(tr.networkError);
    } finally {
      setIsSubmitting(false);
    }
  }, [tr, setError, onSuccess]);

  if (submitted) return null;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      dir={isRTL ? 'rtl' : 'ltr'}
      noValidate
      className={compact ? '' : 'w-full'}
    >
      <div className={`flex flex-col gap-3 ${compact ? '' : 'sm:flex-row sm:gap-2'}`}>
        {/* Contact input */}
        <div className="flex-1 min-w-0">
          <label htmlFor="contact" className="sr-only">
            {tr.emailOrPhone}
          </label>
          <input
            id="contact"
            type="text"
            autoComplete="email"
            placeholder={tr.emailOrPhonePlaceholder}
            dir={isRTL ? 'rtl' : 'ltr'}
            {...register('contact', {
              required: tr.contactRequired,
              validate: (v) => {
                if (!v.trim()) return tr.contactRequired;
                const r = validateContact(v.trim());
                if (!r.valid) return tr.contactInvalid;
                return true;
              },
            })}
            className={`w-full px-4 py-3 text-sm border rounded-md bg-white text-foreground placeholder:text-muted-foreground transition-all input-focus-gold
              ${errors.contact ? 'border-destructive' : 'border-border'}`}
            aria-invalid={!!errors.contact}
            aria-describedby={errors.contact ? 'contact-error' : undefined}
          />
          {errors.contact && (
            <p id="contact-error" className="mt-1.5 text-xs text-destructive" role="alert">
              {errors.contact.message}
            </p>
          )}
        </div>

        {/* First name — optional, shown when not compact */}
        {!compact && (
          <div className="sm:w-40">
            <label htmlFor="firstName" className="sr-only">
              {tr.firstName}
            </label>
            <input
              id="firstName"
              type="text"
              autoComplete="given-name"
              placeholder={tr.firstNamePlaceholder}
              dir={isRTL ? 'rtl' : 'ltr'}
              {...register('firstName')}
              className="w-full px-4 py-3 text-sm border border-border rounded-md bg-white text-foreground placeholder:text-muted-foreground transition-all input-focus-gold"
            />
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`btn-primary font-600 text-sm px-6 py-3 rounded-md whitespace-nowrap flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed
            ${compact ? 'w-full sm:w-auto' : 'sm:w-auto w-full'}`}
          style={{ minWidth: '140px' }}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              {tr.submitting}
            </>
          ) : (
            tr.joinCTA
          )}
        </button>
      </div>

      <p className={`mt-3 text-xs text-muted-foreground ${isRTL ? 'text-right' : 'text-left'}`}>
        {tr.heroTrustLine}
      </p>
    </form>
  );
}