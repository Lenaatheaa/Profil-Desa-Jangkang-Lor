import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PublicPage } from './pages/PublicPage';
import { Login } from './pages/admin/Login';
import { Dashboard } from './pages/admin/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicPage />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/peta" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
