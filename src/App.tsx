import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './pages/Home/Home';
import Verification from './pages/Verification/Verification';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/verify" element={<Verification/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
