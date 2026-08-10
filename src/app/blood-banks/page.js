export default function BloodBanks() {
  // Real Kerala Blood Banks (from Justdial)
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getBloodBanks();
      setBanks(data);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <main style={{ minHeight: '100vh', background: 'linear-gradient(135deg, var(--bg-cream) 0%, rgba(211,47,47,0.08) 50%, var(--bg-cream) 100%)', paddingTop: '150px', paddingBottom: '100px', position: 'relative' }}>
      
      {/* Abstract Background Mesh */}
      <div style={{ position: 'absolute', top: '10%', left: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(211,47,47,0.15) 0%, rgba(255,255,255,0) 70%)', filter: 'blur(40px)', zIndex: 0 }}></div>
      
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 className="text-massive" style={{ fontSize: '3.5rem', color: 'var(--text-dark)' }}>Verified <span style={{ color: 'var(--primary-red)' }}>Donors & Banks</span></h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginTop: '15px' }}>Access our secure network of registered medical facilities and willing donors.</p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px', color: 'var(--primary-red)', fontWeight: 'bold' }}>Loading network data...</div>
        ) : banks.length === 0 ? (
          <div className="liquid-glass" style={{ padding: '50px', textAlign: 'center', borderRadius: '20px' }}>
             <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>No facilities found in the registry.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '30px' }}>
            {banks.map(bank => (
              <div key={bank.id} className="liquid-glass" style={{ padding: '30px', borderRadius: '20px', transition: 'transform 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                  <h2 style={{ fontSize: '1.4rem', color: 'var(--text-dark)', fontWeight: '600' }}>{bank.name}</h2>
                  <span style={{ background: 'rgba(211,47,47,0.1)', color: 'var(--primary-red)', padding: '5px 12px', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 'bold' }}>VERIFIED</span>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                  <p>📍 {bank.location}</p>
                  <p>📞 {bank.contact}</p>
                </div>
                
                <hr className="elegant-line" style={{ margin: '20px 0 15px', borderTop: '1px solid rgba(0,0,0,0.05)' }} />
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                   <span style={{ padding: '6px 12px', background: 'rgba(0,0,0,0.03)', borderRadius: '8px', fontSize: '0.85rem', color: 'var(--text-dark)', fontWeight: '500' }}>A+ Available</span>
                   <span style={{ padding: '6px 12px', background: 'rgba(0,0,0,0.03)', borderRadius: '8px', fontSize: '0.85rem', color: 'var(--text-dark)', fontWeight: '500' }}>O- Available</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
