import { useState } from 'react';

export default function JsonToCsv() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const convert = () => {
    try {
      const data = JSON.parse(input);
      if (!Array.isArray(data) || data.length === 0) { setOutput('Error: Input must be a non-empty JSON array'); return; }
      const headers = [...new Set(data.flatMap(obj => Object.keys(obj)))];
      const escape = (v: any) => { const s = String(v ?? ''); return s.includes(',') || s.includes('"') || s.includes('\n') ? '"' + s.replace(/"/g, '""') + '"' : s; };
      const csv = [headers.join(','), ...data.map(obj => headers.map(h => escape(obj[h])).join(','))].join('\n');
      setOutput(csv);
    } catch (e) { setOutput('Error: ' + (e as Error).message); }
  };

  const download = () => {
    const blob = new Blob([output], {type:'text/csv'});
    const a = document.createElement('a'); a.download = 'data.csv'; a.href = URL.createObjectURL(blob); a.click();
  };

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder='[{"name":"John","age":30},{"name":"Jane","age":25}]' className="w-full h-48 p-4 border border-gray-200 rounded-xl font-mono text-sm outline-none" />
      <button onClick={convert} className="px-6 py-2 bg-emerald-700 text-white rounded-lg font-medium hover:bg-emerald-800">Convert to CSV</button>
      {output && !output.startsWith('Error') && (
        <div className="relative">
          <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm font-mono">{output}</pre>
          <div className="flex gap-2 mt-2">
            <button onClick={() => navigator.clipboard.writeText(output)} className="px-4 py-2 bg-gray-700 text-white rounded-lg text-sm">Copy</button>
            <button onClick={download} className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm">Download CSV</button>
          </div>
        </div>
      )}
      {output.startsWith('Error') && <p className="text-red-500 text-sm font-mono">{output}</p>}
    </div>
  );
}
