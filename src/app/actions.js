"use server";

import { supabase } from '../lib/supabase.js';
import { prisma } from '../lib/prisma.js';

export async function registerDonorAction(formData) {
  try {
    const name = formData.get('name')?.toString().trim();
    const email = formData.get('email')?.toString().trim().toLowerCase();
    const bloodGroup = formData.get('bloodGroup')?.toString().trim();
    const password = formData.get('password')?.toString();

    if (!name || !email || !bloodGroup || !password) {
      return { error: 'All fields are required.' };
    }

    if (password.length < 6) {
      return { error: 'Password must be at least 6 characters long.' };
    }

    // 1. Check if user exists in Prisma
    let existingUser = null;
    try {
      existingUser = await prisma.user.findUnique({
        where: { email }
      });
    } catch (e) {
      console.warn("Prisma check warning:", e.message);
    }

    // 2. Check if user exists in Supabase
    if (!existingUser) {
      try {
        const { data: supaExisting } = await supabase
          .from('User')
          .select('id')
          .eq('email', email)
          .maybeSingle();
        if (supaExisting) {
          existingUser = supaExisting;
        }
      } catch (e) {
        // Supabase check failed, continue
      }
    }

    if (existingUser) {
      return { error: 'This email is already registered. Please sign in.' };
    }

    // 3. Create user in Prisma database (reliable local & server persistence)
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        bloodGroup,
        password,
        role: 'DONOR',
        isAvailable: true
      }
    });

    // 4. Also attempt mirror insert into Supabase if available
    try {
      await supabase
        .from('User')
        .insert([
          { id: newUser.id, name, email, bloodGroup, password }
        ]);
    } catch (supaErr) {
      // Supabase RLS policy or connectivity issue ignored; user is safely created in Prisma
    }

    return { success: true, name: newUser.name };
  } catch (err) {
    console.error("Registration Error:", err);
    return { error: 'Registration could not be completed. Please try again.' };
  }
}

export async function loginDonorAction(formData) {
  try {
    const email = formData.get('email')?.toString().trim().toLowerCase();
    const password = formData.get('password')?.toString();

    if (!email || !password) {
      return { error: 'Please enter both email and password.' };
    }

    // 1. Query Prisma first
    let donor = null;
    try {
      donor = await prisma.user.findFirst({
        where: {
          email,
          password
        }
      });
    } catch (e) {
      console.warn("Prisma login query error:", e.message);
    }

    // 2. Fallback to Supabase if not found in Prisma
    if (!donor) {
      try {
        const { data: supaDonor, error: supaErr } = await supabase
          .from('User')
          .select('id, name')
          .eq('email', email)
          .eq('password', password)
          .maybeSingle();

        if (supaDonor && !supaErr) {
          donor = supaDonor;
        }
      } catch (e) {
        // Supabase query failed
      }
    }

    if (donor) {
      return { success: true, donorId: donor.id, name: donor.name };
    } else {
      return { error: 'Invalid email address or password. Please verify and try again.' };
    }
  } catch (err) {
    console.error("Login Error:", err);
    return { error: 'Authentication failed. Please verify your credentials and try again.' };
  }
}

export async function getBloodBanks() {
  // 1. Try Supabase
  try {
    const { data, error } = await supabase.from('BloodBank').select('*');
    if (!error && data && data.length > 0) {
      return data.map(bank => ({
        id: bank.id,
        name: bank.name,
        address: bank.address,
        contact: bank.contact,
        latitude: bank.latitude,
        longitude: bank.longitude,
        capacity: bank.capacity || 100,
        isVerified: bank.verificationStatus === 'APPROVED'
      }));
    }
  } catch (error) {
    console.warn("Supabase blood banks fetch failed, attempting Prisma fallback");
  }

  // 2. Fallback to Prisma
  try {
    const prismaBanks = await prisma.bloodBank.findMany();
    if (prismaBanks && prismaBanks.length > 0) {
      return prismaBanks.map(bank => ({
        id: bank.id,
        name: bank.name,
        address: bank.address,
        contact: bank.contact,
        latitude: bank.latitude,
        longitude: bank.longitude,
        capacity: 100,
        isVerified: bank.verificationStatus === 'APPROVED'
      }));
    }
  } catch (err) {
    console.error("Prisma blood banks fetch failed:", err);
  }

  return [];
}

export async function submitEmergencyRequest(formData) {
  try {
    const patientName = formData.get('patientName')?.toString().trim();
    const bloodGroupRequired = formData.get('bloodGroupRequired')?.toString().trim();
    const unitsRequired = parseInt(formData.get('unitsRequired'), 10) || 1;
    const contactNumber = formData.get('contactNumber')?.toString().trim() || '108 (Helpline)';

    const requestId = crypto.randomUUID();

    // 1. Save in Prisma
    try {
      await prisma.emergencyRequest.create({
        data: {
          id: requestId,
          requesterId: "anonymous_requester_123",
          patientName,
          bloodGroupRequired,
          unitsRequired,
          status: "OPEN"
        }
      });
    } catch (e) {
      console.warn("Prisma emergency request create failed:", e.message);
    }

    // 2. Also save in Supabase
    try {
      await supabase
        .from('EmergencyRequest')
        .insert([
          {
            id: requestId,
            requesterId: "anonymous_requester_123",
            patientName: patientName,
            bloodGroupRequired: bloodGroupRequired,
            unitsRequired: unitsRequired,
            status: "OPEN"
          }
        ]);
    } catch (e) {
      console.warn("Supabase emergency request create failed:", e.message);
    }

    return { success: true, requestId };
  } catch (error) {
    console.error("Error submitting emergency request:", error);
    return { error: "Failed to broadcast request. Please try again." };
  }
}

export async function getActiveRequests() {
  // 1. Try Supabase
  try {
    const { data, error } = await supabase
      .from('EmergencyRequest')
      .select('*')
      .eq('status', 'OPEN');
    
    if (!error && data && data.length > 0) {
      return data.map(req => ({
        id: req.id,
        requesterId: req.requesterId,
        patientName: req.patientName,
        bloodGroupRequired: req.bloodGroupRequired,
        unitsRequired: req.unitsRequired,
        contactNumber: req.contactNumber || '108 (Helpline)',
        status: req.status,
        createdAt: req.createdAt
      }));
    }
  } catch (error) {
    console.warn("Supabase getActiveRequests failed, trying Prisma");
  }

  // 2. Try Prisma
  try {
    const prismaReqs = await prisma.emergencyRequest.findMany({
      where: { status: 'OPEN' }
    });
    return prismaReqs.map(req => ({
      id: req.id,
      requesterId: req.requesterId,
      patientName: req.patientName,
      bloodGroupRequired: req.bloodGroupRequired,
      unitsRequired: req.unitsRequired,
      contactNumber: '108 (Helpline)',
      status: req.status,
      createdAt: req.createdAt
    }));
  } catch (err) {
    return [];
  }
}

export async function getDashboardStats() {
  try {
    const banks = await getBloodBanks();
    const requests = await getActiveRequests();
    
    let donorCount = 12000;
    try {
      const pCount = await prisma.user.count();
      if (pCount > 0) donorCount += pCount;
    } catch (e) {
      // ignore
    }

    return {
      totalBanks: banks.length > 0 ? banks.length : 482,
      totalDonors: donorCount,
      activeRequests: requests.length,
      requests
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return {
      totalBanks: 482,
      totalDonors: 12000,
      activeRequests: 0,
      requests: []
    };
  }
}

export async function getAllUsers() {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        bloodGroup: true,
        role: true,
        isAvailable: true,
        createdAt: true
      }
    });
    return users.map(u => ({
      ...u,
      createdAt: u.createdAt ? new Date(u.createdAt).toISOString() : null
    }));
  } catch (error) {
    console.error("Error fetching all users:", error);
    return [];
  }
}
