"use server";

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { loginDonorAction } from '../actions';

export async function loginAdmin(formData) {
  const username = formData.get('username');
  const password = formData.get('password');

  if (username === 'admin' && password === 'PulseGridAdmin2026') {
    const cookieStore = await cookies();
    cookieStore.set('admin_auth', 'admin_authenticated', {
      path: '/',
      maxAge: 86400,
      sameSite: 'lax',
      httpOnly: false
    });
    return { success: true };
  } else {
    return { error: 'Invalid credentials. Please try again.' };
  }
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_auth');
  redirect('/admin-login');
}

export async function loginDonor(formData) {
  const res = await loginDonorAction(formData);
  if (res && res.success) {
    const cookieStore = await cookies();
    cookieStore.set('donor_auth', encodeURIComponent(res.name), {
      path: '/',
      maxAge: 86400,
      sameSite: 'lax',
      httpOnly: false
    });
  }
  return res;
}

export async function logoutDonor() {
  const cookieStore = await cookies();
  cookieStore.delete('donor_auth');
  redirect('/login');
}
