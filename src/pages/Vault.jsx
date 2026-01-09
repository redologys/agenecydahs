import React, { useState } from 'react';
import { Search, Eye, EyeOff, Copy, Check, Shield, Lock, Plus } from 'lucide-react';

const credentialsData = [
  { id: 1, service: 'WordPress Admin', username: 'admin_ts', password: 'secure_password_123', url: 'techstart.com/wp-admin', category: 'CMS' },
  { id: 2, service: 'Google Analytics', username: 'analytics@agency.com', password: 'ga_pass_9988', url: 'analytics.google.com', category: 'Analytics' },
  { id: 3, service: 'Meta Business', username: 'ads@agency.com', password: 'fb_ads_secure!', url: 'business.facebook.com', category: 'Social' },
  { id: 4, service: 'Stripe Dashboard', username: 'finance@agency.com', password: 'payment_key_xvz', url: 'dashboard.stripe.com', category: 'Finance' },
  { id: 5, service: 'Mailchimp', username: 'newsletter@client.com', password: 'mc_campaign_2024', url: 'login.mailchimp.com', category: 'Marketing' },
];

const Vault = () => {
  const [showPassword, setShowPassword] = useState({});
  const [copied, setCopied] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const togglePassword = (id) => {
    setShowPassword(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const filteredData = credentialsData.filter(cred => 
    cred.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cred.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
           <div className="flex items-center gap-2 mb-1">
             <Shield className="text-primary" size={18} />
             <h6 className="text-text-secondary text-sm font-medium">Security</h6>
           </div>
          <h1 className="text-3xl font-display font-bold text-white">Password Vault</h1>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
            <input 
              type="text" 
              placeholder="Search credentials..." 
              className="input-field pl-10 w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn btn-primary">
            <Plus size={18} />
            Add New
          </button>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5 bg-white/5">
                <th className="text-left py-4 px-6 text-xs font-semibold text-text-secondary uppercase tracking-wider">Service</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-text-secondary uppercase tracking-wider">Category</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-text-secondary uppercase tracking-wider">Username</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-text-secondary uppercase tracking-wider">Password</th>
                <th className="text-center py-4 px-6 text-xs font-semibold text-text-secondary uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredData.map((cred) => (
                <tr key={cred.id} className="group hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-text-muted">
                        <Lock size={16} />
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">{cred.service}</p>
                        <a href={`https://${cred.url}`} target="_blank" rel="noreferrer" className="text-xs text-text-muted hover:text-primary transition-colors">
                          {cred.url}
                        </a>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-white/5 text-text-secondary border border-white/5">
                      {cred.category}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-text-secondary font-mono bg-black/20 px-2 py-1 rounded inline-block">
                      {cred.username}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <div className="font-mono text-sm text-white bg-black/20 px-2 py-1 rounded min-w-[140px]">
                        {showPassword[cred.id] ? cred.password : '••••••••••••••••'}
                      </div>
                      <button 
                        onClick={() => togglePassword(cred.id)}
                        className="p-1.5 text-text-muted hover:text-white transition-colors"
                      >
                        {showPassword[cred.id] ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center gap-2">
                       <button 
                        onClick={() => copyToClipboard(cred.password, cred.id)}
                        className="p-2 rounded-lg hover:bg-white/10 text-text-secondary hover:text-primary transition-colors relative"
                        title="Copy Password"
                      >
                        {copied === cred.id ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Vault;
