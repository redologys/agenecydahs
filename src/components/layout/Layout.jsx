import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden flex">
      {/* Background Ambience */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-900/10 rounded-full blur-[120px]" />
      </div>

      <Sidebar />

      <main className="flex-1 ml-72 mr-4 my-4 relative z-10 flex flex-col min-h-[calc(100vh-2rem)]">
        {/* Navbar would go here if we separate it, or inside pages */}
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
