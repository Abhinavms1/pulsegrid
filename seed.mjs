import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const initialBanks = [
  { name: "IMA Blood Bank", location: "Thodupuzha Town Road, Idukki", contact: "+91 4862 222 222" },
  { name: "Holy Ghost Mission Hospital", location: "Hospital Road, Muttuchira, Kottayam", contact: "+91 4829 282 224" },
  { name: "Bank Of Blood", location: "Ettumanur, Kottayam", contact: "+91 481 253 5555" },
  { name: "Bharath Charitable Hospital Society Bloodbank", location: "Azad Lane, Thirunakkara, Kottayam", contact: "+91 481 256 5000" },
  { name: "All Kerala Blood Donors Association", location: "Maradu, Ernakulam", contact: "+91 484 270 5000" },
  { name: "B4Blood.com", location: "Indira Road, Palarivattom, Ernakulam", contact: "+91 484 233 4444" },
  { name: "I M A Blood Bank", location: "W R M Road, Ernakulam South", contact: "+91 484 236 2222" },
  { name: "Pvs Memorial Hospital Blood Bank", location: "Kaloor, Ernakulam", contact: "+91 484 233 2222" }
];

async function main() {
  console.log('Seeding blood banks...');
  for (const bank of initialBanks) {
    await prisma.bloodBank.create({
      data: {
        name: bank.name,
        address: bank.location,
        contact: bank.contact,
        verificationStatus: 'APPROVED'
      }
    });
  }
  console.log('Seeding complete.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
