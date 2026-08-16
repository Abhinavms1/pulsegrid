"use server";

// In-memory data store for Vercel Serverless compatibility
// This prevents SQLite Prisma crashes on Vercel Edge/Serverless environments.

let globalBloodBanks = [
  { id: 1, name: "IMA Blood Bank", address: "Thodupuzha Town Road, Idukki", contact: "+91 4862 222 222", capacity: 100, isVerified: true },
  { id: 2, name: "Holy Ghost Mission Hospital", address: "Hospital Road, Muttuchira, Kottayam", contact: "+91 4829 282 224", capacity: 250, isVerified: true },
  { id: 3, name: "Bank Of Blood", address: "Ettumanur, Kottayam", contact: "+91 481 253 5555", capacity: 80, isVerified: true },
  { id: 4, name: "Bharath Charitable Hospital Society Bloodbank", address: "Azad Lane, Thirunakkara, Kottayam", contact: "+91 481 256 5000", capacity: 150, isVerified: true },
  { id: 5, name: "All Kerala Blood Donors Association", address: "Maradu, Ernakulam", contact: "+91 484 270 5000", capacity: 500, isVerified: true },
  { id: 6, name: "B4Blood.com", address: "Indira Road, Palarivattom, Ernakulam", contact: "+91 484 233 4444", capacity: 120, isVerified: true },
  { id: 7, name: "I M A Blood Bank", address: "W R M Road, Ernakulam South", contact: "+91 484 236 2222", capacity: 300, isVerified: true },
  { id: 8, name: "Pvs Memorial Hospital Blood Bank", address: "Kaloor, Ernakulam", contact: "+91 484 233 2222", capacity: 180, isVerified: true }
];

let globalRequests = [];
let requestCounter = 1;

export async function getBloodBanks() {
  try {
    return globalBloodBanks;
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

    const newRequest = {
      id: `REQ-${requestCounter++}`,
      requesterId: "anonymous_requester_123",
      patientName: patientName,
      bloodGroupRequired: bloodGroupRequired,
      unitsRequired: unitsRequired,
      contactNumber: contactNumber,
      status: "OPEN",
      createdAt: new Date().toISOString()
    };
    
    globalRequests.push(newRequest);

    return { success: true, requestId: newRequest.id };
  } catch (error) {
    console.error("Error submitting emergency request:", error);
    return { error: "Failed to broadcast request. Please try again." };
  }
}

export async function getDashboardStats() {
  return {
    totalBanks: globalBloodBanks.length,
    activeRequests: globalRequests.length,
    requests: globalRequests
  };
}
