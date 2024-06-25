import React, { useState, useEffect } from "react";
import { Link, unstable_HistoryRouter } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import useLocalStorage from "../../useLocalStorage";

const Login = () => {
  const [user, setUser] = useState();
  const [pass, setPass] = useState();
  const [userpass, setUserPass] = useState("");
  const [csrfToken, setCsrfToken] = useLocalStorage("tokenInit");
  const [logoutToken, setLogoutToken] = useLocalStorage("tokenClosed");
  const [nameUSer, setnameUSer] = useLocalStorage("Nombre de usuario");
  const [idu, setIdUser] = useLocalStorage("ID de usuaio");
  const [rolex, setRolex] = useLocalStorage("Roles de usuaio");

  const url = import.meta.env.VITE_BACKEND_URL;


  function handleChangesetUser(event) {
    let em = event.target.value;
    setUser(em);
    console.log(em);
  }

  function handleChangesetPass(event) {
    let em = event.target.value;
    setPass(em);
  }
    function  Login(event) {
      event.preventDefault();
      axios.post(`${url}/user/login?_format=json`, {
        name: user,
        pass: pass
      })
      .then(function(response) {
        console.log(response);
        setnameUSer(response.data.current_user.name);
        setIdUser(response.data.current_user.uid );
        setRolex(response.data.current_user.roles);
        setCsrfToken(response.data.csrf_token);
        setLogoutToken(response.data.logout_token);

      // Refresca la página después de la autenticación
    window.location.href = "/dashboard";
      })
      .catch(function (error) {
        console.error("Error al iniciar sesión:", error);
        if (error.response && error.response.data.message === "Sorry, unrecognized username or password.") {
          setUserPass("Revisa usuario o contraseña");
          setUser("");
          setPass("");
        } else {
          setUserPass("Error al iniciar sesión. Por favor, inténtalo de nuevo.");
        }
      });
    }


  return (
    <>
     { nameUSer == "" ? <div className='bg-light py-md-5'>
        <div style={{ marginTop: "50px" }} className='container'>
          <div className='row justify-content-md-center'>
            <div className='col-12 col-md-11 col-lg-8 col-xl-7 col-xxl-6'>
              <div className='bg-white p-4 p-md-5 rounded shadow-sm'>
                <div className='row'>
                  <div className='col-12'>
                    <div className='mb-5'>
                      <h5 style={{ textAlign: "center" }}>AkDmic</h5>
                    </div>
                    <div className=''>
                      <h5 style={{ textAlign: "center" }}>
                      Autenticarse
                      </h5>
                      {userpass && <p style={{ color: "red" }}>{userpass}</p>}
                    </div>
                  </div>
                </div>
                <form action='#!'>
                  <div className='row gy-3 gy-md-4 overflow-hidden'>
                    <div className='col-12'>
                      <input
                        style={{ borderRadius: "0" }}
                        type='text'
                        className='form-control'
                        name='user'
                        id='user'
                        placeholder='Usuario'
                        required
                        onChange={handleChangesetUser}
                        value={user}
                      />
                    </div>
                    <div style={{ marginTop: "10px" }} className='col-12'>
                      <input
                        style={{ borderRadius: "0" }}
                        type='password'
                        id='pass'
                        name='pass'
                        class='form-control'
                        placeholder='Password'
                        onChange={handleChangesetPass}
                        value={pass}
                        aria-describedby='passwordHelpBlock'
                      />
                    </div>
                    <div className='d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-start'>
                      {/* <Link
                        to={`/contrasenna/${user}`}
                        className='link-secondary text-decoration-none'
                      >
                        Olvidaste la contraseña?
                      </Link> */}
                    </div>

                    <div style={{ margin: "0px" }} className='col-12'>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        className='d-grid flex-md-row'
                      >

                           <a
                           href="#"
                          style={{
                            borderRadius: "2px",
                            background: "#da0833",
                            color: "#FFF",
                            fontSize: "14px",
                          }}
                          className='btn btn-lg '
                          onClick={Login}
                          >
                       <Link to='/'></Link>
                          INGRESAR
                        </a>
                      </div>
                      {/* <div
                        style={{
                          textAlign: "center",
                          marginTop: "20px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        className='d-flex  gap-md-2 flex-column flex-md-row notienescuenta'
                      >
                        No tienes cuenta{" "}
                        <Link to='/registro' style={{ color: "#FFF" }}>
                          Crear cuenta
                        </Link>
                      </div> */}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>:null}
    </>
  );
};

export default Login;
