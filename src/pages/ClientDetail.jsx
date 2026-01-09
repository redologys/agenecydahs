import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, Globe, Mail, Phone, Calendar, Shield, CheckSquare, BarChart3, Clock, Loader2, Link, Save, RefreshCw } from 'lucide-react';
import { useVault } from '../context/VaultContext';
import { supabase } from '../lib/supabase';
import { useAnalytics } from '../context/AnalyticsContext';

const ClientDetail = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [viewId, setViewId] = useState('');
  const [saving, setSaving] = useState(false);

  const { openVaultModal } = useVault();
  const { manualSync } = useAnalytics();

  useEffect(() => {
    fetchClient();
  }, [clientId]);

  const fetchClient = async () => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('id', clientId)
        .single();
      
      if (error) throw error;
      setClient(data);
      setViewId(data.google_analytics_view_id || '');
    } catch (err) {
      console.error('Error fetching client:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleConnectAnalytics = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('clients')
        .update({ google_analytics_view_id: viewId, analytics_connected: true })
        .eq('id', clientId);
      
      if (error) throw error;
      
      // Sync initial data (simulation)
      await manualSync(clientId, viewId);
      
      await fetchClient();
      setIsConnectModalOpen(false);
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
     return (
       <div className="h-[400px] w-full flex items-center justify-center text-primary">
         <Loader2 size={48} className="animate-spin" />
       </div>
     );
  }

  if (!client) {
     return (
       <div className="p-10 text-center text-text-muted">
         Client not found.
         <button onClick={() => navigate('/clients')} className="block mx-auto mt-4 text-primary underline">Back to list</button>
       </div>
     );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Globe },
    { id: 'vault', label: 'Vault', icon: Shield },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'activity', label: 'Activity', icon: Clock },
  ];

  return (
    <div className="space-y-6 pb-6 animate-fade-in text-white">
      {/* Header */}
      <div className="flex flex-col gap-6 ">
        <button onClick={() => navigate('/clients')} className="flex items-center gap-2 text-text-muted hover:text-white transition-colors w-fit">
          <ArrowLeft size={16} /> Back to Clients
        </button>

        <div className="glass-card p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-6">
             <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-[#E5C100] flex items-center justify-center text-black font-bold text-3xl shadow-lg shadow-primary/20">
               {client.logo || client.name.substring(0,2).toUpperCase()}
             </div>
             <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-3xl font-display font-bold text-white">{client.name}</h1>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                    client.status === 'Active' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                  }`}>
                    {client.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-text-secondary">
                  {client.website && <span className="flex items-center gap-1"><Globe size={14} /> {client.website}</span>}
                  {client.contact_email && <span className="flex items-center gap-1"><Mail size={14} /> {client.contact_email}</span>}
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
            <h3 className="text-xl font-bold text-white">${(client.monthly_budget || 0).toLocaleString()}</h3>
         </div>
         <div className="glass-card p-4">
            <p className="text-xs text-text-secondary uppercase">Connection Status</p>
            <h3 className={`text-xl font-bold ${client.analytics_connected ? 'text-green-400' : 'text-red-400'}`}>
               {client.analytics_connected ? 'Connected' : 'Disconnected'}
            </h3>
         </div>
         <div className="glass-card p-4">
            <p className="text-xs text-text-secondary uppercase">Active Tasks</p>
            <h3 className="text-xl font-bold text-white">8 <span className="text-sm font-normal text-text-muted">pending</span></h3>
         </div>
         <div className="glass-card p-4">
            <p className="text-xs text-text-secondary uppercase">Completion</p>
            <h3 className="text-xl font-bold text-primary">{client.completion_percentage || 0}%</h3>
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
                  <div className="space-y-4 text-text-secondary">
                    <p>No project details specified yet.</p>
                  </div>
                </div>
                
                <div className="glass-card p-6">
                   <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
                   <div className="grid grid-cols-2 gap-4">
                      <button onClick={openVaultModal} className="p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 flex flex-col items-center gap-2 transition-colors">
                         <Shield size={24} className="text-primary" />
                         <span className="text-sm font-medium text-white">Open Vault</span>
                      </button>
                      <button 
                        onClick={() => setIsConnectModalOpen(true)}
                        className="p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 flex flex-col items-center gap-2 transition-colors"
                      >
                         <Link size={24} className="text-blue-400" />
                         <span className="text-sm font-medium text-white">Connect GA</span>
                      </button>
                   </div>
                </div>
             </div>
           )}
           {activeTab === 'analytics' && (
              <div className="glass-card p-6">
                 <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-white">Google Analytics</h3>
                    {client.analytics_connected ? (
                      <button className="btn btn-outline gap-2 text-xs">
                         <RefreshCw size={14} /> Refresh Data
                      </button>
                    ) : (
                      <button onClick={() => setIsConnectModalOpen(true)} className="btn btn-primary gap-2">
                         <Link size={16} /> Connect Now
                      </button>
                    )}
                 </div>

                 {client.analytics_connected ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                          <p className="text-sm text-text-secondary mb-1">View ID</p>
                          <p className="text-lg font-mono text-white">{client.google_analytics_view_id}</p>
                       </div>
                       <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                          <p className="text-sm text-text-secondary mb-1">Integration Status</p>
                          <p className="text-lg font-bold text-green-400 flex items-center gap-2">
                             <CheckSquare size={20} /> Active
                          </p>
                       </div>
                    </div>
                 ) : (
                    <div className="p-20 text-center flex flex-col items-center justify-center">
                       <BarChart3 size={48} className="text-text-muted mb-4" />
                       <h4 className="text-lg font-bold text-white mb-2">Google Analytics Not Connected</h4>
                       <p className="text-text-secondary max-w-sm mb-6">Connect your client's Google Analytics account to start pulling real-time performance data into this dashboard.</p>
                       <button onClick={() => setIsConnectModalOpen(true)} className="btn btn-primary">Setup Connection</button>
                    </div>
                 )}
              </div>
           )}
           {/* Fallback tabs */}
           {(activeTab === 'vault' || activeTab === 'tasks' || activeTab === 'activity') && (
             <div className="glass-card p-10 flex items-center justify-center text-text-muted">
               {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} content coming soon...
             </div>
           )}
        </div>
      </div>

      {/* Connect Modal */}
      {isConnectModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
           <div className="glass-card w-full max-w-md p-6 shadow-2xl relative">
              <h3 className="text-xl font-bold text-white mb-2">Connect Google Analytics</h3>
              <p className="text-text-secondary text-sm mb-6">Enter your Google Analytics View ID to enable reporting for <strong>{client.name}</strong>.</p>
              
              <div className="space-y-4">
                 <div className="space-y-2">
                    <label className="text-sm font-medium text-text-secondary">View ID (ga:XXXXXX)</label>
                    <input 
                      type="text"
                      value={viewId}
                      onChange={(e) => setViewId(e.target.value)}
                      className="input-field w-full"
                      placeholder="e.g. 123456789"
                    />
                 </div>

                 <div className="bg-white/5 p-4 rounded-xl border border-white/5 space-y-2">
                    <p className="text-xs font-bold text-primary uppercase">Quick Reference</p>
                    <p className="text-xs text-text-muted">You can find this in your Google Analytics Admin panel under <strong>View Settings &gt; View ID</strong>.</p>
                 </div>

                 <div className="flex gap-3 pt-4">
                    <button 
                      onClick={() => setIsConnectModalOpen(false)}
                      className="btn btn-ghost border border-white/10 flex-1"
                    >
                       Cancel
                    </button>
                    <button 
                      onClick={handleConnectAnalytics}
                      disabled={saving || !viewId}
                      className="btn btn-primary flex-1 gap-2"
                    >
                       {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                       {saving ? 'Connecting...' : 'Save Connection'}
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default ClientDetail;
