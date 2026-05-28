import React from 'react'
import ReactDom from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from "react-hot-toast";

ReactDom.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Toaster position="top-right" />
    <App />
  </React.StrictMode>
);

