import React, { useEffect, useState } from "react";
import Acciones from "../Acciones/Acciones";
import Copyright from "../Copyright/Copyright";

import Home from "../Home/Home";

const Principal = () => {
  return (
    <>
      <Home />
      <Acciones />
      <Copyright />
    </>
  );
};

export default Principal;
