import React, { useEffect, useState } from 'react';

function setSiteCookie() {
  // set cookie for 7 days
  const maxAge = 60 * 60 * 24 * 7;
  document.cookie = `site_access=1; path=/; max-age=${maxAge}; SameSite=Lax`;
}

function getCookieFlag() {
  if (typeof document === 'undefined') return false;
  return document.cookie.split(';').some((c) => c.trim().startsWith('site_access='));
}

export default function AuthGate({ children }) {
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setAuthorized(getCookieFlag());
    setLoading(false);
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/.netlify/functions/verify-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const data = await res.json();
      if (data.ok) {
        setSiteCookie();
        setAuthorized(true);
      } else {
        setError('Incorrect password');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  if (loading) return null;
  if (authorized) return <>{children}</>;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/95 z-50 p-6">
      <div className="max-w-md w-full bg-ivory/90 rounded-lg p-6 shadow-lg border border-botanical/20">
        <h2 className="font-heading text-2xl text-deep-rose mb-3">Site access</h2>
        <p className="text-sm text-botanical/70 mb-4">Enter the site password to continue.</p>
        <form onSubmit={submit} className="flex flex-col gap-3">
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full rounded-md p-3 border border-botanical/20" />
          {error && <div className="text-sm text-red-500">{error}</div>}
          <div className="flex justify-end">
            <button type="submit" className="px-4 py-2 bg-botanical text-white rounded-sm">Enter</button>
          </div>
        </form>
        <p className="text-xs text-botanical/60 mt-3">Tip: share the secret only with the other person — keep it private.</p>
      </div>
    </div>
  );
}
