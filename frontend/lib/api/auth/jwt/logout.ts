import { apiFetch } from '@/lib/api';
import { getAccessToken } from '../auth';

export function clearAccessToken(): void {
  localStorage.removeItem('access_token');
}

export async function logout(): Promise<void> {
  const token = getAccessToken();
  if (token) {
    try {
      await apiFetch<void>('/auth/jwt/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch {}
  }
  clearAccessToken();
}
