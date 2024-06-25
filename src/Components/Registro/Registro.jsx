import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Registro.css";
import axios from "axios";
import useLocalStorage from "../../useLocalStorage";

const Registro = () => {
  const [name, setName] = useState();
  const [apellidos, setapellidos] = useState();
  const [cedula, setCedula] = useState();
  const [correo, setCorreo] = useState();
  const [phone, setPhone] = useState();
  const [ocupacionActual, setOcupacionActual] = useState();
  const [resumen, setResumen] = useState();
  const [experienciaLaboral, setexperienciaLaboral] = useState();
  const [habilidades, setHabilidades] = useState();
  const [fortalezas, setFortalezas] = useState();
  const [educacion, setEducacion] = useState();
  const [idioma, setIdioma] = useState();
  const [direccion, setDireccion] = useState();
  const [usuario, setUsuario] = useState();
  const [password, setPassword] = useState();
  const [idForm, setIdForm] = useState({});
  const [idUser, setIdUser] = useState([]);
  const [userName, setuserName] = useState([]);
 const [userError, setUserError] = useState("");



  function handleChangeName(event) {
    let em = event.target.value;
    setName(em);
    console.log(em);
  }

  function handleChangeapellidos(event) {
    let em = event.target.value;
    setapellidos(em);
    console.log(em);
  }

  function handleChangesetCedula(event) {
    let em = event.target.value;
    setCedula(em);
    console.log(em);
  }

  function handleChangesetCorreo(event) {
    let em = event.target.value;
    setCorreo(em);
    console.log(em);
  }

  function handleChangesetPhone(event) {
    let em = event.target.value;
    setPhone(em);
    console.log(em);
  }

  function handleChangesetOcupacionActual(event) {
    let em = event.target.value;
    setOcupacionActual(em);
    console.log(em);
  }

  function handleChangesetResumen(event) {
    let em = event.target.value;
    setResumen(em);
    console.log(em);
  }

  function handleChangesetUsuario(event) {
    let em = event.target.value;
    setUsuario(em);
    console.log(em);
  }

  function handleChangesetPassword(event) {
    let em = event.target.value;
    setPassword(em);
  }

  function handleChangeExperienciaLaboral(event) {
    let em = event.target.value;
    setexperienciaLaboral(em);
  }

  const handleChangeHabilidades = (event) => {
    setHabilidades(event.target.value);
  };

  const handleChangeFortalezas = (event) => {
    setFortalezas(event.target.value);
  };
  const handleChangeEducacion = (event) => {
    setEducacion(event.target.value);
  };

  const handleChangeIdioma = (event) => {
    setIdioma(event.target.value);
  };
  const handleChangeDireccion = (event) => {
    setDireccion(event.target.value);
  };
  function enviarRegistro(event) {
    event.preventDefault();
    let re;
    axios
      .post("http://ahorasi.dd:8083/webform_rest/submit", {
        headers: {
          "content-type": "application/json",
        },
        webform_id: "job_application",
        first_name: name,
        apellidos: apellidos,
        correo: correo,
        telefono: phone,
        cedula: cedula,
        direcciones: direccion,
        resumen: resumen,
        educacion: educacion,
        ocupacion_actual: ocupacionActual,
        fortalezas: fortalezas,
        habilidades: habilidades,
        idioma: idioma,
        usuario: usuario,
        password: password,
        experiencia_laboral: experienciaLaboral,
        postulante: "postulante",
      })
      .then((response) => {
        /*setNameLocalStorage(name);
        setLastNameLocalStorage(lastName);
        setCedulaLocalStorage(cedula);
        setCorreoLocalStorage(correo);
        setPhoneLocalStorage(telefono);
        setOcupacionActualLocalStorage(ocupacionActual);
        setResumenLocalStorage(resumen);
        setExperienciaLaboralLocalStorage(experienciaLaboral);
        setHabilidadesLocalStorage(habilidades);
        setFortalezasLocalStorage(fortalezas);
        setEducacionLocalStorage(educacion);
        setIdiomaLocalStorage(idioma);
        setDireccionLocalStorage(direccion);
*/
        re = response.data.sid;
        console.log(re);
        return axios.post("http://ahorasi.dd:8083/user/register?_format=json", {
          name: [{ value: usuario }],
          mail: [{ value: correo }],
          pass: [{ value: password }],
          roles: [{ target_id: "postulante" }],
        });
      })
      .then((response) => {
        const h = response.data.uid[0].value;

        // console.log("ID del usuario obtenido:", h);
        console.log("ID webform:", re);

        // Realizar una solicitud PATCH con el ID del usuario
        return axios.patch(
          `http://ahorasi.dd:8083/webform_rest/job_application/submission/${re}`,
          { id_user: h }
        );
      })
      .then(() => {
        console.log("Registro y asociación de usuario completados con éxito");
      })
      .catch(function (error) {
        if (error.response) {
          if (
            error.response.data.message ===
            "Unprocessable Entity: validation failed.\nname: The username hunya is already taken.\n"
          ) {
            console.error(
              "El nombre de usuario ya está en uso. Por favor, elige otro nombre."
            );
            setUserError(
              "El nombre de usuario ya está en uso. Por favor, elige otro nombre."
            );
            setUsuario("");
          } else {
            console.error(
              "Ocurrió un error durante la solicitud:",
              error.response.data
            );
          }
        } else {
          console.error(
            "Ocurrió un error durante la solicitud:",
            error.message
          );
        }
        setErr(true);
      });
  }

  console.log(idUser);
  console.log(userName);
  console.log(idForm);

  return (
    <>
      <div className="bg-light py-md-5">
        <div style={{ marginTop: "50px" }} className="container">
          <div className="row justify-content-md-center">
            <div className="col-12 col-md-11 col-lg-8 col-xl-7 col-xxl-6">
              <div className="bg-white p-4 p-md-5 rounded shadow-sm">
                <div className="row">
                  <div className="col-12">
                    <div className="mb-5">
                      <h5 style={{ textAlign: "center" }}>MEGAKONS SA</h5>
                    </div>
                  </div>
                </div>
                <form action="#!">
                  <div className="row gy-3 gy-md-4 overflow-hidden">
                    <div className="col-12">
                      <input
                        style={{ borderRadius: "0" }}
                        type="text"
                        className="form-control"
                        name="name"
                        id="name"
                        placeholder="Nombre(s)"
                        required
                        onChange={handleChangeName}
                        value={name}
                      />
                    </div>
                    <div className="col-12">
                      <input
                        style={{ borderRadius: "0" }}
                        type="text"
                        className="form-control"
                        name="apellidos"
                        id="apellidos"
                        placeholder="apellidos"
                        required
                        value={apellidos}
                        onChange={handleChangeapellidos}
                      />
                    </div>
                    <div className="col-12">
                      <input
                        style={{ borderRadius: "0" }}
                        type="email"
                        className="form-control"
                        name="correo"
                        id="correo"
                        placeholder="Email"
                        required
                        onChange={handleChangesetCorreo}
                        value={correo}
                      />
                    </div>
                    <div className="col-12">
                      <input
                        style={{ borderRadius: "0" }}
                        type="number"
                        className="form-control"
                        name="phone"
                        id="phone"
                        placeholder="Telefono"
                        required
                        onChange={handleChangesetPhone}
                        value={phone}
                      />
                    </div>{" "}
                    <div className="col-12">
                      <input
                        style={{ borderRadius: "0" }}
                        type="number"
                        className="form-control"
                        name="cedula"
                        id="cedula"
                        placeholder="Cedula"
                        required
                        onChange={handleChangesetCedula}
                        value={cedula}
                      />
                    </div>
                    <div style={{ marginTop: "10px" }} className="col-12">
                      <input
                        style={{ borderRadius: "0" }}
                        type="text"
                        className="form-control"
                        name="direccion"
                        id="direccion"
                        placeholder="Dirección"
                        onChange={handleChangeDireccion}
                        value={direccion}
                      />
                    </div>
                    <div className="col-12">
                      <textarea
                        style={{ borderRadius: "0" }}
                        type="text"
                        className="form-control"
                        name="resumen"
                        id="resumen"
                        placeholder="Resumen"
                        required
                        onChange={handleChangesetResumen}
                        value={resumen}
                      />
                    </div>
                    <div style={{ marginTop: "10px" }} className="col-12">
                      <input
                        style={{ borderRadius: "0" }}
                        type="text"
                        className="form-control"
                        name="educacion"
                        id="educacion"
                        placeholder="Educación"
                        onChange={handleChangeEducacion}
                        value={educacion}
                      />
                      <div style={{ marginTop: "10px" }} className="col-12">
                        <input
                          style={{ borderRadius: "0" }}
                          type="number"
                          className="form-control"
                          name="experienciaLaboral"
                          id="experienciaLaboral"
                          placeholder="Años de experiencia laboral"
                          onChange={handleChangeExperienciaLaboral}
                          value={experienciaLaboral}
                        />
                      </div>
                      <div style={{ marginTop: "10px" }} className="col-12">
                        <input
                          style={{ borderRadius: "0" }}
                          type="text"
                          className="form-control"
                          name="fortalezas"
                          id="fortalezas"
                          placeholder="Fortalezas"
                          onChange={handleChangeFortalezas}
                          value={fortalezas}
                        />
                      </div>
                      <div style={{ marginTop: "10px" }} className="col-12">
                        <input
                          style={{ borderRadius: "0" }}
                          type="text"
                          className="form-control"
                          name="habilidades"
                          id="habilidades"
                          placeholder="Habilidades (separadas por coma)"
                          onChange={handleChangeHabilidades}
                          value={habilidades}
                          multiple
                        />
                      </div>
                    </div>
                    <div style={{ marginTop: "10px" }} className="col-12">
                      <textarea
                        style={{ borderRadius: "0" }}
                        className="form-control"
                        name="idioma"
                        id="idioma"
                        placeholder="Idiomas (separados por coma)"
                        onChange={handleChangeIdioma}
                        value={idioma}
                      />
                    </div>
                    <div className="col-12">
                      <input
                        style={{ borderRadius: "0" }}
                        type="text"
                        className="form-control"
                        name="ocupacionActualname"
                        id="ocupacionActualname"
                        placeholder="Ocupacion actual"
                        required
                        onChange={handleChangesetOcupacionActual}
                        value={ocupacionActual}
                      />
                    </div>
                    <div className="col-12">
                      <input
                        style={{ borderRadius: "0" }}
                        type="text"
                        className="form-control"
                        name="usuario"
                        id="usuario"
                        placeholder="Usuario"
                        required
                        onChange={handleChangesetUsuario}
                        value={usuario}
                      />{" "}
                      {userError && <p style={{ color: "red" }}>{userError}</p>}
                    </div>
                    <div style={{ marginTop: "10px" }} className="col-12">
                      <input
                        style={{ borderRadius: "0" }}
                        type="password"
                        id="password"
                        name="password"
                        class="form-control"
                        placeholder="Password"
                        aria-describedby="passwordHelpBlock"
                        onChange={handleChangesetPassword}
                        value={password}
                      />
                    </div>
                    <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-start"></div>
                    <div style={{ margin: "0px" }} className="col-12">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        className="d-grid flex-md-row"
                      >
                        <button
                          style={{
                            borderRadius: "2px",
                            background: "#da0833",
                            color: "#FFF",
                            fontSize: "14px",
                          }}
                          className="btn btn-lg"
                          onClick={enviarRegistro}
                        >
                          INGRESAR
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registro;
