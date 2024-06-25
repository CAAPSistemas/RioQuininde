import * as React from "react";
import Modal from "@mui/material/Modal";
import { useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  OutlinedInput,
  Select,
  MenuItem,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Grid,
  Divider,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import axios from "axios";

export default function NotasSemestre1Basica({ saved1, idM }) {
  //*** Semestres 1 variables útiles*/////
  let promedioL; ///Promedio de lecciones escritas
  let promedioP; //// Promedio Pruebas escritas
  let promedioT; //// Promedio Tareas
  let promedioPI; //// Promedio Proyecto Investigaciones
  let promdioPr; ////Promedio Proyectos
  let promedioExpos; ///Promedio Exposiciones
  let promedioTaller; ///Promedio Talleres
  let promedioGIIS1; ///// Promedio Actividades GrupalesISemestreI
  let proyecto_integrador; ////Proyecto Integrador
  let evaluacionSemestre1;

/////**Cualitativos Variables /// */
let lecciones;
let pruebas;
let tareas;
let investigaciones;
let proyectos;
let exposiciones;
let talleres;
let prAportes;
let cualitativoIntegrador;
let periodoAcademico;



 //******************************************** Promedio Lecciones Escrita Semestre 1 *******************************************************************/
  function leccionesEscritasSemestre1() {
    let summa;
    const l1 = saved1
      .map((registro) => parseInt(registro.lecciones_orales_escritas_1))
      .filter((campo) => campo !== "");
    const l2 = saved1
      .map((registro) => parseInt(registro.lecciones_orales_escritas_2))
      .filter((campo) => campo !== "");
    const l3 = saved1
      .map((registro) => parseInt(registro.lecciones_orales_escritas_3))
      .filter((campo) => campo !== "");

    if (l1.length > 0 && l2.length > 0 && l3.length > 0) {
      summa =
        l1.reduce((acc, current) => acc + current, 0) +
        l2.reduce((acc, current) => acc + current, 0) +
        l3.reduce((acc, current) => acc + current, 0);
      promedioL = summa / 3; ///Promedio de lecciones escritas
    }
    if (!isNaN(promedioL)) {
    if (promedioL= 3) {
      lecciones = "A";
    } else if (promedioL=2) {
      lecciones = "EP";
    } else if (promedioL=1) {
      lecciones = "I";
    } else if (promedioL=0) {
      lecciones = "NE";
    }

      const submissionUuids = saved1.map((registro) => registro.submission_uuid  );
      axios
        .patch(
          `http://ahorasi.dd:8083/webform_rest/notas_segundo_tercero_cuartos/submission/${submissionUuids}`,
          {
            webform_id: "notas_segundo_tercero_cuartos",
            cualitativo_orales: lecciones,
          }
        )
        .then((response) => {})
        .catch((error) => {
          console.error("Ocurrió un error durante la solicitud:", error);
        });
      }
    return lecciones;
  }
  const leccionesS1 = leccionesEscritasSemestre1(); //// Imprimir función promedio lecciones escritas

  //******************************************** Promedio Pruebas Semestre 1 *******************************************************************/
  function pruebasSemestre1() {
    let summa;
    const p1 = saved1
      .map((registro) => parseInt(registro.prueba_base_estructurada_1))
      .filter((campo) => campo !== "");
    const p2 = saved1
      .map((registro) => parseInt(registro.prueba_base_estructurada_2))
      .filter((campo) => campo !== "");
    const p3 = saved1
      .map((registro) => parseInt(registro.prueba_base_estructurada_3))
      .filter((campo) => campo !== "");

    if (p1.length > 0 && p2.length > 0 && p3.length > 0) {
      summa =
        p1.reduce((acc, current) => acc + current, 0) +
        p2.reduce((acc, current) => acc + current, 0) +
        p3.reduce((acc, current) => acc + current, 0);
      promedioP = summa / 3; ///Promedio de pruebas Escritas
    }


    if (!isNaN(promedioP)) {

    if (promedioP= 3) {
      pruebas = "A";
    } else if (promedioP=2) {
      pruebas = "EP";
    } else if (promedioP=1) {
      pruebas = "I";
    } else if (promedioP=0) {
      pruebas = "NE";
    }


      const submissionUuids = saved1.map(
        (registro) => registro.submission_uuid
      );

      axios
        .patch(
          `http://ahorasi.dd:8083/webform_rest/notas_segundo_tercero_cuartos/submission/${submissionUuids}`,
          {
            webform_id: "notas_segundo_tercero_cuartos",
            cualitativo_pruebabase: pruebas,
          }
        )
        .then((response) => {})
        .catch((error) => {
          console.error("Ocurrió un error durante la solicitud:", error);
        });
      }
    return pruebas;
  }
  const pruebasS1 = pruebasSemestre1(); //// Imprimir función promedio pruebas escritas

//******************************************** Promedio Tareas Semestre 1 *******************************************************************/
function tareasSemestre1() {
  let summa;
  const t1 = saved1
    .map((registro) => parseInt(registro.tareas_ejercicios_1))
    .filter((campo) => campo !== "");
  const t2 = saved1
    .map((registro) => parseInt(registro.tareas_ejercicios_2))
    .filter((campo) => campo !== "");
  const t3 = saved1
    .map((registro) => parseInt(registro.tareas_ejercicios_3))
    .filter((campo) => campo !== "");

  if (t1.length > 0 && t2.length > 0 && t3.length > 0) {
    summa =
      t1.reduce((acc, current) => acc + current, 0) +
      t2.reduce((acc, current) => acc + current, 0) +
      t3.reduce((acc, current) => acc + current, 0);
    promedioT = summa / 3; ///Promedio de Tareas
  }

  if (promedioT= 3) {
    tareas = "A";
  } else if (promedioT=2) {
    tareas = "EP";
  } else if (promedioT=1) {
    tareas = "I";
  } else if (promedioT=0) {
    tareas = "NE";
  }

    const submissionUuids = saved1.map(
      (registro) => registro.submission_uuid
    );

    axios
      .patch(
        `http://ahorasi.dd:8083/webform_rest/notas_segundo_tercero_cuartos/submission/${submissionUuids}`,
        {
          webform_id: "notas_segundo_tercero_cuartos",
          cualitativo_tareas_ejercicios: tareas,
        }
      )
      .then((response) => {})
      .catch((error) => {
        console.error("Ocurrió un error durante la solicitud:", error);
      });

  return tareas;
}
const tareasS1 = tareasSemestre1(); //// Imprimir función promedio tareas


  //******************************************** Promedio Investigaciones Semestre 1 *******************************************************************/
  function inventigacionesSemestre1() {
    let summa;
    const pi1 = saved1
      .map((registro) => parseInt(registro.proyectos_investigaciones_1))
      .filter((campo) => campo !== "");
    const pi2 = saved1
      .map((registro) => parseInt(registro.proyectos_investigaciones_2))
      .filter((campo) => campo !== "");
    const pi3 = saved1
      .map((registro) => parseInt(registro.proyectos_investigaciones_3))
      .filter((campo) => campo !== "");

    if (pi1.length > 0 && pi2.length > 0 && pi3.length > 0) {
      summa =
        pi1.reduce((acc, current) => acc + current, 0) +
        pi2.reduce((acc, current) => acc + current, 0) +
        pi3.reduce((acc, current) => acc + current, 0);
      promedioPI = summa / 3; ///Promedio de Proyecto Investigaciones
    }
    if (!isNaN(promedioPI)) {
    if (promedioPI= 3) {
      investigaciones = "A";
    } else if (promedioPI=2) {
      investigaciones = "EP";
    } else if (promedioPI=1) {
      investigaciones = "I";
    } else if (promedioPI=0) {
      investigaciones = "NE";
    }

      const submissionUuids = saved1.map(
        (registro) => registro.submission_uuid
      );

      axios
        .patch(
          `http://ahorasi.dd:8083/webform_rest/notas_segundo_tercero_cuartos/submission/${submissionUuids}`,
          {
            webform_id: "notas_segundo_tercero_cuartos",
            promedio_investigaciones: investigaciones,
          }
        )
        .then((response) => {})
        .catch((error) => {
          console.error("Ocurrió un error durante la solicitud:", error);
        });
      }
    return investigaciones;
  }
  const proyectoIS1 = inventigacionesSemestre1(); //// Imprimir función promedio PInvestigaciones


  //******************************************** Promedio Proyectos Semestre 1 *******************************************************************/
  function ProyectosSemestre1() {
    let summa;
    const pi1 = saved1
      .map((registro) => parseInt(registro.proyectos_1))
      .filter((campo) => campo !== "");
    const pi2 = saved1
      .map((registro) => parseInt(registro.proyectos_2))
      .filter((campo) => campo !== "");
    const pi3 = saved1
      .map((registro) => parseInt(registro.proyectos_3))
      .filter((campo) => campo !== "");

    if (pi1.length > 0 && pi2.length > 0 && pi3.length > 0) {
      summa =
        pi1.reduce((acc, current) => acc + current, 0) +
        pi2.reduce((acc, current) => acc + current, 0) +
        pi3.reduce((acc, current) => acc + current, 0);
      promdioPr = summa / 3; ///Promedio de Proyectos
    }
    if (!isNaN(promdioPr)) {
    if (promdioPr= 3) {
      proyectos= "A";
    } else if (promdioPr=2) {
      proyectos= "EP";
    } else if (promdioPr=1) {
      proyectos= "I";
    } else if (promdioPr=0) {
      proyectos= "NE";
    }
      const submissionUuids = saved1.map(
        (registro) => registro.submission_uuid
      );

      axios
        .patch(
          `http://ahorasi.dd:8083/webform_rest/notas_segundo_tercero_cuartos/submission/${submissionUuids}`,
          {
            webform_id: "notas_segundo_tercero_cuartos",
            promedio_proyectos: proyectos,
          }
        )
        .then((response) => {})
        .catch((error) => {
          console.error("Ocurrió un error durante la solicitud:", error);
        });
      }
        return proyectos;
  }
  const proyectosS1 = ProyectosSemestre1(); //// Imprimir función promedio Proyectos

  //******************************************** Promedio Exposiciones Semestre 1 *******************************************************************/
  function ExpoSemestre1() {
    let summa;
    const pi1 = saved1
      .map((registro) => parseInt(registro.exposiciones_foros_1))
      .filter((campo) => campo !== "");
    const pi2 = saved1
      .map((registro) => parseInt(registro.exposiciones_foros_2))
      .filter((campo) => campo !== "");
    const pi3 = saved1
      .map((registro) => parseInt(registro.exposiciones_foros_3))
      .filter((campo) => campo !== "");

    if (pi1.length > 0 && pi2.length > 0 && pi3.length > 0) {
      summa =
        pi1.reduce((acc, current) => acc + current, 0) +
        pi2.reduce((acc, current) => acc + current, 0) +
        pi3.reduce((acc, current) => acc + current, 0);
      promedioExpos = summa / 3; ///Promedio de Proyectos
    }
    if (!isNaN(promedioExpos)) {
    if (promedioExpos= 3) {
      exposiciones= "A";
    } else if (promedioExpos=2) {
      exposiciones= "EP";
    } else if (promedioExpos=1) {
      exposiciones= "I";
    } else if (promedioExpos=0) {
      exposiciones= "NE";
    }

      const submissionUuids = saved1.map(
        (registro) => registro.submission_uuid
      );

      axios
        .patch(
          `http://ahorasi.dd:8083/webform_rest/notas_segundo_tercero_cuartos/submission/${submissionUuids}`,
          {
            webform_id: "notas_segundo_tercero_cuartos",
            promedio_expo: exposiciones,
          }
        )
        .then((response) => {})
        .catch((error) => {
          console.error("Ocurrió un error durante la solicitud:", error);
        });
      }
    return exposiciones;
  }
  const exposS1 = ExpoSemestre1();



//// Imprimir función promedio Exposiciones

  //******************************************** Promedio Talleres Semestre 1 *******************************************************************/
  function TalleresSemestre1() {
    let summa;
    const pi1 = saved1
      .map((registro) => parseInt(registro.talleres_1))
      .filter((campo) => campo !== "");
    const pi2 = saved1
      .map((registro) => parseInt(registro.talleres_1))
      .filter((campo) => campo !== "");
    const pi3 = saved1
      .map((registro) => parseInt(registro.talleres_1))
      .filter((campo) => campo !== "");

    if (pi1.length > 0 && pi2.length > 0 && pi3.length > 0) {
      summa =
        pi1.reduce((acc, current) => acc + current, 0) +
        pi2.reduce((acc, current) => acc + current, 0) +
        pi3.reduce((acc, current) => acc + current, 0);
      promedioTaller = summa / 3; ///Promedio de Talleres
    }

    if (!isNaN(promedioTaller)) {

      if (promedioTaller= 3) {
        talleres= "A";
      } else if (promedioTaller=2) {
        talleres= "EP";
      } else if (promedioTaller=1) {
        talleres= "I";
      } else if (promedioTaller=0) {
        talleres= "NE";
      }


      const submissionUuids = saved1.map(
        (registro) => registro.submission_uuid
      );

      axios
        .patch(
          `http://ahorasi.dd:8083/webform_rest/notas_segundo_tercero_cuartos/submission/${submissionUuids}`,
          {
            webform_id: "notas_segundo_tercero_cuartos",
            cualitativo_talleres: talleres,
          }
        )
        .then((response) => {})
        .catch((error) => {
          console.error("Ocurrió un error durante la solicitud:", error);
        });
    }
    return talleres;
  }
  const tallerS1 = TalleresSemestre1(); //// Imprimir función promedio Exposiciones



//******************************************** Promedio Actividades -Grupales** *******************************************************************/
function promedioActGrupalesIiSemestre1() {
  promedioGIIS1 =
    (promedioL+promedioP+promedioT+promedioPI + promdioPr + promedioExpos + promedioTaller) / 6; //Aportes cualitativo

  if (!isNaN(promedioGIIS1)) {

    if (promedioGIIS1= 3) {
      prAportes= "A";
    } else if (promedioGIIS1=2) {
      prAportes= "EP";
    } else if (promedioGIIS1=1) {
      prAportes= "I";
    } else if (promedioGIIS1=0) {
      prAportes= "NE";
    }

    const submissionUuids = saved1.map(
      (registro) => registro.submission_uuid
    );
    axios
      .patch(
        `http://ahorasi.dd:8083/webform_rest/notas_segundo_tercero_cuartos/submission/${submissionUuids}`,
        {
          webform_id: "notas_segundo_tercero_cuartos",
          promedio2: prAportes,
        }
      )
      .then((response) => {})
      .catch((error) => {
        console.error("Ocurrió un error durante la solicitud:", error);
      });
  }
  return prAportes;
}
const promedioIIS1 = promedioActGrupalesIiSemestre1(); //// Imprimir función promedio PInvestigaciones


function proyectoIntegrador() {
  proyecto_integrador = saved1
    .map((registro) => parseInt(registro.proyecto_integrador_f1))
    .filter((campo) => campo !== "");
  return proyecto_integrador;
}
const Proyecto_integrador = proyectoIntegrador(); //// Imprimir función Proyecto Integrador

  //******************************************** CUALITATIVO Proyecto INTEGRADOR *******************************************************************/
  function promedioAportes5S1() {
    let pi = saved1
      .map((registro) => parseInt(registro.proyecto_integrador_f1))
      .filter((campo) => campo !== "");

    if (!isNaN(pi)) {

      if (pi= 3) {
        cualitativoIntegrador= "A";
      } else if (pi=2) {
        cualitativoIntegrador= "EP";
      } else if (pi=1) {
        cualitativoIntegrador= "I";
      } else if (pi=0) {
        cualitativoIntegrador= "NE";
      }

      const submissionUuids = saved1.map(
        (registro) => registro.submission_uuid
      );

      axios
        .patch(
          `http://ahorasi.dd:8083/webform_rest/notas_segundo_tercero_cuartos/submission/${submissionUuids}`,
          {
            webform_id: "notas_segundo_tercero_cuartos",
            proyecto_interdisciplinario_90: cualitativoIntegrador,

          }
        )
        .then((response) => {
          console.log("Entro");
        })
        .catch((error) => {
          console.error("Ocurrió un error durante la solicitud:", error);
        });
    }
    return cualitativoIntegrador;
  }
  const Promedio5S1 = promedioAportes5S1(); //// Imprimir función promedio



  /******************************************** Evaluación Periodo Academico  *******************************************************************/
  function evaluacionSemestreS1() {
    evaluacionSemestre1 = saved1
      .map((registro) => parseInt(registro.cualitativo_proyecto_integrador_f1))
      .filter((campo) => campo !== "");
    return evaluacionSemestre1;
  }
  const EvalSemestre1 = evaluacionSemestreS1();

  // ******************************************** Cualitativo Evaluación Periodo Academico *******************************************************************/

  function Eva5Semestre1() {
    let va = saved1
      .map((registro) => parseInt(registro.cualitativo_proyecto_integrador_f1))
      .filter((campo) => campo !== "");

    if (!isNaN(va)) {
      if (va= 3) {
        periodoAcademico= "A";
      } else if (va=2) {
        periodoAcademico= "EP";
      } else if (va=1) {
        periodoAcademico= "I";
      } else if (va=0) {
        periodoAcademico= "NE";
      }

      const submissionUuids = saved1.map(
        (registro) => registro.submission_uuid
      );

      axios
        .patch(
          `http://ahorasi.dd:8083/webform_rest/notas_segundo_tercero_cuartos/submission/${submissionUuids}`,
          {
            webform_id: "notas_segundo_tercero_cuartos",

            evaluacion_semestre_: periodoAcademico,
          }
        )
        .then((response) => {
          console.log("Entro");
        })
        .catch((error) => {
          console.error("Ocurrió un error durante la solicitud:", error);
        });
    }
    return periodoAcademico;
  }
  const Ev5Semestre1 = Eva5Semestre1();

  //******************************************** Field Table Semestre 1 *******************************************************************/
  function createDataShow(name, value1, value2, value3) {
    return { name, value1, value2, value3 };
  }

  const rowsShow = [
    createDataShow(
      "Lecciones escritas",
      saved1
        .map((registro) => parseInt(registro.lecciones_orales_escritas_1))
        .filter((campo) => campo !== ""),
      saved1
        .map((registro) => parseInt(registro.lecciones_orales_escritas_2))
        .filter((campo) => campo !== ""),
      saved1
        .map((registro) => parseInt(registro.lecciones_orales_escritas_3))
        .filter((campo) => campo !== "")
    ),
    createDataShow(
      "Pruebas escritas",
      saved1
        .map((registro) => parseInt(registro.prueba_base_estructurada_1))
        .filter((campo) => campo !== ""),
      saved1
        .map((registro) => parseInt(registro.prueba_base_estructurada_2))
        .filter((campo) => campo !== ""),
      saved1
        .map((registro) => parseInt(registro.prueba_base_estructurada_3))
        .filter((campo) => campo !== "")
    ),
    createDataShow(
      "Tareas",
      saved1
        .map((registro) => parseInt(registro.tareas_ejercicios_1))
        .filter((campo) => campo !== ""),
      saved1
        .map((registro) => parseInt(registro.tareas_ejercicios_2))
        .filter((campo) => campo !== ""),
      saved1
        .map((registro) => parseInt(registro.tareas_ejercicios_3))
        .filter((campo) => campo !== "")
    ),
    createDataShow(
      "Proyectos",
      saved1
        .map((registro) => parseInt(registro.proyectos_1))
        .filter((campo) => campo !== ""),
      saved1
        .map((registro) => parseInt(registro.proyectos_2))
        .filter((campo) => campo !== ""),
      saved1
        .map((registro) => parseInt(registro.proyectos_3))
        .filter((campo) => campo !== "")
    ),
    createDataShow(
      "Exposiciones",
      saved1
        .map((registro) => parseInt(registro.exposiciones_foros_1))
        .filter((campo) => campo !== ""),
      saved1
        .map((registro) => parseInt(registro.exposiciones_foros_2))
        .filter((campo) => campo !== ""),
      saved1
        .map((registro) => parseInt(registro.exposiciones_foros_3))
        .filter((campo) => campo !== "")
    ),
    createDataShow(
      "Talleres",
      saved1
        .map((registro) => parseInt(registro.talleres_1))
        .filter((campo) => campo !== ""),
      saved1
        .map((registro) => parseInt(registro.talleres_2))
        .filter((campo) => campo !== ""),
      saved1
        .map((registro) => parseInt(registro.talleres_3))
        .filter((campo) => campo !== "")
    ),
    createDataShow(
      "Desarrollo de productos",
      saved1
        .map((registro) => parseInt(registro.productos1))
        .filter((campo) => campo !== ""),
      saved1
        .map((registro) => parseInt(registro.productos2))
        .filter((campo) => campo !== ""),
      saved1
        .map((registro) => parseInt(registro.productos3))
        .filter((campo) => campo !== "")
    ),
    createDataShow(
      "Ivestigaciones",
      saved1
        .map((registro) => parseInt(registro.proyectos_investigaciones_1))
        .filter((campo) => campo !== ""),
      saved1
        .map((registro) => parseInt(registro.proyectos_investigaciones_2))
        .filter((campo) => campo !== ""),
      saved1
        .map((registro) => parseInt(registro.proyectos_investigaciones_3))
        .filter((campo) => campo !== "")
    ),
    createDataShow(
      "Proyecto Integrador",
      saved1
        .map((registro) => parseInt(registro.proyecto_integrador_f1))
        .filter((campo) => campo !== ""),
      "",
      ""
    ),
    /*  createData("Pruebas escritas", pruebasS1),
    createData("Tareas", tareasS1),
    createData("Proyecto Investigaciones", proyectoIS1),
    createData("Promedio Actividades Grupales I", promedioIS1),
    createData("Promedio Proyectos", proyectosS1),
    createData("Promedio Exposiciones", exposS1),
    createData("Promedio Talleres", tallerS1),
    createData("Promedio Productos", productosS1),
    createData("Actividades Grupales II", promedioIIS1),
    createData("Promedio Aportes", promedioAporte),
    createData("Promedio Aportes 90%", Promedio90S1),

    createData("Proyecto Integrador", Proyecto_integrador),
    createData3("Evaluación Semestre ", EvalSemestre1),
    createData("Proyecto Integrador 5%", Promedio5S1),
    createData3("Evaluación Semestre 5%", Ev5Semestre1),
    createData("Promedio Final ", Promedios_Final_S1),*/
  ];

  function createData(name, value) {
    return { name, value };
  }
  const rows = [
    createData("Lecciones escritas", leccionesS1),
    createData("Pruebas escritas", pruebasS1),
     createData("Tareas", tareasS1),
     createData("Proyecto Investigaciones", proyectoIS1),
     createData("Promedio Proyectos", proyectosS1),
     createData("Promedio Exposiciones", exposS1),
     createData("Promedio Talleres", tallerS1),
     createData("Actividades Grupales II", promedioIIS1),
     createData("Proyecto Integrador", Proyecto_integrador),
    createData("Cualitativo Proyecto Integrador", Promedio5S1),
    createData("Evaluación Periodo Academico", EvalSemestre1),
    createData("Cualitativo Evaluación Periodo Academico", Ev5Semestre1),

   ];

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Habilidades</TableCell>
              <TableCell align="right">1</TableCell>
              <TableCell align="center">2</TableCell>
              <TableCell align="left">3</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowsShow.map((row) => (
              <TableRow
                key={row.name}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>

                <TableCell align="right">{row.value1}</TableCell>
                <TableCell align="center">{row.value2}</TableCell>
                <TableCell align="left">{row.value3}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Promedio Habilidades</TableCell>
              <TableCell align="center">Promedio</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>

                <TableCell align="center">{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
