import React from "react";

//import "./App.css";
//import "./Style.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Principal from "./Components/Principal/Principal";
import Login from "./Components/Login/Login";
import Navbar from "./Components/NavBar/Navbar";
import Registro from "./Components/Registro/Registro";

import Dasboard from "./Components/Dasboard/Dasboard";


import { Button } from "@mui/material";

function App() {
  console.log(import.meta.env.VITE_BACKEND_URL)
  // const globalDomain = process.env.REACT_APP_API_URLL;

  return (
    <>

      <Navbar />


      <Routes>
        <Route
          path='/'
          element={
            <Principal

            />
          }
        />
        <Route
          path='/login'
          element={
            <Login

            />
          }
        />
        {/* <Route
          path='/registro'
          element={
            <Registro

            />
          }
        /> */}





        <Route path='/dashboard' element={<Dasboard />} />
        {/* <Route
          path='/contrasenna/:userr'
          element={
            <OlvidasteContrasenna
            // globalDomain={globalDomain}
            />
          }
        /> */}
        <Route
          path='/usuarios'
          element={
            <Dasboard

            />
          }
        />

      </Routes>
    </>
  );
}
export default App;
