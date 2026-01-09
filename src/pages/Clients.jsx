import React, { useState } from 'react';
import { MoreVertical, Mail, Phone, ExternalLink, Plus, Filter, Grid, List as ListIcon, Download, Trash2, ArrowUpDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const clientsData = [
  { id: 1, name: 'TechStart Inc', budget: '$15,000', status: 'Active', progress: 75, logo: 'TS' },
  { id: 2, name: 'Green Earth', budget: '$8,500', status: 'Review', progress: 45, logo: 'GE' },
  { id: 3, name: 'Fashion Forward', budget: '$22,000', status: 'Active', progress: 90, logo: 'FF' },
  { id: 4, name: 'Urban Eats', budget: '$5,000', status: 'Pending', progress: 15, logo: 'UE' },
  { id: 5, name: 'HealthPlus', budget: '$12,000', status: 'Active', progress: 60, logo: 'HP' },
  { id: 6, name: 'Crypto Secure', budget: '$30,000', status: 'Completed', progress: 100, logo: 'CS' },
];

const ClientCard = ({ client, onClick, viewMode }) => (
  <div 
    onClick={onClick}
    className={`glass-card p-6 relative group hover:border-primary/30 transition-all duration-300 cursor-pointer ${viewMode === 'list' ? 'flex items-center gap-6' : ''}`}
  >
    <div className={`flex justify-between items-start ${viewMode === 'list' ? 'mb-0' : 'mb-4'}`}>
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-[#E5C100] flex items-center justify-center text-black font-bold text-lg shadow-lg shadow-primary/20">
        {client.logo}
      </div>
      {viewMode === 'grid' && (
        <button className="text-text-secondary hover:text-white transition-colors" onClick={(e) => e.stopPropagation()}>
          <MoreVertical size={20} />
        </button>
      )}
    </div>

    <div className={viewMode === 'list' ? 'flex-1 grid grid-cols-4 gap-4 items-center' : ''}>
      <div>
        <h3 className="text-xl font-bold text-white mb-1">{client.name}</h3>
        <p className="text-sm text-text-secondary">Marketing Campaign</p>
      </div>

      <div className={viewMode === 'list' ? '' : 'space-y-4 my-4'}>
        <div className={`flex justify-between text-sm ${viewMode === 'list' ? 'flex-col' : ''}`}>
          <span className="text-text-muted">Budget</span>
          <span className="text-white font-medium">{client.budget}</span>
        </div>
      </div>
      
      <div className={viewMode === 'list' ? '' : 'mb-4'}>
        <div className={`flex justify-between text-sm ${viewMode === 'list' ? 'flex-col' : ''}`}>
           <span className="text-text-muted">Status</span>
           <span className={`px-2 py-0.5 rounded text-xs font-medium w-fit ${
            client.status === 'Active' ? 'bg-green-500/10 text-green-400' :
            client.status === 'Completed' ? 'bg-blue-500/10 text-blue-400' :
            'bg-orange-500/10 text-orange-400'
          }`}>
            {client.status}
          </span>
        </div>
      </div>

      <div className={viewMode === 'list' ? '' : ''}>
        <div className="flex justify-between text-xs mb-1">
          <span className="text-text-muted">Completion</span>
          <span className="text-primary">{client.progress}%</span>
        </div>
        <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
          <div 
            className="bg-primary h-full rounded-full transition-all duration-500" 
            style={{ width: `${client.progress}%` }}
          />
        </div>
      </div>
    </div>

    {viewMode === 'grid' && (
      <div className="mt-6 pt-4 border-t border-white/5 flex gap-2">
        <button className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-white transition-colors flex items-center justify-center gap-2">
          <Mail size={14} /> Contact
        </button>
        <button className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors">
          <ExternalLink size={14} />
        </button>
      </div>
    )}
  </div>
);

const Clients = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('grid');
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortBy, setSortBy] = useState('name');

  const filteredClients = clientsData
    .filter(c => filterStatus === 'All' || c.status === filterStatus)
    .sort((a, b) => {
       if (sortBy === 'name') return a.name.localeCompare(b.name);
       if (sortBy === 'budget') return parseInt(b.budget.replace(/\D/g, '')) - parseInt(a.budget.replace(/\D/g, ''));
       if (sortBy === 'progress') return b.progress - a.progress;
       return 0;
    });

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-end">
          <div>
            <h6 className="text-text-secondary text-sm font-medium">Management</h6>
            <h1 className="text-3xl font-display font-bold text-white">Clients</h1>
          </div>
          <button className="btn btn-primary">
            <Plus size={18} />
            Add New Client
          </button>
        </div>

        {/* Controls Bar */}
        <div className="glass-card p-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Filter Status */}
            <div className="flex items-center gap-2 border-r border-white/10 pr-4">
              <Filter size={16} className="text-text-secondary" />
              {['All', 'Active', 'Pending', 'Completed'].map(status => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    filterStatus === status ? 'bg-primary text-black' : 'text-text-secondary hover:text-white hover:bg-white/5'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
               <span className="text-xs text-text-secondary">Sort by:</span>
               <select 
                 className="bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 text-xs text-white outline-none focus:border-primary"
                 value={sortBy}
                 onChange={(e) => setSortBy(e.target.value)}
               >
                 <option value="name">Name</option>
                 <option value="budget">Budget (High-Low)</option>
                 <option value="progress">Progress %</option>
               </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-text-secondary hover:text-white'}`}
            >
              <Grid size={18} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-text-secondary hover:text-white'}`}
            >
              <ListIcon size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6" : "space-y-4"}>
        {filteredClients.map(client => (
          <ClientCard 
            key={client.id} 
            client={client} 
            viewMode={viewMode}
            onClick={() => navigate(`/clients/${client.id}`)}
          />
        ))}
        {/* Add New Placeholder (Grid Only) */}
        {viewMode === 'grid' && (
          <div className="border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center min-h-[300px] cursor-pointer hover:border-primary/50 hover:bg-white/5 transition-all group">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-text-muted group-hover:text-primary group-hover:bg-primary/10 transition-colors mb-4">
              <Plus size={32} />
            </div>
            <p className="text-white font-medium">Register New Client</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Clients;
