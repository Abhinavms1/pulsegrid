"use server";

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { loginDonorAction } from '../actions';

export async function loginAdmin(formData) {
  const username = formData.get('username');
  const password = formData.get('password');

  if (username === 'admin' && password === 'PulseGridAdmin2026') {
    return { success: true };
  } else {
    return { error: 'Invalid credentials. Please try again.' };
  }
}

export async function logoutAdmin() {
  cookies().delete('admin_auth');
  redirect('/admin-login');
}

export async function loginDonor(formData) {
  const res = await loginDonorAction(formData);
  return res; // Returns {success: true, name: donor.name} or {error: ...}
}

export async function logoutDonor() {
  cookies().delete('donor_auth');
  redirect('/login');
}
