import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import HeroPage from './pages/HeroPage.jsx'
import AuthPage from './pages/AuthPage.jsx'
import TemplateHistory from './pages/TemplateHistory.jsx'
import AuthWrapper from './components/AuthWrapper.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HeroPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/app" element={<AuthWrapper><App /></AuthWrapper>} />
        <Route path="/history" element={<AuthWrapper><TemplateHistory /></AuthWrapper>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)