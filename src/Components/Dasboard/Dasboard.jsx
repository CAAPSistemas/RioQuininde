import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import useLocalStorage from "../../useLocalStorage";
import AsistenciaDashboard from "./Asistencia/AsistenciaDashboard";
import UsuariosDasboard from "./UsuarioDashboard/UsuariosDasboard";
import EstudianteDashboard from "./EstudianteDashboard/EstudianteDashboard";
import DashboardNotas from "./Notas/DashboardNotas";
import DashBoardMediaBachillerato from "./Notas Media-Bachillerato/DashBoardMediaBachillerato";
import axios from "axios";
import NotasEstudiantes from "./Notas-Final/NotasEstudiantes";

function CustomTabPanel(props) {
  const [csrfToken, setCsrfToken] = useLocalStorage("tokenInit");
  const [logoutToken, setLogoutToken] = useLocalStorage("tokenClosed");
  const [nameUSer, setnameUSer] = useLocalStorage("Nombre de usuario");
  const [idu, setIdUser] = useLocalStorage("ID de usuaio");
  const [rolex, setRolex] = useLocalStorage("Roles de usuaio");
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(6);
  const [csrfToken, setCsrfToken] = useLocalStorage("tokenInit");
  const [logoutToken, setLogoutToken] = useLocalStorage("tokenClosed");
  const [nameUSer, setnameUSer] = useLocalStorage("Nombre de usuario");
  const [idu, setIdUser] = useLocalStorage("ID de usuaio");
  const [rolex, setRolex] = useLocalStorage("Roles de usuaio");
  const [asignatura, setAsignatura] = useState([]); //para guardar info sobre el docente

  const [grupoEspecial, setgrupoEspecial] = useState([
    "Séptimo A",
    "Séptimo B",
    "Décimo A",
    "Décimo B",
  ]);

  useEffect(() => {
    console.log("entro useeffect");
    axios
      .get("http://ahorasi.dd:8083/webformID?_format=json")
      .then((response) => {
        const nov = response.data;
        const webformJob = nov.filter((item) => item.webform_id === "profesor");
        const requests = webformJob.map((item) =>
          axios.get(
            `http://ahorasi.dd:8083/webform_rest/profesor/submission/${item.uuid}`
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
            setAsignatura(registros);
          })
          .catch((error) => {
            console.error("Error al obtener los datos adicionales:", error);
          });
      });
  }, [idu]);

  const nivelProfesores = asignatura
    .filter((nivel) => nivel !== undefined)
    .map((nivel) => nivel.nivel);
  const nivelString = nivelProfesores[0];
  console.log(nivelString);

  const gruposProfesores = asignatura
    .filter((grupo) => grupo !== undefined)
    .map((grupo) => grupo.grupo);
  const grupoArray = gruposProfesores.map((group) =>
    group.split(/,\s*/).map((ESTUDIO) => ESTUDIO.trim())
  );
  console.log(grupoArray);

  // Asignatura que imparte el profesor
  const materia = asignatura
    .filter((asignatura) => asignatura !== undefined)
    .map((asignatura) => asignatura.asignatura);
  const clase = materia[0];
  console.log("las" + clase);

  const gruposEncontrados = grupoArray
    .map((grupo) => {
      return grupo.some((elemento) => grupoEspecial.includes(elemento));
    })
    .filter((boolean) => boolean);
  console.log(gruposEncontrados);
  if (gruposEncontrados.length > 0) {
    console.log("Encontrados los grupos especiales:", gruposEncontrados);
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      {
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons={false}
              aria-label="scrollable prevent tabs example"
              sx={{ marginTop: "100px" }}

            >

              {nameUSer !== "" && rolex.includes("administrator") ? (
                <Tab label="Profesores" {...a11yProps(0)} />
              ) : (
                <Tab label="Profesores" {...a11yProps(0)} disabled />
              )}

              {nameUSer !== "" && rolex.includes("administrator") ? (
                <Tab label="Estudiantes" {...a11yProps(1)} />
              ) : (
                <Tab label="Estudiantes" {...a11yProps(1)} disabled />
              )}

              {nameUSer !== "" && rolex.includes("docente") ? (
                <Tab label="Asistencia" {...a11yProps(2)} />
              ) : (
                <Tab label="Asistencia" {...a11yProps(2)} disabled />
              )}

              {nameUSer !== "" &&
              rolex.includes("docente") &&
              nivelString === "Enseñanza General Básica Media" ? (
                <Tab label="Notas Básica" {...a11yProps(3)} />
              ) : (
                <Tab label="Notas Básica" {...a11yProps(3)} disabled />
              )}

              {(nameUSer !== "" &&
                rolex.includes("docente") &&
                (nivelString === "Enseñanza General Básica Superior" ||
                  nivelString === "Bachillerato")) ||
              gruposEncontrados.length != 0 ? (
                <Tab label="Notas Media-Bachillerato " {...a11yProps(4)} />
              ) : (
                <Tab
                  label="Notas Media-Bachillerato "
                  {...a11yProps(4)}
                  disabled
                />
              )}

              {nameUSer !== "" && rolex.includes("estudiante") ? (
                <Tab label="Mis Notas " {...a11yProps(5)} />
              ) : (
                <Tab label="Mis Notas" {...a11yProps(5)} disabled />
              )}
            </Tabs>
          </Box>

          <CustomTabPanel value={value} index={0}>
            <UsuariosDasboard />
          </CustomTabPanel>

          <CustomTabPanel value={value} index={1}>
            <EstudianteDashboard />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <AsistenciaDashboard />
          </CustomTabPanel>

          <CustomTabPanel value={value} index={3}>
            <DashboardNotas />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={4}>
            <DashBoardMediaBachillerato />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={5}>
            <NotasEstudiantes />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={6}>
            <h1>Panel de administración</h1>
          </CustomTabPanel>
        </Box>
        // )
      }
    </>
  );
}
