import { apiFetch } from '@/lib/api';
import { getAccessToken } from './auth';

export async function changePassword(currentPassword: string, newPassword: string): Promise<void> {
  const token = getAccessToken();
  if (!token) {
    throw new Error('Not authenticated');
  }

  await apiFetch<void>('/auth/change-password', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      current_password: currentPassword,
      new_password: newPassword,
    }),
  });
}
