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

export default function NotasSemestre3Basica({ saved1,saved2,saved3,idM }) {
    let promedioL3; ////
    let promedioP3; ////
    let promedioT3;
    let promedioPI3;
    let promdioPr3;
    let promedioExpos3;
    let promedioTaller3;
    let promedioGIIS3;
    let proyecto_integradorS3;
    let promedio5S13;
    let evaluacion;

  let evaluacionSemestre3;



let ls;
let pb;
let px;
let pt ;
let pi;
let pj;
let ptl;
let prAportes3;
let periodoAcademico3;
let subnivel;
let cualitativoIntegrador3;
let nfb;
let nfbC;
  //******************************************** Promedio Lecciones Escrita Semestre 3 *******************************************************************/
  function leccionesEscritasSemestre3() {
    let summa;
    const l1 = saved3
      .map((registro) => parseInt(registro.lecciones_orales_escritas_1))
      .filter((campo) => campo !== "");
    const l2 = saved3
      .map((registro) => parseInt(registro.lecciones_orales_escritas_2))
      .filter((campo) => campo !== "");
    const l3 = saved3
      .map((registro) => parseInt(registro.lecciones_orales_escritas_3))
      .filter((campo) => campo !== "");

    if (l1.length > 0 && l2.length > 0 && l3.length > 0) {
      summa =
        l1.reduce((acc, current) => acc + current, 0) +
        l2.reduce((acc, current) => acc + current, 0) +
        l3.reduce((acc, current) => acc + current, 0);
      promedioL3 = summa / 3; ///Promedio de lecciones escritas
    }

    if (!isNaN(promedioL3)) {

      if (promedioL3= 3) {
        ls= "A";
       } else if (promedioL3=2) {
        ls= "EP";
       } else if (promedioL3=1) {
        ls= "I";
       } else if (promedioL3=0) {
        ls= "NE";
       }

      const submissionUuids = saved3.map(        (registro) => registro.submission_uuid      );

      axios
        .patch(
          `http://ahorasi.dd:8083/webform_rest/notas_segundo_tercero_cuartos/submission/${submissionUuids}`,
          {
            webform_id: "notas_segundo_tercero_cuartos",
            cualitativo_orales: ls,
          }
        )
        .then((response) => {})
        .catch((error) => {
          console.error("Ocurrió un error durante la solicitud:", error);
        });
    }
    return ls;
  }
  const leccionesS3 = leccionesEscritasSemestre3();

  //******************************************** Promedio Pruebas Semestre 3 *******************************************************************/
  function pruebasSemestre3() {
    let summa;
    const p1 = saved3
      .map((registro) => parseInt(registro.prueba_base_estructurada_1))
      .filter((campo) => campo !== "");
    const p2 = saved3
      .map((registro) => parseInt(registro.prueba_base_estructurada_2))
      .filter((campo) => campo !== "");
    const p3 = saved3
      .map((registro) => parseInt(registro.prueba_base_estructurada_3))
      .filter((campo) => campo !== "");

    if (p1.length > 0 && p2.length > 0 && p3.length > 0) {
      summa =
        p1.reduce((acc, current) => acc + current, 0) +
        p2.reduce((acc, current) => acc + current, 0) +
        p3.reduce((acc, current) => acc + current, 0);
      promedioP3 = summa / 3; ///Promedio de pruebas Escritas
    }

    if (!isNaN(promedioP3)) {

      if (promedioP3= 3) {
        pb= "A";
       } else if (promedioP3=2) {
        pb= "EP";
       } else if (promedioP3=1) {
        pb= "I";
       } else if (promedioP3=0) {
        pb= "NE";
       }


      const submissionUuids = saved3.map(
        (registro) => registro.submission_uuid
      );

      axios
        .patch(
          `http://ahorasi.dd:8083/webform_rest/notas_segundo_tercero_cuartos/submission/${submissionUuids}`,
          {
            webform_id: "notas_segundo_tercero_cuartos",
            cualitativo_pruebabase: pb,
          }
        )
        .then((response) => {})
        .catch((error) => {
          console.error("Ocurrió un error durante la solicitud:", error);
        });
    }
    return pb;
  }
  const pruebasS3 = pruebasSemestre3(); //// Imprimir función promedio pruebas escritas

  //******************************************** Promedio Tareas Semestre 3 *******************************************************************/
  function tareasSemestre3() {
    let summa;
    const t1 = saved3
      .map((registro) => parseInt(registro.tareas_ejercicios_1))
      .filter((campo) => campo !== "");
    const t2 = saved3
      .map((registro) => parseInt(registro.tareas_ejercicios_2))
      .filter((campo) => campo !== "");
    const t3 = saved3
      .map((registro) => parseInt(registro.tareas_ejercicios_3))
      .filter((campo) => campo !== "");

    if (t1.length > 0 && t2.length > 0 && t3.length > 0) {
      summa =
        t1.reduce((acc, current) => acc + current, 0) +
        t2.reduce((acc, current) => acc + current, 0) +
        t3.reduce((acc, current) => acc + current, 0);
      promedioT3 = summa / 3; ///Promedio de Tareas
    }

    if (!isNaN(promedioT3)) {
      if (promedioT3= 3) {
        pt= "A";
       } else if (promedioT3=2) {
        pt= "EP";
       } else if (promedioT3=1) {
        pt= "I";
       } else if (promedioT3=0) {
        pt= "NE";
       }



      const submissionUuids = saved3.map(
        (registro) => registro.submission_uuid
      );

      axios
        .patch(
          `http://ahorasi.dd:8083/webform_rest/notas_segundo_tercero_cuartos/submission/${submissionUuids}`,
          {
            webform_id: "notas_segundo_tercero_cuartos",
            cualitativo_tareas_ejercicios: pt,
          }
        )
        .then((response) => {})
        .catch((error) => {
          console.error("Ocurrió un error durante la solicitud:", error);
        });
    }
    return pt;
  }
  const tareasS3 = tareasSemestre3(); //// Imprimir función promedio tareas

  //// Imprimir función promedio lecciones escritas

  //******************************************** Promedio Investigaciones Semestre 3 *******************************************************************/
  function inventigacionesSemestre3() {
    let summa;
    const pi1 = saved3
      .map((registro) => parseInt(registro.proyectos_investigaciones_1))
      .filter((campo) => campo !== "");
    const pi2 = saved3
      .map((registro) => parseInt(registro.proyectos_investigaciones_2))
      .filter((campo) => campo !== "");
    const pi3 = saved3
      .map((registro) => parseInt(registro.proyectos_investigaciones_3))
      .filter((campo) => campo !== "");

    if (pi1.length > 0 && pi2.length > 0 && pi3.length > 0) {
      summa =
        pi1.reduce((acc, current) => acc + current, 0) +
        pi2.reduce((acc, current) => acc + current, 0) +
        pi3.reduce((acc, current) => acc + current, 0);
      promedioPI3 = summa / 3; ///Promedio de Proyecto Investigaciones
    }

    if (!isNaN(promedioPI3)) {

      if (promedioPI3= 3) {
        pi= "A";
       } else if (promedioPI3=2) {
        pi= "EP";
       } else if (promedioPI3=1) {
        pi= "I";
       } else if (promedioPI3=0) {
        pi= "NE";
       }

      const submissionUuids = saved3.map(
        (registro) => registro.submission_uuid
      );

      axios
        .patch(
          `http://ahorasi.dd:8083/webform_rest/notas_segundo_tercero_cuartos/submission/${submissionUuids}`,
          {
            webform_id: "notas_segundo_tercero_cuartos",
            promedio_investigaciones: pi,
          }
        )
        .then((response) => {})
        .catch((error) => {
          console.error("Ocurrió un error durante la solicitud:", error);
        });
    }
    return pi;
  }
  const proyectoIS13 = inventigacionesSemestre3(); //// Imprimir función promedio PInvestigaciones
  //******************************************** Promedio Proyectos Semestre 3*******************************************************************/
  function ProyectosSemestre3() {
    let summa;
    const pi1 = saved3
      .map((registro) => parseInt(registro.proyectos_1))
      .filter((campo) => campo !== "");
    const pi2 = saved3
      .map((registro) => parseInt(registro.proyectos_2))
      .filter((campo) => campo !== "");
    const pi3 = saved3
      .map((registro) => parseInt(registro.proyectos_3))
      .filter((campo) => campo !== "");

    if (pi1.length > 0 && pi2.length > 0 && pi3.length > 0) {
      summa =
        pi1.reduce((acc, current) => acc + current, 0) +
        pi2.reduce((acc, current) => acc + current, 0) +
        pi3.reduce((acc, current) => acc + current, 0);
      promdioPr3 = summa / 3; ///Promedio de Proyectos
    }

    if (!isNaN(promdioPr3)) {

      if (promdioPr3= 3) {
        pj= "A";
       } else if (promdioPr3=2) {
        pj= "EP";
       } else if (promdioPr3=1) {
        pj= "I";
       } else if (promdioPr3=0) {
        pj= "NE";
       }


      const submissionUuids = saved3.map(
        (registro) => registro.submission_uuid
      );

      axios
        .patch(
          `http://ahorasi.dd:8083/webform_rest/notas_segundo_tercero_cuartos/submission/${submissionUuids}`,
          {
            webform_id: "notas_segundo_tercero_cuartos",
            promedio_proyectos: pj,
          }
        )
        .then((response) => {})
        .catch((error) => {
          console.error("Ocurrió un error durante la solicitud:", error);
        });
    }
    return pj;
  }
  const proyectosS13 = ProyectosSemestre3();

  //// Imprimir función promedio Proyectos

  //******************************************** Promedio Exposiciones Semestre 3 *******************************************************************/
  function ExpoSemestre3() {
    let summa;
    const pi1 = saved3
      .map((registro) => parseInt(registro.exposiciones_foros_1))
      .filter((campo) => campo !== "");
    const pi2 = saved3
      .map((registro) => parseInt(registro.exposiciones_foros_2))
      .filter((campo) => campo !== "");
    const pi3 = saved3
      .map((registro) => parseInt(registro.exposiciones_foros_3))
      .filter((campo) => campo !== "");

    if (pi1.length > 0 && pi2.length > 0 && pi3.length > 0) {
      summa =
        pi1.reduce((acc, current) => acc + current, 0) +
        pi2.reduce((acc, current) => acc + current, 0) +
        pi3.reduce((acc, current) => acc + current, 0);
      promedioExpos3 = summa / 3; ///Promedio de Proyectos
    }

    if (!isNaN(promedioExpos3)) {
      if (promedioExpos3= 3) {
        px= "A";
       } else if (promedioExpos3=2) {
        px= "EP";
       } else if (promedioExpos3=1) {
        px= "I";
       } else if (promedioExpos3=0) {
        px= "NE";
       }


      const submissionUuids = saved3.map(
        (registro) => registro.submission_uuid
      );

      axios
        .patch(
          `http://ahorasi.dd:8083/webform_rest/notas_segundo_tercero_cuartos/submission/${submissionUuids}`,
          {
            webform_id: "notas_segundo_tercero_cuartos",
            promedio_expo: px,
          }
        )
        .then((response) => {})
        .catch((error) => {
          console.error("Ocurrió un error durante la solicitud:", error);
        });
    }
    return px;
  }
  const exposS13 = ExpoSemestre3(); //// Imprimir función promedio Exposiciones

  //******************************************** Promedio Talleres Semestre 3 *******************************************************************/
  function TalleresSemestre3() {
    let summa;
    const pi1 = saved3
      .map((registro) => parseInt(registro.talleres_1))
      .filter((campo) => campo !== "");
    const pi2 = saved3
      .map((registro) => parseInt(registro.talleres_1))
      .filter((campo) => campo !== "");
    const pi3 = saved3
      .map((registro) => parseInt(registro.talleres_1))
      .filter((campo) => campo !== "");

    if (pi1.length > 0 && pi2.length > 0 && pi3.length > 0) {
      summa =
        pi1.reduce((acc, current) => acc + current, 0) +
        pi2.reduce((acc, current) => acc + current, 0) +
        pi3.reduce((acc, current) => acc + current, 0);
      promedioTaller3 = summa / 3; ///Promedio de Talleres
    }

    if (!isNaN(promedioTaller3)) {
      if (promedioTaller3= 3) {
        ptl= "A";
       } else if (promedioTaller3=2) {
        ptl= "EP";
       } else if (promedioTaller3=1) {
        ptl= "I";
       } else if (promedioTaller3=0) {
        ptl= "NE";
       }

      const submissionUuids = saved3.map(
        (registro) => registro.submission_uuid
      );

      axios
        .patch(
          `http://ahorasi.dd:8083/webform_rest/notas_segundo_tercero_cuartos/submission/${submissionUuids}`,
          {
            webform_id: "notas_segundo_tercero_cuartos",
            cualitativo_talleres: ptl,
          }
        )
        .then((response) => {})
        .catch((error) => {
          console.error("Ocurrió un error durante la solicitud:", error);
        });
    }
    return ptl;
  }
  const tallerS13 = TalleresSemestre3(); //// Imprimir función promedio Exposiciones

  //******************************************** Promedio Actividades Grupales II Semestres 3 *******************************************************************/
  function promedioActGrupalesIiSemestre3() {
    promedioGIIS3 =
    (promedioL3+promedioP3+promedioT3+promedioPI3 + promdioPr3 + promedioExpos3 + promedioTaller3) / 6; //Aportes cualitativo

    if (!isNaN(promedioGIIS3)) {

      if (promedioGIIS3= 3) {
        prAportes3= "A";
      } else if (promedioGIIS3=2) {
        prAportes3= "EP";
      } else if (promedioGIIS3=1) {
        prAportes3= "I";
      } else if (promedioGIIS3=0) {
        prAportes3= "NE";
      }

      const submissionUuids = saved3.map(
        (registro) => registro.submission_uuid
      );

      axios
        .patch(
          `http://ahorasi.dd:8083/webform_rest/notas_segundo_tercero_cuartos/submission/${submissionUuids}`,
          {
            webform_id: "notas_segundo_tercero_cuartos",
            promedio2: prAportes3,
          }
        )
        .then((response) => {})
        .catch((error) => {
          console.error("Ocurrió un error durante la solicitud:", error);
        });
    }
    return prAportes3;
  }
  const promedioIIS13 = promedioActGrupalesIiSemestre3();

  //// Imprimir función promedio PInvestigaciones


  /******************************************** proyecto_integrador Semestre 3 *******************************************************************/
  function proyectoIntegradorS3() {
    proyecto_integradorS3 = saved3
      .map((registro) => parseInt(registro.proyecto_integrador_f1))
      .filter((campo) => campo !== "");
    return proyecto_integradorS3;
  }
  const Proyecto_integradorS3 = proyectoIntegradorS3();

  // ******************************************** CUALITATIVO Proyecto INTEGRADOR *******************************************************************/
  function promedioIntegrador5S13() {
    let pi1 = saved3
      .map((registro) => parseInt(registro.proyecto_integrador_f1))
      .filter((campo) => campo !== "");
    if (!isNaN(pi1)) {
      if (pi1= 3) {
        cualitativoIntegrador3= "A";
      } else if (pi1=2) {
        cualitativoIntegrador3= "EP";
      } else if (pi1=1) {
        cualitativoIntegrador3= "I";
      } else if (pi1=0) {
        cualitativoIntegrador3= "NE";
      }

      const submissionUuids = saved3.map(
        (registro) => registro.submission_uuid
      );

      axios
        .patch(
          `http://ahorasi.dd:8083/webform_rest/notas_segundo_tercero_cuartos/submission/${submissionUuids}`,
          {
            webform_id: "notas_segundo_tercero_cuartos",
            proyecto_interdisciplinario_90: cualitativoIntegrador3,

          }
        )
        .then((response) => {
          console.log("Entro");
        })
        .catch((error) => {
          console.error("Ocurrió un error durante la solicitud:", error);
        });
    }
    return cualitativoIntegrador3;
  }
  const Promedio5S3 = promedioIntegrador5S13();
 /******************************************** Evaluación Semestre 3 *******************************************************************/
 function evaluacionSemestreS3() {
  evaluacionSemestre3 = saved3
    .map((registro) => parseInt(registro.cualitativo_proyecto_integrador_f1))
    .filter((campo) => campo !== "");
  return evaluacionSemestre3;
}
const EvaSemestres3 = evaluacionSemestreS3();


    // ******************************************** Evaluación Semestre5% Semestre 3 *******************************************************************/


    function Eva5Semestre3() {
      let pi2 = saved3
        .map((registro) => parseInt(registro.cualitativo_proyecto_integrador_f1))
        .filter((campo) => campo !== "");


      if (!isNaN(pi2)) {

        if (pi2= 3) {
          periodoAcademico3= "A";
        } else if (pi2=2) {
          periodoAcademico3= "EP";
        } else if (pi2=1) {
          periodoAcademico3= "I";
        } else if (pi2=0) {
          periodoAcademico3= "NE";
        }



        const submissionUuids = saved3.map(
          (registro) => registro.submission_uuid
        );

        axios
          .patch(
            `http://ahorasi.dd:8083/webform_rest/notas_segundo_tercero_cuartos/submission/${submissionUuids}`,
            {
              webform_id: "notas_segundo_tercero_cuartos",
              // proyecto_interdisciplinario_90: promedio5S1,
              evaluacion_semestre_: periodoAcademico3,
            }
          )
          .then((response) => {
            console.log("Entro");
          })
          .catch((error) => {
            console.error("Ocurrió un error durante la solicitud:", error);
          });
      }
      return periodoAcademico3;
    }
    const Eva5emestre3 = Eva5Semestre3();

  // ******************************************** Evaluación Subnivl Grupos Especiales Semestre 3 *******************************************************************/

  function evaluacionSubnivel() {
    evaluacion =
      saved3
        .map((registro) => parseInt(registro.evaluacion_nivel_subnivel))
        .filter((campo) => campo !== "")

   if(evaluacion.length===0){
       evaluacion=0;
   }
    return evaluacion;
  }
  const Evaluacion = evaluacionSubnivel(); //// Imprimir función Proyecto Integrador

//**//////////////////////////////**********************CUALITATIVO Evaluación Subnivel********** */ */

function CualitativoSubnivel3() {
  let cs2 = saved3
    .map((registro) => parseInt(registro.evaluacion_nivel_subnivel))
    .filter((campo) => campo !== "");


  if (!isNaN(cs2)) {

    if (cs2= 3) {
      subnivel= "A";
    } else if (cs2=2) {
      subnivel= "EP";
    } else if (cs2=1) {
      subnivel= "I";
    } else if (cs2=0) {
      subnivel= "NE";
    }


    const submissionUuids = saved3.map(
      (registro) => registro.submission_uuid
    );

    axios
      .patch(
        `http://ahorasi.dd:8083/webform_rest/notas_segundo_tercero_cuartos/submission/${submissionUuids}`,
        {
          webform_id: "notas_segundo_tercero_cuartos",
          // proyecto_interdisciplinario_90: promedio5S1,
          grade: subnivel,
        }
      )
      .then((response) => {
        console.log("Entro");
      })
      .catch((error) => {
        console.error("Ocurrió un error durante la solicitud:", error);
      });
  }
  return subnivel;
}
const Subnivel = CualitativoSubnivel3();




  function createDataShow(name, value1, value2, value3) {
    return { name, value1, value2, value3 };
  }

  const rowsShow = [
    createDataShow(
      "Lecciones escritas",
      saved3
        .map((registro) => parseInt(registro.lecciones_orales_escritas_1))
        .filter((campo) => campo !== ""),
      saved3
        .map((registro) => parseInt(registro.lecciones_orales_escritas_2))
        .filter((campo) => campo !== ""),
      saved3
        .map((registro) => parseInt(registro.lecciones_orales_escritas_3))
        .filter((campo) => campo !== "")
    ),
    createDataShow(
      "Pruebas escritas",
      saved3
        .map((registro) => parseInt(registro.prueba_base_estructurada_1))
        .filter((campo) => campo !== ""),
      saved3
        .map((registro) => parseInt(registro.prueba_base_estructurada_2))
        .filter((campo) => campo !== ""),
      saved3
        .map((registro) => parseInt(registro.prueba_base_estructurada_3))
        .filter((campo) => campo !== "")
    ),
    createDataShow(
      "Tareas",
      saved3
        .map((registro) => parseInt(registro.tareas_ejercicios_1))
        .filter((campo) => campo !== ""),
      saved3
        .map((registro) => parseInt(registro.tareas_ejercicios_2))
        .filter((campo) => campo !== ""),
      saved3
        .map((registro) => parseInt(registro.tareas_ejercicios_3))
        .filter((campo) => campo !== "")
    ),
    createDataShow(
      "Proyectos",
      saved3
        .map((registro) => parseInt(registro.proyectos_1))
        .filter((campo) => campo !== ""),
      saved3
        .map((registro) => parseInt(registro.proyectos_2))
        .filter((campo) => campo !== ""),
      saved3
        .map((registro) => parseInt(registro.proyectos_3))
        .filter((campo) => campo !== "")
    ),
    createDataShow(
      "Exposiciones",
      saved3
        .map((registro) => parseInt(registro.exposiciones_foros_1))
        .filter((campo) => campo !== ""),
      saved3
        .map((registro) => parseInt(registro.exposiciones_foros_2))
        .filter((campo) => campo !== ""),
      saved3
        .map((registro) => parseInt(registro.exposiciones_foros_3))
        .filter((campo) => campo !== "")
    ),
    createDataShow(
      "Talleres",
      saved3
        .map((registro) => parseInt(registro.talleres_1))
        .filter((campo) => campo !== ""),
      saved3
        .map((registro) => parseInt(registro.talleres_2))
        .filter((campo) => campo !== ""),
      saved3
        .map((registro) => parseInt(registro.talleres_3))
        .filter((campo) => campo !== "")
    ),
    createDataShow(
      "Desarrollo de productos",
      saved3
        .map((registro) => parseInt(registro.productos1))
        .filter((campo) => campo !== ""),
      saved3
        .map((registro) => parseInt(registro.productos2))
        .filter((campo) => campo !== ""),
      saved3
        .map((registro) => parseInt(registro.productos3))
        .filter((campo) => campo !== "")
    ),
    createDataShow(
      "Ivestigaciones",
      saved3
        .map((registro) => parseInt(registro.proyectos_investigaciones_1))
        .filter((campo) => campo !== ""),
      saved3
        .map((registro) => parseInt(registro.proyectos_investigaciones_2))
        .filter((campo) => campo !== ""),
      saved3
        .map((registro) => parseInt(registro.proyectos_investigaciones_3))
        .filter((campo) => campo !== "")
    ),
    createDataShow(
      "Proyecto Integrador",
      saved3
        .map((registro) => parseInt(registro.proyecto_integrador_f1))
        .filter((campo) => campo !== ""),
      "",
      ""
    ),
   ];


   function createData(name, value) {
    return { name, value };
  }
  const rows = [
    createData("Lecciones escritas", leccionesS3),
    createData("Pruebas escritas", pruebasS3),
     createData("Tareas", tareasS3),
     createData("Proyecto Investigaciones",proyectoIS13 ),
     createData("Promedio Proyectos",proyectosS13 ),
     createData("Promedio Exposiciones", exposS13),
     createData("Promedio Talleres", tallerS13),
     createData("Actividades Grupales II", promedioIIS13),
     createData("Proyecto Integrador", Proyecto_integradorS3),
    createData("Cualitativo Proyecto Integrador", Promedio5S3),
    createData("Evaluación Periodo Academico", EvaSemestres3),
    createData("Cualitativo Evaluación Periodo Academico", Eva5emestre3),
    createData("Evaluación Subnivel", Evaluacion),
    createData("Cualitativo Evaluación Subnivel", Subnivel),




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
                  <Table
                    sx={{ minWidth: 650 }}
                    size="small"
                    aria-label="a dense table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Promedio Habilidades</TableCell>
                        <TableCell align="right">Promedio</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((rows3) => (
                        <TableRow
                          key={rows3.name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {rows3.name}
                          </TableCell>
                          <TableCell align="right">{rows3.value}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
    </>
  );
}
