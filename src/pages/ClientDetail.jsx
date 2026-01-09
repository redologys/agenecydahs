import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, Globe, Mail, Phone, Calendar, Shield, CheckSquare, BarChart3, Clock } from 'lucide-react';
import { useVault } from '../context/VaultContext';

// Mock Client Data (would fetch by ID)
const clientDetail = {
  id: 1, 
  name: 'TechStart Inc', 
  logo: 'TS', 
  status: 'Active', 
  budget: '$15,000', 
  revenue: '$124,500',
  email: 'contact@techstart.com',
  phone: '+1 (555) 000-1234',
  website: 'techstart.com',
  timeline: { start: 'Jan 15, 2024', end: 'Dec 20, 2024', daysLeft: 245 },
  desc: 'TechStart is a leading B2B SaaS platform...'
};

const ClientDetail = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const { openVaultModal } = useVault();

  // Mock data usage using clientId (not implemented for real dynamic fetching in this static demo)
  
  const tabs = [
    { id: 'overview', label: 'Overview', icon: Globe },
    { id: 'vault', label: 'Vault', icon: Shield },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'activity', label: 'Activity', icon: Clock },
  ];

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div className="flex flex-col gap-6">
        <button onClick={() => navigate('/clients')} className="flex items-center gap-2 text-text-muted hover:text-white transition-colors w-fit">
          <ArrowLeft size={16} /> Back to Clients
        </button>

        <div className="glass-card p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-6">
             <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-[#E5C100] flex items-center justify-center text-black font-bold text-3xl shadow-lg shadow-primary/20">
               {clientDetail.logo}
             </div>
             <div>
               <div className="flex items-center gap-3 mb-1">
                 <h1 className="text-3xl font-display font-bold text-white">{clientDetail.name}</h1>
                 <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-bold border border-green-500/20">
                   {clientDetail.status}
                 </span>
               </div>
               <div className="flex items-center gap-4 text-sm text-text-secondary">
                 <span className="flex items-center gap-1"><Globe size={14} /> {clientDetail.website}</span>
                 <span className="flex items-center gap-1"><Mail size={14} /> {clientDetail.email}</span>
               </div>
             </div>
          </div>
          
          <div className="flex gap-3">
            <button className="btn btn-ghost border border-white/10">
              <Edit size={16} /> Edit
            </button>
            <button className="btn bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20">
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Metadata Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         <div className="glass-card p-4">
            <p className="text-xs text-text-secondary uppercase">Monthly Budget</p>
            <h3 className="text-xl font-bold text-white">{clientDetail.budget}</h3>
         </div>
         <div className="glass-card p-4">
            <p className="text-xs text-text-secondary uppercase">Total Revenue</p>
            <h3 className="text-xl font-bold text-primary">{clientDetail.revenue}</h3>
         </div>
         <div className="glass-card p-4">
            <p className="text-xs text-text-secondary uppercase">Active Tasks</p>
            <h3 className="text-xl font-bold text-white">8 <span className="text-sm font-normal text-text-muted">pending</span></h3>
         </div>
         <div className="glass-card p-4">
            <p className="text-xs text-text-secondary uppercase">Completion</p>
            <h3 className="text-xl font-bold text-green-400">75%</h3>
         </div>
      </div>

      {/* Tabs Layout */}
      <div>
        <div className="flex items-center border-b border-white/10 mb-6 gap-6 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 pb-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-white'
              }`}
            >
              <tab.icon size={16} /> {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
           {activeTab === 'overview' && (
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="glass-card p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Project Details</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between py-2 border-b border-white/5">
                       <span className="text-text-muted">Start Date</span>
                       <span className="text-white">{clientDetail.timeline.start}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-white/5">
                       <span className="text-text-muted">Deadline</span>
                       <span className="text-white">{clientDetail.timeline.end}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-white/5">
                       <span className="text-text-muted">Days Remaining</span>
                       <span className="text-primary font-bold">{clientDetail.timeline.daysLeft} Days</span>
                    </div>
                  </div>
                  <div className="mt-6">
                    <h4 className="text-sm font-bold text-white mb-2">Notes</h4>
                    <p className="text-sm text-text-secondary leading-relaxed bg-black/20 p-4 rounded-xl border border-white/5">
                      {clientDetail.desc}
                    </p>
                  </div>
                </div>
                
                <div className="glass-card p-6">
                   <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
                   <div className="grid grid-cols-2 gap-4">
                      <button onClick={openVaultModal} className="p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 flex flex-col items-center gap-2 transition-colors">
                         <Shield size={24} className="text-primary" />
                         <span className="text-sm font-medium text-white">Open Vault</span>
                      </button>
                      <button className="p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 flex flex-col items-center gap-2 transition-colors">
                         <CheckSquare size={24} className="text-green-400" />
                         <span className="text-sm font-medium text-white">Add Task</span>
                      </button>
                   </div>
                </div>
             </div>
           )}
           {activeTab === 'vault' && (
             <div className="glass-card p-10 flex flex-col items-center justify-center text-center">
                <Shield size={48} className="text-primary mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Restricted Access</h3>
                <p className="text-text-secondary max-w-sm mb-6">This client's credentials are stored in the secure vault. Please unlock the master vault to view.</p>
                <button onClick={openVaultModal} className="btn btn-primary">Unlock Vault</button>
             </div>
           )}
           {/* Other tabs can be placeholders for now */}
           {(activeTab === 'tasks' || activeTab === 'analytics' || activeTab === 'activity') && (
             <div className="glass-card p-10 flex items-center justify-center text-text-muted">
               {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} content coming soon...
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default ClientDetail;
