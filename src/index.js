import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import axios from "axios";
import { AuthContextProvider } from './context/AuthContext';

axios.defaults.baseURL = 'http://localhost:8800/api';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);

