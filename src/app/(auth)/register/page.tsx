'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

const registerSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
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
      } else {
        toast.success('Registration successful! Redirecting...');
        router.push('/dashboard');
      }
    } catch (err) {
      toast.error('An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      const { error } = await authClient.signIn.social({
        provider: 'google',
        callbackURL: '/dashboard',
      });

      if (error) {
        toast.error(error.message || 'Google sign-in failed.');
      }
    } catch (err) {
      toast.error('Google sign-in is not configured yet.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-3xl font-heading font-bold tracking-tight">Create an account</h1>
        <p className="text-sm text-muted-foreground">Enter your details below to get started</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-foreground font-medium">Name</Label>
          <Input
            id="name"
            placeholder="John Doe"
            {...register('name')}
            className="bg-surface-elevated border-border/80 text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/50"
          />
          {errors.name && <p className="text-sm text-destructive font-medium">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-foreground font-medium">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            {...register('email')}
            className="bg-surface-elevated border-border/80 text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/50"
          />
          {errors.email && <p className="text-sm text-destructive font-medium">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-foreground font-medium">Password</Label>
          <Input
            id="password"
            type="password"
            {...register('password')}
            className="bg-surface-elevated border-border/80 text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/50"
          />
          {errors.password && <p className="text-sm text-destructive font-medium">{errors.password.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-foreground font-medium">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword')}
            className="bg-surface-elevated border-border/80 text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/50"
          />
          {errors.confirmPassword && (
            <p className="text-sm text-destructive font-medium">{errors.confirmPassword.message}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-primary text-white font-semibold h-10 rounded-lg hover:opacity-95 transition-all cursor-pointer mt-2"
          disabled={isLoading || isGoogleLoading}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Sign Up
        </Button>
      </form>

      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border/60" />
        </div>
        <span className="relative z-10 px-3 text-[11px] uppercase tracking-wider text-muted-foreground font-medium bg-card/80 backdrop-blur-md rounded-full border border-border/40">
          Or continue with
        </span>
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={handleGoogleSignIn}
        disabled={isLoading || isGoogleLoading}
        className="w-full h-10 border-border/80 bg-secondary/30 hover:bg-secondary/70 text-foreground font-medium rounded-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-xs"
      >
        {isGoogleLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
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
        <span>Continue with Google</span>
      </Button>

      <div className="text-center text-sm text-muted-foreground pt-1">
        Already have an account?{' '}
        <Link href="/login" className="text-primary font-medium hover:underline underline-offset-4">
          Sign in
        </Link>
      </div>
    </div>
  );
}
