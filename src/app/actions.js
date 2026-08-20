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
      .from('donors')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      return { error: 'Email is already registered.' };
    }

    const { data, error } = await supabase
      .from('donors')
      .insert([
        { name, email, blood_group: bloodGroup, password } // Plain text prototype ONLY
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
    .from('donors')
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
    const { data, error } = await supabase.from('blood_banks').select('*');
    if (error) throw error;
    return (data || []).map(bank => ({
      id: bank.id,
      name: bank.name,
      address: bank.address,
      contact: bank.contact,
      capacity: bank.capacity,
      isVerified: bank.is_verified
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
      .from('requests')
      .insert([
        {
          requester_id: "anonymous_requester_123",
          patient_name: patientName,
          blood_group_required: bloodGroupRequired,
          units_required: unitsRequired,
          contact_number: contactNumber,
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
    .from('requests')
    .select('*')
    .eq('status', 'OPEN');
  
  if (error) {
    console.error("Error fetching active requests:", error);
    return [];
  }
  return (data || []).map(req => ({
    id: req.id,
    requesterId: req.requester_id,
    patientName: req.patient_name,
    bloodGroupRequired: req.blood_group_required,
    unitsRequired: req.units_required,
    contactNumber: req.contact_number,
    status: req.status,
    createdAt: req.created_at
  }));
}

export async function getDashboardStats() {
  try {
    // Fetch counts from Supabase
    const { count: banksCount } = await supabase.from('blood_banks').select('*', { count: 'exact', head: true });
    const { count: donorsCount } = await supabase.from('donors').select('*', { count: 'exact', head: true });
    
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
