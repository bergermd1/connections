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



// function randomize(items) {
//     const randomizedIndices = [];
//     const indices = items.map((item, i) => i);
    
//     while (indices.length > 0) {
//       const index = Math.floor(Math.random() * indices.length);
//       randomizedIndices.push(indices[index]);
//       indices.splice(index, 1);
//     }

//     return randomizedIndices.map(index => items[index])
// }

export default App
