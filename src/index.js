import React from 'react';
// import ReactDom from 'react-dom';

// import file from 'file-loader?name=[name].[ext]!./index.html'
require('file-loader?name=[name].[ext]!./index.html')
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// const appElement = document.getElementById('app')
// ReactDom.render(<App />, appElement);


createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <App />
  // </StrictMode>,
)
