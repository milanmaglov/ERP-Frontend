// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavBar } from './assets/navbar';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Products } from './pages/Products';
import {  Login  } from './pages/Auth';
import 'bootstrap/dist/css/bootstrap.min.css';

function App () {
  // eslint-disable-next-line no-unused-vars
  const isAuthenticated = localStorage.getItem('token');
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/Login" element = {<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
