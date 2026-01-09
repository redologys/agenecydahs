import React from 'react';
import { CheckSquare, Briefcase, Users, Shield, Clock, ArrowRight } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

// Mock Data
const activities = [
  { id: 1, type: 'project', title: 'New Project Assigned', desc: 'TechStart Rebranding initiated', time: new Date(Date.now() - 1000 * 60 * 30), user: 'Sarah' },
  { id: 2, type: 'task', title: 'Task Completed', desc: 'Competitor Analysis finalized', time: new Date(Date.now() - 1000 * 60 * 60 * 2), user: 'Mike' },
  { id: 3, type: 'client', title: 'Client Updated', desc: 'Green Earth budget increased', time: new Date(Date.now() - 1000 * 60 * 60 * 5), user: 'Admin' },
  { id: 4, type: 'vault', title: 'Credential Added', desc: 'Stripe API keys for Fashion Fwd', time: new Date(Date.now() - 1000 * 60 * 60 * 24), user: 'Sarah' },
];

const ActivityFeed = () => {
  const getIcon = (type) => {
    switch(type) {
      case 'project': return { icon: Briefcase, color: 'text-blue-400', bg: 'bg-blue-500/10' };
      case 'task': return { icon: CheckSquare, color: 'text-green-400', bg: 'bg-green-500/10' };
      case 'client': return { icon: Users, color: 'text-yellow-400', bg: 'bg-yellow-500/10' };
      case 'vault': return { icon: Shield, color: 'text-purple-400', bg: 'bg-purple-500/10' };
      default: return { icon: Clock, color: 'text-gray-400', bg: 'bg-gray-500/10' };
    }
  };

  return (
    <div className="glass-card p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-white">Recent Activity</h3>
        <button className="text-xs text-primary hover:underline">View All</button>
      </div>

      <div className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {activities.map((item, index) => {
          const { icon: Icon, color, bg } = getIcon(item.type);
          return (
            <div key={item.id} className="flex gap-4 group cursor-pointer">
               <div className="flex flex-col items-center">
                 <div className={`w-8 h-8 rounded-full flex items-center justify-center ${bg} ${color} ring-4 ring-[#0b0f19] z-10`}>
                   <Icon size={14} />
                 </div>
                 {index !== activities.length - 1 && (
                   <div className="w-0.5 h-full bg-white/5 my-1 group-hover:bg-primary/20 transition-colors" />
                 )}
               </div>
               
               <div className="flex-1 pb-4 border-b border-white/5 group-last:border-0 group-hover:pl-2 transition-all">
                 <div className="flex justify-between items-start">
                   <h4 className="text-sm font-medium text-white group-hover:text-primary transition-colors">{item.title}</h4>
                   <span className="text-[10px] text-text-secondary whitespace-nowrap">
                     {formatDistanceToNow(item.time, { addSuffix: true })}
                   </span>
                 </div>
                 <p className="text-xs text-text-secondary mt-1 line-clamp-1">{item.desc}</p>
                 <div className="flex items-center gap-2 mt-2">
                   <div className="w-4 h-4 rounded-full bg-gray-600 text-[8px] flex items-center justify-center text-white border border-black">
                     {item.user[0]}
                   </div>
                   <span className="text-[10px] text-text-muted">by {item.user}</span>
                 </div>
               </div>
            </div>
          );
        })}
      </div>
      
      <button className="mt-4 w-full py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs text-text-secondary hover:text-white transition-colors flex items-center justify-center gap-2">
        Load More <ArrowRight size={12} />
      </button>
    </div>
  );
};

export default ActivityFeed;
