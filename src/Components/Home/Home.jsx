import React, { useState } from "react";
import { Link } from "react-router-dom";
import BotonRojo from "../BotonRojo/BotonRojo";
import "../Home/Home.css";

const Home = () => {
  const [palabra, setPalabra] = useState("");
  const [opcionArea, setopcionArea] = useState('');
  const [opcionExp, setopcionExp] = useState('');

  function handleChangePalabra(event) {
    let me = event.target.value;
    setPalabra(me);
  }
  const handleSelectChangeArea = (e) => {
    const valorSeleccionado = e.target.value;
    setopcionArea(valorSeleccionado);
  };
  const handleSelectChangeExperiencia = (e) => {
    const valorSeleccionado = e.target.value;
    setopcionExp(valorSeleccionado);
  };
  return (
    <section className='home' style={{ width: "100%", height: "700px" }}>
      <div
        className='container'
        style={{
          width: "90%",
          marginLeft: "auto",
          marginRight: "auto",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <h2 style={{ color: "#FFF" }}>Sistema de Gestión Académica </h2>

      </div>
    </section>
  );
};

export default Home;
