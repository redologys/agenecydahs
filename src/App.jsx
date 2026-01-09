import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Clients from './pages/Clients';
import Vault from './pages/Vault';
import Tasks from './pages/Tasks';
import Analytics from './pages/Analytics';
import MediaLibrary from './pages/MediaLibrary';
import MediaRequests from './pages/MediaRequests';
import ClientMediaHub from './pages/ClientPortal/ClientMediaHub';
import { VaultProvider } from './context/VaultContext';
import { AuthProvider } from './context/AuthContext';
import { AnalyticsProvider } from './context/AnalyticsContext';

import ClientDetail from './pages/ClientDetail';
import Settings from './components/Settings';
import Login from './pages/Auth/Login';
import ProtectedRoute from './components/ProtectedRoute';

// Client Portal
import ClientLayout from './pages/ClientPortal/ClientLayout';
import ClientDashboard from './pages/ClientPortal/ClientDashboard';
import ClientProjects from './pages/ClientPortal/ClientProjects';
import ClientFiles from './pages/ClientPortal/ClientFiles';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AnalyticsProvider>
          <VaultProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              
              {/* Admin Routes */}
              <Route element={<ProtectedRoute role="admin" />}>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="clients" element={<Clients />} />
                  <Route path="clients/:clientId" element={<ClientDetail />} />
                  <Route path="tasks" element={<Tasks />} />
                  <Route path="media" element={<MediaLibrary />} />
                  <Route path="media/requests" element={<MediaRequests />} />
                  <Route path="analytics" element={<Analytics />} />
                  <Route path="vault" element={<Vault />} />
                  <Route path="settings" element={<Settings />} />
                </Route>
              </Route>

              {/* Client Portal Routes */}
              <Route path="/client-portal" element={<ProtectedRoute role="client" />}>
                <Route element={<ClientLayout />}>
                    <Route index element={<ClientDashboard />} />
                    <Route path="projects" element={<ClientProjects />} />
                    <Route path="media" element={<ClientMediaHub />} />
                    <Route path="files" element={<ClientFiles />} />
                </Route>
              </Route>

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </VaultProvider>
        </AnalyticsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
