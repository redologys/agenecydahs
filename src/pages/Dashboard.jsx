import React from 'react';
import { Users, DollarSign, Briefcase, Activity, ArrowUpRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 },
  { name: 'May', value: 6000 },
  { name: 'Jun', value: 5500 },
  { name: 'Jul', value: 8000 },
];

const StatCard = ({ icon: Icon, label, value, trend }) => (
  <div className="glass-card p-5 relative overflow-hidden group">
    <div className="flex justify-between items-start">
      <div className="relative z-10">
        <p className="text-text-secondary text-xs font-semibold uppercase tracking-wider mb-1">{label}</p>
        <h3 className="text-2xl font-bold text-white mb-2">{value}</h3>
        <p className="text-green-400 text-xs flex items-center font-medium">
          <span className="bg-green-400/10 p-0.5 rounded mr-1">
             <ArrowUpRight size={12} />
          </span>
          {trend} <span className="text-text-secondary ml-1">since last month</span>
        </p>
      </div>
      <div className="p-3 bg-primary rounded-xl text-black shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-300">
        <Icon size={22} />
      </div>
    </div>
    {/* Decorative blur */}
    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/20 blur-2xl rounded-full opacity-50 pointer-events-none" />
  </div>
);

const Dashboard = () => {
  return (
    <div className="space-y-6 pb-6">
      <div className="flex justify-between items-end mb-2">
        <div>
          <h6 className="text-text-secondary text-sm font-medium">Dashboard</h6>
          <h1 className="text-3xl font-display font-bold text-white">Overview</h1>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={DollarSign} label="Monthly Revenue" value="$32,450" trend="+12%" />
        <StatCard icon={Users} label="Active Clients" value="48" trend="+4" />
        <StatCard icon={Briefcase} label="Projects" value="15" trend="+2%" />
        <StatCard icon={Activity} label="Task Completion" value="84%" trend="+5%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 glass-card p-6">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-white">Revenue Growth</h3>
            <p className="text-sm text-text-secondary">Yearly performance overview</p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FFD700" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#FFD700" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f1218', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ color: '#FFD700' }}
                />
                <Area type="monotone" dataKey="value" stroke="#FFD700" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Side Panel / Notifications */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold text-white mb-4">Recent Activity</h3>
          <div className="space-y-6">
             {[1, 2, 3, 4].map((i) => (
               <div key={i} className="flex gap-4">
                 <div className="flex flex-col items-center">
                   <div className="w-2 h-2 rounded-full bg-primary ring-4 ring-primary/20" />
                   {i !== 4 && <div className="w-0.5 h-full bg-white/5 my-1" />}
                 </div>
                 <div>
                   <p className="text-sm text-white font-medium">New project assigned</p>
                   <p className="text-xs text-text-secondary mt-0.5">24 March 2024, at 12:30 PM</p>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
