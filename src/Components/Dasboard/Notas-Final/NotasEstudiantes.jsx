import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import "./notasestudiantes.css";
import { createSvgIcon } from "@mui/material";
import useLocalStorage from "../../../useLocalStorage";
import { responsiveProperty } from "@mui/material/styles/cssUtils";

const NotasEstudiantes = () => {
  //Variables Local Storage
  const [csrfToken, setCsrfToken] = useLocalStorage("tokenInit");
  const [logoutToken, setLogoutToken] = useLocalStorage("tokenClosed");
  const [nameUSer, setnameUSer] = useLocalStorage("Nombre de usuario");
  const [idu, setIdUser] = useLocalStorage("ID de usuaio");
  const [rolex, setRolex] = useLocalStorage("Roles de usuaio");

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

  const [dataEstudiante, setDataEstudiante] = useState([]); //para guardar datos del estudiante
  const [notasEstudiantesB, setNotasEstudiantesB] = useState([]); //para guardar datos del estudiante
  const [notasEstudiantesMB, setNotasFinalesMB] = useState([]); //para guardar datos del estudiante

  // Datos Estudiantes
  useEffect(() => {
    axios
      .get("http://ahorasi.dd:8083/webformID?_format=json")
      .then((response) => {
        const nov = response.data;
        const webformJob = nov.filter(
          (item) => item.webform_id === "estudiante"
        );
        const requests = webformJob.map((item) =>
          axios.get(
            `http://ahorasi.dd:8083/webform_rest/estudiante/submission/${item.uuid}`
          )
        );
        Promise.all(requests)
          .then((responses) => {
            const registros = responses
              .map((response, index) => {
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
              })
              .filter((item) => item !== undefined);

            setDataEstudiante(registros);
          })
          .catch((error) => {
            console.error("Error al obtener los datos adicionales:", error);
          });
      });
  }, [idu]);

  const getfirst_name = (dataEstudiante) => {
    return dataEstudiante
      .filter((dataEstudiante) => dataEstudiante.first_name !== undefined)
      .map((dataEstudiante) => dataEstudiante.first_name);
  };

  const name = getfirst_name(dataEstudiante)[0]; ////Nivel

  const getlast_name = (dataEstudiante) => {
    return dataEstudiante
      .filter((dataEstudiante) => dataEstudiante.apellidos !== undefined)
      .map((dataEstudiante) => dataEstudiante.apellidos);
  };

  const apellidos = getlast_name(dataEstudiante)[0]; ////Nivel

  const getMiNivel = (dataEstudiante) => {
    return dataEstudiante
      .filter((dataEstudiante) => dataEstudiante.nivel !== undefined)
      .map((dataEstudiante) => dataEstudiante.nivel);
  };

  const nivele = getMiNivel(dataEstudiante)[0]; ////Nivel

  const getGrupo = (dataEstudiante) => {
    return dataEstudiante
      .filter((dataEstudiante) => dataEstudiante.grupo !== undefined)
      .map((dataEstudiante) => dataEstudiante.grupo);
  };

  const groupBy = getGrupo(dataEstudiante)[0]; ////Nivel

  const getCedula = (dataEstudiante) => {
    return dataEstudiante
      .filter((dataEstudiante) => dataEstudiante.cedula !== undefined)
      .map((dataEstudiante) => dataEstudiante.cedula);
  };

  const Cedula = getCedula(dataEstudiante)[0]; ////Nivel

  //////Ejecutar
  useEffect(() => {
    if (nivele === "Enseñanza General Básica Media") {
      Basica();
    } else if (
      nivele === "Enseñanza General Básica Superior" ||
      nivele === "Bachillerato"
    ) {
      mediaBachillerBasica();
    }
  }, [nivele]);

  ////////Notas si el estudianteñanza Basica

  function Basica() {
    {
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
                  if (data.data.usuario === idu) {
                    return {
                      asignatura: data.data.asignatura,
                      promedio2: data.data.promedio2,
                      proyecto_integrador_f1: data.data.proyecto_integrador_f1,
                      grade: data.data.grade,
                      semestre: data.data.semestre,
                      proyecto_interdisciplinario_90:
                        data.data.proyecto_interdisciplinario_90,
                      evaluacion_semestre_: data.data.evaluacion_semestre_,
                    };
                  }
                })
                .filter((item) => item !== undefined);

              setNotasFinalesMB(registros);
            })
            .catch((error) => {
              console.error("Error al obtener los datos adicionales:", error);
            });
        });
    }
  }

  ////////Notas si el estudianteñanza Media - Bachillerato
  function mediaBachillerBasica() {
    {
      let registros;
      axios
        .get("http://ahorasi.dd:8083/webformID?_format=json")
        .then((response) => {
          const nov = response.data;
          const webformJob = nov?.filter(
            (item) => item.webform_id === "notas_quinto_noveno_segundos"
          );

          const requests = webformJob?.map((item) =>
            axios.get(
              `http://ahorasi.dd:8083/webform_rest/notas_quinto_noveno_segundos/submission/${item.uuid}`
            )
          );
          Promise.all(requests)
            .then((responses) => {
              registros = responses
                .map((response, index) => {
                  const data = response.data;
                  if (
                    data.data.usuario === idu &&
                    data.data.semestre === "Semestre3"
                  ) {
                    return {
                      usuario: data.data.usuario,
                      asignatura: data.data.asignatura,
                      notafinal: data.data.notafinal,
                      semestre: data.data.semestre,
                    };
                  }
                })
                .filter((item) => item !== undefined);

              setNotasEstudiantesB(registros);
            })
            .catch((error) => {
              console.error("Error al obtener los datos adicionales:", error);
            });
        });
    }
  }
console.log(notasEstudiantesB)
  const columns = [
    {
      name: "asignatura",
      label: "Asignatura",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "notafinal",
      label: "Nota Final",
      options: {
        filter: true,
        sort: true,
      },
    },
  ];
  const columns1 = [
    {
      name: "first_name",
      label: "Nombre",
      options: {
        filter: true,
        sort: true,
      },
    },
  ];

  return (
    <>
      <section style={{ maxWidth: "100%" }} className="homeNotas">
        <div>
          <MUIDataTable
            title={`Notas del estudiante ${name} ${apellidos} del ${groupBy} de ${nivele}  Código de estudiante ${Cedula}`}
            columns={columns}
            data={notasEstudiantesB}
            options={options}
          />
        </div>
      </section>
    </>
  );
};

export default NotasEstudiantes;
