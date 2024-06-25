import axios from "axios";
import React, { useState, useEffect } from "react";
export const CardSomos = () => {
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
    <>
      <div style={{ width: "100%" }}>
        {somos.length > 0 && (
          <>
            <div>
              <p
                style={{
                  color: "rgba(255,255,255,0.7)",
                  fontSize: "20px",
                  textAlign: "justify",
                }}
              >
                {somos[0]?.title}
              </p>
            </div>
            <div>
              <p
                style={{
                  color: "#636e7b",
                  textAlign: "justify",
                  fontSize: "15px",
                }}
              >
                {somos[0]?.body}
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
};