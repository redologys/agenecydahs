import React, { useState } from 'react';
import { 
  Clock, CheckCircle, AlertCircle, MessageSquare, 
  Calendar, User, Filter, Search, ChevronRight,
  MoreVertical, Paperclip, Send, UserCheck, Trash2
} from 'lucide-react';

const MediaRequests = () => {
  const [filter, setFilter] = useState('all');
  
  const requests = [
    { 
      id: 1, 
      client: 'TechStart', 
      type: 'Photography Session', 
      title: 'New Product Line Shoots', 
      urgency: 'high', 
      dueDate: '2026-01-15', 
      status: 'pending',
      created: '2 days ago',
      assigned: null
    },
    { 
      id: 2, 
      client: 'Green Earth', 
      type: 'Video Production', 
      title: 'Testimonial Video Editing', 
      urgency: 'medium', 
      dueDate: '2026-01-20', 
      status: 'in_progress',
      created: '3 days ago',
      assigned: 'Sarah K.'
    },
    { 
      id: 3, 
      client: 'Fashion Fwd', 
      type: 'Graphic Design', 
      title: 'Spring Campaign Banners', 
      urgency: 'low', 
      dueDate: '2026-02-01', 
      status: 'completed',
      created: '1 week ago',
      assigned: 'Mike R.'
    }
  ];

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'low': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      default: return 'text-text-secondary bg-white/5 border-white/10';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="text-green-400" size={16} />;
      case 'in_progress': return <Clock className="text-blue-400" size={16} />;
      case 'pending': return <AlertCircle className="text-yellow-400" size={16} />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6 pt-4 animate-fade-in text-white">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold">Media Requests</h1>
          <p className="text-text-secondary text-sm">Manage client content and production requests.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="glass-card flex p-1 border-white/10">
              {['all', 'pending', 'active', 'completed'].map(f => (
                <button 
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase transition-all ${filter === f ? 'bg-primary text-black shadow-lg shadow-primary/20' : 'text-text-secondary hover:text-white'}`}
                >
                  {f}
                </button>
              ))}
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Requests', value: '42', color: 'primary' },
          { label: 'Pending', value: '12', color: 'yellow-400' },
          { label: 'In Progress', value: '18', color: 'blue-400' },
          { label: 'Completed', value: '12', color: 'green-400' }
        ].map(stat => (
          <div key={stat.label} className="glass-card p-4 border-white/5">
             <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1">{stat.label}</p>
             <p className={`text-2xl font-display font-bold text-${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Requests Table */}
      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-white/5 flex items-center gap-4 bg-white/5">
           <div className="relative flex-1">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={16} />
             <input type="text" placeholder="Filter requests..." className="input-field pl-10 h-9 w-full text-sm" />
           </div>
           <button className="p-2 hover:bg-white/10 rounded-lg text-text-secondary">
             <Filter size={18} />
           </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5 text-[10px] font-bold text-text-secondary uppercase tracking-widest">
                <th className="py-4 px-6">Client & Request</th>
                <th className="py-4 px-6">Type</th>
                <th className="py-4 px-6">Urgency</th>
                <th className="py-4 px-6">Due Date</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Assigned To</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {requests.map(request => (
                <tr key={request.id} className="group hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex flex-col">
                       <span className="text-sm font-bold text-white mb-0.5">{request.title}</span>
                       <span className="text-xs text-text-secondary">{request.client}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-xs text-text-secondary font-medium">{request.type}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${getUrgencyColor(request.urgency)}`}>
                      {request.urgency}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-xs text-text-secondary">
                      <Calendar size={14} className="text-text-muted" />
                      {request.dueDate}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-white capitalize">
                      {getStatusIcon(request.status)}
                      {request.status.replace('_', ' ')}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    {request.assigned ? (
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-[10px] font-bold text-blue-400">
                          {request.assigned.charAt(0)}
                        </div>
                        <span className="text-xs text-text-secondary">{request.assigned}</span>
                      </div>
                    ) : (
                      <button className="flex items-center gap-1.5 text-xs text-primary font-bold hover:underline">
                        <UserCheck size={14} /> Assign
                      </button>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 hover:bg-white/10 rounded-lg text-text-secondary hover:text-white transition-colors">
                        <MessageSquare size={16} />
                      </button>
                      <button className="p-1.5 hover:bg-white/10 rounded-lg text-text-secondary hover:text-white transition-colors">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Panel Placeholder */}
      <div className="glass-card p-8 border-dashed border-white/10 flex flex-col items-center justify-center text-center">
         <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
            <Paperclip size={32} className="text-text-muted" />
         </div>
         <h3 className="text-lg font-bold text-white mb-2">Select a request to view details</h3>
         <p className="text-sm text-text-secondary max-w-xs mx-auto">
           Review project briefs, attachments, and manage production workflow here.
         </p>
      </div>
    </div>
  );
};

export default MediaRequests;
