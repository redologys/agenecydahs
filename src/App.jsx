import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Clients from './pages/Clients';
import Vault from './pages/Vault';
import Tasks from './pages/Tasks';
import Analytics from './pages/Analytics';
import { VaultProvider } from './context/VaultContext';

import ClientDetail from './pages/ClientDetail';
import Settings from './components/Settings';

function App() {
  return (
    <BrowserRouter>
      <VaultProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="clients" element={<Clients />} />
            <Route path="clients/:clientId" element={<ClientDetail />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="vault" element={<Vault />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </VaultProvider>
    </BrowserRouter>
  );
}

export default App;
