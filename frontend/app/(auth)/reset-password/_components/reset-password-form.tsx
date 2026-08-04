'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { InputGroup, InputGroupInput, InputGroupAddon } from '@/components/ui/input-group';
import { Field, FieldLabel, FieldGroup } from '@/components/ui/field';
import { EyeOffIcon, EyeIcon } from 'lucide-react';
import { ApiError } from '@/lib/api';
import { changePassword, getAccessToken } from '@/lib/api/auth';

export default function ResetPasswordForm() {
  const router = useRouter();
  const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!getAccessToken()) {
      router.replace('/login');
    }
  }, [router]);

  async function handleSubmit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    const formData = new FormData(event.currentTarget);
    const currentPassword = String(formData.get('current-password') ?? '');
    const newPassword = String(formData.get('password') ?? '');
    const confirmPassword = String(formData.get('confirm-password') ?? '');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      await changePassword(currentPassword, newPassword);
      setSuccess('Password updated successfully.');
      event.currentTarget.reset();
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message || 'Unable to update password');
      } else if (err instanceof Error && err.message === 'Not authenticated') {
        router.replace('/login');
      } else {
        setError('Unable to update password. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup className="gap-4">
        <Field>
          <FieldLabel className="leading-5" htmlFor="current-password">
            Current Password*
          </FieldLabel>
          <InputGroup>
            <InputGroupInput
              id="current-password"
              name="current-password"
              type={isCurrentPasswordVisible ? 'text' : 'password'}
              placeholder="••••••••••••••••"
              required
              autoComplete="current-password"
            />
            <InputGroupAddon align="inline-end" className="pr-1.5">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setIsCurrentPasswordVisible((prevState) => !prevState)}
                className="text-muted-foreground rounded-l-none hover:bg-transparent"
              >
                {isCurrentPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
                <span className="sr-only">
                  {isCurrentPasswordVisible ? 'Hide password' : 'Show password'}
                </span>
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </Field>

        <Field>
          <FieldLabel className="leading-5" htmlFor="password">
            New Password*
          </FieldLabel>
          <InputGroup>
            <InputGroupInput
              id="password"
              name="password"
              type={isPasswordVisible ? 'text' : 'password'}
              placeholder="••••••••••••••••"
              required
              minLength={8}
              autoComplete="new-password"
            />
            <InputGroupAddon align="inline-end" className="pr-1.5">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setIsPasswordVisible((prevState) => !prevState)}
                className="text-muted-foreground rounded-l-none hover:bg-transparent"
              >
                {isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
                <span className="sr-only">
                  {isPasswordVisible ? 'Hide password' : 'Show password'}
                </span>
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </Field>

        <Field>
          <FieldLabel className="leading-5" htmlFor="confirm-password">
            Confirm Password*
          </FieldLabel>
          <InputGroup>
            <InputGroupInput
              id="confirm-password"
              name="confirm-password"
              type={isConfirmPasswordVisible ? 'text' : 'password'}
              placeholder="••••••••••••••••"
              required
              minLength={8}
              autoComplete="new-password"
            />
            <InputGroupAddon align="inline-end" className="pr-1.5">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setIsConfirmPasswordVisible((prevState) => !prevState)}
                className="text-muted-foreground rounded-l-none hover:bg-transparent"
              >
                {isConfirmPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
                <span className="sr-only">
                  {isConfirmPasswordVisible ? 'Hide password' : 'Show password'}
                </span>
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </Field>

        {error ? <p className="text-destructive text-sm">{error}</p> : null}
        {success ? <p className="text-sm text-green-600">{success}</p> : null}

        <Field>
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? 'Updating…' : 'Update Password'}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
