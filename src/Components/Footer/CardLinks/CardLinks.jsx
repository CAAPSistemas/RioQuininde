import React from "react";
import "./CardLinks.css"
const CardLinks = () => {
  return (
    <>
      <div
        className='card-links'
        style={{ width: "100%", textAlign: "justify" }}
      >
        <div>
          <p
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: "20px",
            }}
          >
           LINK DE INTERES
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
              Mi Cuenta
            </p>
          </a>
          <a href='#'>
            <p
              style={{
                textAlign: "justify",
                fontSize: "15px",
              }}
            >
              Premium MBA Jobs
            </p>
          </a>
          <a href='#'>
            <p
              style={{
                textAlign: "justify",
                fontSize: "15px",
              }}
            >
              Premium MBA Jobs
            </p>
          </a>{" "}
          <a href='#'>
            <p
              style={{
                textAlign: "justify",
                fontSize: "15px",
              }}
            >
              Premium MBA Jobs
            </p>
          </a>
          <a href='#'>
            <p
              style={{
                textAlign: "justify",
                fontSize: "15px",
              }}
            >
              Premium MBA Jobs
            </p>
          </a>
        </div>
      </div>
    </>
  );
};

export default CardLinks;
