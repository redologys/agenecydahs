import React from 'react';
import { MoreVertical, Mail, Phone, ExternalLink, Plus } from 'lucide-react';

const clientsData = [
  { id: 1, name: 'TechStart Inc', budget: '$15,000', status: 'Active', progress: 75, logo: 'TS' },
  { id: 2, name: 'Green Earth', budget: '$8,500', status: 'Review', progress: 45, logo: 'GE' },
  { id: 3, name: 'Fashion Forward', budget: '$22,000', status: 'Active', progress: 90, logo: 'FF' },
  { id: 4, name: 'Urban Eats', budget: '$5,000', status: 'Pending', progress: 15, logo: 'UE' },
  { id: 5, name: 'HealthPlus', budget: '$12,000', status: 'Active', progress: 60, logo: 'HP' },
  { id: 6, name: 'Crypto Secure', budget: '$30,000', status: 'Completed', progress: 100, logo: 'CS' },
];

const ClientCard = ({ client }) => (
  <div className="glass-card p-6 relative group hover:border-primary/30 transition-all duration-300">
    <div className="flex justify-between items-start mb-4">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-[#E5C100] flex items-center justify-center text-black font-bold text-lg shadow-lg shadow-primary/20">
        {client.logo}
      </div>
      <button className="text-text-secondary hover:text-white transition-colors">
        <MoreVertical size={20} />
      </button>
    </div>

    <h3 className="text-xl font-bold text-white mb-1">{client.name}</h3>
    <p className="text-sm text-text-secondary mb-4">Marketing Campaign</p>

    <div className="space-y-4">
      <div className="flex justify-between text-sm">
        <span className="text-text-muted">Budget</span>
        <span className="text-white font-medium">{client.budget}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-text-muted">Status</span>
        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
          client.status === 'Active' ? 'bg-green-500/10 text-green-400' :
          client.status === 'Completed' ? 'bg-blue-500/10 text-blue-400' :
          'bg-orange-500/10 text-orange-400'
        }`}>
          {client.status}
        </span>
      </div>
      
      <div>
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

    <div className="mt-6 pt-4 border-t border-white/5 flex gap-2">
      <button className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-white transition-colors flex items-center justify-center gap-2">
        <Mail size={14} /> Contact
      </button>
      <button className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors">
        <ExternalLink size={14} />
      </button>
    </div>
  </div>
);

const Clients = () => {
  return (
    <div className="space-y-6 pb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h6 className="text-text-secondary text-sm font-medium">Management</h6>
          <h1 className="text-3xl font-display font-bold text-white">Clients</h1>
        </div>
        <button className="btn btn-primary">
          <Plus size={18} />
          Add New Client
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {clientsData.map(client => (
          <ClientCard key={client.id} client={client} />
        ))}
        {/* Add New Placeholder */}
        <div className="border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center min-h-[300px] cursor-pointer hover:border-primary/50 hover:bg-white/5 transition-all group">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-text-muted group-hover:text-primary group-hover:bg-primary/10 transition-colors mb-4">
            <Plus size={32} />
          </div>
          <p className="text-white font-medium">Register New Client</p>
        </div>
      </div>
    </div>
  );
};

export default Clients;
