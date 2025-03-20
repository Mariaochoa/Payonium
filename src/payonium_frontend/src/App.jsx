import { useContext, useState } from 'react';

import { AuthContext } from './context/AuthContext';
import { createActor } from 'declarations/payonium_backend';
import './App.css';
import Apptemp from "./Apptemp";
import { BrowserRouter } from "react-router-dom";
import Router from "./router/Router";
import Navbar from "./components/navbar/Navbar"

function App() {

  const { isAuthenticated, identity } = useContext(AuthContext);
  
  return (
    <div >
      <BrowserRouter>
        <Navbar />
        <Router />
        {/* <Apptemp /> */}
      </BrowserRouter>

    </div>
  );
}

export default App;
