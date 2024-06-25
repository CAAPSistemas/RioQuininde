import * as React from "react";
import Modal from "@mui/material/Modal";


import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  OutlinedInput,
  Select,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import useLocalStorage from "../../../../useLocalStorage";
import { useEffect } from "react";
import UsuariosDasboard from "../UsuariosDasboard";


export default function KeepMountedModal2({
  handleOpened,
  handleCloseadd,
  openedadd,
}) {

const x=import.meta.env.VITE_BACKEND_URL;
console.log(x)

  const [userError, setUserError] = useState("");


  const [aeditar, setAeditar] = useState({});
  const [nivelOptions, setNivelOptions] = useState([
    "Enseñanza General Básica Media",
    "Enseñanza General Básica Superior",
    "Bachillerato",
  ]);
  const [grupoOptions, setGrupoOptions] = useState([
    "Segundo A",
    "Tercero A",
    "Cuarto A",
    "Quinto A",
    "Sexto A",
    "Séptimo A",
    "Octavo A",
    "Octavo B",
    "Noveno A",
    "Noveno B",
    "Décimo A",
    "Décimo B",
    "Bachillerato primero A",
    "Bachillerato primero B",
    "Bachillerato segundo A",
    "Bachillerato segundo B",
    "Bachillerato tercero A",
    "Bachillerato tercero B",
  ]);
  const [state, setState] = useState([]);

  const [statew, setStatew] = useState(false);

  const handleMultiple = (e) => {
    const {
      target: { value },
    } = e;
    setState(typeof value === "string" ? value.split(",") : value);
  };
  console.log(state);

  useEffect(() => {
    setAeditar((prevAeditar) => {
      return { ...prevAeditar, grupo: state };
    });
  }, [state]);

  let texto3;
  if (aeditar.grupo !== null && aeditar.grupo !== undefined) {
    const texto = aeditar.grupo;
    texto3 = texto.join(", ");
    console.log(texto3);
  } else {
    console.error("grupo is null or undefined");
  }

  function crearUser(event) {
    event.preventDefault();
    let re;

    axios
      .get("http://ahorasi.dd:8083/webformID?_format=json")
      .then((response) => {
        const webformJobb = response.data.filter(
          (item) => item.webform_id === "profesor"
        );
        const requests = webformJobb.map((item) =>
          axios.get(
            `http://ahorasi.dd:8083/webform_rest/profesor/submission/${item.uuid}`
          )
        );
        return Promise.all(requests);
      })
      .then((responses) => {
        const registros = responses
          .map((response, index) => {
            const data = response.data;
            if (
              data.data.correo === aeditar.correo ||
              data.data.usuario === aeditar.usuario
            ) {
              return {
                first_name: data.data.first_name,
                apellidos: data.data.apellidos,
                correo: data.data.correo,
                telefono: data.data.telefono,
                cedula: data.data.cedula,
                direcciones: data.data.direcciones,
                nivel: data.data.nivel,
                grupo: data.data.grupo,
                asignatura: data.data.asignatura,
                usuario: data.data.usuario,
              };
            }

            return null;
          })
          .filter(Boolean);

        if (registros.length > 0) {
          // Ya existe un registro con el mismo correo electrónico o usuario
          console.error(
            "Ya existe un registro con el mismo correo electrónico o usuario"
          );
          setUserError(
            "Ya existe un registro con el mismo correo electrónico o usuario"
          );

          return;
        }
else
{

  axios
  .post("http://ahorasi.dd:8083/webform_rest/submit", {
    headers: {
      "content-type": "application/json",
    },
    webform_id: "profesor",
    first_name: aeditar.first_name,
    apellidos: aeditar.apellidos,
    correo: aeditar.correo,
    telefono: aeditar.telefono,
    cedula: aeditar.cedula,
    direcciones: aeditar.direcciones,
    nivel: aeditar.nivel,
    momento: aeditar.momento,
    grupo: texto3,
    asignatura: aeditar.asignatura,
    usuario: aeditar.usuario,
    password: aeditar.password, // <--- Agregue esta línea
    rol: "administrador_docente",
  })
  .then((response) => {
    const nuevoRegistro = response.data;
    re = response.data.sid;
    console.log(re);
    return axios.post("http://ahorasi.dd:8083/user/register?_format=json", {
      name: [{ value: aeditar.usuario }],
      mail: [{ value: aeditar.correo }],
      pass: [{ value: aeditar.password }], // <--- Agregue esta línea
      roles: [{ target_id: "docente" }],
    });
  })
  .then((response) => {
    const h = response.data.uid[0].value;

    // console.log("ID del usuario obtenido:", h);
    console.log("ID webform:", re);

    // Realizar una solicitud PATCH con el ID del usuario
    return axios.patch(
      `http://ahorasi.dd:8083/webform_rest/profesor/submission/${re}`,
      { id_user: h }
    );
  })
  .then(() => {
    console.log("Registro y asociación de usuario completados con éxito");
    window.location.href = "/dashboard";
  })
  .catch((error) => {
    if (error.response.status === 409) {
      // El usuario o correo electrónico ya existe
      console.error("El usuario o correo electrónico ya existe");
      setUserError("El usuario o correo electrónico ya existe");
      setUsuario("");
      return;
    } else {
      // Otra excepción, no se puede manejar
      console.error("Ocurrió un error al registrar el usuario");
      setUserError("Ocurrió un error al registrar el usuario");
      setUsuario("");
      return;
    }
  });


}

            });



  }

  return (
    <div>
      <Modal
        keepMounted
        open={openedadd}
        onClose={handleCloseadd}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "60%", // Modificar el ancho al 80%
          height: "fit-content",
          p: 4,
          textAlign: "center", // Alineación centrada para los contenidos
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            height: "fit-content",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2>Adicionar usuario</h2>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <OutlinedInput
              id="outlined-first-name"
              type="text"
              aria-describedby="outlined-first-name-helper"
              inputProps={{
                "aria-label": "First Name",
              }}
              value={aeditar?.first_name || ""}
              onChange={(e) =>
                setAeditar({ ...aeditar, first_name: e.target.value })
              }
              size="small"
            />

            <FormHelperText id="outlined-first-name-helper">
              Nombre(s)
            </FormHelperText>
          </FormControl>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <OutlinedInput
              id="outlined-last-name"
              type="text"
              aria-describedby="outlined-last-name-helper"
              inputProps={{
                "aria-label": "Last Name",
              }}
              value={aeditar?.apellidos || ""}
              onChange={(e) =>
                setAeditar({ ...aeditar, apellidos: e.target.value })
              }
              size="small"
            />
            <FormHelperText id="outlined-last-name-helper">
              Apellidos
            </FormHelperText>
          </FormControl>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <OutlinedInput
              id="outlined-first-name"
              type="text"
              aria-describedby="outlined-first-name-helper"
              inputProps={{
                "aria-label": "First Name",
              }}
              value={aeditar?.cedula || ""}
              onChange={(e) =>
                setAeditar({ ...aeditar, cedula: e.target.value })
              }
              size="small"
            />
            <FormHelperText id="outlined-first-name-helper">
              Cedula
            </FormHelperText>
          </FormControl>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <OutlinedInput
              id="outlined-first-name"
              type="text"
              aria-describedby="outlined-first-name-helper"
              inputProps={{
                "aria-label": "First Name",
              }}
              value={aeditar?.telefono || ""}
              onChange={(e) =>
                setAeditar({ ...aeditar, telefono: e.target.value })
              }
              size="small"
            />
            <FormHelperText id="outlined-first-name-helper">
              Telefono
            </FormHelperText>
          </FormControl>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <OutlinedInput
              id="outlined-correo"
              type="email"
              placeholder="CORREO"
              aria-describedby="outlined-correo-helper"
              inputProps={{
                "aria-label": "Correo electrónico",
              }}
              value={aeditar?.correo || ""}
              onChange={(e) =>
                setAeditar({ ...aeditar, correo: e.target.value })
              }
              size="small"
            />
            {userError && (
              <FormHelperText id="outlined-correo-helper" sx={{ color: "red" }}>
                {userError}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <OutlinedInput
              id="outlined-first-name"
              type="text"
              aria-describedby="outlined-first-name-helper"
              inputProps={{
                "aria-label": "First Name",
              }}
              value={aeditar?.direcciones || ""}
              onChange={(e) =>
                setAeditar({ ...aeditar, direcciones: e.target.value })
              }
              size="small"
            />
            <FormHelperText id="outlined-first-name-helper">
              Dirección
            </FormHelperText>
          </FormControl>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <Select
              label="Nivel"
              value={aeditar?.nivel || ""}
              onChange={(e) =>
                setAeditar({ ...aeditar, nivel: e.target.value })
              }
            >
              {nivelOptions.map((nivel) => (
                <MenuItem value={nivel} key={nivel}>
                  {nivel}
                </MenuItem>
              ))}
            </Select>

            <FormHelperText id="outlined-nivel-helper">Nivel</FormHelperText>
          </FormControl>

          <FormControl
            variant="standard"
            size="large"
            sx={{ m: 1, minWidth: 120 }}
          >
            <Select multiple value={state} onChange={handleMultiple}>
              {grupoOptions.map((lang) => (
                <MenuItem key={lang} value={lang}>
                  {lang}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <OutlinedInput
              id="outlined-first-name"
              type="text"
              aria-describedby="outlined-first-name-helper"
              inputProps={{
                "aria-label": "First Name",
              }}
              value={aeditar?.asignatura || ""}
              onChange={(e) =>
                setAeditar({ ...aeditar, asignatura: e.target.value })
              }
              size="small"
            />
            <FormHelperText id="outlined-first-name-helper">
              Asignatura
            </FormHelperText>
          </FormControl>

          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <OutlinedInput
              id="outlined-first-name"
              type="text"
            placeholder="USUARIO"
              aria-describedby="outlined-first-name-helper"
              inputProps={{
                "aria-label": "First Name",
              }}
              value={aeditar?.usuario || ""}
              onChange={(e) =>
                setAeditar({ ...aeditar, usuario: e.target.value })
              }
              size="small"
            />
                {userError && (
              <FormHelperText id="outlined-correo-helper" sx={{ color: "red" }}>
                {userError}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <OutlinedInput
              id="outlined-first-name"
              type="password"
              aria-describedby="outlined-first-name-helper"
              inputProps={{
                "aria-label": "First Name",
              }}
              placeholder="PASSWORD"
              value={aeditar?.password || ""}
              onChange={(e) =>
                setAeditar({ ...aeditar, password: e.target.value })
              }
              size="small"
            />
             {userError && (
              <FormHelperText id="outlined-correo-helper" sx={{ color: "red" }}>
                {userError}
              </FormHelperText>
            )}
          </FormControl>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              sx={{ mr: 2 }}
              onClick={crearUser}
            >
              Crear
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                handleCloseadd();
                console.log("first");
              }}
            >
              Cancelar
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
