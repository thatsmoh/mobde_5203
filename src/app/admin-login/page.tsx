'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import AppLogo from '@/components/ui/AppLogo';

interface LoginForm {
  email: string;
  password: string;
}

export default function AdminLoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ mode: 'onBlur' });

  const onSubmit = async (data: LoginForm) => {
    setIsSubmitting(true);
    setAuthError(null);

    try {
      // Backend integration point: POST /api/admin/login
      await new Promise((r) => setTimeout(r, 700));

      // Mock auth — replace with real server-side session check
      if (data.email === 'admin@mobde.co' && data.password === 'MobdeAdmin2026!') {
        // Backend integration point: Set secure httpOnly session cookie
        router.push('/admin-dashboard');
      } else {
        setAuthError('Invalid credentials. Check your email and password.');
      }
    } catch {
      setAuthError('Connection error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary/40 flex flex-col items-center justify-center px-5 py-12">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <AppLogo src="/assets/images/Mobde-1787628974719.png" size={40} />
        </div>

        {/* Card */}
        <div className="bg-white border border-border rounded-xl p-7 product-preview-shadow">
          <div className="mb-6">
            <h1 className="text-lg font-700 text-foreground">Admin access</h1>
            <p className="text-sm text-muted-foreground mt-1">Mobde waitlist dashboard</p>
          </div>

          {authError && (
            <div className="mb-5 flex items-start gap-2.5 bg-destructive/6 border border-destructive/20 rounded-lg px-3.5 py-3">
              <AlertCircle size={16} className="text-destructive flex-shrink-0 mt-0.5" />
              <p className="text-sm text-destructive">{authError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs font-600 text-foreground mb-1.5 uppercase tracking-wide">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address' },
                })}
                className={`w-full px-3.5 py-2.5 text-sm border rounded-md bg-white text-foreground placeholder:text-muted-foreground input-focus-gold transition-all
                  ${errors.email ? 'border-destructive' : 'border-border'}`}
                placeholder="admin@mobde.co"
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-xs font-600 text-foreground mb-1.5 uppercase tracking-wide">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  {...register('password', { required: 'Password is required' })}
                  className={`w-full px-3.5 py-2.5 pr-10 text-sm border rounded-md bg-white text-foreground placeholder:text-muted-foreground input-focus-gold transition-all
                    ${errors.password ? 'border-destructive' : 'border-border'}`}
                  placeholder="••••••••"
                  aria-invalid={!!errors.password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-destructive">{errors.password.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary font-600 text-sm py-2.5 rounded-md mt-2 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </form>
        </div>

        {/* Security note */}
        <p className="text-center text-xs text-muted-foreground mt-5">
          Admin access only. Not publicly accessible.
        </p>
      </div>
    </div>
  );
}