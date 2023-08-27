import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css"; 
import '/node_modules/primeflex/primeflex.css';
import './App.css'
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);
