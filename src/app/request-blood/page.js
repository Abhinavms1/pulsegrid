"use client";
import { useState } from 'react';
import { submitEmergencyRequest } from '../actions';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function RequestBlood() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    const formData = new FormData(e.target);
    const result = await submitEmergencyRequest(formData);

    setLoading(false);
    if (result.error) {
      setErrorMsg(result.error);
    } else {
      setSuccess(true);
    }
  };

  return (
    <main style={{
      minHeight: '100vh',
      backgroundColor: '#FFFFFF',
      paddingTop: '116px', // Navbar buffer
      paddingBottom: '96px',
      position: 'relative'
    }}>
      <div className="content-container" style={{ maxWidth: '800px' }}>

        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
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
            Urgent Patient Care
          </span>

          <h1 style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
            color: 'var(--navy-primary)',
            lineHeight: 1.15,
            marginBottom: '12px'
          }}>
            Request <span style={{ color: 'var(--primary-crimson)' }}>Blood Units</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
            Initiate an emergency network broadcast to verified blood banks across Kerala.
          </p>
        </div>

        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--card-radius)',
          boxShadow: 'var(--soft-shadow)',
          padding: '40px 36px'
        }}>
          {success ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{
                width: '72px',
                height: '72px',
                backgroundColor: 'var(--status-verified-bg)',
                color: 'var(--status-verified)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px'
              }}>
                <CheckCircle2 size={36} />
              </div>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '12px', color: 'var(--navy-primary)' }}>
                Emergency Broadcast Initiated
              </h2>
              <p style={{ color: 'var(--text-body)', maxWidth: '480px', margin: '0 auto' }}>
                We have notified verified blood banks within emergency transfer distance.
                Facility coordinators will contact your emergency number immediately.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              {errorMsg && (
                <div style={{
                  gridColumn: 'span 2',
                  backgroundColor: 'var(--primary-crimson-tint)',
                  color: 'var(--primary-crimson)',
                  padding: '14px 18px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '0.9rem',
                  fontWeight: 600
                }}>
                  <AlertCircle size={18} />
                  {errorMsg}
                </div>
              )}

              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--navy-primary)', fontWeight: 700, fontSize: '0.9rem' }}>
                  Patient / Hospital Name
                </label>
                <input
                  type="text"
                  name="patientName"
                  required
                  style={{ width: '100%' }}
                  placeholder="e.g. City General Hospital / Patient Name"
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--navy-primary)', fontWeight: 700, fontSize: '0.9rem' }}>
                  Blood Group Required
                </label>
                <select name="bloodGroupRequired" required style={{ width: '100%' }}>
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--navy-primary)', fontWeight: 700, fontSize: '0.9rem' }}>
                  Units Required
                </label>
                <input
                  type="number"
                  name="unitsRequired"
                  min="1"
                  required
                  style={{ width: '100%' }}
                  placeholder="e.g. 2"
                />
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--navy-primary)', fontWeight: 700, fontSize: '0.9rem' }}>
                  Emergency Contact Phone Number
                </label>
                <input
                  type="tel"
                  name="contactNumber"
                  required
                  style={{ width: '100%' }}
                  placeholder="e.g. +91 98460 00000"
                />
              </div>

              <div style={{ gridColumn: 'span 2', marginTop: '12px' }}>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                  style={{ width: '100%', padding: '16px', fontSize: '1.05rem', borderRadius: '8px' }}
                >
                  {loading ? 'Broadcasting Request...' : 'Broadcast Emergency Request'}
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </main>
  );
}
