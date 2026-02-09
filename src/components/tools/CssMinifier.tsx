import { useState } from 'react';

export default function CssMinifier() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [stats, setStats] = useState<{before:number;after:number}|null>(null);

  const minify = () => {
    let css = input;
    css = css.replace(/\/\*[\s\S]*?\*\//g, '');
    css = css.replace(/\s+/g, ' ');
    css = css.replace(/\s*([{}:;,>~+])\s*/g, '$1');
    css = css.replace(/;}/g, '}');
    css = css.trim();
    setOutput(css);
    setStats({before:input.length,after:css.length});
  };

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder=".container {\n  display: flex;\n  gap: 16px;\n}" className="w-full h-48 p-4 border border-gray-200 rounded-xl font-mono text-sm outline-none" />
      <button onClick={minify} className="px-6 py-2 bg-emerald-700 text-white rounded-lg font-medium hover:bg-emerald-800">Minify CSS</button>
      {stats && (
        <div className="flex gap-4 text-sm">
          <span className="text-gray-500">Before: {stats.before} chars</span>
          <span className="text-emerald-600 font-medium">After: {stats.after} chars</span>
          <span className="text-orange-500 font-medium">Saved: {stats.before?Math.round((1-stats.after/stats.before)*100):0}%</span>
        </div>
      )}
      {output && (
        <div className="relative">
          <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm font-mono whitespace-pre-wrap break-all">{output}</pre>
          <button onClick={() => navigator.clipboard.writeText(output)} className="absolute top-3 right-3 px-3 py-1 bg-orange-500 text-white rounded text-xs">Copy</button>
        </div>
      )}
    </div>
  );
}
