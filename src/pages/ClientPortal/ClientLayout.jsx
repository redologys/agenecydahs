import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, Settings, LogOut, CheckSquare, Image } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const ClientLayout = () => {
  const { logout, profile } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/client-portal' },
    { icon: CheckSquare, label: 'Projects', path: '/client-portal/projects' },
    { icon: Image, label: 'Media Library', path: '/client-portal/media' },
    { icon: FileText, label: 'Files', path: '/client-portal/files' },
  ];

  return (
    <div className="flex min-h-screen bg-[#05070a] text-white font-sans">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[#0b0f19] border-r border-white/5 z-50 flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-[#E5C100] flex items-center justify-center shadow-lg shadow-primary/20">
            <span className="text-black font-bold text-xl">D</span>
          </div>
          <div>
            <h1 className="text-lg font-display font-bold tracking-tight">Dominion</h1>
            <p className="text-[10px] text-text-secondary uppercase tracking-widest">Client Portal</p>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/client-portal'}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                ${isActive 
                  ? 'bg-primary text-black font-bold shadow-lg shadow-primary/20' 
                  : 'text-text-secondary hover:bg-white/5 hover:text-white'}
              `}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
           <div className="flex items-center gap-3 mb-4 px-2">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold">
                 {profile?.full_name?.[0] || 'C'}
              </div>
              <div className="flex-1 min-w-0">
                 <p className="text-sm font-bold truncate">{profile?.full_name || 'Client'}</p>
                 <p className="text-xs text-text-secondary truncate">{profile?.email}</p>
              </div>
           </div>
           <button 
             onClick={handleLogout}
             className="w-full flex items-center justify-center gap-2 p-2 rounded-lg bg-white/5 hover:bg-red-500/10 hover:text-red-400 text-text-secondary transition-colors text-sm font-medium"
           >
             <LogOut size={16} /> Sign Out
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-primary/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 max-w-7xl mx-auto">
           <Outlet />
        </div>
      </main>
    </div>
  );
};

export default ClientLayout;
