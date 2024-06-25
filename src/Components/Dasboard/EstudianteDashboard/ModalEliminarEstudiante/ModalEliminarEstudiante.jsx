import * as React from "react";
import Modal from "@mui/material/Modal";
import {
  Box,
  Button,
  ButtonBase,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  OutlinedInput,
  TextField,
  withStyles,
} from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { CloseFullscreen } from "@mui/icons-material";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function KeepMountedModal5({
  handleOpen,
  handleClose,
  open,
  id,
  estudiante,
}) {
  const [aeliminar, setAeliminar] = useState({});

  console.log(id);
  useEffect(() => {
    const usuarioAEliminar = estudiante?.filter(
      (estudiante) => estudiante.submission_id === id
    );
    if (usuarioAEliminar.length > 0) {
      setAeliminar(usuarioAEliminar[0]);
    } else {
      setAeliminar(null); // asignar null o un valor por defecto si no se encontró el usuario
    }
  }, [id, estudiante]);

  // Eliminar user
  function eliminar_User(event) {
    event.preventDefault();
    axios
      .get("http://ahorasi.dd:8083/webformID?_format=json")
      .then((response) => {
        const del = response.data;
        const delJob = del.filter((item) => item.webform_id === "estudiante");
        const ci = delJob.find((we) => we.sid === id.toString());
        const ide = ci.uuid;
        const cid = ci.sid;

        console.log("ide: " + ide);
        console.log("cid:" + cid);
        axios
          .get(
            `http://ahorasi.dd:8083/webform_rest/estudiante/submission/${ide}`
          )
          .then((response) => {
            const data = response.data;
            const idUser = data.data.id_user;
            console.log("idUser: " + idUser);
            // Eliminar al usuario
            axios
              .delete(`http://ahorasi.dd:8083/user/${idUser}?_format=json)`)
              .then(() => {
                console.log("Usuario eliminado exitosamente.");

                // Eliminar la tupla del formulario
                axios
                  .delete(
                    `http://ahorasi.dd:8083/admin/structure/webform/manage/{webform}/submission/${cid}`
                  )
                  .then(() => {
                    console.log("Tupla del formulario eliminada exitosamente.");
                    window.location.href = "/dashboard";

                    handleClose();
                  })
                  .catch((error) => {
                    console.error(
                      "Error al eliminar la tupla del formulario:",
                      error
                    );
                  });
              })
              .catch((error) => {
                console.error("Error al eliminar usuario:", error);
              });
          })
          .catch((error) => {
            console.error("Error al obtener los datos del usuario:", error);
          });
      })
      .catch((error) => {
        console.error("Error al obtener los datos de webformID:", error);
      });
  }

  return (
    <div>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
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
          <h2>Eliminar usuario</h2>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={eliminar_User}
              sx={{ mr: 2 }}
            >
              Ok
            </Button>
            <Button variant="contained" color="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <div></div>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
