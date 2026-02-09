import { useState } from 'react';

const codes: [number,string,string][] = [
  [100,'Continue','Server received request headers, client should send body'],
  [101,'Switching Protocols','Server is switching protocols per client request'],
  [200,'OK','Request succeeded'],
  [201,'Created','Resource successfully created'],
  [204,'No Content','Success, but no content to return'],
  [301,'Moved Permanently','Resource permanently moved to new URL'],
  [302,'Found','Resource temporarily at different URL'],
  [304,'Not Modified','Resource not modified since last request'],
  [400,'Bad Request','Server cannot process request due to client error'],
  [401,'Unauthorized','Authentication required'],
  [403,'Forbidden','Server refuses to authorize the request'],
  [404,'Not Found','Requested resource does not exist'],
  [405,'Method Not Allowed','HTTP method not supported for this resource'],
  [408,'Request Timeout','Server timed out waiting for the request'],
  [409,'Conflict','Request conflicts with current server state'],
  [429,'Too Many Requests','Rate limit exceeded'],
  [500,'Internal Server Error','Unexpected server error'],
  [502,'Bad Gateway','Invalid response from upstream server'],
  [503,'Service Unavailable','Server temporarily unable to handle requests'],
  [504,'Gateway Timeout','Upstream server timed out'],
];

const catColor = (c: number) => c < 200 ? 'bg-blue-100 text-blue-700' : c < 300 ? 'bg-green-100 text-green-700' : c < 400 ? 'bg-yellow-100 text-yellow-700' : c < 500 ? 'bg-red-100 text-red-700' : 'bg-purple-100 text-purple-700';
const catLabel = (c: number) => c < 200 ? 'Info' : c < 300 ? 'Success' : c < 400 ? 'Redirect' : c < 500 ? 'Client Error' : 'Server Error';

export default function HttpStatus() {
  const [filter, setFilter] = useState('');
  const filtered = codes.filter(([c,t,d]) => !filter || String(c).includes(filter) || t.toLowerCase().includes(filter.toLowerCase()) || d.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="space-y-4">
      <input type="text" value={filter} onChange={e => setFilter(e.target.value)} placeholder="Search by code or description..." className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500" />
      <div className="space-y-2">
        {filtered.map(([code,title,desc]) => (
          <div key={code} className="bg-white border border-gray-100 rounded-xl p-4 flex items-start gap-4">
            <span className={`px-3 py-1 rounded-lg font-mono font-bold text-sm flex-shrink-0 ${catColor(code)}`}>{code}</span>
            <div><p className="font-medium text-gray-900">{title}</p><p className="text-sm text-gray-500 mt-0.5">{desc}</p><span className="text-xs text-gray-400">{catLabel(code)}</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}
