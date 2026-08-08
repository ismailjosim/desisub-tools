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

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),

  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface AuthError {
  message?: string;
}

interface AuthResponse {
  error?: AuthError;
}

// ============================================================================
// Component
// ============================================================================

export const LoginForm = (): JSX.Element => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { control, handleSubmit } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // ==========================================================================
  // Email & Password Sign In
  // ==========================================================================

  const onSubmit = async (data: LoginFormValues): Promise<void> => {
    setIsLoading(true);

    try {
      const response = (await authClient.signIn.email({
        email: data.email,
        password: data.password,
        callbackURL: '/dashboard',
      })) as AuthResponse;

      if (response.error) {
        toast.error(response.error.message || 'Invalid email or password.');
        return;
      }

      toast.success('Welcome back!');
      router.push('/dashboard');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.';

      toast.error(errorMessage);
      console.error('Sign in error:', error);
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
      const response = (await authClient.signIn.social({
        provider: 'google',
        callbackURL: '/dashboard',
      })) as AuthResponse;

      if (response.error) {
        toast.error(response.error.message || 'Google sign-in failed.');
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
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Welcome back</h1>

        <p className="text-sm text-muted-foreground">Enter your credentials to sign in</p>
      </div>

      {/* Email & Password Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <FieldGroup>
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
                <div className="flex items-center justify-between">
                  <FieldLabel htmlFor="password" className="font-medium text-foreground">
                    Password
                  </FieldLabel>

                  <Link
                    href="/forgot-password"
                    className="text-xs font-medium text-primary transition-colors hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Password Input */}
                <div className="relative">
                  <Input
                    {...field}
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    disabled={isSubmitting}
                    aria-invalid={fieldState.invalid}
                    autoComplete="current-password"
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
        </FieldGroup>

        {/* Submit */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-10 w-full rounded-lg bg-gradient-primary font-semibold text-white transition-all hover:opacity-95"
        >
          {isLoading && <Loader2 data-icon="inline-start" className="size-4 animate-spin" />}

          {isLoading ? 'Signing in...' : 'Sign In'}
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
            className="size-4"
          >
            <path
              fill="currentColor"
              d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
            />
          </svg>
        )}

        <span>{isGoogleLoading ? 'Connecting...' : 'Continue with Google'}</span>
      </Button>

      {/* Sign Up */}
      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{' '}
        <Link
          href="/register"
          className="font-medium text-primary underline-offset-4 transition-colors hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
};
