import { useState } from 'react';

export default function JsonMinifier() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [stats, setStats] = useState<{before:number;after:number}|null>(null);

  const minify = () => {
    try {
      const min = JSON.stringify(JSON.parse(input));
      setOutput(min);
      setStats({before:input.length,after:min.length});
    } catch (e) { setOutput('Error: ' + (e as Error).message); setStats(null); }
  };

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste formatted JSON..." className="w-full h-48 p-4 border border-gray-200 rounded-xl font-mono text-sm outline-none" />
      <button onClick={minify} className="px-6 py-2 bg-emerald-700 text-white rounded-lg font-medium hover:bg-emerald-800">Minify</button>
      {stats && (
        <div className="flex gap-4 text-sm">
          <span className="text-gray-500">Before: {stats.before} chars</span>
          <span className="text-emerald-600 font-medium">After: {stats.after} chars</span>
          <span className="text-orange-500 font-medium">Saved: {Math.round((1-stats.after/stats.before)*100)}%</span>
        </div>
      )}
      {output && (
        <div className="relative">
          <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm font-mono">{output}</pre>
          <button onClick={() => navigator.clipboard.writeText(output)} className="absolute top-3 right-3 px-3 py-1 bg-orange-500 text-white rounded text-xs">Copy</button>
        </div>
      )}
    </div>
  );
}
