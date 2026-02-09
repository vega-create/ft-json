import { useState } from 'react';

export default function JwtDecoder() {
  const [input, setInput] = useState('');
  const [header, setHeader] = useState('');
  const [payload, setPayload] = useState('');
  const [error, setError] = useState('');

  const decode = () => {
    try {
      const parts = input.trim().split('.');
      if (parts.length !== 3) throw new Error('JWT must have 3 parts (header.payload.signature)');
      const b64decode = (s: string) => JSON.parse(decodeURIComponent(escape(atob(s.replace(/-/g,'+').replace(/_/g,'/')))));
      setHeader(JSON.stringify(b64decode(parts[0]), null, 2));
      const p = b64decode(parts[1]);
      if (p.exp) p._exp_readable = new Date(p.exp * 1000).toISOString();
      if (p.iat) p._iat_readable = new Date(p.iat * 1000).toISOString();
      setPayload(JSON.stringify(p, null, 2));
      setError('');
    } catch (e) { setError((e as Error).message); setHeader(''); setPayload(''); }
  };

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste JWT token..." className="w-full h-28 p-4 border border-gray-200 rounded-xl font-mono text-xs outline-none" />
      <button onClick={decode} className="px-6 py-2 bg-emerald-700 text-white rounded-lg font-medium hover:bg-emerald-800">Decode</button>
      {error && <p className="text-red-500 text-sm font-mono bg-red-50 p-3 rounded-lg">❌ {error}</p>}
      {header && (
        <div className="space-y-3">
          <div><p className="text-sm font-medium text-orange-600 mb-1">Header</p><pre className="bg-gray-900 text-blue-400 p-4 rounded-xl text-sm font-mono">{header}</pre></div>
          <div><p className="text-sm font-medium text-orange-600 mb-1">Payload</p><pre className="bg-gray-900 text-green-400 p-4 rounded-xl text-sm font-mono overflow-x-auto">{payload}</pre></div>
          <p className="text-xs text-gray-400">⚠️ This decoder does not verify the signature. Do not trust unsigned tokens.</p>
        </div>
      )}
    </div>
  );
}
