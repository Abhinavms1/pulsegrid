const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const prisma = new PrismaClient();

async function main() {
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

  const headers = ['ID', 'Full Name', 'Email Address', 'Blood Group', 'Role', 'Status', 'Registration Date'];
  const rows = users.map(u => [
    `"${u.id}"`,
    `"${(u.name || '').replace(/"/g, '""')}"`,
    `"${(u.email || '').replace(/"/g, '""')}"`,
    `"${u.bloodGroup || 'N/A'}"`,
    `"${u.role || 'DONOR'}"`,
    `"${u.isAvailable ? 'Active' : 'Unavailable'}"`,
    `"${u.createdAt ? new Date(u.createdAt).toISOString() : 'N/A'}"`
  ]);

  const csv = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
  fs.writeFileSync('pulsegrid_users_export.csv', csv, 'utf8');
  console.log(`Successfully exported ${users.length} users to pulsegrid_users_export.csv`);
}

main()
  .catch(err => console.error(err))
  .finally(() => prisma.$disconnect());
