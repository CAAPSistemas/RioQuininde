import React, { useState } from "react";
import { Link } from "react-router-dom";
const CardMiCuenta = () => {
  return (
    <>
      <div
        className='card-mi-cuenta'
        style={{ width: "100%", textAlign: "justify" }}
      >
        <div>
          <p
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: "20px",
            }}
          >
           Enlaces del sitio
          </p>
        </div>
        <div style={{ marginTop: "20px" }}>
          <a href='#'>
            <p
              style={{
                textAlign: "justify",
                fontSize: "15px",
              }}
            >
               <Link to='/login'>Acceso</Link>
            </p>
          </a>
          <a href='#'>
            <p
              style={{
                textAlign: "justify",
                fontSize: "15px",
              }}
            >
               <Link to='/registro'>Registro</Link>
            </p>
          </a>
          <a href='#'>
            <p
              style={{
                textAlign: "justify",
                fontSize: "15px",
              }}
            >

            </p>
          </a>{" "}
          <a href='/'>
            <p
              style={{
                textAlign: "justify",
                fontSize: "15px",
              }}
            >
                    <Link to='/todos-los-trbajos'>Empleos</Link>
            </p>
          </a>

        </div>
      </div>
    </>
  );
};

export default CardMiCuenta;
