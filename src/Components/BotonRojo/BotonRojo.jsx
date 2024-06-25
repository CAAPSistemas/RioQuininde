import React from "react";
import "../BotonRojo/BotonRojo.css";

const BotonRojo = ({ text }) => {
  return (
    <>      
      <button
        style={{
          width: "180px",
          height: "60px",
          background: "#da0833",
          border: "0",
        }}
      >
        {text}
      </button>
    </>
  );
};

export default BotonRojo;
