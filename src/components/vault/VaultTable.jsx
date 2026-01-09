import React, { useState } from 'react';
import { Eye, EyeOff, Copy, Check, Lock, ExternalLink, RefreshCw, MoreVertical, ArrowUpDown } from 'lucide-react';

const VaultTable = ({ credentials, searchTerm, filterCategory, selectedIds, onSelect, onSelectAll }) => {
  const [showPass, setShowPass] = useState({});
  const [copied, setCopied] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'service', direction: 'asc' });

  const togglePass = (id) => setShowPass(prev => ({ ...prev, [id]: !prev[id] }));

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const sortedData = [...credentials].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="glass-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5 bg-white/5">
              <th className="py-4 px-4 w-10">
                <input 
                   type="checkbox" 
                   className="rounded border-white/20 bg-white/5 checked:bg-primary"
                   onChange={(e) => onSelectAll(e.target.checked)}
                   checked={selectedIds.length === credentials.length && credentials.length > 0}
                />
              </th>
              {['Service', 'Category', 'Client', 'Security', 'Last Modified', 'Actions'].map((header) => (
                <th 
                  key={header}
                  className="text-left py-4 px-4 text-xs font-semibold text-text-secondary uppercase tracking-wider cursor-pointer hover:text-white transition-colors"
                  onClick={() => header !== 'Actions' && header !== 'Security' && requestSort(header.toLowerCase().replace(' ', ''))}
                >
                  <div className="flex items-center gap-1">
                    {header}
                    {header !== 'Actions' && header !== 'Security' && <ArrowUpDown size={12} />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {sortedData.map((cred) => (
              <tr key={cred.id} className={`group hover:bg-white/[0.02] transition-colors ${selectedIds.includes(cred.id) ? 'bg-primary/5' : ''}`}>
                <td className="py-4 px-4">
                  <input 
                    type="checkbox" 
                    className="rounded border-white/20 bg-white/5 checked:bg-primary"
                    checked={selectedIds.includes(cred.id)}
                    onChange={() => onSelect(cred.id)}
                  />
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-text-muted">
                      <Lock size={16} />
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">{cred.service}</p>
                      <a href={`https://${cred.url}`} target="_blank" rel="noreferrer" className="text-xs text-text-muted hover:text-primary transition-colors flex items-center gap-1">
                        {cred.url} <ExternalLink size={10} />
                      </a>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className={`px-2.5 py-1 rounded-md text-xs font-medium border border-white/5 ${
                     cred.category === 'Finance' ? 'bg-orange-500/10 text-orange-400' :
                     cred.category === 'CMS' ? 'bg-purple-500/10 text-purple-400' :
                     'bg-blue-500/10 text-blue-400'
                  }`}>
                    {cred.category}
                  </span>
                </td>
                <td className="py-4 px-4">
                   <div className="flex items-center gap-2">
                     <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] text-white">
                        {cred.client ? cred.client.substring(0,2) : '--'}
                     </div>
                     <span className="text-sm text-text-secondary">{cred.client || 'Internal'}</span>
                   </div>
                </td>
                <td className="py-4 px-4">
                   <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${cred.strength === 'High' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                      <span className="text-xs text-text-secondary">{cred.strength}</span>
                   </div>
                </td>
                <td className="py-4 px-4">
                   <span className="text-xs text-text-muted font-mono">2 days ago</span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-1">
                    <button 
                       onClick={() => copyToClipboard(cred.password, cred.id)} 
                       className="p-2 hover:bg-white/10 rounded-lg text-text-secondary hover:text-white transition-colors"
                       title="Copy Password"
                    >
                       {copied === cred.id ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                    </button>
                    <button 
                       onClick={() => togglePass(cred.id)}
                       className="p-2 hover:bg-white/10 rounded-lg text-text-secondary hover:text-white transition-colors"
                    >
                       {showPass[cred.id] ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                    <button className="p-2 hover:bg-white/10 rounded-lg text-text-secondary hover:text-white transition-colors">
                       <RefreshCw size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {credentials.length === 0 && (
        <div className="p-8 text-center text-text-muted text-sm">
          No credentials found matching your filters.
        </div>
      )}
    </div>
  );
};

export default VaultTable;
