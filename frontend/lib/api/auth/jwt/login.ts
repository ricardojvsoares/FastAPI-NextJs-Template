import { apiFetch } from '@/lib/api';

export type TokenResponse = {
  access_token: string;
  token_type: string;
};

export function setAccessToken(token: string): void {
  localStorage.setItem('access_token', token);
}

export async function login(email: string, password: string): Promise<TokenResponse> {
  const body = new URLSearchParams({
    username: email,
    password,
  });

  const token = await apiFetch<TokenResponse>('/auth/jwt/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  });

  setAccessToken(token.access_token);
  return token;
}
