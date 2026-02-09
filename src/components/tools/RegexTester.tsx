import { useState } from 'react';

export default function RegexTester() {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [text, setText] = useState('');
  const [matches, setMatches] = useState<{match:string;index:number;groups:string[]}[]>([]);
  const [error, setError] = useState('');

  const test = () => {
    if (!pattern) return;
    try {
      const re = new RegExp(pattern, flags);
      const results: typeof matches = [];
      let m;
      if (flags.includes('g')) {
        while ((m = re.exec(text)) !== null) {
          results.push({match:m[0],index:m.index,groups:m.slice(1)});
          if (!m[0]) re.lastIndex++;
        }
      } else {
        m = re.exec(text);
        if (m) results.push({match:m[0],index:m.index,groups:m.slice(1)});
      }
      setMatches(results); setError('');
    } catch (e) { setError((e as Error).message); setMatches([]); }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <span className="px-3 py-2 bg-gray-900 text-orange-400 rounded-l-lg font-mono">/</span>
        <input type="text" value={pattern} onChange={e => setPattern(e.target.value)} placeholder="pattern" className="flex-1 px-3 py-2 border border-gray-200 font-mono text-sm outline-none" />
        <span className="px-3 py-2 bg-gray-900 text-orange-400 font-mono">/</span>
        <input type="text" value={flags} onChange={e => setFlags(e.target.value)} placeholder="flags" className="w-16 px-3 py-2 border border-gray-200 rounded-r-lg font-mono text-sm outline-none" />
      </div>
      <div className="flex flex-wrap gap-2">
        {['g','i','m','s'].map(f => (
          <button key={f} onClick={() => setFlags(flags.includes(f)?flags.replace(f,''):flags+f)} className={`px-3 py-1 rounded text-xs font-mono ${flags.includes(f)?'bg-orange-500 text-white':'bg-gray-100 text-gray-600'}`}>{f} - {{g:'global',i:'case-insensitive',m:'multiline',s:'dotAll'}[f]}</button>
        ))}
      </div>
      <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Enter test string..." className="w-full h-36 p-4 border border-gray-200 rounded-xl font-mono text-sm outline-none" />
      <button onClick={test} className="px-6 py-2 bg-emerald-700 text-white rounded-lg font-medium hover:bg-emerald-800">Test</button>
      {error && <p className="text-red-500 text-sm font-mono bg-red-50 p-3 rounded-lg">❌ {error}</p>}
      {matches.length > 0 && (
        <div className="bg-gray-900 rounded-xl p-4">
          <p className="text-emerald-400 text-sm mb-2">{matches.length} match{matches.length>1?'es':''}</p>
          <div className="space-y-2">
            {matches.map((m, i) => (
              <div key={i} className="text-sm font-mono">
                <span className="text-gray-400">#{i+1}</span>
                <span className="text-orange-400 ml-2">"{m.match}"</span>
                <span className="text-gray-500 ml-2">at index {m.index}</span>
                {m.groups.length > 0 && <span className="text-blue-400 ml-2">groups: [{m.groups.join(', ')}]</span>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
