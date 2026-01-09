import React from 'react';
import { AlertCircle, Clock, TrendingUp } from 'lucide-react';

const colors = ['bg-primary', 'bg-blue-500', 'bg-green-500'];

const UrgentTasks = () => (
  <div className="glass-card p-4">
    <div className="flex items-center gap-2 mb-3">
      <Clock size={16} className="text-orange-400" />
      <h4 className="text-sm font-bold text-white">Urgent Tasks</h4>
    </div>
    <div className="space-y-2">
       {['Client Meeting', 'Review Contract'].map((t, i) => (
         <div key={i} className="flex justify-between items-center text-xs p-2 rounded bg-white/5 border border-white/5 hover:border-orange-500/30 transition-colors">
            <span className="text-text-secondary">{t}</span>
            <span className="text-orange-400 font-mono">2h left</span>
         </div>
       ))}
    </div>
  </div>
);

const BudgetAlerts = () => (
  <div className="glass-card p-4">
    <div className="flex items-center gap-2 mb-3">
      <AlertCircle size={16} className="text-red-400" />
      <h4 className="text-sm font-bold text-white">Budget Alerts</h4>
    </div>
    <div className="space-y-3">
       <div>
         <div className="flex justify-between text-xs mb-1">
           <span className="text-white">TechStart</span>
           <span className="text-red-400">92%</span>
         </div>
         <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-red-500 w-[92%]" />
         </div>
       </div>
    </div>
  </div>
);

const TopClients = () => (
  <div className="glass-card p-4">
    <div className="flex items-center gap-2 mb-3">
      <TrendingUp size={16} className="text-primary" />
      <h4 className="text-sm font-bold text-white">Top Clients</h4>
    </div>
    <div className="space-y-3">
       {['TechStart', 'Green Earth', 'Fashion Fwd'].map((c, i) => (
         <div key={i} className="flex items-center gap-2 text-xs">
            <span className="font-mono text-text-muted w-4">#{i+1}</span>
            <span className="flex-1 text-white">{c}</span>
            <span className="text-primary font-bold">$12k</span>
         </div>
       ))}
    </div>
  </div>
);

export const DashboardWidgets = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
    <UrgentTasks />
    <BudgetAlerts />
    <TopClients />
  </div>
);
