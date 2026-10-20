import { getAllUsers } from '../../actions.js';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const users = await getAllUsers();

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

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');

    return new Response(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="pulsegrid_users_export.csv"',
        'Cache-Control': 'no-store'
      }
    });
  } catch (error) {
    console.error("CSV Export Error:", error);
    return NextResponse.json({ error: 'Failed to export CSV' }, { status: 500 });
  }
}
