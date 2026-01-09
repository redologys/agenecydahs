import React, { useState } from 'react';
import { User, Lock, Bell, Moon, Cloud, Shield, Save, Download, LogOut, CheckCircle } from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [twoFactor, setTwoFactor] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    weekly: true
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Moon },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'backup', label: 'Backup & Export', icon: Cloud },
  ];

  return (
    <div className="space-y-6 pb-6 w-full max-w-5xl mx-auto">
      <div>
        <h6 className="text-text-secondary text-sm font-medium">Configuration</h6>
        <h1 className="text-3xl font-display font-bold text-white">Settings</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Nav */}
        <div className="glass-card p-4 h-fit md:col-span-1">
          <nav className="space-y-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === tab.id 
                    ? 'bg-primary text-black font-bold shadow-lg shadow-primary/20' 
                    : 'text-text-muted hover:bg-white/5 hover:text-white'
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div className="glass-card p-8 md:col-span-3 min-h-[500px]">
           {activeTab === 'profile' && (
             <div className="space-y-8 animate-fade-in">
               <div className="flex items-center gap-6">
                 <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-[#E5C100] p-1 shadow-2xl">
                    <img 
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                      alt="Profile" 
                      className="w-full h-full rounded-full object-cover border-4 border-[#0b0f19]"
                    />
                 </div>
                 <div>
                   <h2 className="text-2xl font-bold text-white">Alex Morgan</h2>
                   <p className="text-text-secondary">Senior Project Manager</p>
                   <button className="mt-2 text-primary text-sm hover:underline">Change Avatar</button>
                 </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                   <label className="text-sm text-text-muted">Full Name</label>
                   <input type="text" defaultValue="Alex Morgan" className="input-field w-full" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-sm text-text-muted">Email Address</label>
                   <input type="email" defaultValue="alex@dominion.agency" className="input-field w-full" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-sm text-text-muted">Role</label>
                   <input type="text" defaultValue="Admin" disabled className="input-field w-full opacity-50 cursor-not-allowed" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-sm text-text-muted">Phone</label>
                   <input type="tel" defaultValue="+1 (555) 000-0000" className="input-field w-full" />
                 </div>
               </div>
               
               <div className="flex justify-end pt-4 border-t border-white/5">
                 <button className="btn btn-primary">
                   <Save size={18} /> Save Changes
                 </button>
               </div>
             </div>
           )}

           {activeTab === 'security' && (
             <div className="space-y-8 animate-fade-in">
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Lock size={20} className="text-primary" /> Master Password
                  </h3>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm text-text-muted">Current Password</label>
                      <input type="password" placeholder="••••••••" className="input-field w-full max-w-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-text-muted">New Password</label>
                      <input type="password" placeholder="••••••••" className="input-field w-full max-w-sm" />
                    </div>
                    <button className="btn bg-white/10 text-white hover:bg-white/20">Update Password</button>
                  </div>
                </div>

                <div className="space-y-4">
                   <h3 className="text-lg font-bold text-white">Two-Factor Authentication</h3>
                   <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                      <div>
                        <p className="text-white font-medium">Enable 2FA</p>
                        <p className="text-sm text-text-secondary">Secure your account with an authentication app.</p>
                      </div>
                      <div 
                        className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${twoFactor ? 'bg-green-500' : 'bg-white/10'}`}
                        onClick={() => setTwoFactor(!twoFactor)}
                      >
                        <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${twoFactor ? 'translate-x-6' : 'translate-x-0'}`} />
                      </div>
                   </div>
                </div>
             </div>
           )}
           
           {activeTab === 'notifications' && (
             <div className="space-y-6 animate-fade-in">
               <h3 className="text-lg font-bold text-white">Email Preferences</h3>
               <div className="space-y-4">
                 {Object.entries(notifications).map(([key, value]) => (
                   <div key={key} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
                      <span className="text-text-secondary capitalize">{key} Notifications</span>
                      <input 
                        type="checkbox" 
                        checked={value} 
                        onChange={() => setNotifications(prev => ({ ...prev, [key]: !prev[key] }))}
                        className="rounded border-white/20 bg-white/5 checked:bg-primary h-5 w-5"
                      />
                   </div>
                 ))}
               </div>
             </div>
           )}

           {activeTab === 'backup' && (
              <div className="space-y-6 animate-fade-in">
                 <div className="p-6 rounded-xl bg-gradient-to-br from-primary/20 to-transparent border border-primary/20 text-center">
                    <Cloud size={48} className="mx-auto text-primary mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Cloud Backup Active</h3>
                    <p className="text-text-secondary mb-6">Your data is encrypted and backed up daily. Last backup: 2 hours ago.</p>
                    <div className="flex justify-center gap-4">
                       <button className="btn btn-primary">Backup Now</button>
                       <button className="btn bg-white/10 text-white hover:bg-white/20">
                          <Download size={18} /> Export Data (CSV)
                       </button>
                    </div>
                 </div>
              </div>
           )}
           
           {activeTab === 'appearance' && (
             <div className="flex flex-col items-center justify-center h-full text-center space-y-4 text-text-muted">
               <Moon size={48} />
               <p>Theme settings are managed globally. This app is locked to the "Dominion Dark" theme.</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
