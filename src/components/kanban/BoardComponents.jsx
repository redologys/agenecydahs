import React from 'react';
import { Search, Filter, Plus, PieChart } from 'lucide-react';

export const BoardControls = ({ searchQuery, setSearchQuery, filterPriority, setFilterPriority }) => (
  <div className="glass-card p-3 mb-6 flex flex-wrap items-center justify-between gap-4">
    <div className="flex items-center gap-4 flex-1">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={16} />
        <input 
          type="text" 
          placeholder="Search tasks..." 
          className="input-field pl-10 h-10 text-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="h-6 w-px bg-white/10" />
      
      <div className="flex items-center gap-2">
         {['All', 'High', 'Medium', 'Low'].map(p => (
           <button
             key={p}
             onClick={() => setFilterPriority(p)}
             className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
               filterPriority === p ? 'bg-primary text-black' : 'text-text-secondary hover:text-white hover:bg-white/5'
             }`}
           >
             {p}
           </button>
         ))}
      </div>
    </div>

    <button className="btn btn-primary">
      <Plus size={18} /> Add Task
    </button>
  </div>
);

export const BoardAnalytics = () => (
  <div className="w-80 glass-card p-6 h-full hidden xl:block">
    <div className="flex items-center gap-2 mb-6">
      <PieChart size={20} className="text-white" />
      <h3 className="text-lg font-bold text-white">Board Stats</h3>
    </div>

    <div className="space-y-6">
      <div className="p-4 rounded-xl bg-white/5 border border-white/5">
         <p className="text-xs text-text-secondary uppercase mb-1">Tasks Completed</p>
         <div className="flex items-end gap-2">
           <h4 className="text-3xl font-bold text-white">24</h4>
           <span className="text-green-400 text-xs font-bold mb-1">+12%</span>
         </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-bold text-white">Upcoming Deadlines</h4>
        {[
          { title: 'Home Page Design', date: 'Tomorrow', color: 'text-orange-400' },
          { title: 'Client Review', date: 'Oct 24', color: 'text-white' },
          { title: 'API Integration', date: 'Oct 28', color: 'text-white' }
        ].map((item, i) => (
           <div key={i} className="flex justify-between items-center text-sm p-3 rounded-lg bg-black/20 hover:bg-black/40 transition-colors">
              <span className="text-text-secondary">{item.title}</span>
              <span className={`font-mono text-xs ${item.color}`}>{item.date}</span>
           </div>
        ))}
      </div>

      <div className="pt-4 border-t border-white/5">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-text-secondary">On Track</span>
          <span className="text-xs text-white">85%</span>
        </div>
        <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
            <div className="h-full bg-green-500 w-[85%]" />
        </div>
      </div>
    </div>
  </div>
);
