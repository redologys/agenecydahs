import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Key, Copy, Eye, EyeOff, Search, Plus, Shield } from 'lucide-react';
import { useVault } from '../../context/VaultContext';

const credentialsData = [
  { id: 1, service: 'WordPress Admin', username: 'admin_ts', password: 'secure_password_123', category: 'CMS' },
  { id: 2, service: 'Google Analytics', username: 'analytics@agency.com', password: 'ga_pass_9988', category: 'Analytics' },
  { id: 3, service: 'Meta Business', username: 'ads@agency.com', password: 'fb_ads_secure!', category: 'Social' },
];

const VaultModal = () => {
  const { isVaultOpen, closeVaultModal, isVaultUnlocked, unlockVault } = useVault();
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState(false);
  const [search, setSearch] = useState('');
  const [showPass, setShowPass] = useState({});

  const handleUnlock = (e) => {
    e.preventDefault();
    if (unlockVault(passwordInput)) {
      setError(false);
      setPasswordInput('');
    } else {
      setError(true);
    }
  };

  const togglePass = (id) => setShowPass(prev => ({ ...prev, [id]: !prev[id] }));

  if (!isVaultOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
          onClick={closeVaultModal}
        />
        
        <motion.div 
          initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
          className="relative w-full max-w-4xl bg-[#0b0f19] border border-white/10 rounded-2xl shadow-2xl overflow-hidden max-h-[80vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#1a1f2e]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                 <Shield size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Password Vault</h2>
                <p className="text-xs text-text-secondary">Secure Credential Manager</p>
              </div>
            </div>
            <button onClick={closeVaultModal} className="text-text-secondary hover:text-white p-2 rounded-lg hover:bg-white/5">
              <X size={20} />
            </button>
          </div>

          <div className="p-6 flex-1 overflow-y-auto">
            {!isVaultUnlocked ? (
              // LOCKED STATE
              <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center">
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 ring-4 ring-primary/10">
                  <Lock size={40} className="text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Vault is Locked</h3>
                <p className="text-text-secondary mb-6 max-w-xs">Enter your master password to access stored credentials.</p>
                
                <form onSubmit={handleUnlock} className="w-full max-w-sm">
                  <div className="mb-4">
                    <input 
                      type="password" 
                      placeholder="Master Password" 
                      className={`input-field text-center text-lg tracking-widest ${error ? 'border-red-500 focus:border-red-500' : ''}`}
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      autoFocus
                    />
                    {error && <p className="text-red-500 text-xs mt-2">Incorrect password. Try 'admin123'</p>}
                  </div>
                  <button type="submit" className="btn btn-primary w-full">
                    Unlock Vault
                  </button>
                </form>
              </div>
            ) : (
              // UNLOCKED STATE
              <div className="space-y-6">
                {/* Controls */}
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                    <input 
                      type="text" 
                      placeholder="Search credentials..." 
                      className="input-field pl-10"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                  <button className="btn btn-primary">
                    <Plus size={18} /> Add New
                  </button>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {credentialsData.filter(cred => cred.service.toLowerCase().includes(search.toLowerCase())).map((cred, i) => (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      key={cred.id} 
                      className="glass-card p-4 hover:border-primary/30 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white">
                             <Key size={18} />
                           </div>
                           <div>
                             <h4 className="font-bold text-white text-sm">{cred.service}</h4>
                             <span className="text-[10px] uppercase font-bold text-text-muted bg-white/5 px-1.5 py-0.5 rounded">{cred.category}</span>
                           </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="bg-black/40 rounded-lg p-2.5 flex items-center justify-between border border-white/5">
                          <div>
                            <p className="text-[10px] text-text-muted uppercase">Username</p>
                            <p className="text-xs text-white font-mono">{cred.username}</p>
                          </div>
                          <button className="text-text-secondary hover:text-white"><Copy size={14} /></button>
                        </div>
                        
                        <div className="bg-black/40 rounded-lg p-2.5 flex items-center justify-between border border-white/5">
                          <div>
                            <p className="text-[10px] text-text-muted uppercase">Password</p>
                            <p className="text-xs text-white font-mono">
                              {showPass[cred.id] ? cred.password : '••••••••••••'}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => togglePass(cred.id)} className="text-text-secondary hover:text-white">
                               {showPass[cred.id] ? <EyeOff size={14} /> : <Eye size={14} />}
                            </button>
                            <button className="text-text-secondary hover:text-white"><Copy size={14} /></button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default VaultModal;
