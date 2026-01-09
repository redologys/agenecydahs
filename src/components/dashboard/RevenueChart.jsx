import React, { useState } from 'react';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Download, ZoomIn, Calendar } from 'lucide-react';

const data = [
  { name: 'Jan', value: 4000, start: 3000 },
  { name: 'Feb', value: 3000, start: 3500 },
  { name: 'Mar', value: 5000, start: 4000 },
  { name: 'Apr', value: 4500, start: 3800 },
  { name: 'May', value: 6000, start: 5000 },
  { name: 'Jun', value: 5500, start: 5200 },
  { name: 'Jul', value: 8000, start: 6000 },
];

const RevenueChart = () => {
  const [chartType, setChartType] = useState('area'); // area, bar, line
  const [timeRange, setTimeRange] = useState('1Y'); // 6M, 1Y, ALL

  const renderChart = () => {
    const commonProps = {
      data: data,
      margin: { top: 10, right: 10, left: 0, bottom: 0 }
    };

    switch(chartType) {
      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
            <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(255,255,255,0.05)'}} />
            <Bar dataKey="value" fill="#FFD700" radius={[4, 4, 0, 0]} />
          </BarChart>
        );
      case 'line':
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="value" stroke="#FFD700" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
          </LineChart>
        );
      default:
        return (
          <AreaChart {...commonProps}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FFD700" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#FFD700" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="value" stroke="#FFD700" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
          </AreaChart>
        );
    }
  };

  return (
    <div className="glass-card p-6 h-full flex flex-col">
      <div className="flex flex-wrap justify-between items-start mb-6 gap-4">
        <div>
          <h3 className="text-lg font-bold text-white">Revenue Growth</h3>
          <p className="text-sm text-text-secondary flex items-center gap-2">
            <span className="text-green-400 font-bold">+23%</span> vs last year
          </p>
        </div>
        
        <div className="flex gap-2">
          {/* Chart Type Toggle */}
          <div className="bg-white/5 p-1 rounded-lg border border-white/5 flex">
            {['area', 'bar', 'line'].map(type => (
               <button 
                 key={type}
                 onClick={() => setChartType(type)}
                 className={`px-3 py-1 text-xs font-medium rounded-md transition-colors capitalize ${chartType === type ? 'bg-primary text-black' : 'text-text-secondary hover:text-white'}`}
               >
                 {type}
               </button>
            ))}
          </div>

          {/* Time Range */}
          <div className="bg-white/5 p-1 rounded-lg border border-white/5 flex">
            {['6M', '1Y', 'ALL'].map(range => (
               <button 
                 key={range}
                 onClick={() => setTimeRange(range)}
                 className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${timeRange === range ? 'bg-primary text-black' : 'text-text-secondary hover:text-white'}`}
               >
                 {range}
               </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>

      <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/5">
         <button className="text-xs text-text-muted hover:text-white flex items-center gap-1">
           <Calendar size={12} /> Custom Range
         </button>
         <button className="text-xs text-text-muted hover:text-white flex items-center gap-1">
           <Download size={12} /> Export CSV
         </button>
      </div>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0f1218] border border-white/10 p-4 rounded-xl shadow-2xl">
        <p className="text-text-secondary text-xs mb-1">{label}</p>
        <p className="text-lg font-bold text-white mb-2">
          ${payload[0].value.toLocaleString()}
        </p>
        {/* Comparison Logic Mock */}
        <p className="text-xs text-green-400 flex items-center gap-1">
           <ArrowUpRight size={12} /> +15% vs prev month
        </p>
      </div>
    );
  }
  return null;
};

export default RevenueChart;
