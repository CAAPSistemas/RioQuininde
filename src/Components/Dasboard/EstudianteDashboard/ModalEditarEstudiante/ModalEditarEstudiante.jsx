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
import { useEffect } from "react";
import axios from "axios";

export default function KeepMountedModal4({
  handleOpened,
  handleCloseed,
  opened,
  id,
  estudiante,
}) {
  const [aeditar, setAeditar] = useState({});
  const [nivelOptions, setNivelOptions] = useState([
    "Enseñanza General Básica Media",
    "Enseñanza General Básica Superior",
    "Bachillerato",
  ]);

  console.log(id);

  useEffect(() => {
    const usuarioAEditar = estudiante?.filter(
      (estudiante) => estudiante.submission_uuid === id
    );
    if (usuarioAEditar) {
      setAeditar(usuarioAEditar[0]);
    }
  }, [id]);
  console.log(aeditar);
  // console.log("A editar trae esto:"+aeditar[0]);
  // Editar Usuario function
  function editar_User(event) {
    event.preventDefault();

    axios
      .patch(
        `http://ahorasi.dd:8083/webform_rest/estudiante/submission/${id}`,
        {
          webform_id: "estudiante",
          first_name: aeditar.first_name,
          apellidos: aeditar.apellidos,
          correo: aeditar.correo,
          telefono: aeditar.telefono,
          cedula: aeditar.cedula,
          direcciones: aeditar.direcciones,
          nivel: aeditar.nivel,
          grupo: aeditar.grupo,
          usuario: aeditar.usuario,
          password: aeditar.password,
          rol: "estudiante",
        }
      )
      .then((response) => {
        axios
          .get(
            `http://ahorasi.dd:8083/webform_rest/estudiante/submission/${id}`
          )
          .then((response) => {
            const data = response.data;
            console.log(data);
            const idUser = data.data.id_user;
            console.log(idUser);
            axios
              .patch(`http://ahorasi.dd:8083/user/${idUser}?_format=json`, {
                name: [{ value: aeditar.usuario }],
                mail: [{ value: aeditar.correo }],
              })
              .then(() => {
                console.log("Datos actualizados y enviados con éxito");
                handleCloseed();
                window.location.href = "/dashboard";
                console.log(aeditar.password);
              })
              .catch((error) => {
                console.error("Ocurrió un error durante la solicitud:", error);
              });
          })
          .catch((error) => {
            console.error("Ocurrió un error al obtener la respuesta:", error);
          });
      })
      .catch((error) => {
        console.error("Ocurrió un error durante la solicitud:", error);
      });
  }

  return (
    <div>
      <Modal
        keepMounted
        open={opened}
        onClose={handleCloseed}
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
          <h2>Editar usuario</h2>
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
              id="outlined-first-name"
              type="text"
              aria-describedby="outlined-first-name-helper"
              inputProps={{
                "aria-label": "First Name",
              }}
              value={aeditar?.correo || ""}
              onChange={(e) =>
                setAeditar({ ...aeditar, correo: e.target.value })
              }
              size="small"
            />
            <FormHelperText id="outlined-first-name-helper">
              Correo
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
              value={aeditar?.direcciones || ""}
              onChange={(e) =>
                setAeditar({ ...aeditar, direcciones: e.target.value })
              }
              size="small"
            />
            <FormHelperText id="outlined-first-name-helper">
              Direccion
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

          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <OutlinedInput
              id="outlined-first-name"
              type="text"
              aria-describedby="outlined-first-name-helper"
              inputProps={{
                "aria-label": "First Name",
              }}
              value={aeditar?.grupo || ""}
              onChange={(e) =>
                setAeditar({ ...aeditar, grupo: e.target.value })
              }
              size="small"
            />
            <FormHelperText id="outlined-first-name-helper">
              Grupo
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
              value={aeditar?.usuario || ""}
              onChange={(e) =>
                setAeditar({ ...aeditar, usuario: e.target.value })
              }
              size="small"
            />
            <FormHelperText id="outlined-first-name-helper">
              Usuario
            </FormHelperText>
          </FormControl>

          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <OutlinedInput
              id="outlined-first-name"
              type="password"
              aria-describedby="outlined-first-name-helper"
              inputProps={{
                "aria-label": "First Name",
              }}
              value={aeditar?.password || ""}
              onChange={(e) =>
                setAeditar({ ...aeditar, password: e.target.value })
              }
              size="small"
            />
            <FormHelperText id="outlined-first-name-helper">
              Password
            </FormHelperText>
          </FormControl>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              sx={{ mr: 2 }}
              onClick={editar_User}
            >
              Editar
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCloseed}
            >
              Cancelar
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
