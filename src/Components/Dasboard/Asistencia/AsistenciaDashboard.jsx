import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import "./asistencia.css";
import { createSvgIcon } from "@mui/material";
import KeepMountedModalAsistencia from "./ModalEditarAsistencia.jsx/EditarAsistencia";
import useLocalStorage from "../../../useLocalStorage";

const AsistenciaDashboard = () => {


    //Variables Local Storage
    const [csrfToken, setCsrfToken] = useLocalStorage("tokenInit");
  const [logoutToken, setLogoutToken] = useLocalStorage("tokenClosed");
  const [nameUSer, setnameUSer] = useLocalStorage("Nombre de usuario");
  const [idu, setIdUser] = useLocalStorage("ID de usuaio");
  const [rolex, setRolex] = useLocalStorage("Roles de usuaio");

console.log(idu);
  const [openasis, setOpenAsis] = React.useState(false);
  const handleAsistencia = () => setOpenAsis(true);
   const [grupo, setGrupo] = useState([]);
   const [id_grupo, setIdGrupo] = useState("");
   const  [id_edit, setIdEdit]= useState("");

   const [selectedRowAsis, setSelectedRowAsis] = useState("");

   const [openedaddAsis, setOpenedaddAsis] = React.useState(false);
   const handleOpenedaddAsis = () => setOpenedaddAsis(true);
   const handleCloseedaddAsis= () => setOpenedaddAsis(false);

  const [AsisUid, setAsisUid]=useState([]);
   const [EstudianteAsis, setEstudianteAsis] = useState([]);

   const [grA, setgrA]=useState([]);//para guardar datos del docente


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
             setgrA(registros);
           })
           .catch((error) => {
             console.error("Error al obtener los datos adicionales:", error);
           });
       });
   }, [idu]);

   const getMateria = (grA) => {
    return grA
      .filter((gr) => gr !== undefined)
      .map((gr) => gr.asignatura);
  };


  const materia = getMateria(grA)[0];

  console.log(materia)

    const gruposProfesoress = grA.filter((grupo) => grupo !== undefined).map((grupo) => grupo.grupo);

    const obtenerGruposProfesores = (grA) => {
    return grA.filter((grupo) => grupo !== undefined).map((grupo) => grupo.grupo);
  };


   const grupoArray = gruposProfesoress.map(group => group.split(/,\s*/).map(ESTUDIO => ESTUDIO.trim()));



   const gruposProfesores = obtenerGruposProfesores(grA)[0];
   console.log(gruposProfesores);
  const columns = [
    {
      name: "title",
      label: "Nombre",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "materia",
      label: "Editar",
      options: {
        customBodyRender: (value) => {
          return (
            <>
              <svg
                onClick={() => {
                  handleOpenedaddAsis();
                   setSelectedRowAsis(value);




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
    selectableRowsHideCheckboxes: true,

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
    <>

<KeepMountedModalAsistencia
        handleOpenedaddAsis={handleOpenedaddAsis}
        handleCloseedaddAsis={handleCloseedaddAsis}
        openedaddAsis={openedaddAsis}
        title={selectedRowAsis}
        grupos={gruposProfesores}
        AsisUid={AsisUid}
        EstudianteAsis={EstudianteAsis}
        materia={materia}
      />


      <div style={{ maxWidth: "100%" }}>
        <MUIDataTable
          title={"Lista de grupos"}
          data={grupoArray}
          columns={columns}
          options={options}
          // onRowClick={(rowData) => handleRowClick(rowData)}

        />
      </div>
    </>
  );
};

export default AsistenciaDashboard;
