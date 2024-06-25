import axios from "axios";
import React, { useState, useEffect } from "react";

const CardContactanos = () => {
  const [somos, setsomos] = useState([]);
  useEffect(() => {
    console.log("entro");
    axios
      .get("http://ahorasi.dd:8083/getInfo/?_format=json", {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((res) => {
        setsomos(res.data);
      });
  }, []);
  return (
    <div
      className='card-contacto'
      style={{ width: "100%", textAlign: "justify" }}
    >
      <div>
        <p
          style={{
            color: "rgba(255,255,255,0.7)",
            fontSize: "20px",
          }}
        >
          CONTACTANOS
        </p>
      </div>
      <div style={{ marginTop: "20px" }}>
        <p style={{ color: "rgb(99, 110, 123)" }}>
        {somos[0]?.field_lugar}
        </p>
        <p style={{ color: "rgb(99, 110, 123)" }}>
        {somos[0]?.field_correo}
        </p>

      </div>
    </div>
  );
};

export default CardContactanos;
