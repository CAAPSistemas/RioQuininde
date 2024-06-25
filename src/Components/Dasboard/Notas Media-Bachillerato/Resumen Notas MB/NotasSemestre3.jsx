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

export default function NotasSemestre3({ saved1,saved2,saved3,idM }) {
    let promedioL3; ////
    let promedioP3; ////
    let promedioT3;
    let promedioPI3;
    let promedioGIS13;
    let promdioPr3;
    let promedioExpos3;
    let promedioTaller3;
    let promedioProductos3;
    let promedioGIIS3;
    let promedioAportes3;
    let promedio90S13;
    let proyecto_integradorS3;
    let promedio5S13;
    let Promedio_Final_S3;
    let evaluacion;
    let puntaje3;
    let grade3;
    let puntajeFinal3;
    let proyecto_finalS3;
    let notaFinal;
    let puntaje2 = 0;
    let puntajeEva;
  let evaluacionSemestre3;
  let eva5S3;
  let NotaFinal;
  console.log( saved1);
  console.log(saved2)
  console.log(saved3)


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

    console.log(promedioL3);
    if (!isNaN(promedioL3)) {
      const submissionUuids = saved3.map(
        (registro) => registro.submission_uuid
      );

      axios
        .patch(
          `http://ahorasi.dd:8083/webform_rest/notas_quinto_noveno_segundos/submission/${submissionUuids}`,
          {
            webform_id: "notas_quinto_noveno_segundos",
            cualitativo_orales: promedioL3,
          }
        )
        .then((response) => {})
        .catch((error) => {
          console.error("Ocurrió un error durante la solicitud:", error);
        });
    }
    return promedioL3;
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
      const submissionUuids = saved3.map(
        (registro) => registro.submission_uuid
      );

      axios
        .patch(
          `http://ahorasi.dd:8083/webform_rest/notas_quinto_noveno_segundos/submission/${submissionUuids}`,
          {
            webform_id: "notas_quinto_noveno_segundos",
            cualitativo_pruebabase: promedioP3,
          }
        )
        .then((response) => {})
        .catch((error) => {
          console.error("Ocurrió un error durante la solicitud:", error);
        });
    }
    return promedioP3;
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
      const submissionUuids = saved3.map(
        (registro) => registro.submission_uuid
      );

      axios
        .patch(
          `http://ahorasi.dd:8083/webform_rest/notas_quinto_noveno_segundos/submission/${submissionUuids}`,
          {
            webform_id: "notas_quinto_noveno_segundos",
            cualitativo_tareas_ejercicios: promedioT3,
          }
        )
        .then((response) => {})
        .catch((error) => {
          console.error("Ocurrió un error durante la solicitud:", error);
        });
    }
    return promedioT3;
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
      const submissionUuids = saved3.map(
        (registro) => registro.submission_uuid
      );

      axios
        .patch(
          `http://ahorasi.dd:8083/webform_rest/notas_quinto_noveno_segundos/submission/${submissionUuids}`,
          {
            webform_id: "notas_quinto_noveno_segundos",
            promedio_investigaciones: promedioPI3,
          }
        )
        .then((response) => {})
        .catch((error) => {
          console.error("Ocurrió un error durante la solicitud:", error);
        });
    }
    return promedioPI3;
  }
  const proyectoIS13 = inventigacionesSemestre3(); //// Imprimir función promedio PInvestigaciones

  //******************************************** Promedio Actividades Grupales I Semestres 3 *******************************************************************/
  function promedioActGrupalesISemestre3() {
    promedioGIS13 = (promedioL3 + promedioP3 + promedioT3 + promedioPI3) / 4; ///Promedio Actividades Grupales I

    if (!isNaN(promedioGIS13)) {
      const submissionUuids = saved3.map(
        (registro) => registro.submission_uuid
      );

      axios
        .patch(
          `http://ahorasi.dd:8083/webform_rest/notas_quinto_noveno_segundos/submission/${submissionUuids}`,
          {
            webform_id: "notas_quinto_noveno_segundos",
            promedio: promedioGIS13,
          }
        )
        .then((response) => {})
        .catch((error) => {
          console.error("Ocurrió un error durante la solicitud:", error);
        });
    }
    return promedioGIS13;
  }
  const promedioIS13 = promedioActGrupalesISemestre3(); //// Imprimir función promedio PInvestigaciones

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
      const submissionUuids = saved3.map(
        (registro) => registro.submission_uuid
      );

      axios
        .patch(
          `http://ahorasi.dd:8083/webform_rest/notas_quinto_noveno_segundos/submission/${submissionUuids}`,
          {
            webform_id: "notas_quinto_noveno_segundos",
            promedio_proyectos: promdioPr3,
          }
        )
        .then((response) => {})
        .catch((error) => {
          console.error("Ocurrió un error durante la solicitud:", error);
        });
    }
    return promdioPr3;
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
      const submissionUuids = saved3.map(
        (registro) => registro.submission_uuid
      );

      axios
        .patch(
          `http://ahorasi.dd:8083/webform_rest/notas_quinto_noveno_segundos/submission/${submissionUuids}`,
          {
            webform_id: "notas_quinto_noveno_segundos",
            promedio_expo: promedioExpos3,
          }
        )
        .then((response) => {})
        .catch((error) => {
          console.error("Ocurrió un error durante la solicitud:", error);
        });
    }
    return promedioExpos3;
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
      const submissionUuids = saved3.map(
        (registro) => registro.submission_uuid
      );

      axios
        .patch(
          `http://ahorasi.dd:8083/webform_rest/notas_quinto_noveno_segundos/submission/${submissionUuids}`,
          {
            webform_id: "notas_quinto_noveno_segundos",
            cualitativo_talleres: promedioTaller3,
          }
        )
        .then((response) => {})
        .catch((error) => {
          console.error("Ocurrió un error durante la solicitud:", error);
        });
    }
    return promedioTaller3;
  }
  const tallerS13 = TalleresSemestre3(); //// Imprimir función promedio Exposiciones

  //******************************************** Promedio Productos Semestre 3 *******************************************************************/
  function ProductosSemestre3() {
    let summa;
    const pi1 = saved3
      .map((registro) => parseInt(registro.productos1))
      .filter((campo) => campo !== "");
    const pi2 = saved3
      .map((registro) => parseInt(registro.productos2))
      .filter((campo) => campo !== "");
    const pi3 = saved3
      .map((registro) => parseInt(registro.productos3))
      .filter((campo) => campo !== "");

    if (pi1.length > 0 && pi2.length > 0 && pi3.length > 0) {
      summa =
        pi1.reduce((acc, current) => acc + current, 0) +
        pi2.reduce((acc, current) => acc + current, 0) +
        pi3.reduce((acc, current) => acc + current, 0);
      promedioProductos3 = summa / 3; ///Promedio de Productos
    }

    if (!isNaN(promedioProductos3)) {
      const submissionUuids = saved3.map(
        (registro) => registro.submission_uuid
      );

      axios
        .patch(
          `http://ahorasi.dd:8083/webform_rest/notas_quinto_noveno_segundos/submission/${submissionUuids}`,
          {
            webform_id: "notas_quinto_noveno_segundos",
            promedio_productos: promedioProductos3,
          }
        )
        .then((response) => {})
        .catch((error) => {
          console.error("Ocurrió un error durante la solicitud:", error);
        });
    }
    return promedioProductos3;
  }
  const productosS13 = ProductosSemestre3();

  //******************************************** Promedio Actividades Grupales II Semestres 3 *******************************************************************/
  function promedioActGrupalesIiSemestre3() {
    promedioGIIS3 =
      (promdioPr3 + promedioExpos3 + promedioTaller3 + promedioProductos3) / 4; ///Promedio Actividades Grupales I

    if (!isNaN(promedioGIIS3)) {
      const submissionUuids = saved3.map(
        (registro) => registro.submission_uuid
      );

      axios
        .patch(
          `http://ahorasi.dd:8083/webform_rest/notas_quinto_noveno_segundos/submission/${submissionUuids}`,
          {
            webform_id: "notas_quinto_noveno_segundos",
            promedio2: promedioGIIS3,
          }
        )
        .then((response) => {})
        .catch((error) => {
          console.error("Ocurrió un error durante la solicitud:", error);
        });
    }
    return promedioGIIS3;
  }
  const promedioIIS13 = promedioActGrupalesIiSemestre3();

  //// Imprimir función promedio PInvestigaciones

  //******************************************** Promedio Aportes *******************************************************************/
  function promedioAportesS3() {
    promedioAportes3 = (promedioGIS13 + promedioGIIS3) / 2; ///Promedio Actividades Grupales I

    if (!isNaN(promedioAportes3)) {
      const submissionUuids = saved3.map(
        (registro) => registro.submission_uuid
      );

      axios
        .patch(
          `http://ahorasi.dd:8083/webform_rest/notas_quinto_noveno_segundos/submission/${submissionUuids}`,
          {
            webform_id: "notas_quinto_noveno_segundos",
            promedioaportes: promedioAportes3,
          }
        )
        .then((response) => {})
        .catch((error) => {
          console.error("Ocurrió un error durante la solicitud:", error);
        });
    }
    return promedioAportes3;
  }
  const promedioAporte3 = promedioAportesS3();

  //******************************************** Promedio Aportes 90% *******************************************************************/
  function promedioAportes90S13() {
    promedio90S13 = promedioAportes3 * 0.9; ///Promedio Actividades Grupales I

    if (!isNaN(promedio90S13)) {
      const submissionUuids = saved3.map(
        (registro) => registro.submission_uuid
      );

      axios
        .patch(
          `http://ahorasi.dd:8083/webform_rest/notas_quinto_noveno_segundos/submission/${submissionUuids}`,
          {
            webform_id: "notas_quinto_noveno_segundos",
            promedio_aportes_90: promedio90S13,
          }
        )
        .then((response) => {
          console.log("Entro");
        })
        .catch((error) => {
          console.error("Ocurrió un error durante la solicitud:", error);
        });
    }
    return promedio90S13;
  }
  const Promedio90S13 = promedioAportes90S13(); //// Imprimir función promedio PInvestigaciones

  /******************************************** proyecto_integrador Semestre 3 *******************************************************************/
  function proyectoIntegradorS3() {
    proyecto_integradorS3 = saved3
      .map((registro) => parseInt(registro.proyecto_integrador_f1))
      .filter((campo) => campo !== "");
    return proyecto_integradorS3;
  }
  const Proyecto_integradorS3 = proyectoIntegradorS3();
 /******************************************** Evaluación Semestre 3 *******************************************************************/
 function evaluacionSemestreS3() {
  evaluacionSemestre3 = saved3
    .map((registro) => parseInt(registro.cualitativo_proyecto_integrador_f1))
    .filter((campo) => campo !== "");
  return evaluacionSemestre3;
}
const EvaSemestres3 = evaluacionSemestreS3();

  // ******************************************** proyecto_integrador 5% Semestre 3 *******************************************************************/


  function promedioIntegrador5S13() {
    const pi1 = saved3
      .map((registro) => parseInt(registro.proyecto_integrador_f1))
      .filter((campo) => campo !== "");

    promedio5S13 = pi1 * 0.05; ///Promedio Proyecto Interdisciplinario

    if (!isNaN(promedio5S13)) {
      const submissionUuids = saved3.map(
        (registro) => registro.submission_uuid
      );

      axios
        .patch(
          `http://ahorasi.dd:8083/webform_rest/notas_quinto_noveno_segundos/submission/${submissionUuids}`,
          {
            webform_id: "notas_quinto_noveno_segundos",
            proyecto_interdisciplinario_90: promedio5S13,

          }
        )
        .then((response) => {
          console.log("Entro");
        })
        .catch((error) => {
          console.error("Ocurrió un error durante la solicitud:", error);
        });
    }
    return promedio5S13;
  }
  const Promedio5S3 = promedioIntegrador5S13();


    // ******************************************** Evaluación Semestre5% Semestre 3 *******************************************************************/


    function Eva5Semestre3() {
      const pi1 = saved3
        .map((registro) => parseInt(registro.cualitativo_proyecto_integrador_f1))
        .filter((campo) => campo !== "");

      eva5S3 = pi1 * 0.05; ///Promedio Proyecto Interdisciplinario

      if (!isNaN(eva5S3)) {
        const submissionUuids = saved3.map(
          (registro) => registro.submission_uuid
        );

        axios
          .patch(
            `http://ahorasi.dd:8083/webform_rest/notas_quinto_noveno_segundos/submission/${submissionUuids}`,
            {
              webform_id: "notas_quinto_noveno_segundos",
              // proyecto_interdisciplinario_90: promedio5S1,
              evaluacion_semestre_: eva5S3,
            }
          )
          .then((response) => {
            console.log("Entro");
          })
          .catch((error) => {
            console.error("Ocurrió un error durante la solicitud:", error);
          });
      }
      return eva5S3;
    }
    const Eva5emestre3 = Eva5Semestre3();



  // ******************************************** Promedio Final Semestre 3 *******************************************************************/

  function promedioFinalSemestre3() {
    Promedio_Final_S3 = promedio90S13+promedio5S13+eva5S3;
    if (!isNaN(Promedio_Final_S3)) {
      const submissionUuids = saved3.map(
        (registro) => registro.submission_uuid
      );

      axios
        .patch(
          `http://ahorasi.dd:8083/webform_rest/notas_quinto_noveno_segundos/submission/${submissionUuids}`,
          {
            webform_id: "notas_quinto_noveno_segundos",
            // proyecto_interdisciplinario_90: promedio5S1,
            promedio_final: Promedio_Final_S3,
          }
        )
        .then((response) => {
          console.log("Entro");
        })
        .catch((error) => {
          console.error("Ocurrió un error durante la solicitud:", error);
        });
    }




    return Promedio_Final_S3;
  }
  const Promedios_Final_S13 = promedioFinalSemestre3(); //// Imprimir función Proyecto Integrador

  // ******************************************** Evaluación Subnivl Grupos Especiales Semestre 3 *******************************************************************/

  function evaluacionSubnivel() {
    evaluacion =
      saved3
        .map((registro) => parseInt(registro.evaluacion_nivel_subnivel))
        .filter((campo) => campo !== "")

   if(isNaN(evaluacion)){
       evaluacion=0;
   }


    return evaluacion;
  }
  const Evaluacion = evaluacionSubnivel(); //// Imprimir función Proyecto Integrador


  ////*************** ********************************************** Proyecto Final                   *********************** */

  function proyectoFinslS3() {
    proyecto_finalS3 = saved3
      .map((registro) => parseInt(registro.proyectofinal))
      .filter((campo) => campo !== "");
    return proyecto_finalS3;
  }
  const Proyecto_finalS3 = proyectoFinslS3();

  function puntajeProyectoFinal() {
    puntajeFinal3 = proyecto_finalS3 * 0.05;

    if (!isNaN(puntajeFinal3)) {
      const submissionUuids = saved3.map(
        (registro) => registro.submission_uuid
      );

      axios
        .patch(
          `http://ahorasi.dd:8083/webform_rest/notas_quinto_noveno_segundos/submission/${submissionUuids}`,
          {
            webform_id: "notas_quinto_noveno_segundos",
            puntajefinal: puntajeFinal3,
          }
        )
        .then((response) => {})
        .catch((error) => {
          console.error("Ocurrió un error durante la solicitud:", error);
        });
    }

    return puntajeFinal3;
  }
  const PuntajeFinal3 = puntajeProyectoFinal(); ////

  // ******************************************** Puntaje Evaluación de subnivel Semestre 3 *******************************************************************/

  function puntajeEvaSubnivel() {
    if (evaluacion === 0) {
      puntajeEva = 0;
    } else {
      puntajeEva = evaluacion * 0.05;
      if (!isNaN(puntajeEva)) {
        const submissionUuids = saved3.map(
          (registro) => registro.submission_uuid
        );

        axios
          .patch(
            `http://ahorasi.dd:8083/webform_rest/notas_quinto_noveno_segundos/submission/${submissionUuids}`,
            {
              webform_id: "notas_quinto_noveno_segundos",
              puntajeeva: puntajeEva,
            }
          )
          .then((response) => {})
          .catch((error) => {
            console.error("Ocurrió un error durante la solicitud:", error);
          });
      }
    }
    return puntajeEva;
  }
  const PuntajeEva = puntajeEvaSubnivel(); ////

console.log("que viene"+puntajeEva)
  // ******************************************** Puntaje Trimestral  Semestre 3 *******************************************************************/

  function puntajeTrimestral3() {
    puntaje3 = Promedio_Final_S3 * 0.3;

    if (!isNaN(puntaje3)) {
      const submissionUuids = saved3.map(
        (registro) => registro.submission_uuid
      );

      axios
        .patch(
          `http://ahorasi.dd:8083/webform_rest/notas_quinto_noveno_segundos/submission/${submissionUuids}`,
          {
            webform_id: "notas_quinto_noveno_segundos",
            puntaje: puntaje3,
          }
        )
        .then((response) => {})
        .catch((error) => {
          console.error("Ocurrió un error durante la solicitud:", error);
        });
    }

    return puntaje3;
  }
  const Puntaje3 = puntajeTrimestral3(); ////

  // ******************************************** Cualitativo Promedio Final  Semestre 3 *******************************************************************/
  function cualitativoPromedioFinal3() {
    if (Promedio_Final_S3 >= 9 && Promedio_Final_S3 <= 10) {
      grade3 = "DA";
    } else if (Promedio_Final_S3 >= 7 && Promedio_Final_S3 < 9) {
      grade3 = "AA";
    } else if (Promedio_Final_S3 > 4 && Promedio_Final_S3 < 7) {
      grade3 = "PA";
    } else if (Promedio_Final_S3 < 4) {
      grade3 = "NA";
    }
    const submissionUuids = saved3.map((registro) => registro.submission_uuid);

    axios
      .patch(
        `http://ahorasi.dd:8083/webform_rest/notas_quinto_noveno_segundos/submission/${submissionUuids}`,
        {
          webform_id: "notas_quinto_noveno_segundos",
          grade: grade3,
        }
      )
      .then((response) => {})
      .catch((error) => {
        console.error("Ocurrió un error durante la solicitud:", error);
      });
    return grade3;
  }
  const Grade3 = cualitativoPromedioFinal3();

//*****************************************NOTA FINAL*************************************************** */
function Nota() {
  let punto1 = saved1.map((registro) => parseInt(registro.puntaje)).filter((campo) => campo !== "")[0];
  let punto2= saved2.map((registro) => parseInt(registro.puntaje)).filter((campo) => campo !== "")[0];
console.log(punto1,punto2,puntaje3,puntajeFinal3,puntajeEva,)

   NotaFinal = punto1 +punto2+ puntaje3 + puntajeFinal3+puntajeEva;

  console.log(NotaFinal);
  if (!isNaN(NotaFinal)) {
    const submissionUuids = saved3.map(
      (registro) => registro.submission_uuid
    );

    axios
      .patch(
        `http://ahorasi.dd:8083/webform_rest/notas_quinto_noveno_segundos/submission/${submissionUuids}`,
        {
          webform_id: "notas_quinto_noveno_segundos",
          notafinal: NotaFinal,
        }
      )
      .then((response) => {})
      .catch((error) => {
        console.error("Ocurrió un error durante la solicitud:", error);
      });
  }
  return  NotaFinal;
}
const nota = Nota();



  function createData3(name, value) {
    return { name, value };
  }
  const rows3 = [
    createData3("Lecciones escritas", leccionesS3),
    createData3("Pruebas escritas", pruebasS3),
    createData3("Tareas", tareasS3),
    createData3("Investigaciones ", proyectoIS13),
    createData3("Promedio Actividades Grupales 1 ", promedioIS13),
    createData3("Proyectos ", proyectosS13),
    createData3("Exposiciones/Foros ", exposS13),
    createData3("Talleres ", tallerS13),
    createData3("Productos ", productosS13),
    createData3("Promedio Actividades Grupales 2 ", promedioIIS13),
    createData3("Promedio Aportes ", promedioAporte3),
    createData3("Promedio Aportes 90%", Promedio90S13),
    createData3("Proyecto Integrador", Proyecto_integradorS3),
    createData3("Proyecto Integrador 5%", Promedio5S3),
    createData3("Evaluación Semestre ", EvaSemestres3),
    createData3("Evaluación Semestre 5%", Eva5emestre3),
     createData3("Promedio Final", Promedios_Final_S13),
    createData3("Proyecto Final", Proyecto_finalS3),
    createData3("Evaluación Subnivel", Evaluacion),

    createData3("Variables Nota Final", ""),
    createData3("Puntaje Semestre 1",saved1.map((registro) => parseInt(registro.puntaje)).filter((campo) => campo !== "")),
    createData3("Puntaje Semestre 2",saved2.map((registro) => parseInt(registro.puntaje)).filter((campo) => campo !== "")),
    createData3("Puntaje Semestre 3",Puntaje3),
    createData3(" Puntaje Proyecto Final", PuntajeFinal3 ),
    createData3("Puntaje Evaluación Nivel/Subnivel",PuntajeEva),
    createData3("NOTA FINAL DE CURSO",nota),
  ];

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
                      {rows3.map((rows3) => (
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
