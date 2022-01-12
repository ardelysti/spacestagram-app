import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const rootElement = document.getElementById('root');
render(
  <React.StrictMode>
        <BrowserRouter>
            <div className="app-container">
                <NavBar />
                <Routes>
                    <Route exact path="/home" element={<Home />}/>
                    <Route exact path="/" element={<Home />}/>
                </Routes>
            </div>
        </BrowserRouter>
  </React.StrictMode>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
