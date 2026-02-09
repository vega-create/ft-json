import { useState } from 'react';

const entities: Record<string,string> = {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'};
const revEntities: Record<string,string> = Object.fromEntries(Object.entries(entities).map(([k,v])=>[v,k]));

export default function HtmlEntity() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode'|'decode'>('encode');

  const process = () => {
    if (mode === 'encode') {
      setOutput(input.replace(/[&<>"']/g, c => entities[c] || c));
    } else {
      setOutput(input.replace(/&amp;|&lt;|&gt;|&quot;|&#39;|&#(\d+);/g, (m, n) => revEntities[m] || (n ? String.fromCharCode(+n) : m)));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(['encode','decode'] as const).map(m => (
          <button key={m} onClick={() => {setMode(m);setOutput('');}} className={`px-4 py-2 rounded-lg text-sm font-medium ${mode===m?'bg-emerald-700 text-white':'bg-gray-100 text-gray-600'}`}>{m === 'encode' ? '→ Encode' : '← Decode'}</button>
        ))}
      </div>
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder={mode === 'encode' ? '<div class="test">' : '&lt;div class=&quot;test&quot;&gt;'} className="w-full h-36 p-4 border border-gray-200 rounded-xl font-mono text-sm outline-none" />
      <button onClick={process} className="px-6 py-2 bg-emerald-700 text-white rounded-lg font-medium hover:bg-emerald-800">{mode === 'encode' ? 'Encode' : 'Decode'}</button>
      {output && (
        <div className="relative">
          <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm font-mono whitespace-pre-wrap">{output}</pre>
          <button onClick={() => navigator.clipboard.writeText(output)} className="absolute top-3 right-3 px-3 py-1 bg-orange-500 text-white rounded text-xs">Copy</button>
        </div>
      )}
    </div>
  );
}
