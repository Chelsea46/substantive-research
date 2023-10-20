import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import GraphContextProvider from './context/GraphContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <React.StrictMode>
      <GraphContextProvider>
        <App />
      </GraphContextProvider>
    </React.StrictMode>,
  </BrowserRouter>
)
