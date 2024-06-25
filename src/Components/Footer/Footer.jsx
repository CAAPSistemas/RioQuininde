import React from "react";
import CardContactanos from "./CardContactanos/CardContactanos";
import CardLinks from "./CardLinks/CardLinks";
import CardMiCuenta from "./CardMiCuenta/CardMiCuenta";
import "./CardSomos/CardSomos"
import { CardSomos } from "./CardSomos/CardSomos";
const Footer = () => {
  return (
    <>
      <section
        style={{
          width: "100%",
          minHeight: "500px",
          background: "#242c36",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className='container'>
          <div class='container text-center'>
            <div class='row'>
              <div class='col-xs-12 col-md-3'>
                <CardSomos/>
              </div>
              <div class='col-xs-12 col-md-3'>
              <CardContactanos/>
              </div>
              <div class='col-xs-12 col-md-3'>

              </div>
              <div class='col-xs-12 col-md-3'>
                {/* <CardLinks/> */}     <CardMiCuenta/>
                </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;
