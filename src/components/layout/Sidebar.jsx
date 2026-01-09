import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Shield, 
  BarChart3, 
  CheckSquare, 
  Settings,
  LogOut 
} from 'lucide-react';
import clsx from 'clsx';

const Sidebar = () => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Users, label: 'Clients', path: '/clients' },
    { icon: CheckSquare, label: 'Tasks', path: '/tasks' },
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

      {/* Footer / Need Help? */}
      <div className="p-4 mx-4 mb-4 rounded-xl bg-gradient-to-br from-primary/20 to-transparent border border-primary/20">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-full bg-primary/20 text-primary">
            <Shield size={16} />
          </div>
          <p className="text-xs font-semibold text-white">Need Help?</p>
        </div>
        <p className="text-[10px] text-text-secondary leading-relaxed mb-3">
          Check our docs or contact support for assistance.
        </p>
        <button className="w-full py-1.5 text-xs font-bold text-black bg-primary rounded-lg hover:bg-primary-hover transition-colors">
          DOCUMENTATION
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
