'use client';

import { useState, type JSX } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

import { authClient } from '@/lib/auth-client';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

// ============================================================================
// Schema & Types
// ============================================================================

const registerSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),

    email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),

    password: z.string().min(8, 'Password must be at least 8 characters'),

    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

// ============================================================================
// Component
// ============================================================================

export const RegisterForm = (): JSX.Element => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { control, handleSubmit } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  // ==========================================================================
  // Email & Password Registration
  // ==========================================================================

  const onSubmit = async (data: RegisterFormValues): Promise<void> => {
    setIsLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        email: data.email,
        password: data.password,
        name: data.name,
        callbackURL: '/dashboard',
      });

      if (error) {
        toast.error(error.message || 'Something went wrong during registration.');
        return;
      }

      toast.success('Registration successful!');

      router.push('/dashboard');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.';

      toast.error(errorMessage);

      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // ==========================================================================
  // Google Sign In
  // ==========================================================================

  const handleGoogleSignIn = async (): Promise<void> => {
    setIsGoogleLoading(true);

    try {
      const { error } = await authClient.signIn.social({
        provider: 'google',
        callbackURL: '/dashboard',
      });

      if (error) {
        toast.error(error.message || 'Google sign-in failed.');
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Google sign-in is not configured.';

      toast.error(errorMessage);

      console.error('Google sign in error:', error);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const isSubmitting = isLoading || isGoogleLoading;

  // ==========================================================================
  // Render
  // ==========================================================================

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Create an account</h1>

        <p className="text-sm text-muted-foreground">Enter your details below to get started</p>
      </div>

      {/* Registration Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <FieldGroup>
          {/* Name */}
          <Controller
            control={control}
            name="name"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="name" className="font-medium text-foreground">
                  Name
                </FieldLabel>

                <Input
                  {...field}
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  disabled={isSubmitting}
                  aria-invalid={fieldState.invalid}
                  autoComplete="name"
                  className="h-10 bg-surface-elevated border-border/80 text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/50"
                />

                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Email */}
          <Controller
            control={control}
            name="email"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email" className="font-medium text-foreground">
                  Email
                </FieldLabel>

                <Input
                  {...field}
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  disabled={isSubmitting}
                  aria-invalid={fieldState.invalid}
                  autoComplete="email"
                  className="h-10 bg-surface-elevated border-border/80 text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/50"
                />

                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Password */}
          <Controller
            control={control}
            name="password"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="password" className="font-medium text-foreground">
                  Password
                </FieldLabel>

                <div className="relative">
                  <Input
                    {...field}
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    disabled={isSubmitting}
                    aria-invalid={fieldState.invalid}
                    autoComplete="new-password"
                    className="h-10 bg-surface-elevated border-border/80 pr-10 text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/50"
                  />

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    aria-pressed={showPassword}
                    disabled={isSubmitting}
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute top-1/2 right-0 h-10 w-10 -translate-y-1/2 text-muted-foreground hover:bg-transparent hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </Button>
                </div>

                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Confirm Password */}
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="confirmPassword" className="font-medium text-foreground">
                  Confirm Password
                </FieldLabel>

                <div className="relative">
                  <Input
                    {...field}
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    disabled={isSubmitting}
                    aria-invalid={fieldState.invalid}
                    autoComplete="new-password"
                    className="h-10 bg-surface-elevated border-border/80 pr-10 text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/50"
                  />

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                    aria-pressed={showConfirmPassword}
                    disabled={isSubmitting}
                    onClick={() => setShowConfirmPassword((current) => !current)}
                    className="absolute top-1/2 right-0 h-10 w-10 -translate-y-1/2 text-muted-foreground hover:bg-transparent hover:text-foreground"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </Button>
                </div>

                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </FieldGroup>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-10 w-full rounded-lg bg-gradient-primary font-semibold text-white transition-all hover:opacity-95"
        >
          {isLoading && <Loader2 data-icon="inline-start" className="size-4 animate-spin" />}

          {isLoading ? 'Creating account...' : 'Sign Up'}
        </Button>
      </form>

      {/* Divider */}
      <div className="relative flex items-center">
        <Separator className="bg-border/60" />

        <span className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap bg-background px-2 text-xs text-muted-foreground">
          Or continue with
        </span>
      </div>

      {/* Google Sign In */}
      <Button
        type="button"
        variant="outline"
        onClick={handleGoogleSignIn}
        disabled={isSubmitting}
        className="h-10 w-full rounded-lg border-border/80 bg-secondary/30 font-medium text-foreground transition-all hover:bg-secondary/70"
      >
        {isGoogleLoading ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="size-4 shrink-0"
          >
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />

            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />

            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              fill="#FBBC05"
            />

            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              fill="#EA4335"
            />
          </svg>
        )}

        <span>{isGoogleLoading ? 'Connecting...' : 'Continue with Google'}</span>
      </Button>

      {/* Login Link */}
      <p className="pt-1 text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link
          href="/login"
          className="font-medium text-primary underline-offset-4 transition-colors hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
};
