//import React from 'react';
import ReactDOM from 'react-dom/client';
import 'sweetalert2/dist/sweetalert2.min.css';
import './index.css';
import { DevStoreApp } from './DevStoreApp';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    //<React.StrictMode>
    <DevStoreApp />
    //</React.StrictMode>
);
