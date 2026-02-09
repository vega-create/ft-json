import { useState } from 'react';

export default function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [indent, setIndent] = useState(2);
  const [error, setError] = useState('');

  const format = () => {
    try { setOutput(JSON.stringify(JSON.parse(input), null, indent)); setError(''); }
    catch (e) { setError((e as Error).message); setOutput(''); }
  };

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder='{"name":"John","age":30}' className="w-full h-48 p-4 border border-gray-200 rounded-xl font-mono text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
      <div className="flex gap-2 items-center">
        <button onClick={format} className="px-6 py-2 bg-emerald-700 text-white rounded-lg font-medium hover:bg-emerald-800">Format</button>
        {[2,4].map(n => (<button key={n} onClick={() => setIndent(n)} className={`px-3 py-2 rounded-lg text-sm ${indent===n?'bg-orange-500 text-white':'bg-gray-100 text-gray-600'}`}>{n} spaces</button>))}
        <button onClick={() => setIndent(0)} className={`px-3 py-2 rounded-lg text-sm ${indent===0?'bg-orange-500 text-white':'bg-gray-100 text-gray-600'}`}>Tab</button>
      </div>
      {error && <p className="text-red-500 text-sm font-mono bg-red-50 p-3 rounded-lg">❌ {error}</p>}
      {output && (
        <div className="relative">
          <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm font-mono max-h-96">{output}</pre>
          <button onClick={() => navigator.clipboard.writeText(output)} className="absolute top-3 right-3 px-3 py-1 bg-orange-500 text-white rounded text-xs">Copy</button>
        </div>
      )}
    </div>
  );
}
