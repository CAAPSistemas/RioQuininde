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

export default function NotasSemestre2({ saved2,idM }) {
    let promedioL2; ////
    let promedioP2; ////
    let promedioT2;
    let promedioPI2;
    let promedioGIS12;
    let promdioPr2;
    let promedioExpos2;
    let promedioTaller2;
    let promedioProductos2;
    let promedioGIIS2;
    let promedioAportes2;
    let promedio90S12;
    let proyecto_integradorS2;
    let promedio5S12;
    let Promedio_Final_S2;
    let evaluacion;
    let puntaje2;
    let grade2;
    let evaluacionSemestre2;
    let promedioIS12;
    let eva5S2;

     //******************************************** Promedio Lecciones Escrita Semestre 3 *******************************************************************/
  function leccionesEscritasSemestre2() {
    let summa;
    const l1 = saved2
      .map((registro) => parseInt(registro.lecciones_orales_escritas_1))
      .filter((campo) => campo !== "");
    const l2 = saved2
      .map((registro) => parseInt(registro.lecciones_orales_escritas_2))
      .filter((campo) => campo !== "");
    const l3 = saved2
      .map((registro) => parseInt(registro.lecciones_orales_escritas_3))
      .filter((campo) => campo !== "");

    if (l1.length > 0 && l2.length > 0 && l3.length > 0) {
      summa =
        l1.reduce((acc, current) => acc + current, 0) +
        l2.reduce((acc, current) => acc + current, 0) +
        l3.reduce((acc, current) => acc + current, 0);
      promedioL2 = summa / 3; ///Promedio de lecciones escritas
    }


    if (!isNaN(promedioL2)) {
      const submissionUuids = saved2.map(
        (registro) => registro.submission_uuid
      );

      axios
        .patch(
          `http://ahorasi.dd:8083/webform_rest/notas_quinto_noveno_segundos/submission/${submissionUuids}`,
          {
            webform_id: "notas_quinto_noveno_segundos",
            cualitativo_orales: promedioL2,
          }
        )
        .then((response) => {})
        .catch((error) => {
          console.error("Ocurrió un error durante la solicitud:", error);
        });
    }
    return promedioL2;
  }
  const leccionesS2 = leccionesEscritasSemestre2();

  //******************************************** Promedio Pruebas Semestre 3 *******************************************************************/
  function pruebasSemestre2() {
    let summa;
    const p1 = saved2
      .map((registro) => parseInt(registro.prueba_base_estructurada_1))
      .filter((campo) => campo !== "");
    const p2 = saved2
      .map((registro) => parseInt(registro.prueba_base_estructurada_2))
      .filter((campo) => campo !== "");
    const p3 = saved2
      .map((registro) => parseInt(registro.prueba_base_estructurada_3))
      .filter((campo) => campo !== "");

    if (p1.length > 0 && p2.length > 0 && p3.length > 0) {
      summa =
        p1.reduce((acc, current) => acc + current, 0) +
        p2.reduce((acc, current) => acc + current, 0) +
        p3.reduce((acc, current) => acc + current, 0);
      promedioP2 = summa / 3; ///Promedio de pruebas Escritas
    }

    if (!isNaN(promedioP2)) {
      const submissionUuids = saved2.map(
        (registro) => registro.submission_uuid
      );

      axios
        .patch(
          `http://ahorasi.dd:8083/webform_rest/notas_quinto_noveno_segundos/submission/${submissionUuids}`,
          {
            webform_id: "notas_quinto_noveno_segundos",
            cualitativo_pruebabase: promedioP2,
          }
        )
        .then((response) => {})
        .catch((error) => {
          console.error("Ocurrió un error durante la solicitud:", error);
        });
    }
    return promedioP2;
  }
  const pruebasS2 = pruebasSemestre2(); //// Imprimir función promedio pruebas escritas
      //******************************************** Promedio Tareas Semestre 3 *******************************************************************/
  function tareasSemestre2() {
    let summa;
    const t1 = saved2
      .map((registro) => parseInt(registro.tareas_ejercicios_1))
      .filter((campo) => campo !== "");
    const t2 = saved2
      .map((registro) => parseInt(registro.tareas_ejercicios_2))
      .filter((campo) => campo !== "");
    const t3 = saved2
      .map((registro) => parseInt(registro.tareas_ejercicios_3))
      .filter((campo) => campo !== "");

    if (t1.length > 0 && t2.length > 0 && t3.length > 0) {
      summa =
        t1.reduce((acc, current) => acc + current, 0) +
        t2.reduce((acc, current) => acc + current, 0) +
        t3.reduce((acc, current) => acc + current, 0);
      promedioT2 = summa / 3; ///Promedio de Tareas
    }

    if (!isNaN(promedioT2)) {
      const submissionUuids = saved2.map(
        (registro) => registro.submission_uuid
      );

      axios
        .patch(
          `http://ahorasi.dd:8083/webform_rest/notas_quinto_noveno_segundos/submission/${submissionUuids}`,
          {
            webform_id: "notas_quinto_noveno_segundos",
            cualitativo_tareas_ejercicios: promedioT2,
          }
        )
        .then((response) => {})
        .catch((error) => {
          console.error("Ocurrió un error durante la solicitud:", error);
        });
    }
    return promedioT2;
  }
  const tareasS2 = tareasSemestre2(); //// Imprimir función promedio tareas

  //// Imprimir función promedio lecciones escritas

  function inventigacionesSemestre2() {
    let summa;
    const pi1 = saved2
      .map((registro) => parseInt(registro.proyectos_investigaciones_1))
      .filter((campo) => campo !== "");
    const pi2 = saved2
      .map((registro) => parseInt(registro.proyectos_investigaciones_2))
      .filter((campo) => campo !== "");
    const pi3 = saved2
      .map((registro) => parseInt(registro.proyectos_investigaciones_3))
      .filter((campo) => campo !== "");

    if (pi1.length > 0 && pi2.length > 0 && pi3.length > 0) {
      summa =
        pi1.reduce((acc, current) => acc + current, 0) +
        pi2.reduce((acc, current) => acc + current, 0) +
        pi3.reduce((acc, current) => acc + current, 0);
      promedioPI2 = summa / 3; ///Promedio de Proyecto Investigaciones
    }

    if (!isNaN(promedioPI2)) {
      const submissionUuids = saved2.map(
        (registro) => registro.submission_uuid
      );

      axios
        .patch(
          `http://ahorasi.dd:8083/webform_rest/notas_quinto_noveno_segundos/submission/${submissionUuids}`,
          {
            webform_id: "notas_quinto_noveno_segundos",
            promedio_investigaciones: promedioPI2,
          }
        )
        .then((response) => {})
        .catch((error) => {
          console.error("Ocurrió un error durante la solicitud:", error);
        });
    }
    return promedioPI2;
  }
  const proyectoIS12 = inventigacionesSemestre2(); //// Imprimir función promedio PInvestigaciones

  //******************************************** Promedio Actividades Grupales I Semestres 3 *******************************************************************/
  function promedioActGrupalesISemestre2() {
    promedioGIS12 = (promedioL2 + promedioP2 + promedioT2 + promedioPI2) / 4; ///Promedio Actividades Grupales I

    if (!isNaN(promedioGIS12)) {
      const submissionUuids = saved2.map(
        (registro) => registro.submission_uuid
      );

      axios
        .patch(
          `http://ahorasi.dd:8083/webform_rest/notas_quinto_noveno_segundos/submission/${submissionUuids}`,
          {
            webform_id: "notas_quinto_noveno_segundos",
            promedio: promedioGIS12,
          }
        )
        .then((response) => {})
        .catch((error) => {
          console.error("Ocurrió un error durante la solicitud:", error);
        });
    }
    return promedioGIS12;
  }
  const PromedioIS12 = promedioActGrupalesISemestre2(); //// Imprimir función promedio PInvestigaciones


















  //******************************************** Promedio Proyectos Semestre 3*******************************************************************/
  function ProyectosSemestre2() {
    let summa;
    const pi1 = saved2
      .map((registro) => parseInt(registro.proyectos_1))
      .filter((campo) => campo !== "");
    const pi2 = saved2
      .map((registro) => parseInt(registro.proyectos_2))
      .filter((campo) => campo !== "");
    const pi3 = saved2
      .map((registro) => parseInt(registro.proyectos_3))
      .filter((campo) => campo !== "");

    if (pi1.length > 0 && pi2.length > 0 && pi3.length > 0) {
      summa =
        pi1.reduce((acc, current) => acc + current, 0) +
        pi2.reduce((acc, current) => acc + current, 0) +
        pi3.reduce((acc, current) => acc + current, 0);
      promdioPr2 = summa / 3; ///Promedio de Proyectos
    }

    if (!isNaN(promdioPr2)) {
      const submissionUuids = saved2.map(
        (registro) => registro.submission_uuid
      );

      axios
        .patch(
          `http://ahorasi.dd:8083/webform_rest/notas_quinto_noveno_segundos/submission/${submissionUuids}`,
          {
            webform_id: "notas_quinto_noveno_segundos",
            promedio_proyectos: promdioPr2,
          }
        )
        .then((response) => {})
        .catch((error) => {
          console.error("Ocurrió un error durante la solicitud:", error);
        });
    }
    return promdioPr2;
  }
  const proyectosS12 = ProyectosSemestre2();

  //******************************************** Promedio Exposiciones Semestre 2 *******************************************************************/
  function ExpoSemestre2() {
    let summa;
    const pi1 = saved2
      .map((registro) => parseInt(registro.exposiciones_foros_1))
      .filter((campo) => campo !== "");
    const pi2 = saved2
      .map((registro) => parseInt(registro.exposiciones_foros_2))
      .filter((campo) => campo !== "");
    const pi3 = saved2
      .map((registro) => parseInt(registro.exposiciones_foros_3))
      .filter((campo) => campo !== "");

    if (pi1.length > 0 && pi2.length > 0 && pi3.length > 0) {
      summa =
        pi1.reduce((acc, current) => acc + current, 0) +
        pi2.reduce((acc, current) => acc + current, 0) +
        pi3.reduce((acc, current) => acc + current, 0);
      promedioExpos2 = summa / 3; ///Promedio de Proyectos
    }

    if (!isNaN(promedioExpos2)) {
      const submissionUuids = saved2.map(
        (registro) => registro.submission_uuid
      );

      axios
        .patch(
          `http://ahorasi.dd:8083/webform_rest/notas_quinto_noveno_segundos/submission/${submissionUuids}`,
          {
            webform_id: "notas_quinto_noveno_segundos",
            promedio_expo: promedioExpos2,
          }
        )
        .then((response) => {})
        .catch((error) => {
          console.error("Ocurrió un error durante la solicitud:", error);
        });
    }
    return promedioExpos2;
  }
  const exposS12 = ExpoSemestre2(); //// Imprimir función promedio Exposiciones


///******Talleres */

function TalleresSemestre2() {
    let summa;
    const pi1 = saved2
      .map((registro) => parseInt(registro.talleres_1))
      .filter((campo) => campo !== "");
    const pi2 = saved2
      .map((registro) => parseInt(registro.talleres_1))
      .filter((campo) => campo !== "");
    const pi3 = saved2
      .map((registro) => parseInt(registro.talleres_1))
      .filter((campo) => campo !== "");

    if (pi1.length > 0 && pi2.length > 0 && pi3.length > 0) {
      summa =
        pi1.reduce((acc, current) => acc + current, 0) +
        pi2.reduce((acc, current) => acc + current, 0) +
        pi3.reduce((acc, current) => acc + current, 0);
      promedioTaller2 = summa / 3; ///Promedio de Talleres
    }

    if (!isNaN(promedioTaller2)) {
      const submissionUuids = saved2.map(
        (registro) => registro.submission_uuid
      );

      axios
        .patch(
          `http://ahorasi.dd:8083/webform_rest/notas_quinto_noveno_segundos/submission/${submissionUuids}`,
          {
            webform_id: "notas_quinto_noveno_segundos",
            cualitativo_talleres: promedioTaller2,
          }
        )
        .then((response) => {})
        .catch((error) => {
          console.error("Ocurrió un error durante la solicitud:", error);
        });
    }
    return promedioTaller2;
  }
  const tallerS12 = TalleresSemestre2(); //// Imprimir función promedio Exposiciones



/********Productos */
function ProductosSemestre2() {
    let summa;
    const pi1 = saved2
      .map((registro) => parseInt(registro.productos1))
      .filter((campo) => campo !== "");
    const pi2 = saved2
      .map((registro) => parseInt(registro.productos2))
      .filter((campo) => campo !== "");
    const pi3 = saved2
      .map((registro) => parseInt(registro.productos3))
      .filter((campo) => campo !== "");

    if (pi1.length > 0 && pi2.length > 0 && pi3.length > 0) {
      summa =
        pi1.reduce((acc, current) => acc + current, 0) +
        pi2.reduce((acc, current) => acc + current, 0) +
        pi3.reduce((acc, current) => acc + current, 0);
      promedioProductos2 = summa / 3; ///Promedio de Productos
    }

    if (!isNaN(promedioProductos2)) {
      const submissionUuids = saved2.map(
        (registro) => registro.submission_uuid
      );

      axios
        .patch(
          `http://ahorasi.dd:8083/webform_rest/notas_quinto_noveno_segundos/submission/${submissionUuids}`,
          {
            webform_id: "notas_quinto_noveno_segundos",
            promedio_productos: promedioProductos2,
          }
        )
        .then((response) => {})
        .catch((error) => {
          console.error("Ocurrió un error durante la solicitud:", error);
        });
    }
    return promedioProductos2;
  }
  const productosS12 = ProductosSemestre2();



//*****Promedio Grupales 2 */
function promedioActGrupalesIiSemestre2() {
    promedioGIIS2 =
      (promdioPr2 + promedioExpos2 + promedioTaller2 + promedioProductos2) / 4; ///Promedio Actividades Grupales I

    if (!isNaN(promedioGIIS2)) {
      const submissionUuids = saved2.map(
        (registro) => registro.submission_uuid
      );

      axios
        .patch(
          `http://ahorasi.dd:8083/webform_rest/notas_quinto_noveno_segundos/submission/${submissionUuids}`,
          {
            webform_id: "notas_quinto_noveno_segundos",
            promedio2: promedioGIIS2,
          }
        )
        .then((response) => {})
        .catch((error) => {
          console.error("Ocurrió un error durante la solicitud:", error);
        });
    }
    return promedioGIIS2;
  }
  const promedioIIS12 = promedioActGrupalesIiSemestre2();

///*************Promedio Aportes */
    function promedioAportesS2() {
        promedioAportes2 = (promedioGIS12 + promedioGIIS2) / 2; ///Promedio Actividades Grupales I

        if (!isNaN(promedioAportes2)) {
          const submissionUuids = saved2.map(
            (registro) => registro.submission_uuid
          );

          axios
            .patch(
              `http://ahorasi.dd:8083/webform_rest/notas_quinto_noveno_segundos/submission/${submissionUuids}`,
              {
                webform_id: "notas_quinto_noveno_segundos",
                promedioaportes: promedioAportes2,
              }
            )
            .then((response) => {})
            .catch((error) => {
              console.error("Ocurrió un error durante la solicitud:", error);
            });
        }
        return promedioAportes2;
      }
      const promedioAporte2 = promedioAportesS2();


      //******************************************** Promedio Aportes 90% *******************************************************************/
  function promedioAportes90S12() {
    promedio90S12 = promedioAportes2 * 0.9; ///Promedio Actividades Grupales I

    if (!isNaN(promedio90S12)) {
      const submissionUuids = saved2.map(
        (registro) => registro.submission_uuid
      );

      axios
        .patch(
          `http://ahorasi.dd:8083/webform_rest/notas_quinto_noveno_segundos/submission/${submissionUuids}`,
          {
            webform_id: "notas_quinto_noveno_segundos",
            promedio_aportes_90: promedio90S12,
          }
        )
        .then((response) => {
          console.log("Entro");
        })
        .catch((error) => {
          console.error("Ocurrió un error durante la solicitud:", error);
        });
    }
    return promedio90S12;
  }
  const Promedio90S12 = promedioAportes90S12(); //// Imprimir función promedio PInvestigaciones


  /******************************************** proyecto_integrador Semestre 3 *******************************************************************/
  function proyectoIntegradorS2() {
    proyecto_integradorS2 = saved2
      .map((registro) => parseInt(registro.proyecto_integrador_f1))
      .filter((campo) => campo !== "");
    return proyecto_integradorS2;
  }
  const Proyecto_integradorS2 = proyectoIntegradorS2();


    function evaluacionS2() {
        evaluacion = saved2
          .map((registro) => parseInt(registro.cualitativo_proyecto_integrador_f1))
          .filter((campo) => campo !== "");
        return evaluacion;
      }
      const evaluacion2 = evaluacionS2();

      // ******************************************** proyecto_integrador 5% Semestre 3 *******************************************************************/

  function promedioIntegrador5S12() {
    const pi1 = saved2
      .map((registro) => parseInt(registro.proyecto_integrador_f1))
      .filter((campo) => campo !== "");

    promedio5S12 = pi1 * 0.05; ///Promedio Proyecto Interdisciplinario

    if (!isNaN(promedio5S12)) {
      const submissionUuids = saved2.map(
        (registro) => registro.submission_uuid
      );

      axios
        .patch(
          `http://ahorasi.dd:8083/webform_rest/notas_quinto_noveno_segundos/submission/${submissionUuids}`,
          {
            webform_id: "notas_quinto_noveno_segundos",
            proyecto_interdisciplinario_90: promedio5S12,

          }
        )
        .then((response) => {
          console.log("Entro");
        })
        .catch((error) => {
          console.error("Ocurrió un error durante la solicitud:", error);
        });
    }
    return promedio5S12;
  }
  const Promedio5S2 = promedioIntegrador5S12();


    // ******************************************** Evaluación Semestre5% Semestre 3 *******************************************************************/

    function Eva5Semestre2() {
        const pi1 = saved2
          .map((registro) => parseInt(registro.cualitativo_proyecto_integrador_f1))
          .filter((campo) => campo !== "");

        eva5S2 = pi1 * 0.05; ///Promedio Proyecto Interdisciplinario

        if (!isNaN(eva5S2)) {
          const submissionUuids = saved2.map(
            (registro) => registro.submission_uuid
          );

          axios
            .patch(
              `http://ahorasi.dd:8083/webform_rest/notas_quinto_noveno_segundos/submission/${submissionUuids}`,
              {
                webform_id: "notas_quinto_noveno_segundos",
                // proyecto_interdisciplinario_90: promedio5S1,
                evaluacion_semestre_: eva5S2,
              }
            )
            .then((response) => {
              console.log("Entro");
            })
            .catch((error) => {
              console.error("Ocurrió un error durante la solicitud:", error);
            });
        }
        return eva5S2;
      }
      const Evasemestre2 = Eva5Semestre2();



    // ******************************************** Promedio Final Semestre 2*******************************************************************/

  function promedioFinalSemestre2() {
    Promedio_Final_S2 = promedio90S12+promedio5S12+eva5S2;
    if (!isNaN(Promedio_Final_S2)) {
      const submissionUuids = saved2.map(
        (registro) => registro.submission_uuid
      );

      axios
        .patch(
          `http://ahorasi.dd:8083/webform_rest/notas_quinto_noveno_segundos/submission/${submissionUuids}`,
          {
            webform_id: "notas_quinto_noveno_segundos",
            // proyecto_interdisciplinario_90: promedio5S1,
            promedio_final: Promedio_Final_S2,
          }
        )
        .then((response) => {
          console.log("Entro");
        })
        .catch((error) => {
          console.error("Ocurrió un error durante la solicitud:", error);
        });
    }



    return Promedio_Final_S2;
  }
  const Promedios_Final_S12 = promedioFinalSemestre2();

//******************************************Puntaje2 */
function puntajeTrimestral2() {
    puntaje2 = Promedio_Final_S2 * 0.3;

    if (!isNaN(puntaje2)) {
      const submissionUuids = saved2.map(
        (registro) => registro.submission_uuid
      );

      axios
        .patch(
          `http://ahorasi.dd:8083/webform_rest/notas_quinto_noveno_segundos/submission/${submissionUuids}`,
          {
            webform_id: "notas_quinto_noveno_segundos",
            puntaje: puntaje2,
          }
        )
        .then((response) => {})
        .catch((error) => {
          console.error("Ocurrió un error durante la solicitud:", error);
        });
    }

    return puntaje2;
  }
  const Puntaje2 = puntajeTrimestral2(); ////


  // ******************************************** Cualitativo Promedio Final  Semestre
    function cualitativoPromedioFinal2() {
        if (Promedio_Final_S2 >= 9 && Promedio_Final_S2 <= 10) {
          grade2 = "DA";
        } else if (Promedio_Final_S2 >= 7 && Promedio_Final_S2 < 9) {
          grade2 = "AA";
        } else if (Promedio_Final_S2 > 4 && Promedio_Final_S2 < 7) {
          grade2 = "PA";
        } else if (Promedio_Final_S2 < 4) {
          grade2 = "NA";
        }
        const submissionUuids = saved2.map((registro) => registro.submission_uuid);

        axios
          .patch(
            `http://ahorasi.dd:8083/webform_rest/notas_quinto_noveno_segundos/submission/${submissionUuids}`,
            {
              webform_id: "notas_quinto_noveno_segundos",
              grade: grade2,
            }
          )
          .then((response) => {})
          .catch((error) => {
            console.error("Ocurrió un error durante la solicitud:", error);
          });
        return grade2;
      }
      const Grade2 = cualitativoPromedioFinal2();

      function createDataShow(name, value1, value2, value3) {
        return { name, value1, value2, value3 };
      }
      const rowsShow = [
        createDataShow(
          "Lecciones escritas",
          saved2
            .map((registro) => parseInt(registro.lecciones_orales_escritas_1))
            .filter((campo) => campo !== ""),
          saved2
            .map((registro) => parseInt(registro.lecciones_orales_escritas_2))
            .filter((campo) => campo !== ""),
          saved2
            .map((registro) => parseInt(registro.lecciones_orales_escritas_3))
            .filter((campo) => campo !== "")
        ),
        createDataShow(
          "Pruebas escritas",
          saved2
            .map((registro) => parseInt(registro.prueba_base_estructurada_1))
            .filter((campo) => campo !== ""),
          saved2
            .map((registro) => parseInt(registro.prueba_base_estructurada_2))
            .filter((campo) => campo !== ""),
          saved2
            .map((registro) => parseInt(registro.prueba_base_estructurada_3))
            .filter((campo) => campo !== "")
        ),
        createDataShow(
          "Tareas",
          saved2
            .map((registro) => parseInt(registro.tareas_ejercicios_1))
            .filter((campo) => campo !== ""),
          saved2
            .map((registro) => parseInt(registro.tareas_ejercicios_2))
            .filter((campo) => campo !== ""),
          saved2
            .map((registro) => parseInt(registro.tareas_ejercicios_3))
            .filter((campo) => campo !== "")
        ),
        createDataShow(
          "Proyectos",
          saved2
            .map((registro) => parseInt(registro.proyectos_1))
            .filter((campo) => campo !== ""),
          saved2
            .map((registro) => parseInt(registro.proyectos_2))
            .filter((campo) => campo !== ""),
          saved2
            .map((registro) => parseInt(registro.proyectos_3))
            .filter((campo) => campo !== "")
        ),
        createDataShow(
          "Exposiciones",
          saved2
            .map((registro) => parseInt(registro.exposiciones_foros_1))
            .filter((campo) => campo !== ""),
          saved2
            .map((registro) => parseInt(registro.exposiciones_foros_2))
            .filter((campo) => campo !== ""),
          saved2
            .map((registro) => parseInt(registro.exposiciones_foros_3))
            .filter((campo) => campo !== "")
        ),
        createDataShow(
          "Talleres",
          saved2
            .map((registro) => parseInt(registro.talleres_1))
            .filter((campo) => campo !== ""),
          saved2
            .map((registro) => parseInt(registro.talleres_2))
            .filter((campo) => campo !== ""),
          saved2
            .map((registro) => parseInt(registro.talleres_3))
            .filter((campo) => campo !== "")
        ),
        createDataShow(
          "Desarrollo de productos",
          saved2
            .map((registro) => parseInt(registro.productos1))
            .filter((campo) => campo !== ""),
          saved2
            .map((registro) => parseInt(registro.productos2))
            .filter((campo) => campo !== ""),
          saved2
            .map((registro) => parseInt(registro.productos3))
            .filter((campo) => campo !== "")
        ),
        createDataShow(
          "Ivestigaciones",
          saved2
            .map((registro) => parseInt(registro.proyectos_investigaciones_1))
            .filter((campo) => campo !== ""),
          saved2
            .map((registro) => parseInt(registro.proyectos_investigaciones_2))
            .filter((campo) => campo !== ""),
          saved2
            .map((registro) => parseInt(registro.proyectos_investigaciones_3))
            .filter((campo) => campo !== "")
        ),
        createDataShow(
          "Proyecto Integrador",
          saved2
            .map((registro) => parseInt(registro.proyecto_integrador_f1))
            .filter((campo) => campo !== ""),
          "",
          ""
        ),
       ];


       function createData3(name, value) {
        return { name, value };
      }
      const rows3 = [
        createData3("Lecciones escritas", leccionesS2),
        createData3("Pruebas escritas", pruebasS2),
        createData3("Tareas", tareasS2),
        createData3("Investigaciones ",proyectoIS12 ),
        createData3("Promedio Actividades Grupales 1 ", PromedioIS12),
        createData3("Proyectos ", proyectosS12),
        createData3("Exposiciones/Foros ", exposS12),
        createData3("Talleres ", tallerS12),
        createData3("Productos ", productosS12),
        createData3("Promedio Actividades Grupales 2 ", promedioIIS12),
        createData3("Promedio Aportes ", promedioAporte2),
        createData3("Promedio Aportes 90%", Promedio90S12),
        createData3("Proyecto Integrador", Proyecto_integradorS2),
        createData3("Proyecto Integrador 5%", Promedio5S2),
        createData3("Evaluación Semestre ", evaluacion2),
        createData3("Evaluación Semestre 5%", Evasemestre2),
         createData3("Promedio Final", Promedios_Final_S12),
         createData3("Puntaje Semestre 2",Puntaje2),

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