// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./App";
// // import { AuthContextProvider } from "./context/AuthContext";
// // import Fb from "./App.test";

// import "bootstrap/dist/css/bootstrap.min.css";
// import { AuthContextProvider } from "./context/AuthContext";

// ReactDOM.render(
//     <AuthContextProvider>

//         <App />
//     </AuthContextProvider>

//     , document.getElementById("root"));


import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContextProvider } from './context/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContextProvider>
        <App />
    </AuthContextProvider>
);
reportWebVitals();