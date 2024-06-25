import React, { useState } from "react";
import { Link } from "react-router-dom";
import useLocalStorage from "../../useLocalStorage";
import "../NavBar/NavBar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAcc, setisOpenAcc] = useState(false);
  const [csrfToken, setCsrfToken] = useLocalStorage("tokenInit");
  const [logoutToken, setLogoutToken] = useLocalStorage("tokenClosed");
  const [nameUSer, setnameUSer] = useLocalStorage("Nombre de usuario");
  const [idu, setIdUser] = useLocalStorage("ID de usuaio");
  const [rolex, setRolex] = useLocalStorage("Roles de usuaio");
  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
    setisOpenAcc(!isOpenAcc);
  };
  const handleAcces = () => {
    setisOpenAcc(!isOpenAcc);
  };

  const cerrarSesion =()=>{
    setnameUSer("")
    setRolex("")
    console.log("Cerrar sesion")
    localStorage.clear();

console.log("Caché del localStorage borrado correctamente.");
  }
console.log("esto esta en nav"+nameUSer)


  return (
    <>
      <div
        class='navbar'
        style={{ padding: "0px 100px 0px 100px", position: "fixed" }}
      >
        <div className='menu' onClick={handleMenuToggle}>
          {isOpen ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='25'
              height='25'
              fill='currentColor'
              class='bi bi-x-lg'
              viewBox='0 0 16 16'
            >
              <path d='M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z' />
            </svg>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='30'
              height='30'
              fill='currentColor'
              class='bi bi-list'
              viewBox='0 0 16 16'
            >
              <path
                fill-rule='evenodd'
                d='M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5'
              />
            </svg>
          )}
        </div>
        <div>
          <h2><Link to='/'>AkDmic</Link></h2>
        </div>
        <div className='links'>
          <ul>
            <li>
              <Link to='/'>Inicio</Link>
            </li>
            {nameUSer == "" ? (
              <li>
                <Link to='/login'>Login</Link>
              </li>
            ) : null}
            {/* <li>
              <Link to='/todos-los-trbajos'>Empleos</Link>
            </li> */}
            {nameUSer !== "" && rolex.includes("administrator")|| rolex.includes("docente") || rolex.includes("estudiante")  ? (
              <li>
                <Link to='/dashboard'>Dashboard</Link>
              </li>
            ) : null}
            {nameUSer !== ""&& (rolex.includes("docente") || rolex.includes("administrator") ||rolex.includes("estudiante"))? (
              <li onClick={cerrarSesion} style={{color:"#dc3545",cursor:"pointer"}}>
                <a  href="/" style={{color:"#dc3545",cursor:"pointer"}}>

                Cerrar sesion{" "}
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  fill='currentColor'
                  class='bi bi-box-arrow-in-right'
                  viewBox='0 0 16 16'
                  >
                  <path
                    fill-rule='evenodd'
                    d='M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z'
                    />
                  <path
                    fill-rule='evenodd'
                    d='M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z'
                    />
                </svg>
                    </a>
              </li>
            ) : null}
          </ul>
        </div>
        {isOpen ? (
          <div className='links-verticales'>
            <ul>
              <li>
                <a href='#'>Inicio</a>
              </li>
              {nameUSer == "" ? (
              <li>
                <Link to='/login'>Login</Link>
              </li>
            ) : null}
            {nameUSer !== "" && rolex.includes("administrator")|| rolex.includes("docente") || rolex.includes("estudiante")  ? (
              <li>
                <Link to='/dashboard'>Dashboard</Link>
              </li>
            ) :   null}
                {nameUSer !== ""&& (rolex.includes("docente") || rolex.includes("administrator") ||rolex.includes("estudiante"))? (
              <li onClick={cerrarSesion} style={{color:"#dc3545",cursor:"pointer"}}>
                <a  href="/" style={{color:"#dc3545",cursor:"pointer"}}>

                Cerrar sesion{" "}
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  fill='currentColor'
                  class='bi bi-box-arrow-in-right'
                  viewBox='0 0 16 16'
                  >
                  <path
                    fill-rule='evenodd'
                    d='M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z'
                    />
                  <path
                    fill-rule='evenodd'
                    d='M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z'
                    />
                </svg>
                    </a>
              </li>
            ) : null}

            </ul>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Navbar;
