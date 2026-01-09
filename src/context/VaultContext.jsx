import React, { createContext, useContext, useState, useEffect } from 'react';

const VaultContext = createContext();

export const useVault = () => useContext(VaultContext);

export const VaultProvider = ({ children }) => {
  const [isVaultOpen, setIsVaultOpen] = useState(false);
  const [isVaultUnlocked, setIsVaultUnlocked] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  
  // Mock Master Password Check
  const unlockVault = (password) => {
    if (password === 'admin123') { // Mock password
      setIsVaultUnlocked(true);
      return true;
    }
    return false;
  };

  const lockVault = () => {
    setIsVaultUnlocked(false);
  };

  const openVaultModal = () => setIsVaultOpen(true);
  const closeVaultModal = () => setIsVaultOpen(false);

  const toggleCommandPalette = () => setCommandPaletteOpen(prev => !prev);

  // Auto-lock on inactivity (mock 15 min)
  useEffect(() => {
    let timeout;
    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsVaultUnlocked(false), 15 * 60 * 1000);
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keypress', resetTimer);

    return () => {
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keypress', resetTimer);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <VaultContext.Provider value={{
      isVaultOpen,
      openVaultModal,
      closeVaultModal,
      isVaultUnlocked,
      unlockVault,
      lockVault,
      commandPaletteOpen,
      setCommandPaletteOpen, 
      toggleCommandPalette
    }}>
      {children}
    </VaultContext.Provider>
  );
};
