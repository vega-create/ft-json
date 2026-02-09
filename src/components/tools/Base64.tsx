import { useState } from 'react';

export default function Base64() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode'|'decode'>('encode');

  const process = () => {
    try {
      setOutput(mode === 'encode' ? btoa(unescape(encodeURIComponent(input))) : decodeURIComponent(escape(atob(input))));
    } catch { setOutput('Error: Invalid input'); }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(['encode','decode'] as const).map(m => (
          <button key={m} onClick={() => {setMode(m);setOutput('');}} className={`px-4 py-2 rounded-lg text-sm font-medium ${mode===m?'bg-emerald-700 text-white':'bg-gray-100 text-gray-600'}`}>{m === 'encode' ? '→ Encode' : '← Decode'}</button>
        ))}
      </div>
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 to decode...'} className="w-full h-36 p-4 border border-gray-200 rounded-xl font-mono text-sm outline-none" />
      <button onClick={process} className="px-6 py-2 bg-emerald-700 text-white rounded-lg font-medium hover:bg-emerald-800">{mode === 'encode' ? 'Encode' : 'Decode'}</button>
      {output && (
        <div className="relative">
          <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm font-mono whitespace-pre-wrap break-all">{output}</pre>
          <button onClick={() => navigator.clipboard.writeText(output)} className="absolute top-3 right-3 px-3 py-1 bg-orange-500 text-white rounded text-xs">Copy</button>
        </div>
      )}
    </div>
  );
}
