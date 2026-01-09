import React, { useState } from 'react';
import { Search, Shield, Lock, Plus, Filter, Download, Trash2, Key } from 'lucide-react';
import VaultTable from '../components/vault/VaultTable';
import SecurityPanel from '../components/vault/SecurityPanel';
import { useVault } from '../context/VaultContext';

const credentialsData = [
  { id: 1, service: 'WordPress Admin', username: 'admin_ts', password: 'secure_password_123', url: 'techstart.com/wp-admin', category: 'CMS', client: 'TechStart', strength: 'High' },
  { id: 2, service: 'Google Analytics', username: 'analytics@agency.com', password: 'ga_pass_9988', url: 'analytics.google.com', category: 'Analytics', client: 'Green Earth', strength: 'Medium' },
  { id: 3, service: 'Meta Business', username: 'ads@agency.com', password: 'fb_ads_secure!', url: 'business.facebook.com', category: 'Social', client: 'Fashion Fwd', strength: 'High' },
  { id: 4, service: 'Stripe Dashboard', username: 'finance@agency.com', password: 'payment_key_xvz', url: 'dashboard.stripe.com', category: 'Finance', client: 'Internal', strength: 'High' },
  { id: 5, service: 'Mailchimp', username: 'newsletter@client.com', password: 'mc_campaign_2024', url: 'login.mailchimp.com', category: 'Marketing', client: 'Urban Eats', strength: 'Medium' },
];

const Vault = () => {
  const { isVaultUnlocked, unlockVault } = useVault();
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);

  const handleUnlock = (e) => {
    e.preventDefault();
    if (unlockVault(passwordInput)) {
      setError(false);
      setPasswordInput('');
    } else {
      setError(true);
    }
  };

  const handleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(prev => prev.filter(item => item !== id));
    } else {
      setSelectedIds(prev => [...prev, id]);
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedIds(credentialsData.map(c => c.id));
    } else {
      setSelectedIds([]);
    }
  };

  const filteredData = credentialsData.filter(cred => 
    cred.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cred.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isVaultUnlocked) {
    return (
      <div className="h-[calc(100vh-140px)] flex flex-col items-center justify-center">
         <div className="w-full max-w-md glass-card p-8 text-center border-t-4 border-primary">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary ring-4 ring-primary/5">
               <Shield size={40} />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Security Check</h2>
            <p className="text-text-secondary mb-8">Enter your Master Password to access the vault.</p>
            
            <form onSubmit={handleUnlock} className="space-y-4">
               <div className="relative">
                 <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                 <input 
                   type="password" 
                   className={`input-field pl-12 h-12 text-center text-lg tracking-widest ${error ? 'border-red-500 focus:border-red-500' : ''}`}
                   placeholder="••••••••"
                   value={passwordInput}
                   onChange={(e) => setPasswordInput(e.target.value)}
                   autoFocus
                 />
               </div>
               {error && <p className="text-red-500 text-sm">Incorrect password. Hint: admin123</p>}
               <button type="submit" className="btn btn-primary w-full h-12 text-base shadow-lg shadow-primary/20">
                  Unlock Vault
               </button>
            </form>
         </div>
         <p className="mt-8 text-text-muted text-xs flex items-center gap-2">
            <Lock size={12} /> End-to-end encrypted • Zero-knowledge architecture
         </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
           <div className="flex items-center gap-2 mb-1">
             <Shield className="text-primary" size={18} />
             <h6 className="text-text-secondary text-sm font-medium">Data Protection</h6>
           </div>
          <h1 className="text-3xl font-display font-bold text-white">Password Vault</h1>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
            <input 
              type="text" 
              placeholder="Search..." 
              className="input-field pl-10 w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn btn-primary">
            <Plus size={18} />
            Add Credential
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
         {/* Main Table */}
         <div className="lg:col-span-3 space-y-4">
            {/* Filter Bar */}
            <div className="glass-card p-2 flex items-center justify-between">
               <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-white/10 rounded-lg text-text-muted hover:text-white transition-colors flex items-center gap-2 text-xs font-medium">
                     <Filter size={14} /> Filter
                  </button>
                  <div className="h-4 w-px bg-white/10" />
                  {selectedIds.length > 0 && (
                     <span className="text-xs text-primary font-bold px-2">{selectedIds.length} selected</span>
                  )}
               </div>
               <div className="flex items-center gap-2">
                  {selectedIds.length > 0 && (
                    <button className="p-2 hover:bg-red-500/10 rounded-lg text-text-muted hover:text-red-400 transition-colors flex items-center gap-2 text-xs">
                       <Trash2 size={14} /> Delete
                    </button>
                  )}
                  <button className="p-2 hover:bg-white/10 rounded-lg text-text-muted hover:text-white transition-colors flex items-center gap-2 text-xs">
                     <Download size={14} /> Export
                  </button>
               </div>
            </div>

            <VaultTable 
               credentials={filteredData} 
               searchTerm={searchTerm} 
               selectedIds={selectedIds}
               onSelect={handleSelect}
               onSelectAll={handleSelectAll}
            />
         </div>

         {/* Security Panel */}
         <div className="lg:col-span-1">
            <SecurityPanel />
         </div>
      </div>
    </div>
  );
};

export default Vault;
