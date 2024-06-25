import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import "./basica.css";
import { createSvgIcon } from "@mui/material";
import KeepMountedModalAddNotas from "../Notas/RegistrarNotasB/RegistrarBasica";
import useLocalStorage from "../../../useLocalStorage";
import { responsiveProperty } from "@mui/material/styles/cssUtils";
import KeepMountedModalEditNotasBasica from "./EditarNotas/EditarBasica";
import KeepMountedModalAddNotasBasica from "../Notas/RegistrarNotasB/RegistrarBasica";
import KeepMountedModalNotasBasica from "./ResumenNotasB/ResumenNotasB";

const DashboardNotas = () => {
  //Variables Local Storage
  const [csrfToken, setCsrfToken] = useLocalStorage("tokenInit");
  const [logoutToken, setLogoutToken] = useLocalStorage("tokenClosed");
  const [nameUSer, setnameUSer] = useLocalStorage("Nombre de usuario");
  const [idu, setIdUser] = useLocalStorage("ID de usuaio");
  const [rolex, setRolex] = useLocalStorage("Roles de usuaio");

  //Estado estudiante
  const [estudiante, setEstudiante] = useState([]);

  //Estados Open Modal Adicionar notas
  const [openNotasBs, setOpenNotasBs] = React.useState(false);
  const handleOpenNotasBs = () => setOpenNotasBs(true);
  const handleCloseNotasBs = () => setOpenNotasBs(false);

  // {/* Evaluación CUALITATIVA */}
  const [openNotasEB, setOpenNotasEB] = React.useState(false);
  const handleOpenNotasEB = () => setOpenNotasEB(true);
  const handleCloseNotasEB = () => setOpenNotasEB(false);
  //Por usuario
  const [SelectedRowNotasb, setSelectedRowNotasb] = useState(null);////usuario
  const [selectedRowNotasEb, setSelectedRowNotasEb] = useState(null);/////conducta
  //Notas 2
  const [postNotasb, setPostNotasb] = useState([]);
  const [postNotas2b, setPostNotas2b] = useState([]);
  const [postNotas3b, setPostNotas3b] = useState([]);

  // Estados Resumen de Notas
  const [openNotasB, setOpenNotasB] = React.useState(false);
  const handleOpenNotasB = () => setOpenNotasB(true);
  const handleCloseNotasB = () => setOpenNotasB(false);
  const [selectedRowNotasB, setSelectedRowNotasB] = useState(null);////Notas

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
          xl: 1920,
        },
      },
      scroll: {
        body: true, // habilita el desplazamiento para el cuerpo de la tabla
        toolbar: false, // deshabilita el desplazamiento para el toolbar
      },
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

  const [asignatura, setAsignatura]=useState([]);//para guardar datos del docente

  // profesor
  useEffect(() => {
    console.log("entro useeffect");
    axios
      .get("http://ahorasi.dd:8083/webformID?_format=json")
      .then((response) => {
        const nov = response.data;
        const webformJob = nov.filter(
          (item) => item.webform_id === "profesor"
        );
        const requests = webformJob.map((item) =>
          axios.get(
            `http://ahorasi.dd:8083/webform_rest/profesor/submission/${item.uuid}`
          )
        );
        Promise.all(requests)
          .then((responses) => {
            const registros = responses.map((response, index) => {
              const data = response.data;
              if (data.data.id_user === idu) {
                return {
                  id_user: data.data.id_user,
                  first_name: data.data.first_name,
                  apellidos: data.data.apellidos,
                  cedula: data.data.cedula,
                  telefono: data.data.telefono,
                  correo: data.data.correo,
                  usuario: data.data.usuario,
                  nivel: data.data.nivel,
                  momento: data.data.momento,
                  direcciones: data.data.direcciones,
                  grupo: data.data.grupo,
                  asignatura: data.data.asignatura,
                  submission_id: data.entity.sid[0].value,
                  submission_uuid: data.entity.uuid[0].value,
                };
              }
            }).filter((item) => item !== undefined);
            console.log(registros)
            setAsignatura(registros);
          })
          .catch((error) => {
            console.error("Error al obtener los datos adicionales:", error);
          });
      });
  }, [idu]);


  const getMateria = (asignaturas) => {
    return asignaturas
      .filter((asignatura) => asignatura !== undefined)
      .map((asignatura) => asignatura.asignatura);
  };

  const materia = getMateria(asignatura)[0];
  console.log(materia)

  //Notas 2do-3ero-4to
  useEffect(() => {
    let registros;
    axios
      .get("http://ahorasi.dd:8083/webformID?_format=json")
      .then((response) => {
        const nov = response.data;
        const webformJob = nov?.filter(
          (item) => item.webform_id === "notas_segundo_tercero_cuartos"
        );

        const requests = webformJob?.map((item) =>
          axios.get(
            `http://ahorasi.dd:8083/webform_rest/notas_segundo_tercero_cuartos/submission/${item.uuid}`
          )
        );
        Promise.all(requests)
          .then((responses) => {
            registros = responses
              .map((response, index) => {
                const data = response.data;

                return {
                  semestre: data.data.semestre,
                  usuario: data.data.usuario,
                  lecciones_orales_escritas_1:
                    data.data.lecciones_orales_escritas_1,
                  lecciones_orales_escritas_2:
                    data.data.lecciones_orales_escritas_2,
                  lecciones_orales_escritas_3:
                    data.data.lecciones_orales_escritas_3,
                  cualitativo_orales: data.data.cualitativo_orales,
                  prueba_base_estructurada_1:
                    data.data.prueba_base_estructurada_1,
                  prueba_base_estructurada_2:
                    data.data.prueba_base_estructurada_2,
                  prueba_base_estructurada_3:
                    data.data.prueba_base_estructurada_3,
                  cualitativo_pruebabase: data.data.cualitativo_pruebabase,
                  tareas_ejercicios_1: data.data.tareas_ejercicios_1,
                  tareas_ejercicios_2: data.data.tareas_ejercicios_2,
                  tareas_ejercicios_3: data.data.tareas_ejercicios_3,
                  cualitativo_tareas_ejercicios:
                    data.data.cualitativo_tareas_ejercicios,
                  proyectos_investigaciones_1:
                    data.data.proyectos_investigaciones_1,
                  proyectos_investigaciones_2:
                    data.data.proyectos_investigaciones_2,
                  proyectos_investigaciones_3:
                    data.data.proyectos_investigaciones_3,
                  cualitativo_proyectos_investigaciones_:
                    data.data.cualitativo_proyectos_investigaciones_,
                  exposiciones_foros_1: data.data.exposiciones_foros_1,
                  exposiciones_foros_2: data.data.exposiciones_foros_2,
                  exposiciones_foros_3: data.data.exposiciones_foros_3,
                  cualitativo_expo_foros: data.data.cualitativo_expo_foros,
                  talleres_1: data.data.talleres_1,
                  talleres_2: data.data.talleres_2,
                  talleres_3: data.data.talleres_3,
                  cualitativo_talleres: data.data.cualitativo_talleres,
                  aportes_cualitativo_s1: data.data.aportes_cualitativo_s1,
                  proyecto_integrador_f1: data.data.proyecto_integrador_f1,
                  lidera: data.data.lidera,
                  cumple: data.data.cumple,
                  reiterado: data.data.reiterado,
                  ocasional: data.data.ocasional,
                  nocumple: data.data.nocumple,
                  cualitativo_proyecto_integrador_f1:
                    data.data.cualitativo_proyecto_integrador_f1,
                  submission_id: data.entity.sid[0].value,
                  submission_uuid: data.entity.uuid[0].value,
                };

                return null;
              })
              .filter(Boolean);
              setPostNotasb(registros);
              setPostNotas2b(registros);
              setPostNotas3b(registros);


          })
          .catch((error) => {
            console.error("Error al obtener los datos adicionales:", error);
          });
      });
  }, []);

 //  Estudiantes
 useEffect(() => {
  axios
    .get("http://ahorasi.dd:8083/webformID?_format=json")
    .then((response) => {
      const nov = response.data;
      const webformJob = nov?.filter((item) => item.webform_id === "estudiante");
      const requests = webformJob?.map((item) =>
        axios.get(`http://ahorasi.dd:8083/webform_rest/estudiante/submission/${item.uuid}`)
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
              };
              return registro;

          }).filter((item) => item !== undefined);
          setEstudiante(registros);
        })
        .catch((error) => {
          console.error("Error al obtener los datos adicionales:", error);
        });
    });
  }, []);

//Notas 2do-3ero-4to
  useEffect(() => {
    let registros;
    axios
    .get("http://ahorasi.dd:8083/webformID?_format=json")
    .then((response) => {
      const nov = response.data;
      const webformJob = nov?.filter(
        (item) => item.webform_id ==="notas_segundo_tercero_cuartos"
      );

      const requests = webformJob?.map((item) =>
        axios.get(
          `http://ahorasi.dd:8083/webform_rest/notas_segundo_tercero_cuartos/submission/${item.uuid}`
        )
      );
      Promise.all(requests).then((responses) => {
          registros = responses
            .map((response, index) => {
              const data = response.data;

                return {

                  semestre:data.data.semestre,
                  usuario: data.data.usuario,
                  lecciones_orales_escritas_1:
                    data.data.lecciones_orales_escritas_1,
                  lecciones_orales_escritas_2:
                    data.data.lecciones_orales_escritas_2,
                  lecciones_orales_escritas_3:
                    data.data.lecciones_orales_escritas_3,
                  cualitativo_orales: data.data.cualitativo_orales,
                  prueba_base_estructurada_1: data.data.prueba_base_estructurada_1,
                  prueba_base_estructurada_2: data.data.prueba_base_estructurada_2,
                  prueba_base_estructurada_3: data.data.prueba_base_estructurada_3,
                  cualitativo_pruebabase: data.data.cualitativo_pruebabase,
                  tareas_ejercicios_1: data.data.tareas_ejercicios_1,
                  tareas_ejercicios_2: data.data.tareas_ejercicios_2,
                  tareas_ejercicios_3: data.data.tareas_ejercicios_3,
                  cualitativo_tareas_ejercicios:
                    data.data.cualitativo_tareas_ejercicios,
                  proyectos_investigaciones_1:data.data.proyectos_investigaciones_1,
                  proyectos_investigaciones_2:data.data.proyectos_investigaciones_2,
                  proyectos_investigaciones_3:data.data.proyectos_investigaciones_3,
                  cualitativo_proyectos_investigaciones_:
                    data.data.cualitativo_proyectos_investigaciones_,
                  proyectos_1: data.data.proyectos_1,
                  proyectos_2: data.data.proyectos_2,
                  proyectos_3: data.data.proyectos_3,
                  exposiciones_foros_1: data.data.exposiciones_foros_1,
                  exposiciones_foros_2: data.data.exposiciones_foros_2,
                  exposiciones_foros_3: data.data.exposiciones_foros_3,
                  cualitativo_expo_foros: data.data.cualitativo_expo_foros,
                  talleres_1: data.data.talleres_1,
                  talleres_2: data.data.talleres_2,
                  talleres_3: data.data.talleres_3,
                  cualitativo_talleres: data.data.cualitativo_talleres,
                  productos1: data.data.productos1,
                  productos2: data.data.productos2,
                  productos3: data.data.productos3,
                  asignatura:data.data.asignatura,

                  aportes_cualitativo_s1: data.data.aportes_cualitativo_s1,
                  proyecto_integrador_f1: data.data.proyecto_integrador_f1,
                  cualitativo_proyecto_integrador_f1:
                    data.data.cualitativo_proyecto_integrador_f1,
                  lidera: data.data.lidera,
                  cumple: data.data.cumple,
                  reiterado: data.data.reiterado,
                  ocasional: data.data.ocasional,
                  nocumple: data.data.nocumple,
                  semestre: data.data.semestre,
                  submission_id: data.entity.sid[0].value,
                  submission_uuid: data.entity.uuid[0].value,




                };

              return null;
            }   )
            .filter(Boolean);
            setPostNotasb(registros);
            setPostNotas2b(registros);
            setPostNotas3b(registros);


        })
        .catch((error) => {
          console.error("Error al obtener los datos adicionales:", error);
        });
    });

  }, []);

//Grupos del profesor autenticado
const gruposProfesoresb = asignatura.filter((grupo) => grupo !== undefined).map((grupo) => grupo.grupo);
//Estudiante's que pertenencen al grupo al que él profesor imparte clases
const grupoArrayb = gruposProfesoresb.map(group => group.split(/,\s*/).map(ESTUDIO => ESTUDIO.trim()));
const resultadob = new Set();
grupoArrayb.forEach((grupo) => {
  estudiante.filter((estudiante) => grupo.includes(estudiante.grupo)).forEach((estudiante) => {
    resultadob.add(estudiante);

  });
});
const resultadoArrayb = Array.from(resultadob);

  const columns = [
    {
      name: "cedula",
      label: "Código",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "first_name",
      label: "Nombre",
      options: {
        filter: true,
        sort: true,
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
      name: "id_user",
      label: "Adicionar",
      options: {
        customBodyRender: (value) => {
          return (
            <>
              <svg
                onClick={() => {
                  handleOpenNotasBs();
                  console.log(value);
                  setSelectedRowNotasb(value);
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
    {
      name: "id_user",
      label: "Resumen de conducta",
      options: {
        customBodyRender: (value) => {
          return (
            <>
              <svg
                onClick={() => {
                  handleOpenNotasB();
                  setSelectedRowNotasEb(value);
                  console.log(value);
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
    {
      name: "id_user",
      label: "Resumen de Notas",
      options: {
        customBodyRender: (value) => {
          return (
            <>
              <svg
                onClick={() => {
                  handleOpenNotasEB();
                  setSelectedRowNotasB(value);
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
      {/* Registro de Notas */}
      <KeepMountedModalAddNotasBasica
        handleOpenNotasBs={handleOpenNotasBs}
        handleCloseNotasBs={handleCloseNotasBs}
         openNotasBs={openNotasBs}
        id={SelectedRowNotasb}
        id2={SelectedRowNotasb}
        id3={SelectedRowNotasb}
        postNotasb={postNotasb}
        postNotas2b={postNotas2b}
        postNotas3b={postNotas3b}
        asignatura={asignatura}
        estudiante={estudiante}
      />

      {/* Evaluación CUALITATIVA */}
      <KeepMountedModalEditNotasBasica
        handleOpenNotasB={handleOpenNotasB}
        handleCloseNotasB={handleCloseNotasB}
        openNotasB={openNotasB}
        id={selectedRowNotasEb}
        postNotasb={postNotasb}
      />

      {/* Evaluación CUANTITATIVA*/}
      <KeepMountedModalNotasBasica
        openNotasEB={openNotasEB}
       handleOpenNotasEB={handleOpenNotasEB}
       handleCloseNotasEB={handleCloseNotasEB}
        idM={selectedRowNotasB}
      clase={materia}

      />

      <div style={{ maxWidth: "100%" }}>
        <MUIDataTable
          title={"Educación Básica Elemental"}
          data={resultadoArrayb}
          columns={columns}
          options={options}
        />
      </div>
    </>
  );
};

export default DashboardNotas;
