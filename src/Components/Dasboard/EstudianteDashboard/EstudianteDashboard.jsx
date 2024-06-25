import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import KeepMountedModal3 from "./ModalCrearEstudiante/ModalCrearEstudiante";
import KeepMountedModal4 from "./ModalEditarEstudiante/ModalEditarEstudiante";
import KeepMountedModal5 from "./ModalEliminarEstudiante/ModalEliminarEstudiante";
import "./estudiante.css";

import { createSvgIcon } from "@mui/material";

const EstudianteDashboard = () => {
  const [open, setOpen] = React.useState(false);

  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedRow1, setSelectedRow1] = useState(null);

  const [estudiante, setEstudiante] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [opened, setOpened] = React.useState(false);
  const handleOpened = () => setOpened(true);
  const handleCloseed = () => setOpened(false);
  const [openedadd, setOpenedadd] = React.useState(false);
  const handleOpenedadd = () => setOpenedadd(true);
  const handleCloseedadd = () => setOpenedadd(false);

  const options = {
    // filterType: "checkbox",
    rowsPerPageOptions: [5, 10, 15, 100],
    selectableRowsHideCheckboxes: true,
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
          handleOpenedadd();
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
  //  Array de muestra de maquetado
  useEffect(() => {
    console.log("entro useeffect");
    axios
      .get("http://ahorasi.dd:8083/webformID?_format=json")
      .then((response) => {
        const nov = response.data;
        const webformJob = nov?.filter(
          (item) => item.webform_id === "estudiante"
        );
        const requests = webformJob?.map((item) =>
          axios.get(
            `http://ahorasi.dd:8083/webform_rest/estudiante/submission/${item.uuid}`
          )
        );
        Promise.all(requests)
          .then((responses) => {
            const registros = responses.map((response, index) => {
              const data = response.data;
              const registro = {
                id_user: data.data.id_user,
                first_name: data.data.first_name,
                apellidos: data.data.apellidos,
                cedula: data.data.cedula,
                telefono: data.data.telefono,
                correo: data.data.correo,
                usuario: data.data.usuario,
                nivel: data.data.nivel,
                direcciones: data.data.direcciones,
                grupo: data.data.grupo,

                submission_id: data.entity.sid[0].value,
                submission_uuid: data.entity.uuid[0].value,
              };
              return registro;
            });
            setEstudiante(registros);
          })
          .catch((error) => {
            console.error("Error al obtener los datos adicionales:", error);
          });
      });
  }, []);

  console.log(estudiante);
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
      name: "correo",
      label: "Correo",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "nivel",
      label: "Nivel",
      options: {
        filter: true,
        sort: false,
      },
    },

    {
      name: "grupo",
      label: "Grupos",
      options: {
        filter: true,
        sort: false,
      },
    },

    {
      name: "submission_id",
      label: "Eliminar",
      options: {
        customBodyRender: (value, tableMeta) => {
          return (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-trash2"
                viewBox="0 0 16 16"
                onClick={() => {
                  handleOpen();
                  // console.log(value);
                  setSelectedRow1(value);
                }}
              >
                <path d="M14 3a.7.7 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671L2.037 3.225A.7.7 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2M3.215 4.207l1.493 8.957a1 1 0 0 0 .986.836h4.612a1 1 0 0 0 .986-.836l1.493-8.957C11.69 4.689 9.954 5 8 5s-3.69-.311-4.785-.793" />
              </svg>
            </>
          );
        },
      },
    },
    {
      name: "submission_uuid",
      label: "Editar",
      options: {
        customBodyRender: (value) => {
          return (
            <>
              <svg
                onClick={() => {
                  handleOpened();
                  console.log(value);
                  setSelectedRow(value);
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

  return (
    <>
      <KeepMountedModal3
        handleOpenedadd={handleOpenedadd}
        handleCloseadd={handleCloseedadd}
        openedadd={openedadd}
        id={selectedRow1}
      />
      <KeepMountedModal4
        handleOpened={handleOpened}
        handleCloseed={handleCloseed}
        opened={opened}
        id={selectedRow}
        estudiante={estudiante}
      />
      <KeepMountedModal5
        handleOpen={handleOpen}
        handleClose={handleClose}
        open={open}
        id={selectedRow1}
        estudiante={estudiante}
      />

      <div style={{ maxWidth: "100%" }}>
        <MUIDataTable
          title={"Lista de Estudiantes"}
          data={estudiante}
          columns={columns}
          options={options}
        />
      </div>
    </>
  );
};

export default EstudianteDashboard;
