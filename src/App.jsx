import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { NavBar } from './assets/navbar';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Products } from './pages/Products';
import { Login } from './pages/Auth';
import { AdminPage } from './pages/AdminPage';
import { ProtectedRoute } from './assets/protectedroute';
import { Register } from './pages/Register';
import { AdminNavBar } from './assets/adminnavbar';
import {  Users } from './pages/Korisnici';
import 'bootstrap/dist/css/bootstrap.min.css';

function AppContent() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className="app-container">
      {isAdminPage ? <AdminNavBar /> : <NavBar />}
      <div className={`content ${isAdminPage ? 'admin-content' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute roles={['admin']} />}>
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/dashboard" element={<div>Dashboard</div>} />
            <Route path="/admin/users" element={<Users/> }/>
            <Route path="/admin/settings" element={<div>Settings</div>} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
