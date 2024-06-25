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

export default function NotasSemestre1({ saved1, idM }) {
  //*** Semestres 1 variables útiles*/////
  let promedioL; ///Promedio de lecciones escritas
  let promedioP; //// Promedio Pruebas escritas
  let promedioT; //// Promedio Tareas
  let promedioPI; //// Promedio Proyecto Investigaciones
  let promedioGIS1; ///// Promedio Actividades GrupalesISemestreI
  let promdioPr; ////Promedio Proyectos
  let promedioExpos; ///Promedio Exposiciones
  let promedioTaller; ///Promedio Talleres
  let promedioProductos; ///promedioProductos
  let promedioGIIS1; ///// Promedio Actividades GrupalesISemestreI
  let promedioAportes; ///Promedio Aportes
  let promedio90S1; ////PromedioAportes90%
  let proyecto_integrador; ////Proyecto Integrador
  let promedio5S1; ///Promedio5%
  let Promedio_Final_S1; //// Promedio Final
  let evaluacionSemestre1;
  let grade1;
  let puntaje1;
  let eva5S1;

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

    console.log(promedioL);
    if (!isNaN(promedioL)) {
      const submissionUuids = saved1.map(
        (registro) => registro.submission_uuid
      );

      axios
        .patch(
          `http://ahorasi.dd:8083/webform_rest/notas_quinto_noveno_segundos/submission/${submissionUuids}`,
          {
            webform_id: "notas_quinto_noveno_segundos",
            cualitativo_orales: promedioL,
          }
        )
        .then((response) => {})
        .catch((error) => {
          console.error("Ocurrió un error durante la solicitud:", error);
        });
    }
    return promedioL;
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
      const submissionUuids = saved1.map(
        (registro) => registro.submission_uuid
      );

      axios
        .patch(
          `http://ahorasi.dd:8083/webform_rest/notas_quinto_noveno_segundos/submission/${submissionUuids}`,
          {
            webform_id: "notas_quinto_noveno_segundos",
            cualitativo_pruebabase: promedioP,
          }
        )
        .then((response) => {})
        .catch((error) => {
          console.error("Ocurrió un error durante la solicitud:", error);
        });
    }
    return promedioP;
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

    if (!isNaN(promedioT)) {
      const submissionUuids = saved1.map(
        (registro) => registro.submission_uuid
      );

      axios
        .patch(
          `http://ahorasi.dd:8083/webform_rest/notas_quinto_noveno_segundos/submission/${submissionUuids}`,
          {
            webform_id: "notas_quinto_noveno_segundos",
            cualitativo_tareas_ejercicios: promedioT,
          }
        )
        .then((response) => {})
        .catch((error) => {
          console.error("Ocurrió un error durante la solicitud:", error);
        });
    }
    return promedioT;
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
      const submissionUuids = saved1.map(
        (registro) => registro.submission_uuid
      );

      axios
        .patch(
          `http://ahorasi.dd:8083/webform_rest/notas_quinto_noveno_segundos/submission/${submissionUuids}`,
          {
            webform_id: "notas_quinto_noveno_segundos",
            promedio_investigaciones: promedioPI,
          }
        )
        .then((response) => {})
        .catch((error) => {
          console.error("Ocurrió un error durante la solicitud:", error);
        });
    }
    return promedioPI;
  }
  const proyectoIS1 = inventigacionesSemestre1(); //// Imprimir función promedio PInvestigaciones

  //******************************************** Promedio Actividades Grupales I Semestres 1 *******************************************************************/
  function promedioActGrupalesISemestre1() {
    promedioGIS1 = (promedioL + promedioP + promedioT + promedioPI) / 4; ///Promedio Actividades Grupales I

    if (!isNaN(promedioGIS1)) {
      const submissionUuids = saved1.map(
        (registro) => registro.submission_uuid
      );

      axios
        .patch(
          `http://ahorasi.dd:8083/webform_rest/notas_quinto_noveno_segundos/submission/${submissionUuids}`,
          {
            webform_id: "notas_quinto_noveno_segundos",
            promedio: promedioGIS1,
          }
        )
        .then((response) => {})
        .catch((error) => {
          console.error("Ocurrió un error durante la solicitud:", error);
        });
    }
    return promedioGIS1;
  }
  const promedioIS1 = promedioActGrupalesISemestre1(); //// Imprimir función promedio PInvestigaciones

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
      const submissionUuids = saved1.map(
        (registro) => registro.submission_uuid
      );

      axios
        .patch(
          `http://ahorasi.dd:8083/webform_rest/notas_quinto_noveno_segundos/submission/${submissionUuids}`,
          {
            webform_id: "notas_quinto_noveno_segundos",
            promedio_proyectos: promdioPr,
          }
        )
        .then((response) => {})
        .catch((error) => {
          console.error("Ocurrió un error durante la solicitud:", error);
        });
    }
    return promdioPr;
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
      const submissionUuids = saved1.map(
        (registro) => registro.submission_uuid
      );

      axios
        .patch(
          `http://ahorasi.dd:8083/webform_rest/notas_quinto_noveno_segundos/submission/${submissionUuids}`,
          {
            webform_id: "notas_quinto_noveno_segundos",
            promedio_expo: promedioExpos,
          }
        )
        .then((response) => {})
        .catch((error) => {
          console.error("Ocurrió un error durante la solicitud:", error);
        });
    }
    return promedioExpos;
  }
  const exposS1 = ExpoSemestre1(); //// Imprimir función promedio Exposiciones

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
      const submissionUuids = saved1.map(
        (registro) => registro.submission_uuid
      );

      axios
        .patch(
          `http://ahorasi.dd:8083/webform_rest/notas_quinto_noveno_segundos/submission/${submissionUuids}`,
          {
            webform_id: "notas_quinto_noveno_segundos",
            cualitativo_talleres: promedioTaller,
          }
        )
        .then((response) => {})
        .catch((error) => {
          console.error("Ocurrió un error durante la solicitud:", error);
        });
    }
    return promedioTaller;
  }
  const tallerS1 = TalleresSemestre1(); //// Imprimir función promedio Exposiciones

  //******************************************** Promedio Productos Semestre 1 *******************************************************************/
  function ProductosSemestre1() {
    let summa;
    const pi1 = saved1
      .map((registro) => parseInt(registro.productos1))
      .filter((campo) => campo !== "");
    const pi2 = saved1
      .map((registro) => parseInt(registro.productos2))
      .filter((campo) => campo !== "");
    const pi3 = saved1
      .map((registro) => parseInt(registro.productos3))
      .filter((campo) => campo !== "");

    if (pi1.length > 0 && pi2.length > 0 && pi3.length > 0) {
      summa =
        pi1.reduce((acc, current) => acc + current, 0) +
        pi2.reduce((acc, current) => acc + current, 0) +
        pi3.reduce((acc, current) => acc + current, 0);
      promedioProductos = summa / 3; ///Promedio de Productos
    }

    if (!isNaN(promedioProductos)) {
      const submissionUuids = saved1.map(
        (registro) => registro.submission_uuid
      );

      axios
        .patch(
          `http://ahorasi.dd:8083/webform_rest/notas_quinto_noveno_segundos/submission/${submissionUuids}`,
          {
            webform_id: "notas_quinto_noveno_segundos",
            promedio_productos: promedioProductos,
          }
        )
        .then((response) => {})
        .catch((error) => {
          console.error("Ocurrió un error durante la solicitud:", error);
        });
    }
    return promedioProductos;
  }
  const productosS1 = ProductosSemestre1(); //// Imprimir función promedio Exposiciones

  //******************************************** Promedio Actividades Grupales II Semestres 1 *******************************************************************/
  function promedioActGrupalesIiSemestre1() {
    promedioGIIS1 =
      (promdioPr + promedioExpos + promedioTaller + promedioProductos) / 4; ///Promedio Actividades Grupales I

    if (!isNaN(promedioGIIS1)) {
      const submissionUuids = saved1.map(
        (registro) => registro.submission_uuid
      );

      axios
        .patch(
          `http://ahorasi.dd:8083/webform_rest/notas_quinto_noveno_segundos/submission/${submissionUuids}`,
          {
            webform_id: "notas_quinto_noveno_segundos",
            promedio2: promedioGIIS1,
          }
        )
        .then((response) => {})
        .catch((error) => {
          console.error("Ocurrió un error durante la solicitud:", error);
        });
    }
    return promedioGIIS1;
  }
  const promedioIIS1 = promedioActGrupalesIiSemestre1(); //// Imprimir función promedio PInvestigaciones

  //******************************************** Promedio Aportes *******************************************************************/
  function promedioAportesS1() {
    promedioAportes = (promedioGIS1 + promedioGIIS1) / 2; ///Promedio Actividades Grupales I

    if (!isNaN(promedioAportes)) {
      const submissionUuids = saved1.map(
        (registro) => registro.submission_uuid
      );

      axios
        .patch(
          `http://ahorasi.dd:8083/webform_rest/notas_quinto_noveno_segundos/submission/${submissionUuids}`,
          {
            webform_id: "notas_quinto_noveno_segundos",
            promedioaportes: promedioAportes,
          }
        )
        .then((response) => {})
        .catch((error) => {
          console.error("Ocurrió un error durante la solicitud:", error);
        });
    }
    return promedioAportes;
  }
  const promedioAporte = promedioAportesS1(); //// Imprimir función promedio PInvestigaciones

  //******************************************** Promedio Aportes 90% *******************************************************************/
  function promedioAportes90S1() {
    promedio90S1 = promedioAportes * 0.9; ///Promedio Actividades Grupales I

    console.log(promedio90S1);
    if (!isNaN(promedio90S1)) {
      const submissionUuids = saved1.map(
        (registro) => registro.submission_uuid
      );

      axios
        .patch(
          `http://ahorasi.dd:8083/webform_rest/notas_quinto_noveno_segundos/submission/${submissionUuids}`,
          {
            webform_id: "notas_quinto_noveno_segundos",
            promedio_aportes_90: promedio90S1,
          }
        )
        .then((response) => {
          console.log("Entro");
        })
        .catch((error) => {
          console.error("Ocurrió un error durante la solicitud:", error);
        });
    }
    return promedio90S1;
  }
  const Promedio90S1 = promedioAportes90S1(); //// Imprimir función promedio PInvestigaciones

  /******************************************** proyecto_integrador *******************************************************************/
  function proyectoIntegrador() {
    proyecto_integrador = saved1
      .map((registro) => parseInt(registro.proyecto_integrador_f1))
      .filter((campo) => campo !== "");
    return proyecto_integrador;
  }
  const Proyecto_integrador = proyectoIntegrador(); //// Imprimir función Proyecto Integrador

  //******************************************** proyecto_integrador 5% *******************************************************************/
  function promedioAportes5S1() {
    const pi1 = saved1
      .map((registro) => parseInt(registro.proyecto_integrador_f1))
      .filter((campo) => campo !== "");

    promedio5S1 = pi1 * 0.05; ///Promedio Proyecto Interdisciplinario

    if (!isNaN(promedio5S1)) {
      const submissionUuids = saved1.map(
        (registro) => registro.submission_uuid
      );

      axios
        .patch(
          `http://ahorasi.dd:8083/webform_rest/notas_quinto_noveno_segundos/submission/${submissionUuids}`,
          {
            webform_id: "notas_quinto_noveno_segundos",
            proyecto_interdisciplinario_90: promedio5S1,
            evaluacion_semestre_: promedio5S1,
          }
        )
        .then((response) => {
          console.log("Entro");
        })
        .catch((error) => {
          console.error("Ocurrió un error durante la solicitud:", error);
        });
    }
    return promedio5S1;
  }
  const Promedio5S1 = promedioAportes5S1(); //// Imprimir función promedio PInvestigaciones
  /******************************************** Evaluación Semestre 3 *******************************************************************/
  function evaluacionSemestreS1() {
    evaluacionSemestre1 = saved1
      .map((registro) => parseInt(registro.cualitativo_proyecto_integrador_f1))
      .filter((campo) => campo !== "");
    return evaluacionSemestre1;
  }
  const EvalSemestre1 = evaluacionSemestreS1();

  // ******************************************** Evaluación Semestre5% Semestre 3 *******************************************************************/

  function Eva5Semestre1() {
    const pi1 = saved1
      .map((registro) => parseInt(registro.cualitativo_proyecto_integrador_f1))
      .filter((campo) => campo !== "");

    eva5S1 = pi1 * 0.05; ///Promedio Proyecto Interdisciplinario

    if (!isNaN(eva5S1)) {
      const submissionUuids = saved1.map(
        (registro) => registro.submission_uuid
      );

      axios
        .patch(
          `http://ahorasi.dd:8083/webform_rest/notas_quinto_noveno_segundos/submission/${submissionUuids}`,
          {
            webform_id: "notas_quinto_noveno_segundos",
            // proyecto_interdisciplinario_90: promedio5S1,
            evaluacion_semestre_: eva5S1,
          }
        )
        .then((response) => {
          console.log("Entro");
        })
        .catch((error) => {
          console.error("Ocurrió un error durante la solicitud:", error);
        });
    }
    return eva5S1;
  }
  const Ev5Semestre1 = Eva5Semestre1();

  /******************************************** Promedio Final Semestre*******************************************************************/

  function promedioFinalSemestre1() {
    Promedio_Final_S1 = promedio90S1 + promedio5S1 + eva5S1;

    if (!isNaN(Promedio_Final_S1)) {
      const submissionUuids = saved1.map(
        (registro) => registro.submission_uuid
      );

      axios
        .patch(
          `http://ahorasi.dd:8083/webform_rest/notas_quinto_noveno_segundos/submission/${submissionUuids}`,
          {
            webform_id: "notas_quinto_noveno_segundos",
            // proyecto_interdisciplinario_90: promedio5S1,
            promedio_final: Promedio_Final_S1,
          }
        )
        .then((response) => {
          console.log("Entro");
        })
        .catch((error) => {
          console.error("Ocurrió un error durante la solicitud:", error);
        });
    }

    return Promedio_Final_S1;
  }
  const Promedios_Final_S1 = promedioFinalSemestre1(); //// Imprimir función Proyecto Integrador

  /////**********************************************************Puntaje Trimestral 1 ************************************************/

  function puntajeTrimestral1() {
    puntaje1 = Promedio_Final_S1 * 0.3;

    if (!isNaN(puntaje1)) {
      const submissionUuids = saved1.map(
        (registro) => registro.submission_uuid
      );

      axios
        .patch(
          `http://ahorasi.dd:8083/webform_rest/notas_quinto_noveno_segundos/submission/${submissionUuids}`,
          {
            webform_id: "notas_quinto_noveno_segundos",
            puntaje: puntaje1,
          }
        )
        .then((response) => {})
        .catch((error) => {
          console.error("Ocurrió un error durante la solicitud:", error);
        });
    }

    return puntaje1;
  }
  const Puntaje1 = puntajeTrimestral1(); //// Imprimir función Proyecto Integrador

  // ******************************************** Cualitativo Promedio Final  Semestre 3 *******************************************************************/
  function cualitativoPromedioFinal1() {
    if (Promedio_Final_S1 >= 9 && Promedio_Final_S1 <= 10) {
      grade1 = "DA";
    } else if (Promedio_Final_S1 >= 7 && Promedio_Final_S1 < 9) {
      grade1 = "AA";
    } else if (Promedio_Final_S1 > 4 && Promedio_Final_S1 < 7) {
      grade1 = "PA";
    } else if (Promedio_Final_S1 < 4) {
      grade1 = "NA";
    }
    const submissionUuids = saved1.map((registro) => registro.submission_uuid);

    axios
      .patch(
        `http://ahorasi.dd:8083/webform_rest/notas_quinto_noveno_segundos/submission/${submissionUuids}`,
        {
          webform_id: "notas_quinto_noveno_segundos",
          grade: grade1,
        }
      )
      .then((response) => {})
      .catch((error) => {
        console.error("Ocurrió un error durante la solicitud:", error);
      });
    return grade1;
  }
  const Grade1 = cualitativoPromedioFinal1();

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
    createData("Lecciones escritas", leccionesS1, "la3"),
    createData("Pruebas escritas", pruebasS1),
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
    createData("Evaluación Semestre ", EvalSemestre1),
    createData("Proyecto Integrador 5%", Promedio5S1),
    createData("Evaluación Semestre 5%", Ev5Semestre1),
    createData("Promedio Final ", Promedios_Final_S1),
    createData("Puntaje Semestre 1",  Puntaje1),
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
