"use client";

import { useEffect, useState } from 'react';
import { getBloodBanks } from '../actions';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../../components/Map'), { ssr: false });

function calculateDistance(lat1, lon1, lat2, lon2) {
  if (!lat1 || !lon1 || !lat2 || !lon2) return Infinity;
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
  return R * c; // Distance in km
}

export default function BloodBanks() {
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    async function load() {
      const data = await getBloodBanks();
      setBanks(data);
      
      // Request Location
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation({ lat: latitude, lng: longitude });
            
            // Sort banks by distance
            const sortedBanks = [...data].sort((a, b) => {
              const distA = calculateDistance(latitude, longitude, a.latitude, a.longitude);
              const distB = calculateDistance(latitude, longitude, b.latitude, b.longitude);
              return distA - distB;
            });
            setBanks(sortedBanks);
            setLoading(false);
          },
          (error) => {
            console.error("Location error:", error);
            setLoading(false); // fallback to unsorted if denied
          }
        );
      } else {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-primary)', paddingTop: '150px', paddingBottom: '100px', position: 'relative' }}>
      
      {/* Abstract Background Mesh */}
      <div style={{ position: 'absolute', top: '10%', left: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(211,47,47,0.15) 0%, rgba(255,255,255,0) 70%)', filter: 'blur(40px)', zIndex: 0 }}></div>
      
      <div className="section-padding" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 50px', position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 className="text-massive" style={{ fontSize: '3.5rem', color: 'var(--text-primary)' }}>Verified <span style={{ color: 'var(--primary-red)' }}>Donors & Banks</span></h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginTop: '15px' }}>Access our secure network of registered medical facilities and willing donors. Sorted by nearest to you.</p>
        </motion.div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} 
              transition={{ repeat: Infinity, duration: 1.5 }}
              style={{ width: '50px', height: '50px', background: 'var(--primary-red)', borderRadius: '50%', margin: '0 auto 20px' }}
            />
            <p style={{ color: 'var(--primary-red)', fontWeight: 'bold' }}>Locating nearest facilities...</p>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '50px', flexDirection: 'column' }}>
            
            {/* Map Section */}
            <div style={{ height: '400px', borderRadius: '30px', overflow: 'hidden', border: '1px solid var(--glass-border)' }}>
              <Map 
                banks={banks} 
                userLocation={userLocation} 
                onLocationDrag={(newLoc) => setUserLocation(newLoc)}
              />
            </div>

            {/* List Section */}
            {banks.length === 0 ? (
              <div className="liquid-glass" style={{ padding: '50px', textAlign: 'center', borderRadius: '20px' }}>
                 <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>No facilities found in the registry.</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '30px' }}>
                {banks.map((bank, index) => (
                  <motion.div 
                    key={bank.id} 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="liquid-glass" 
                    style={{ padding: '30px', borderRadius: '20px' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                      <h2 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', fontWeight: '600' }}>{bank.name}</h2>
                      <span style={{ background: 'rgba(211,47,47,0.1)', color: 'var(--primary-red)', padding: '5px 12px', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 'bold' }}>VERIFIED</span>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                      <p>📍 {bank.address}</p>
                      <p>📞 {bank.contact}</p>
                      {userLocation && bank.latitude && (
                        <p style={{ color: 'var(--primary-red)', fontWeight: 'bold' }}>
                          🚗 {calculateDistance(userLocation.lat, userLocation.lng, bank.latitude, bank.longitude).toFixed(1)} km away
                        </p>
                      )}
                    </div>
                    
                    <hr className="elegant-line" style={{ margin: '20px 0 15px', borderTop: '1px solid var(--glass-border)' }} />
                    
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                       <span style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: '500' }}>A+ Available</span>
                       <span style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: '500' }}>O- Available</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
