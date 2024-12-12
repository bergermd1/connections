import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Game from './Game.jsx';
import Home from './Home.jsx';
import Stats from './Stats.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
        </Route>
        <Route path="/game" element={<Game />}>
        </Route>
        <Route path="/stats" element={<Stats />}>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
