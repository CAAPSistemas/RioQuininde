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
  createSvgIcon,
} from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import MUIDataTable from "mui-datatables";

export default function KeepMountedModalAsistenciaSave({


    handleAsistencia,
    handleClose,
    asistencia,
    usuario,
    estudiante
  ,
}) {


   const [aeditar, setAeditar] = useState({});
   const [estados, setEstados] = useState(["Presente", "Ausente"]);

   const [errorMensaje, setErrorMensaje] = useState(null);

// Función para agregar un registro al array







function EditarAsistenciaSave(event) {

    event.preventDefault();


    axios
      .post("http://ahorasi.dd:8083/webform_rest/submit", {
        headers: {
          "content-type": "application/json",
        },
        webform_id: "asistencia",
        fecha: aeditar.fecha,
        estado: aeditar.estado,
        usuario:usuario


      })
      .then((response) => {

        agregarRegistro(aeditar.estado, aeditar.fecha);


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



const columns = [
    {
      name: "first_name",
      label: "Nombre",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "apellidos",
      label: "Apellidos",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "cedula",
      label: "Código Estudiante",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
        name: "programacion ",
        label: "Asistencia",
        options: {
          customBodyRender: (value) => {
            return (
              <>
                <svg
                  onClick={() => {
                    handleAsistencia();
                    console.log(value);
                    setSelectedRowAsistencia(value);
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-pencil-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                </svg>
              </>
            );
          },
        },
      },

  ];


const options = {
    // filterType: "checkbox",
    rowsPerPageOptions: [5, 10, 15, 100],
    selectableRowsHideCheckboxes: false,
    selectableRowsOnClick: false,
    selectableRowsHeader: false,
    responsive: {
      density: 2,
      responsive: {
        breakpointDefinition: {
          xs: 0,
          sm: 600,
          md: 960,
          lg: 1280,
          xl: 1920
        }
      },
      scroll: {
        body: true, // habilita el desplazamiento para el cuerpo de la tabla
        toolbar: false // deshabilita el desplazamiento para el toolbar
      }

    },
    customToolbar: () => (
      <PlusIcon
        onClick={() => {
          handleOpenedaddAsis();
        }}
        style={{ cursor: "pointer" }}
      />
    ),
  };
  const PlusIcon = createSvgIcon(
    // credit: plus icon from https://heroicons.com/

    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="#6c757d"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </svg>,
    "Plus"
  );
  return (
    <div>
      <Modal
        keepMounted
        open={asistencia}
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
          <h2>Asistencia {errorMensaje && <p>{errorMensaje}</p>}</h2>


          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <OutlinedInput
              id="outlined-first-name"
              type="text"

              aria-describedby="outlined-first-name-helper"
              inputProps={{
                "aria-label": "First Name",
              }}
              value={aeditar?.fecha || ""}
              onChange={(e) =>
                setAeditar({ ...aeditar, fecha: e.target.value })
              }
              size="small"
            />
            <FormHelperText id="outlined-first-name-helper">
              Fecha
            </FormHelperText>
          </FormControl>

<FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <Select
              label="Estado"
              value={aeditar?.estado || ""}
              onChange={(e) =>
                setAeditar({ ...aeditar, estado: e.target.value })
              }
            >
              {estados.map((e) => (
                <MenuItem value={e} key={e}>
                  {e}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText id="outlined-nivel-helper">
             Estado

            </FormHelperText>
          </FormControl>


          </Box>
          <Button
              variant="contained"
              color="primary"
              onClick={EditarAsistenciaSave}


              sx={{ mr: 2 }}
            >
              Ok
            </Button>
        </Box>
      </Modal>
    </div>
  );
}
