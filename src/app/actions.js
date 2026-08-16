"use server";

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getBloodBanks() {
  try {
    const banks = await prisma.bloodBank.findMany({
      orderBy: { name: 'asc' }
    });
    return banks;
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
    const hospitalLocation = formData.get('hospitalLocation');
    const contactNumber = formData.get('contactNumber');

    // For prototype purposes, we won't strictly enforce a requesterId
    // since we don't have full user auth yet. We'll use a dummy ID.
    const newRequest = await prisma.emergencyRequest.create({
      data: {
        requesterId: "anonymous_requester_123",
        patientName: patientName,
        bloodGroupRequired: bloodGroupRequired,
        unitsRequired: unitsRequired,
        status: "OPEN"
      }
    });
    return { success: true, requestId: newRequest.id };
  } catch (error) {
    console.error("Error submitting emergency request:", error);
    return { error: "Failed to broadcast request. Please try again." };
  }
}
