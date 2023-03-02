import React from 'react';
import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import ButtonAppBar from './components/navBar';
import { Button } from '@mui/material';
import {Route, Routes} from "react-router-dom";
import Status from "./components/status";
import QRGenerator from './components/qrGen';
import 'semantic-ui-css/semantic.min.css'
import Login from "./components/login"
import Register from "./components/register"


function App() {
  return (
    <React.Fragment>
      <CssBaseline />
        <div className="App">
          <Routes>
          <Route exact path="/" element={<Login/>}>
              </Route>
              <Route exact path="/register" element={<Register/>}>
              </Route>
              <Route exact path="/qr" element={<QRGenerator/>}>
              </Route>
              <Route exact path="/qr/:id" element={<Status/>}>
              </Route>
          </Routes>
        </div>
    </React.Fragment>
  );
}

export default App;
