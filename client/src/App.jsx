import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import ManageProjects from './pages/ManageProjects';
import ManageClients from './pages/ManageClients';
import ViewInquiries from './pages/ViewInquiries';
import ViewSubscribers from './pages/ViewSubscribers';
import { ToastProvider } from './context/ToastContext';

function App() {
  return (
    <ToastProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
          </Route>

          <Route path="/admin/login" element={<AdminLogin />} />

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="projects" element={<ManageProjects />} />
            <Route path="clients" element={<ManageClients />} />
            <Route path="inquiries" element={<ViewInquiries />} />
            <Route path="subscribers" element={<ViewSubscribers />} />
          </Route>
        </Routes>
      </Router>
    </ToastProvider>
  );
}

export default App;
