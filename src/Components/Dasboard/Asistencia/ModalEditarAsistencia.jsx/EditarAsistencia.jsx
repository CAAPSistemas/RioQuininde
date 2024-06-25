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
import KeepMountedModalAsistenciaSave from "../ModalAsistenciaSave/ModalAsistenciaSave";
import KeepMountedModalAsistenciaDetail from "../ModalAsistenciaDetail/ModalAsistenciaDetail";

export default function KeepMountedModalAsistencia({
  handleOpenedaddAsis,
  handleCloseedaddAsis,
  openedaddAsis,
  title,
  grupos,
  EstudianteAsis,
  AsisUid,
materia,
groupedGrupos,


}) {

  console.log(grupos )
  const [aeditar, setAeditar] = useState({});
  const [saved, setSaved] = useState([]);
  // const [asistencia, setAsistencia] = React.useState(false);
  const handleAsistencia = () => setAsistencia(true);
  const [RowAsistencia, setSelectedRowAsistencia] = useState(null);
  const handleClose = () => setAsistencia(false);
  const [asistenciaDetail, setAsistenciaDetail] = React.useState(false);
  const handleAsistenciaDetail = () => setAsistenciaDetail(true);
  const [RowAsistenciaDetail, setSelectedRowDetail] = useState(null);
  const [asistenciaRegistered, setAsistenciaRegistered] = useState(false);

  const handleCloseDetail = () => setAsistenciaDetail(false);

  const [iduser, setUser] = useState();

  console.log(EstudianteAsis)
  console.log(AsisUid)
  const [estadoOptions, setEstadoOptions] = useState([
    "Presente",
    "Justificado",
    "Injustificado",
  ]);

  const istrue = openedaddAsis;
  let registros = []; // Definir 'registros' en un ámbito más amplio

  useEffect(() => {
    if (istrue) {
      EditarAsistenciaUsuario(title);

    }
  }, [istrue, title]);


  const [selectValue, setSelectValue] = useState([]);
  const [respuesta, setRespuesta] = useState({});



  useEffect(() => {
    axios.get("http://ahorasi.dd:8083/webformID?_format=json")
    .then((response) => {
      const nove = response.data;
      const webformJobb = nove.filter(
        (item) => item.webform_id === "asistencia"
      );
      const requests = webformJobb.map((item) =>
        axios.get(
          `http://ahorasi.dd:8083/webform_rest/asistencia/submission/${item.uuid}`
        )
      );
      return Promise.all(requests);
    })
    .then((responses) => {
      const registros = responses
        .map((response, index) => {
          const data = response.data;

            return {
              usuario: data.data.usuario,
              estado: data.data.estado,

              submission_id: data.entity.sid[0].value,
              submission_uuid: data.entity.uuid[0].value,
            };


          return null;
        })
        .filter(Boolean);
        setRespuesta(registros);
    });
  }, []);



  function EditarAsistenciaUsuario(title) {
    axios
      .get("http://ahorasi.dd:8083/webformID?_format=json")
      .then((response) => {
        const nove = response.data;

        const webformJobb = nove.filter(
          (item) => item.webform_id === "estudiante"
        );

        const requests = webformJobb.map((item) =>
          axios.get(
            `http://ahorasi.dd:8083/webform_rest/estudiante/submission/${item.uuid}`
          )
        );

        Promise.all(requests).then((responses) => {
          registros = responses
            .map((response, index) => {
              const data = response.data;

              if (data.data.grupo === grupos) {
                return {
                  first_name: data.data.first_name,
                  apellidos: data.data.apellidos,
                  cedula: data.data.cedula,
                  nivel: data.data.nivel,
                  id_user: data.data.id_user,
                  grupo: data.data.grupo,
                  submission_id: data.entity.sid[0].value,
                  submission_uuid: data.entity.uuid[0].value,
                };
              }

              return null;
            })
            .filter(Boolean);

          setSaved(registros);
        });
      })
      .catch((error) => {
        console.error("Error al obtener datos del webform:", error);
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
      name: "id_user",
      label: "Asistencia",
      options: {
        customBodyRender: (value) => {

            const today = new Date();
            const month = today.getMonth() + 1; // Mes actual (1-12)
            const year = today.getFullYear();
            const days = [];
            const getDayName = (day) => {
              const dayNames = ["D", "L", "M", "Mi", "J", "V", "S"];
              return dayNames[day - 1];
            };
            for (let i = 1; i <= new Date(year, month, 0).getDate(); i++) {
              const day = new Date(year, month - 1, i);
              if (day.getDay() !== 0 && day.getDay() !== 6) { // 0 = Sunday, 6 = Saturday
                days.push(i);
              }
            }
          const initialState = new Array(days.length).fill({
            estado: true,
            justificado: false,
            injustificado: false,
          });
          const inputs = initialState.map((dia, index) => (
            <div key={index} style={{ display: "inline-block", margin: "5px" }}>
              <label style={{ display: "flex" }}>
                <span>
                  {getDayName(
                    new Date(year, month - 1, days[index]).getDay() + 1
                  )}
                  <span>{days[index]}</span>
                </span>
              </label>



              <Select
                label="Nivel"
                onChange={(e) => {

                  handleAsistenciaRegister(
                    value,
                    days[index],
                    month,
                    year,
                    e.target.value,
                    title,
                    materia
                  );
                }}
                value={""}
              >

                {estadoOptions.map((estado) => (
                  <MenuItem value={estado} key={estado}>
                    {estado}
                  </MenuItem>
                ))}
              </Select>
            </div>
          ));
          return (
            <div style={{ display: "flex", flexWrap: "wrap" }}>{inputs}</div>
          );
        },
      },
    },

    {
      name: "id_user",
      label: "Resumen del mes",
      options: {
        customBodyRender: (value) => {

          return (
            <>
              <svg
                onClick={() => {
                  handleAsistenciaDetail();
                  console.log(value)
                    setSelectedRowDetail(value);

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


  const handleAsistenciaRegister = (
    idUser,
    day,
    month,
    year,
    estado,
    title,
    materia
  ) => {
    const fechaok = year + "-" + month + "-" + day;
    // console.log(fechaok);

    axios
      .get("http://ahorasi.dd:8083/webformID?_format=json")
      .then((response) => {
        const nove = response.data;
        const webformJobb = nove.filter(
          (item) => item.webform_id === "asistencia"
        );
        const requests = webformJobb.map((item) =>
          axios.get(
            `http://ahorasi.dd:8083/webform_rest/asistencia/submission/${item.uuid}`
          )
        );
        return Promise.all(requests);
      })
      .then((responses) => {
        const registros = responses
          .map((response, index) => {
            const data = response.data;
            if (
              data.data.usuario === idUser &&
              data.data.fecha.includes(fechaok)
            ) {
              return {
                usuario: data.data.usuario,
                estado: data.data.estado,

                submission_id: data.entity.sid[0].value,
                submission_uuid: data.entity.uuid[0].value,
              };
            }

            return null;
          })
          .filter(Boolean);
          // setSelectValue(estado);

        if (registros.length === 0) {
          axios
            .post("http://ahorasi.dd:8083/webform_rest/submit", {
              headers: {
                "content-type": "application/json",
              },
              webform_id: "asistencia",
              fecha: fechaok,
              estado: estado,
              usuario: idUser,
              asignatura: materia,
              grupo: title,

            })
            .then((response) => {


            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          // La tupla existe, editar con el nuevo estado
          axios
            .patch(
              `http://ahorasi.dd:8083/webform_rest/asistencia/submission/${registros[0].submission_uuid}`,
              {
                webform_id: "asistencia",
                estado: estado,
              }
            )
            .then((response) => {

              setSelectValue(response.data);

            })
            .catch((error) => {
              console.error(error);
            });
        }
      });
  };



  const options = {
    // filterType: "checkbox",
    rowsPerPageOptions: [5, 10, 15, 100],
    selectableRowsHideCheckboxes: true,
    selectableRowsOnClick: false,
    selectableRowsHeader: false,
    responsive: 'standard',

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
        open={openedaddAsis}
        onClose={handleCloseedaddAsis}
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
          <h2>Actualizar asistencia</h2>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
             {/* <KeepMountedModalAsistenciaSave
                handleAsistencia={handleAsistencia}
                handleClose={handleClose}
                asistencia={asistencia}
                usuario={RowAsistencia}
                estudiante={saved}
              /> */}

              <KeepMountedModalAsistenciaDetail
                handleAsistenciaDetail={handleAsistenciaDetail}
                handleCloseDetail={handleCloseDetail}
                usuario1={RowAsistenciaDetail}
                asistenciaDetail={asistenciaDetail}
                materia={materia}
              />

            <div style={{ maxWidth: "100%" }}>
              <MUIDataTable
                title={"Lista de Estudiantes"}
                data={saved}
                columns={columns}
                 options={options}
              />
            </div>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
