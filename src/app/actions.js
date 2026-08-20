"use server";

import { supabase } from '../lib/supabase';

export async function registerDonorAction(formData) {
  try {
    const name = formData.get('name');
    const email = formData.get('email');
    const bloodGroup = formData.get('bloodGroup');
    const password = formData.get('password');

    // Basic validation
    const { data: existingUser } = await supabase
      .from('User')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      return { error: 'Email is already registered.' };
    }

    const { data, error } = await supabase
      .from('User')
      .insert([
        { id: crypto.randomUUID(), name, email, bloodGroup, password } // Plain text prototype ONLY
      ])
      .select()
      .single();

    if (error) throw error;
    return { success: true };
  } catch (err) {
    console.error("Registration Error:", err);
    return { error: 'Failed to register. Please try again.' };
  }
}

export async function loginDonorAction(formData) {
  const email = formData.get('email');
  const password = formData.get('password');

  const { data: donor, error } = await supabase
    .from('User')
    .select('id, name')
    .eq('email', email)
    .eq('password', password)
    .single();

  if (donor && !error) {
    return { success: true, donorId: donor.id, name: donor.name };
  } else {
    return { error: 'Invalid email or password.' };
  }
}

export async function getBloodBanks() {
  try {
    const { data, error } = await supabase.from('BloodBank').select('*');
    if (error) throw error;
    return (data || []).map(bank => ({
      id: bank.id,
      name: bank.name,
      address: bank.address,
      contact: bank.contact,
      capacity: bank.capacity || 100,
      isVerified: bank.verificationStatus === 'APPROVED'
    }));
  } catch (error) {
    console.error("Error fetching blood banks:", error);
    return [];
  }
}

export async function submitEmergencyRequest(formData) {
  try {
    const patientName = formData.get('patientName');
    const bloodGroupRequired = formData.get('bloodGroupRequired');
    const unitsRequired = parseInt(formData.get('unitsRequired'), 10);
    const contactNumber = formData.get('contactNumber');

    const { data, error } = await supabase
      .from('EmergencyRequest')
      .insert([
        {
          id: crypto.randomUUID(),
          requesterId: "anonymous_requester_123",
          patientName: patientName,
          bloodGroupRequired: bloodGroupRequired,
          unitsRequired: unitsRequired,
          status: "OPEN"
        }
      ])
      .select()
      .single();

    if (error) throw error;
    return { success: true, requestId: data.id };
  } catch (error) {
    console.error("Error submitting emergency request:", error);
    return { error: "Failed to broadcast request. Please try again." };
  }
}

export async function getActiveRequests() {
  const { data, error } = await supabase
    .from('EmergencyRequest')
    .select('*')
    .eq('status', 'OPEN');
  
  if (error) {
    console.error("Error fetching active requests:", error);
    return [];
  }
  return (data || []).map(req => ({
    id: req.id,
    requesterId: req.requesterId,
    patientName: req.patientName,
    bloodGroupRequired: req.bloodGroupRequired,
    unitsRequired: req.unitsRequired,
    status: req.status,
    createdAt: req.createdAt
  }));
}

export async function getDashboardStats() {
  try {
    // Fetch counts from Supabase
    const { count: banksCount } = await supabase.from('BloodBank').select('*', { count: 'exact', head: true });
    const { count: donorsCount } = await supabase.from('User').select('*', { count: 'exact', head: true });
    
    const requestsData = await getActiveRequests();

    return {
      totalBanks: banksCount || 0,
      totalDonors: donorsCount || 0,
      activeRequests: requestsData ? requestsData.length : 0,
      requests: requestsData || []
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return {
      totalBanks: 0,
      totalDonors: 0,
      activeRequests: 0,
      requests: []
    };
  }
}
