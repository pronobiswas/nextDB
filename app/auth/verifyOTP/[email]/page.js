'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function VerifyPage({ params }) {
  const email = decodeURIComponent(params?.email || '');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: otp }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setMessage('✅ Email verified successfully!');
        // Redirect to login after 2 seconds
        setTimeout(() => router.push('/auth/signin'), 2000);
      } else {
        setMessage(data.message || '❌ Invalid OTP, try again.');
      }
    } catch (err) {
      console.error(err);
      setMessage('⚠️ Something went wrong.');
    }
  };

  return (
    <div style={{ padding: '40px' }}>
      <h2>Verify Your Email</h2>
      <p>Enter the 5-digit OTP sent to:</p>
      <h3>{email}</h3>

      <form onSubmit={handleVerify}>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          required
        />
        <button type="submit" className='px-4 py-1 border'>Verify</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
