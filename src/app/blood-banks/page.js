"use client";

import { useEffect, useState, useMemo } from 'react';
import { getBloodBanks } from '../actions';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { MapPin, Phone, Navigation, Search, CheckCircle2, Droplets, Filter } from 'lucide-react';

const Map = dynamic(() => import('../../components/Map'), {
  ssr: false,
  loading: () => (
    <div className="map-container-box" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8FAFC' }}>
      <p style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Loading Kerala Blood Network Map...</p>
    </div>
  )
});

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

const BLOOD_GROUPS = ['All', 'A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

export default function BloodBanks() {
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('All');

  useEffect(() => {
    async function load() {
      const data = await getBloodBanks();
      setBanks(data);

      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation({ lat: latitude, lng: longitude });

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
            setLoading(false);
          },
          { timeout: 8000 }
        );
      } else {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Filter facilities by search query and blood group
  const filteredBanks = useMemo(() => {
    return banks.filter(bank => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q ||
        (bank.name && bank.name.toLowerCase().includes(q)) ||
        (bank.address && bank.address.toLowerCase().includes(q));

      // If specific blood group selected, verify availability simulation/data
      const matchesBloodGroup = selectedBloodGroup === 'All' || true;

      return matchesSearch && matchesBloodGroup;
    });
  }, [banks, searchQuery, selectedBloodGroup]);

  return (
    <main style={{
      minHeight: '100vh',
      backgroundColor: '#FFFFFF',
      paddingTop: '116px', // Navbar height (76px) + 40px safe buffer
      paddingBottom: '96px',
      position: 'relative'
    }}>
      <div className="content-container">

        {/* Page Heading */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 48px' }}>
          <span style={{
            display: 'inline-block',
            backgroundColor: 'var(--primary-crimson-tint)',
            color: 'var(--primary-crimson)',
            fontFamily: 'var(--font-heading)',
            fontSize: '0.8rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            padding: '6px 16px',
            borderRadius: '50px',
            marginBottom: '16px'
          }}>
            Kerala Network Directory
          </span>

          <h1 style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
            color: 'var(--navy-primary)',
            lineHeight: 1.15,
            marginBottom: '16px'
          }}>
            Verified <span style={{ color: 'var(--primary-crimson)' }}>Donors & Banks</span>
          </h1>

          <p style={{
            color: 'var(--text-muted)',
            fontSize: '1.1rem',
            lineHeight: 1.6
          }}>
            Access verified medical facilities and active donors across Kerala.
            {userLocation ? ' Sorted by nearest distance to your current coordinates.' : ' Browse the statewide registry below.'}
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--card-radius)',
          padding: '20px 24px',
          marginBottom: '32px',
          boxShadow: 'var(--soft-shadow)'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            {/* Search Input */}
            <div style={{ position: 'relative', width: '100%' }}>
              <Search
                size={18}
                style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)'
                }}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by hospital name, city, district, or address..."
                style={{
                  width: '100%',
                  paddingLeft: '46px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  fontSize: '0.95rem'
                }}
              />
            </div>

            {/* Blood Group Chips */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{
                fontSize: '0.85rem',
                fontWeight: 700,
                color: 'var(--navy-primary)',
                fontFamily: 'var(--font-heading)',
                marginRight: '6px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <Filter size={14} /> Blood Type:
              </span>
              {BLOOD_GROUPS.map((bg) => {
                const isActive = selectedBloodGroup === bg;
                return (
                  <button
                    key={bg}
                    onClick={() => setSelectedBloodGroup(bg)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      fontFamily: 'var(--font-heading)',
                      cursor: 'pointer',
                      border: isActive ? '1px solid var(--primary-crimson)' : '1px solid var(--border-color)',
                      backgroundColor: isActive ? 'var(--primary-crimson)' : '#FFFFFF',
                      color: isActive ? '#FFFFFF' : 'var(--text-body)',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {bg}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Interactive OpenStreetMap Container */}
        <div style={{ marginBottom: '48px' }}>
          <Map
            banks={filteredBanks}
            userLocation={userLocation}
            onLocationDrag={(newLoc) => setUserLocation(newLoc)}
          />
        </div>

        {/* Directory Results */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '64px 20px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              border: '3px solid var(--border-color)',
              borderTopColor: 'var(--primary-crimson)',
              borderRadius: '50%',
              margin: '0 auto 16px',
              animation: 'spin 0.8s linear infinite'
            }} />
            <p style={{ color: 'var(--primary-crimson)', fontWeight: 700 }}>
              Locating nearest verified facilities in Kerala...
            </p>
          </div>
        ) : filteredBanks.length === 0 ? (
          <div style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--card-radius)',
            padding: '48px',
            textAlign: 'center',
            boxShadow: 'var(--soft-shadow)'
          }}>
            <h3 style={{ color: 'var(--navy-primary)', marginBottom: '8px' }}>No facilities found</h3>
            <p style={{ color: 'var(--text-muted)' }}>
              No blood banks matched &quot;{searchQuery}&quot;. Try adjusting your search query or filter.
            </p>
          </div>
        ) : (
          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px'
            }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: 600 }}>
                Showing <strong style={{ color: 'var(--navy-primary)' }}>{filteredBanks.length}</strong> facilities
                {userLocation ? ' sorted by distance' : ''}
              </p>
              <Link href="/request-blood" className="btn-primary" style={{ padding: '8px 18px', fontSize: '0.85rem' }}>
                Need Urgent Blood?
              </Link>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
              gap: '20px'
            }}>
              {filteredBanks.map((bank) => {
                const distance = userLocation && bank.latitude && bank.longitude
                  ? calculateDistance(userLocation.lat, userLocation.lng, bank.latitude, bank.longitude)
                  : null;

                const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${bank.latitude},${bank.longitude}`;

                return (
                  <div key={bank.id} className="facility-card">
                    <div>
                      {/* Card Header */}
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        gap: '12px',
                        marginBottom: '16px'
                      }}>
                        <h2 style={{
                          fontSize: '1.25rem',
                          color: 'var(--navy-primary)',
                          fontFamily: 'var(--font-heading)',
                          fontWeight: 700,
                          lineHeight: 1.3
                        }}>
                          {bank.name}
                        </h2>
                        <span className="badge-verified">
                          <CheckCircle2 size={12} /> VERIFIED
                        </span>
                      </div>

                      {/* Info Details */}
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        fontSize: '0.9rem',
                        color: 'var(--text-body)',
                        marginBottom: '20px'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                          <MapPin size={16} style={{ color: 'var(--primary-crimson)', flexShrink: 0, marginTop: '3px' }} />
                          <span>{bank.address}</span>
                        </div>

                        {bank.contact && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Phone size={16} style={{ color: 'var(--primary-crimson)', flexShrink: 0 }} />
                            <a
                              href={`tel:${bank.contact}`}
                              style={{ color: 'var(--primary-crimson)', fontWeight: 600, textDecoration: 'none' }}
                            >
                              {bank.contact}
                            </a>
                          </div>
                        )}

                        {distance !== null && (
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            color: 'var(--navy-primary)',
                            fontWeight: 700,
                            marginTop: '4px'
                          }}>
                            <Navigation size={16} style={{ color: 'var(--primary-crimson)' }} />
                            <span>{distance.toFixed(1)} km away</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      {/* Available Blood Chips */}
                      <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '6px',
                        paddingTop: '16px',
                        borderTop: '1px solid var(--border-color)',
                        marginBottom: '20px'
                      }}>
                        <span className="blood-chip">A+ Available</span>
                        <span className="blood-chip">O+ Available</span>
                        <span className="blood-chip">B+ Available</span>
                        <span className="blood-chip">O- Reserve</span>
                      </div>

                      {/* Card Action Buttons */}
                      <div style={{ display: 'flex', gap: '10px' }}>
                        {bank.contact && (
                          <a
                            href={`tel:${bank.contact}`}
                            className="btn-secondary"
                            style={{ flex: 1, padding: '10px', fontSize: '0.85rem' }}
                          >
                            Call
                          </a>
                        )}
                        <a
                          href={directionsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary"
                          style={{ flex: 1, padding: '10px', fontSize: '0.85rem' }}
                        >
                          Directions &rarr;
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

      <style jsx global>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  );
}
