import React from 'react';
import { ShieldAlert, RefreshCw, Database, Lock } from 'lucide-react';

const SecurityPanel = () => {
  return (
    <div className="glass-card p-6 h-fit bg-gradient-to-b from-[#1a1f2e] to-[#0b0f19]">
      <div className="flex items-center gap-2 mb-6">
        <ShieldAlert className="text-primary" size={20} />
        <h3 className="text-lg font-bold text-white">Security Audit</h3>
      </div>

      <div className="flex items-center justify-between mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20">
        <div>
           <p className="text-xs text-green-400 font-bold uppercase tracking-wider mb-1">Health Score</p>
           <h2 className="text-3xl font-display font-bold text-white">92<span className="text-sm text-text-secondary font-sans font-normal">/100</span></h2>
        </div>
        <div className="h-12 w-12 rounded-full border-4 border-green-500/30 border-t-green-500 flex items-center justify-center">
           <span className="text-green-400 font-bold text-xs">Good</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center text-sm py-2 border-b border-white/5">
           <div className="flex items-center gap-3">
              <Lock size={16} className="text-orange-400" />
              <span className="text-text-secondary">Weak Passwords</span>
           </div>
           <span className="font-mono text-white bg-white/5 px-2 py-0.5 rounded">3</span>
        </div>
        <div className="flex justify-between items-center text-sm py-2 border-b border-white/5">
           <div className="flex items-center gap-3">
              <RefreshCw size={16} className="text-yellow-400" />
              <span className="text-text-secondary">Old Passwords (&gt;90d)</span>
           </div>
           <span className="font-mono text-white bg-white/5 px-2 py-0.5 rounded">12</span>
        </div>
        <div className="flex justify-between items-center text-sm py-2 border-b border-white/5">
           <div className="flex items-center gap-3">
              <Database size={16} className="text-blue-400" />
              <span className="text-text-secondary">Duplicate Used</span>
           </div>
           <span className="font-mono text-white bg-white/5 px-2 py-0.5 rounded">0</span>
        </div>
      </div>

      <button className="mt-6 w-full btn bg-white/5 hover:bg-white/10 text-white border border-white/10">
         Generate Security Report
      </button>
    </div>
  );
};

export default SecurityPanel;
