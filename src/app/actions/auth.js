"use server";

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAdmin(formData) {
  const username = formData.get('username');
  const password = formData.get('password');

  if (username === 'admin' && password === 'PulseGridAdmin2026') {
    // Set an extremely simple auth cookie for prototype purposes
    cookies().set('admin_auth', 'true', { secure: true, httpOnly: true, maxAge: 60 * 60 * 24 });
    redirect('/admin');
  } else {
    return { error: 'Invalid credentials. Please try again.' };
  }
}

export async function logoutAdmin() {
  cookies().delete('admin_auth');
  redirect('/admin-login');
}
