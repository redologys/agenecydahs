import React from 'react';
import { Clock, CheckCircle, FileText, TrendingUp, ArrowUpRight } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';

const mockData = [
  { name: 'Mon', value: 400 },
  { name: 'Tue', value: 300 },
  { name: 'Wed', value: 500 },
  { name: 'Thu', value: 280 },
  { name: 'Fri', value: 590 },
  { name: 'Sat', value: 320 },
  { name: 'Sun', value: 450 },
];

const ClientDashboard = () => {
  return (
    <div className="space-y-8 animate-fade-in">
       {/* Welcome Header */}
       <div className="flex justify-between items-end">
          <div>
             <h1 className="text-3xl font-display font-bold text-white mb-2">My Projects</h1>
             <p className="text-text-secondary">Welcome back! Here's what's happening with your account.</p>
          </div>
          <span className="text-sm text-primary font-medium bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
             Status: Active
          </span>
       </div>

       {/* Overview Stats */}
       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
             { label: 'Active Projects', value: '2', icon: FileText, color: 'text-primary' },
             { label: 'Pending Approvals', value: '1', icon: Clock, color: 'text-orange-400' },
             { label: 'Completed Tasks', value: '12', icon: CheckCircle, color: 'text-green-400' },
             { label: 'Monthly Traffic', value: '24.5k', icon: TrendingUp, color: 'text-blue-400' },
          ].map((stat, i) => (
             <div key={i} className="glass-card p-5 hover:border-primary/30 transition-colors">
                <div className="flex justify-between items-start mb-4">
                   <div className={`p-2 rounded-lg bg-white/5 ${stat.color}`}>
                      <stat.icon size={20} />
                   </div>
                </div>
                <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
                <p className="text-xs text-text-secondary uppercase tracking-wider">{stat.label}</p>
             </div>
          ))}
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Projects List */}
          <div className="lg:col-span-2 glass-card p-6">
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-white">Current Projects</h3>
                <button className="text-sm text-primary hover:underline">View All</button>
             </div>
             
             <div className="space-y-4">
                {[
                   { name: 'Website Redesign', progress: 75, date: 'Nov 15, 2025', status: 'In Progress' },
                   { name: 'SEO Campaign Q4', progress: 30, date: 'Dec 01, 2025', status: 'Active' },
                ].map((project, i) => (
                   <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-primary/30 transition-all cursor-pointer group">
                      <div className="flex justify-between items-start mb-4">
                         <div>
                            <h4 className="font-bold text-white text-lg group-hover:text-primary transition-colors">{project.name}</h4>
                            <p className="text-xs text-text-secondary mt-1">Due: {project.date}</p>
                         </div>
                         <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20">
                            {project.status}
                         </span>
                      </div>
                      <div className="relative pt-2">
                         <div className="flex justify-between text-xs mb-1">
                            <span className="text-text-secondary">Completion</span>
                            <span className="text-white font-bold">{project.progress}%</span>
                         </div>
                         <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden">
                            <div 
                               className="h-full bg-primary transition-all duration-1000" 
                               style={{ width: `${project.progress}%` }}
                            />
                         </div>
                      </div>
                   </div>
                ))}
             </div>
          </div>

          {/* Activity / Performance */}
          <div className="glass-card p-6 flex flex-col">
             <h3 className="text-lg font-bold text-white mb-6">Traffic Overview</h3>
             <div className="flex-1 w-full min-h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                   <AreaChart data={mockData}>
                      <defs>
                         <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                         </linearGradient>
                      </defs>
                      <Tooltip contentStyle={{ backgroundColor: '#1a1f2e', borderColor: 'rgba(255,255,255,0.1)' }} />
                      <Area type="monotone" dataKey="value" stroke="#D4AF37" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                   </AreaChart>
                </ResponsiveContainer>
             </div>
             <div className="mt-4 pt-4 border-t border-white/5">
                <div className="flex items-center justify-between">
                   <span className="text-text-secondary text-sm">Total Visits</span>
                   <span className="text-white font-bold flex items-center gap-1">
                      2,450 <ArrowUpRight size={14} className="text-green-400" />
                   </span>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

export default ClientDashboard;
