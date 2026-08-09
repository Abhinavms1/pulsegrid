export default function BloodBanks() {
  // Real Kerala Blood Banks (from Justdial)
  const banks = [
    { id: 1, name: "IMA Blood Bank", location: "Thodupuzha Town Road, Idukki", status: "Active" },
    { id: 2, name: "Holy Ghost Mission Hospital", location: "Hospital Road, Muttuchira, Kottayam", status: "Active" },
    { id: 3, name: "Bank Of Blood", location: "Ettumanur, Kottayam", status: "Active" },
    { id: 4, name: "Bharath Charitable Hospital Society Bloodbank", location: "Azad Lane, Thirunakkara, Kottayam", status: "Active" },
    { id: 5, name: "All Kerala Blood Donors Association", location: "Maradu, Ernakulam", status: "Active" },
    { id: 6, name: "B4Blood.com", location: "Indira Road, Palarivattom, Ernakulam", status: "Active" },
    { id: 7, name: "I M A Blood Bank", location: "W R M Road, Ernakulam South", status: "Active" },
    { id: 8, name: "Pvs Memorial Hospital Blood Bank", location: "Kaloor, Ernakulam", status: "Active" },
  ];

  return (
    <main style={{ minHeight: '80vh', padding: '50px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '10px', color: 'var(--text-light)' }}>Find <span style={{ color: 'var(--primary-red)' }}>Donors & Banks</span></h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '50px' }}>Below is a live directory of verified blood banks and donor associations in the Kerala region.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
        {banks.map(bank => (
          <div key={bank.id} className="glass-panel" style={{ padding: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '5px' }}>{bank.name}</h2>
              <p style={{ color: 'var(--text-muted)' }}>📍 {bank.location}</p>
            </div>
            <div>
              <span style={{ 
                background: 'rgba(5, 138, 7, 0.2)', 
                color: '#0cf011', 
                padding: '5px 15px', 
                borderRadius: '20px', 
                fontSize: '0.9rem',
                fontWeight: 'bold',
                border: '1px solid #058a07'
              }}>
                {bank.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
