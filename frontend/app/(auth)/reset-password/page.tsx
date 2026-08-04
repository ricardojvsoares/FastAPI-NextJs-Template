import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ResetPasswordForm from '@/app/(auth)/reset-password/_components/reset-password-form';
import Link from 'next/link';

export default function ResetPasswordPage() {
  return (
    <div className="flex h-auto min-h-screen items-center justify-center overflow-x-hidden px-4 py-10 sm:px-6 lg:px-8">
      <Card className="z-1 w-full gap-6 py-6 sm:max-w-md">
        <CardHeader className="gap-6 px-6">
          <div>
            <CardTitle className="mb-2 text-2xl font-semibold">Change Password</CardTitle>
            <CardDescription className="text-base">
              Enter your current password and choose a new password to update your account security.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 px-6">
          <ResetPasswordForm />

          <Link
            href="/login"
            className="text-muted-foreground block text-center text-sm underline underline-offset-4"
          >
            Back to login
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
