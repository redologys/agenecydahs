import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { ArrowUpRight, TrendingUp, Users, Eye, MousePointer } from 'lucide-react';

const visitData = [
  { name: 'Mon', organic: 4000, paid: 2400 },
  { name: 'Tue', organic: 3000, paid: 1398 },
  { name: 'Wed', organic: 2000, paid: 9800 },
  { name: 'Thu', organic: 2780, paid: 3908 },
  { name: 'Fri', organic: 1890, paid: 4800 },
  { name: 'Sat', organic: 2390, paid: 3800 },
  { name: 'Sun', organic: 3490, paid: 4300 },
];

const sourceData = [
  { name: 'Direct', value: 400 },
  { name: 'Social', value: 300 },
  { name: 'Organic', value: 300 },
  { name: 'Referral', value: 200 },
];

const COLORS = ['#FFD700', '#E5C100', '#B29600', '#7F6B00'];

const Analytics = () => {
  return (
    <div className="space-y-6 pb-6">
       <div className="flex items-end justify-between mb-2">
        <div>
          <h6 className="text-text-secondary text-sm font-medium">Performance</h6>
          <h1 className="text-3xl font-display font-bold text-white">Analytics</h1>
        </div>
        <div className="flex bg-white/5 rounded-lg p-1 border border-white/5">
             {['7D', '30D', '90D', '1Y'].map(range => (
               <button key={range} className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${range === '30D' ? 'bg-primary text-black' : 'text-text-secondary hover:text-white'}`}>
                 {range}
               </button>
             ))}
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         {[
           { label: 'Total Visits', value: '1.2M', icon: Eye, change: '+12%' },
           { label: 'Bounce Rate', value: '42%', icon: TrendingUp, change: '-5%' },
           { label: 'Active Users', value: '34K', icon: Users, change: '+8%' },
           { label: 'Clicks', value: '890K', icon: MousePointer, change: '+22%' },
         ].map((stat, i) => (
           <div key={i} className="glass-card p-5">
              <div className="flex justify-between items-start mb-4">
                 <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                    <stat.icon size={20} />
                 </div>
                 <span className={`text-xs font-medium px-2 py-0.5 rounded ${stat.change.startsWith('+') ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                    {stat.change}
                 </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-xs text-text-secondary">{stat.label}</p>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visitors Chart */}
        <div className="lg:col-span-2 glass-card p-6">
           <h3 className="text-lg font-bold text-white mb-6">Traffic Overview</h3>
           <div className="h-[300px] w-full">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={visitData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f1218', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                />
                <Bar dataKey="organic" name="Organic" fill="#FFD700" radius={[4, 4, 0, 0]} />
                <Bar dataKey="paid" name="Paid Ads" fill="#2a2d35" radius={[4, 4, 0, 0]} />
               </BarChart>
             </ResponsiveContainer>
           </div>
        </div>

        {/* Traffic Sources */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold text-white mb-6">Traffic Sources</h3>
          <div className="h-[200px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f1218', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
               <p className="text-2xl font-bold text-white">100%</p>
               <p className="text-[10px] text-text-secondary uppercase">Distribution</p>
            </div>
          </div>
          <div className="mt-6 space-y-3">
             {sourceData.map((entry, index) => (
               <div key={entry.name} className="flex justify-between items-center text-sm">
                 <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                    <span className="text-text-secondary">{entry.name}</span>
                 </div>
                 <span className="text-white font-medium">{entry.value}</span>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
