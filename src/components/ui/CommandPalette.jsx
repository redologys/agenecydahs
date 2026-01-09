import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Command, Users, CheckSquare, Shield, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVault } from '../../context/VaultContext';

const items = [
  { id: 'c1', type: 'Client', label: 'TechStart Inc', path: '/clients/1', icon: Users },
  { id: 'c2', type: 'Client', label: 'Green Earth', path: '/clients/2', icon: Users },
  { id: 'c3', type: 'Client', label: 'Fashion Forward', path: '/clients/3', icon: Users },
  { id: 't1', type: 'Task', label: 'Brand Guidelines', path: '/tasks', icon: CheckSquare },
  { id: 't2', type: 'Task', label: 'Competitor Analysis', path: '/tasks', icon: CheckSquare },
  { id: 'v1', type: 'Vault', label: 'WordPress Admin', action: 'openVault', icon: Shield },
  { id: 'v2', type: 'Vault', label: 'Stripe Dashboard', action: 'openVault', icon: Shield },
];

const CommandPalette = () => {
  const { commandPaletteOpen, setCommandPaletteOpen, openVaultModal } = useVault();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((open) => !open);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setCommandPaletteOpen]);

  // Filter items
  const filteredItems = items.filter(item => 
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (item) => {
    if (item.action === 'openVault') {
      openVaultModal();
    } else {
      navigate(item.path);
    }
    setCommandPaletteOpen(false);
    setQuery('');
  };

  if (!commandPaletteOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setCommandPaletteOpen(false)}
        />
        
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative w-full max-w-lg bg-[#1a1f2e] border border-white/10 rounded-xl shadow-2xl overflow-hidden"
        >
          <div className="flex items-center px-4 py-3 border-b border-white/5">
            <Search className="text-text-secondary mr-3" size={20} />
            <input 
              type="text" 
              placeholder="Type a command or search..."
              className="flex-1 bg-transparent border-none outline-none text-white placeholder-text-muted text-sm"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="flex gap-1 text-[10px] text-text-muted font-mono bg-white/5 px-1.5 py-0.5 rounded">
              <span>ESC</span>
            </div>
          </div>

          <div className="max-h-[300px] overflow-y-auto py-2">
            {filteredItems.length > 0 ? (
              <>
                <div className="px-3 py-1.5 text-xs font-medium text-text-muted uppercase tracking-wider">
                  Suggestions
                </div>
                {filteredItems.map((item, index) => (
                  <button
                    key={item.id}
                    className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                      index === selectedIndex ? 'bg-primary/20 text-white' : 'text-text-secondary hover:bg-white/5 hover:text-white'
                    }`}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-1.5 rounded-lg ${
                        item.type === 'Client' ? 'bg-blue-500/10 text-blue-400' :
                        item.type === 'Task' ? 'bg-orange-500/10 text-orange-400' :
                        'bg-purple-500/10 text-purple-400'
                      }`}>
                        <item.icon size={14} />
                      </div>
                      <span className="font-medium">{item.label}</span>
                    </div>
                    {index === selectedIndex && (
                      <ArrowRight size={14} className="text-primary" />
                    )}
                  </button>
                ))}
              </>
            ) : (
              <div className="px-4 py-8 text-center text-text-muted text-sm">
                No results found for "{query}"
              </div>
            )}
          </div>

          <div className="px-4 py-2 bg-black/20 border-t border-white/5 flex items-center justify-between text-[10px] text-text-muted">
             <span>Quick Actions:</span>
             <div className="flex gap-3">
               <span className="flex items-center gap-1"><span className="bg-white/10 px-1 rounded">Cmd</span>+<span className="bg-white/10 px-1 rounded">K</span> to close</span>
             </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CommandPalette;
