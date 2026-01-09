import React from 'react';
import { ResponsiveContainer, LineChart, Line } from 'recharts';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const Sparkline = ({ data, color, isNegative }) => (
  <div className="h-10 w-24">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <Line 
          type="monotone" 
          dataKey="v" 
          stroke={isNegative ? '#EF4444' : color} 
          strokeWidth={2} 
          dot={false} 
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

const StatCard = ({ icon: Icon, label, value, trend, trendValue, sparkData, onClick, loading }) => {
  const isNegative = trend === 'down';
  const trendColor = isNegative ? 'text-red-400' : 'text-green-400';
  const trendBg = isNegative ? 'bg-red-500/10' : 'bg-green-500/10';
  const TrendIcon = isNegative ? ArrowDownRight : ArrowUpRight;

  if (loading) return (
     <div className="glass-card p-5 animate-pulse h-[140px]">
       <div className="flex justify-between items-start">
         <div className="space-y-3">
           <div className="h-3 w-20 bg-white/10 rounded" />
           <div className="h-8 w-24 bg-white/10 rounded" />
         </div>
         <div className="h-10 w-10 bg-white/10 rounded-xl" />
       </div>
     </div>
  );

  return (
    <div 
      onClick={onClick}
      className="glass-card p-5 relative overflow-hidden group cursor-pointer hover:-translate-y-1 transition-transform duration-300"
    >
      <div className="flex justify-between items-start mb-2">
        <div className="relative z-10">
          <p className="text-text-secondary text-xs font-semibold uppercase tracking-wider mb-1">{label}</p>
          <h3 className="text-2xl font-bold text-white mb-2">{value}</h3>
        </div>
        <div className="p-3 bg-primary rounded-xl text-black shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-300">
          <Icon size={22} />
        </div>
      </div>
      
      <div className="flex items-end justify-between">
        <div className={`flex items-center gap-1.5 px-2 py-1 rounded-lg ${trendBg} ${trendColor} text-xs font-bold`}>
           <TrendIcon size={14} />
           <span>{trendValue}</span>
        </div>
        
        {sparkData && (
          <Sparkline data={sparkData} color="#10B981" isNegative={isNegative} />
        )}
      </div>

      {/* Decorative blur */}
      <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/20 blur-2xl rounded-full opacity-50 pointer-events-none group-hover:opacity-70 transition-opacity" />
    </div>
  );
};

export default StatCard;
