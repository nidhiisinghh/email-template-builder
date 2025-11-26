import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import HeroPage from './pages/HeroPage.jsx'
import AuthPage from './pages/AuthPage.jsx'
import SavedTemplates from './pages/SavedTemplates.jsx'
import SharedTemplates from './pages/SharedTemplates.jsx'
import PendingShares from './pages/PendingShares.jsx'
import AuthWrapper from './components/AuthWrapper.jsx'
import { ShareProvider } from './contexts/ShareContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ShareProvider>
        <Routes>
          <Route path="/" element={<HeroPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/app" element={<AuthWrapper><App /></AuthWrapper>} />
          <Route path="/saved" element={<AuthWrapper><SavedTemplates /></AuthWrapper>} />
          <Route path="/shared-templates" element={<AuthWrapper><SharedTemplates /></AuthWrapper>} />
          <Route path="/pending-shares" element={<AuthWrapper><PendingShares /></AuthWrapper>} />
        </Routes>
      </ShareProvider>
    </BrowserRouter>
  </StrictMode>,
)