import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Shield, 
  BarChart3, 
  CheckSquare, 
  Settings,
  LogOut,
  FolderOpen
} from 'lucide-react';
import clsx from 'clsx';

const Sidebar = () => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Users, label: 'Clients', path: '/clients' },
    { icon: CheckSquare, label: 'Tasks', path: '/tasks' },
    { icon: FolderOpen, label: 'Media Library', path: '/media' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: Shield, label: 'Vault', path: '/vault' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <aside className="fixed left-4 top-4 bottom-4 w-64 glass-card flex flex-col z-50 overflow-hidden">
      {/* Logo Area */}
      <div className="p-6 flex items-center gap-3 border-b border-white/5">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-black font-bold text-xl">
          D
        </div>
        <span className="font-display font-bold text-lg text-white tracking-wide uppercase">
          Dominion
        </span>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              clsx(
                "sidebar-link group",
                isActive && "active"
              )
            }
          >
            {({ isActive }) => (
              <>
                <div className={clsx(
                  "p-2 rounded-lg transition-all duration-300",
                  isActive ? "bg-primary text-black shadow-lg shadow-primary/20" : "bg-white/5 text-white group-hover:bg-white/10"
                )}>
                  <item.icon size={18} />
                </div>
                <span>{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-white/5 bg-[#0b0f19]/30">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-purple-500 p-[2px]">
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
               <img src="https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff" alt="User" />
            </div>
          </div>
          <div className="flex-1 overflow-hidden">
             <h4 className="text-sm font-bold text-white truncate">Admin User</h4>
             <p className="text-xs text-text-secondary truncate">admin@agency.com</p>
          </div>
          <button className="text-text-secondary hover:text-white transition-colors">
            <Settings size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
