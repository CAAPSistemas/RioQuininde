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

export default function NotasSemestre2Basica({ saved2,idM }) {
  //*** Semestres 2 variables útiles*/////
  let promedioL2; ///Promedio de lecciones escritas
  let promedioP2; //// Promedio Pruebas escritas
  let promedioT2; //// Promedio Tareas
  let promedioPI2; //// Promedio Proyecto Investigaciones
  let promdioPr2; ////Promedio Proyectos
  let promedioExpos2; ///Promedio Exposiciones
  let promedioTaller2; ///Promedio Talleres
  let promedioGIIS2; ///// Promedio Actividades GrupalesISemestreI
  let proyecto_integrador2; ////Proyecto Integrador
  let evaluacionSemestre2;

/////**Cualitativos Variables /// */
let lecciones2;
let pruebas2;
let tareas2;
let investigaciones2;
let proyectos2;
let ep2;
let tall2;
let prAportes;
let cualitativoIntegrador2;
let periodoAcademico2;

 //******************************************** Promedio Lecciones2 Escrita Semestre 1 *******************************************************************/
 function lecciones2EscritasSemestre2() {
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
    promedioL2 = summa / 3; ///Promedio de lecciones2 escritas
  }
  if (!isNaN(promedioL2)) {
  if (promedioL2= 3) {
    lecciones2 = "A";
  } else if (promedioL2=2) {
    lecciones2 = "EP";
  } else if (promedioL2=1) {
    lecciones2 = "I";
  } else if (promedioL2=0) {
    lecciones2 = "NE";
  }

    const submissionUuids = saved2.map((registro) => registro.submission_uuid  );
    axios
      .patch(
        `http://ahorasi.dd:8083/webform_rest/notas_segundo_tercero_cuartos/submission/${submissionUuids}`,
        {
          webform_id: "notas_segundo_tercero_cuartos",
          cualitativo_orales: lecciones2,
        }
      )
      .then((response) => {})
      .catch((error) => {
        console.error("Ocurrió un error durante la solicitud:", error);
      });
    }
  return lecciones2;
}
const lecciones2S1 = lecciones2EscritasSemestre2(); //// Imprimir función promedio lecciones2 escritas

  //******************************************** Promedio Pruebas2 Semestre 1 *******************************************************************/
  function pruebas2Semestre2() {
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
      promedioP2 = summa / 3; ///Promedio de pruebas2 Escritas
    }

    if (!isNaN(promedioP2)) {

    if (promedioP2= 3) {
      pruebas2 = "A";
    } else if (promedioP2=2) {
      pruebas2 = "EP";
    } else if (promedioP2=1) {
      pruebas2 = "I";
    } else if (promedioP2=0) {
      pruebas2 = "NE";
    }

      const submissionUuids = saved2.map(
        (registro) => registro.submission_uuid
      );

      axios
        .patch(
          `http://ahorasi.dd:8083/webform_rest/notas_segundo_tercero_cuartos/submission/${submissionUuids}`,
          {
            webform_id: "notas_segundo_tercero_cuartos",
            cualitativo_pruebabase: pruebas2,
          }
        )
        .then((response) => {})
        .catch((error) => {
          console.error("Ocurrió un error durante la solicitud:", error);
        });
      }
    return pruebas2;
  }
  const pruebas2S1 = pruebas2Semestre2(); //// Imprimir función promedio pruebas2 escritas
//******************************************** Promedio Tareas2 Semestre 1 *******************************************************************/
function tareas2Semestre2() {
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
    promedioT2 = summa / 3; ///Promedio de Tareas2
  }

  if (promedioT2= 3) {
    tareas2 = "A";
  } else if (promedioT2=2) {
    tareas2 = "EP";
  } else if (promedioT2=1) {
    tareas2 = "I";
  } else if (promedioT2=0) {
    tareas2 = "NE";
  }

    const submissionUuids = saved2.map(
      (registro) => registro.submission_uuid
    );

    axios
      .patch(
        `http://ahorasi.dd:8083/webform_rest/notas_segundo_tercero_cuartos/submission/${submissionUuids}`,
        {
          webform_id: "notas_segundo_tercero_cuartos",
          cualitativo_tareas_ejercicios: tareas2,
        }
      )
      .then((response) => {})
      .catch((error) => {
        console.error("Ocurrió un error durante la solicitud:", error);
      });

  return tareas2;
}
const tareas2S1 = tareas2Semestre2(); //// Imprimir función promedio tareas2

  //******************************************** Promedio Investigaciones2 Semestre 1 *******************************************************************/
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
      promedioPI2 = summa / 3; ///Promedio de Proyecto Investigaciones2
    }
    if (!isNaN(promedioPI2)) {
    if (promedioPI2= 3) {
      investigaciones2 = "A";
    } else if (promedioPI2=2) {
      investigaciones2 = "EP";
    } else if (promedioPI2=1) {
      investigaciones2 = "I";
    } else if (promedioPI2=0) {
      investigaciones2 = "NE";
    }

      const submissionUuids = saved2.map(
        (registro) => registro.submission_uuid
      );

      axios
        .patch(
          `http://ahorasi.dd:8083/webform_rest/notas_segundo_tercero_cuartos/submission/${submissionUuids}`,
          {
            webform_id: "notas_segundo_tercero_cuartos",
            promedio_investigaciones: investigaciones2,
          }
        )
        .then((response) => {})
        .catch((error) => {
          console.error("Ocurrió un error durante la solicitud:", error);
        });
      }
    return investigaciones2;
  }
  const proyectoIS1 = inventigacionesSemestre2(); //// Imprimir función promedio PInvestigaciones2

  //******************************************** Promedio Proyectos2 Semestre 1 *******************************************************************/
  function Proyectos2Semestre2() {
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
      promdioPr2 = summa / 3; ///Promedio de Proyectos2
    }
    if (!isNaN(promdioPr2)) {
    if (promdioPr2= 3) {
      proyectos2= "A";
    } else if (promdioPr2=2) {
      proyectos2= "EP";
    } else if (promdioPr2=1) {
      proyectos2= "I";
    } else if (promdioPr2=0) {
      proyectos2= "NE";
    }
      const submissionUuids = saved2.map(
        (registro) => registro.submission_uuid
      );

      axios
        .patch(
          `http://ahorasi.dd:8083/webform_rest/notas_segundo_tercero_cuartos/submission/${submissionUuids}`,
          {
            webform_id: "notas_segundo_tercero_cuartos",
            promedio_proyectos: proyectos2,
          }
        )
        .then((response) => {})
        .catch((error) => {
          console.error("Ocurrió un error durante la solicitud:", error);
        });
      }
        return proyectos2;
  }
  const proyectos2S1 = Proyectos2Semestre2(); //// Imprimir función promedio Proyectos2


  //******************************************** Promedio Exposiciones Semestre 1 *******************************************************************/
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
    if (promedioExpos2= 3) {
      ep2= "A";
    } else if (promedioExpos2=2) {
     ep2= "EP";
    } else if (promedioExpos2=1) {
      ep2= "I";
    } else if (promedioExpos2=0) {
      ep2= "NE";
    }

      const submissionUuids = saved2.map(
        (registro) => registro.submission_uuid
      );

      axios
        .patch(
          `http://ahorasi.dd:8083/webform_rest/notas_segundo_tercero_cuartos/submission/${submissionUuids}`,
          {
            webform_id: "notas_segundo_tercero_cuartos",
            promedio_expo: ep2
,
          }
        )
        .then((response) => {})
        .catch((error) => {
          console.error("Ocurrió un error durante la solicitud:", error);
        });
      }
    return ep2;
  }
  const exposS1 = ExpoSemestre2();


  //******************************************** Promedio Talleres Semestre 1 *******************************************************************/
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

      if (promedioTaller2= 3) {
        tall2= "A";
      } else if (promedioTaller2=2) {
        tall2= "EP";
      } else if (promedioTaller2=1) {
        tall2= "I";
      } else if (promedioTaller2=0) {
        tall2= "NE";
      }

      const submissionUuids = saved2.map(
        (registro) => registro.submission_uuid
      );

      axios
        .patch(
          `http://ahorasi.dd:8083/webform_rest/notas_segundo_tercero_cuartos/submission/${submissionUuids}`,
          {
            webform_id: "notas_segundo_tercero_cuartos",
            cualitativo_talleres: tall2,
          }
        )
        .then((response) => {})
        .catch((error) => {
          console.error("Ocurrió un error durante la solicitud:", error);
        });
    }
    return tall2;
  }
  const tallerS1 = TalleresSemestre2(); //// Imprimir función promedio Exposiciones



//******************************************** Promedio Actividades -Grupales** *******************************************************************/
function promedioActGrupalesIiSemestre2() {
  promedioGIIS2 =
    (promedioL2+promedioP2+promedioT2+promedioPI2 + promdioPr2 + promedioExpos2 + promedioTaller2) / 6; //Aportes cualitativo

  if (!isNaN(promedioGIIS2)) {

    if (promedioGIIS2= 3) {
      prAportes= "A";
    } else if (promedioGIIS2=2) {
      prAportes= "EP";
    } else if (promedioGIIS2=1) {
      prAportes= "I";
    } else if (promedioGIIS2=0) {
      prAportes= "NE";
    }

    const submissionUuids = saved2.map(
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
const promedioIIS1 = promedioActGrupalesIiSemestre2(); //// Imprimir función promedio PInvestigaciones

  //********************************************  Proyecto INTEGRADOR *******************************************************************/

function proyectoIntegrador2() {
  proyecto_integrador2 = saved2
    .map((registro) => parseInt(registro.proyecto_integrador_f1))
    .filter((campo) => campo !== "");
  return proyecto_integrador2;
}
const Proyecto_integrador = proyectoIntegrador2(); //// Imprimir función Proyecto Integrador

  //******************************************** CUALITATIVO Proyecto INTEGRADOR *******************************************************************/
  function promedioAportes5S2() {
    let pi = saved2
      .map((registro) => parseInt(registro.proyecto_integrador_f1))
      .filter((campo) => campo !== "");

    if (!isNaN(pi)) {

      if (pi= 3) {
        cualitativoIntegrador2= "A";
      } else if (pi=2) {
        cualitativoIntegrador2= "EP";
      } else if (pi=1) {
        cualitativoIntegrador2= "I";
      } else if (pi=0) {
        cualitativoIntegrador2= "NE";
      }

      const submissionUuids = saved2.map(
        (registro) => registro.submission_uuid
      );

      axios
        .patch(
          `http://ahorasi.dd:8083/webform_rest/notas_segundo_tercero_cuartos/submission/${submissionUuids}`,
          {
            webform_id: "notas_segundo_tercero_cuartos",
            proyecto_interdisciplinario_90: cualitativoIntegrador2,

          }
        )
        .then((response) => {
          console.log("Entro");
        })
        .catch((error) => {
          console.error("Ocurrió un error durante la solicitud:", error);
        });
    }
    return cualitativoIntegrador2;
  }
  const Promedio5S1 = promedioAportes5S2(); //// Imprimir función promedio


 /******************************************** Evaluación Periodo Academico  *******************************************************************/
 function evaluacionSemestreS2() {
  evaluacionSemestre2 = saved2
    .map((registro) => parseInt(registro.cualitativo_proyecto_integrador_f1))
    .filter((campo) => campo !== "");
  return evaluacionSemestre2;
}
const EvalSemestre1 = evaluacionSemestreS2();

// ******************************************** Cualitativo Evaluación Periodo Academico *******************************************************************/

function Eva5Semestre1() {
  let va = saved2
    .map((registro) => parseInt(registro.cualitativo_proyecto_integrador_f1))
    .filter((campo) => campo !== "");

  if (!isNaN(va)) {
    if (va= 3) {
      periodoAcademico2= "A";
    } else if (va=2) {
      periodoAcademico2= "EP";
    } else if (va=1) {
      periodoAcademico2= "I";
    } else if (va=0) {
      periodoAcademico2= "NE";
    }

    const submissionUuids = saved2.map(
      (registro) => registro.submission_uuid
    );

    axios
      .patch(
        `http://ahorasi.dd:8083/webform_rest/notas_segundo_tercero_cuartos/submission/${submissionUuids}`,
        {
          webform_id: "notas_segundo_tercero_cuartos",

          evaluacion_semestre_: periodoAcademico2,
        }
      )
      .then((response) => {
        console.log("Entro");
      })
      .catch((error) => {
        console.error("Ocurrió un error durante la solicitud:", error);
      });
  }
  return periodoAcademico2;
}
const Ev5Semestre1 = Eva5Semestre1();

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

       function createData(name, value) {
        return { name, value };
      }
      const rows = [
        createData("Lecciones escritas", lecciones2S1),
        createData("Pruebas escritas", pruebas2S1),
         createData("Tareas", tareas2S1),
         createData("Proyecto Investigaciones", proyectoIS1),
         createData("Promedio Proyectos",proyectos2S1 ),
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