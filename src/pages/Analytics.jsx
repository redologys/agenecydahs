import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, PieChart, Pie, Cell } from 'recharts';
import { Calendar, ArrowUpRight, ArrowDownRight, Download, SlidersHorizontal, Users, MousePointer, Clock, Loader2 } from 'lucide-react';
import { useAnalytics } from '../context/AnalyticsContext';
import { format, subDays, startOfDay } from 'date-fns';

const COLORS = ['#D4AF37', '#1a1f2e', '#4B5563', '#9CA3AF'];

const StatBox = ({ label, value, change, icon: Icon, isNegative }) => (
  <div className="glass-card p-4 flex flex-col justify-between h-32">
    <div className="flex justify-between items-start">
      <div className="p-2 rounded-lg bg-white/5 text-text-secondary">
        <Icon size={20} />
      </div>
      {change && (
        <span className={`flex items-center text-xs font-bold ${isNegative ? 'text-red-400' : 'text-green-400'} bg-black/20 px-2 py-1 rounded-full`}>
          {change} {isNegative ? <ArrowDownRight size={12} /> : <ArrowUpRight size={12} />}
        </span>
      )}
    </div>
    <div>
      <h3 className="text-2xl font-bold text-white mb-1">{value}</h3>
      <p className="text-xs text-text-secondary uppercase tracking-wider">{label}</p>
    </div>
  </div>
);

const Analytics = () => {
  const [dateRange, setDateRange] = useState('7d');
  const { analyticsData, loading, fetchAnalytics } = useAnalytics();

  useEffect(() => {
    const days = parseInt(dateRange);
    const end = new Date();
    const start = subDays(end, days);
    
    fetchAnalytics(null, format(start, 'yyyy-MM-dd'), format(end, 'yyyy-MM-dd'));
  }, [dateRange]);

  // Aggregate stats from data
  const totalVisitors = analyticsData.reduce((sum, day) => sum + (day.visitors || 0), 0);
  const totalPageViews = analyticsData.reduce((sum, day) => sum + (day.page_views || 0), 0);
  
  // Transform data for charts
  const chartData = analyticsData.map(day => ({
    name: format(new Date(day.date), 'MMM dd'),
    visitors: day.visitors,
    page_views: day.page_views
  }));

  if (loading && analyticsData.length === 0) {
    return (
      <div className="h-[600px] w-full flex items-center justify-center text-primary">
        <Loader2 size={48} className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h6 className="text-text-secondary text-sm font-medium">Performance</h6>
          <h1 className="text-3xl font-display font-bold text-white">Analytics</h1>
        </div>
        <div className="flex gap-3">
          <div className="glass-card p-1 flex items-center rounded-lg">
             {['24h', '7d', '30d', '90d'].map(r => (
               <button 
                 key={r}
                 onClick={() => setDateRange(r)}
                 className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${dateRange === r ? 'bg-primary text-black' : 'text-text-secondary hover:text-white'}`}
               >
                 {r}
               </button>
             ))}
          </div>
          <button className="btn btn-outline">
            <Calendar size={18} />
             Custom
          </button>
          <button className="btn btn-primary">
            <Download size={18} />
             Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatBox label="Total Visitors" value={totalVisitors.toLocaleString()} change="+12%" icon={Users} />
        <StatBox label="Total Page Views" value={totalPageViews.toLocaleString()} change="+5%" icon={Clock} />
        <StatBox label="Avg. Daily Visitors" value={Math.round(totalVisitors / (chartData.length || 1)).toLocaleString()} change="-2%" icon={MousePointer} isNegative /> 
        <StatBox label="Active Clients" value="12" change="+1.2%" icon={SlidersHorizontal} />
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card p-6 min-h-[400px]">
           <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white">Traffic Overview</h3>
              <div className="flex items-center gap-2">
                 <span className="flex items-center gap-1 text-xs text-text-secondary"><div className="w-2 h-2 rounded-full bg-[#D4AF37]" /> Visitors</span>
                 <span className="flex items-center gap-1 text-xs text-text-secondary"><div className="w-2 h-2 rounded-full bg-[#8884d8]" /> Page Views</span>
              </div>
           </div>
           <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                 {chartData.length > 0 ? (
                   <AreaChart data={chartData}>
                      <defs>
                         <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                         </linearGradient>
                         <linearGradient id="colorPageViews" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                         </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                      <XAxis dataKey="name" stroke="#6B7280" tick={{fill: '#6B7280', fontSize: 12}} tickLine={false} axisLine={false} />
                      <YAxis stroke="#6B7280" tick={{fill: '#6B7280', fontSize: 12}} tickLine={false} axisLine={false} />
                      <Tooltip 
                         contentStyle={{ backgroundColor: '#1a1f2e', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                         itemStyle={{ color: '#fff' }}
                      />
                      <Area type="monotone" dataKey="visitors" stroke="#D4AF37" strokeWidth={3} fillOpacity={1} fill="url(#colorVisitors)" />
                      <Area type="monotone" dataKey="page_views" stroke="#8884d8" strokeWidth={3} fillOpacity={1} fill="url(#colorPageViews)" />
                   </AreaChart>
                 ) : (
                   <div className="h-full w-full flex items-center justify-center text-text-muted">No data for selected range</div>
                 )}
              </ResponsiveContainer>
           </div>
        </div>

        {/* Traffic Sources */}
        <div className="glass-card p-6 flex flex-col min-h-[400px]">
           <h3 className="text-lg font-bold text-white mb-6">Traffic Sources</h3>
           <div className="flex-1 w-full relative min-h-[200px]">
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
                    <Tooltip contentStyle={{ backgroundColor: '#1a1f2e', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                 </PieChart>
              </ResponsiveContainer>
              {/* Centered Text Mock */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                 <p className="text-2xl font-bold text-white">42k</p>
                 <p className="text-xs text-text-secondary">Total</p>
              </div>
           </div>
           <div className="mt-6 space-y-3">
              {sourceData.map((item, index) => (
                 <div key={item.name} className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2">
                       <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                       <span className="text-text-secondary">{item.name}</span>
                    </div>
                    <span className="text-white font-bold">{Math.round((item.value / 1200) * 100)}%</span>
                 </div>
              ))}
           </div>
        </div>
      </div>

      {/* Client Performance Table */}
      <div className="glass-card overflow-hidden">
         <div className="p-6 border-b border-white/5 flex justify-between items-center">
            <h3 className="text-lg font-bold text-white">Client Performance</h3>
            <button className="text-xs text-primary hover:underline">View All</button>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full">
               <thead className="bg-white/5">
                  <tr>
                     <th className="text-left py-4 px-6 text-xs font-semibold text-text-secondary uppercase">Client</th>
                     <th className="text-left py-4 px-6 text-xs font-semibold text-text-secondary uppercase">Clicks</th>
                     <th className="text-left py-4 px-6 text-xs font-semibold text-text-secondary uppercase">CTR</th>
                     <th className="text-left py-4 px-6 text-xs font-semibold text-text-secondary uppercase">Conv. Rate</th>
                     <th className="text-left py-4 px-6 text-xs font-semibold text-text-secondary uppercase">Cost</th>
                     <th className="text-left py-4 px-6 text-xs font-semibold text-text-secondary uppercase">Trend</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                  {clientPerformance.map((client) => (
                     <tr key={client.id} className="hover:bg-white/[0.02]">
                        <td className="py-4 px-6 font-bold text-white">{client.name}</td>
                        <td className="py-4 px-6 text-text-secondary">{client.clicks}</td>
                        <td className="py-4 px-6 text-text-secondary">{client.ctr}</td>
                        <td className="py-4 px-6 text-text-secondary">{client.conv}</td>
                        <td className="py-4 px-6 text-white">{client.cost}</td>
                        <td className="py-4 px-6">
                           <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold ${client.trend === 'up' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                              {client.trend === 'up' ? '↑' : '↓'}
                           </span>
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

export default Analytics;
