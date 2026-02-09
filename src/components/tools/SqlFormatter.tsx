import { useState } from 'react';

const keywords = ['SELECT','FROM','WHERE','AND','OR','ORDER BY','GROUP BY','HAVING','JOIN','LEFT JOIN','RIGHT JOIN','INNER JOIN','OUTER JOIN','ON','INSERT INTO','VALUES','UPDATE','SET','DELETE','CREATE TABLE','ALTER TABLE','DROP TABLE','LIMIT','OFFSET','DISTINCT','AS','IN','NOT','NULL','IS','LIKE','BETWEEN','EXISTS','UNION','CASE','WHEN','THEN','ELSE','END'];

export default function SqlFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const format = () => {
    let sql = input.trim();
    // Normalize spaces
    sql = sql.replace(/\s+/g, ' ');
    // Add newlines before major keywords
    const majors = ['SELECT','FROM','WHERE','ORDER BY','GROUP BY','HAVING','LIMIT','OFFSET','INSERT INTO','VALUES','UPDATE','SET','DELETE','CREATE TABLE','ALTER TABLE','DROP TABLE','UNION'];
    for (const kw of majors) {
      const re = new RegExp('\\b(' + kw + ')\\b', 'gi');
      sql = sql.replace(re, '\n$1');
    }
    // Indent JOIN, AND, OR
    sql = sql.replace(/\b((?:LEFT|RIGHT|INNER|OUTER|CROSS)?\s*JOIN)\b/gi, '\n  $1');
    sql = sql.replace(/\b(AND|OR)\b/gi, '\n  $1');
    // Uppercase keywords
    for (const kw of keywords) {
      const re = new RegExp('\\b' + kw.replace(/ /g, '\\s+') + '\\b', 'gi');
      sql = sql.replace(re, kw);
    }
    setOutput(sql.trim());
  };

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="select id, name from users where active = 1 order by name" className="w-full h-48 p-4 border border-gray-200 rounded-xl font-mono text-sm outline-none" />
      <button onClick={format} className="px-6 py-2 bg-emerald-700 text-white rounded-lg font-medium hover:bg-emerald-800">Format SQL</button>
      {output && (
        <div className="relative">
          <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm font-mono">{output}</pre>
          <button onClick={() => navigator.clipboard.writeText(output)} className="absolute top-3 right-3 px-3 py-1 bg-orange-500 text-white rounded text-xs">Copy</button>
        </div>
      )}
    </div>
  );
}
