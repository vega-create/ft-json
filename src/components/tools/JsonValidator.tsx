import { useState } from 'react';

export default function JsonValidator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<{valid:boolean;msg:string}|null>(null);

  const validate = () => {
    try { JSON.parse(input); setResult({valid:true,msg:'Valid JSON ✓'}); }
    catch (e) { setResult({valid:false,msg:(e as Error).message}); }
  };

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={e => {setInput(e.target.value);setResult(null);}} placeholder="Paste JSON to validate..." className="w-full h-56 p-4 border border-gray-200 rounded-xl font-mono text-sm outline-none" />
      <button onClick={validate} className="px-6 py-2 bg-emerald-700 text-white rounded-lg font-medium hover:bg-emerald-800">Validate</button>
      {result && (
        <div className={`p-4 rounded-xl ${result.valid ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          <p className={`font-mono text-sm ${result.valid ? 'text-green-700' : 'text-red-700'}`}>{result.msg}</p>
        </div>
      )}
    </div>
  );
}
