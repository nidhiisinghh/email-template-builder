import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import HeroPage from './pages/HeroPage';
import AuthPage from './pages/AuthPage';
import MainDashboard from './pages/MainDashboard';
import SavedTemplates from './pages/SavedTemplates';
import SharedTemplates from './pages/SharedTemplates';
import PendingShares from './pages/PendingShares';
import NotFound from './pages/NotFound';
import AuthWrapper from './components/AuthWrapper';
import PublicRoute from './components/PublicRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicRoute><HeroPage /></PublicRoute>} />
      <Route path="/auth" element={<PublicRoute><AuthPage /></PublicRoute>} />
      <Route path="/app" element={<AuthWrapper><MainDashboard /></AuthWrapper>} />
      <Route path="/saved" element={<AuthWrapper><SavedTemplates /></AuthWrapper>} />
      <Route path="/shared-templates" element={<AuthWrapper><SharedTemplates /></AuthWrapper>} />
      <Route path="/pending-shares" element={<AuthWrapper><PendingShares /></AuthWrapper>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;