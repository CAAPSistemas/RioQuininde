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
import NotasSemestre1 from "./NotasSemestre1";
import NotasSemestre3 from "./NotasSemestre3";
import NotasSemestre2 from "./NotasSesmestre2";

export default function KeepMountedModalNotasMediaBachillerato({
  handleOpenNotasEMN,
  handleCloseNotasEMN,
  openNotasEMN,
  idM,
  clase,
}) {
  const isOk = openNotasEMN;
 const isOk2=openNotasEMN;
  const isOK3 = openNotasEMN;
  const isOk4=openNotasEMN;
  const [saved1, setSaved1] = useState([]);
  const [saved2, setSaved2] = useState([]);
  const [saved3, setSaved3] = useState([]);
  let registros = [];

  useEffect(() => {
    if (isOk) {
      RegistroNotasSemestre1(idM);
    }
  }, [isOk, idM]);

  /////////Registro Notas Semestre I///////////////
  //registro Notas Semestre 1
  function RegistroNotasSemestre1(idM) {
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
                  data.data.usuario === idM &&
                  data.data.semestre === "Semestre1" && data.data.asignatura===clase
                ) {
                  return {
                    usuario: data.data.usuario,
                    semestre: data.data.semestre,
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
                    promedio_investigaciones:
                      data.data.promedio_investigaciones,
                    promedio: data.data.promedio,
                    proyectos_1: data.data.proyectos_1,
                    proyectos_2: data.data.proyectos_2,
                    proyectos_3: data.data.proyectos_3,
                    exposiciones_foros_1: data.data.exposiciones_foros_1,
                    exposiciones_foros_2: data.data.exposiciones_foros_2,
                    exposiciones_foros_3: data.data.exposiciones_foros_3,
                    promedio_expo: data.data.promedio_expo,
                    talleres_1: data.data.talleres_1,
                    talleres_2: data.data.talleres_2,
                    talleres_3: data.data.talleres_3,
                    cualitativo_talleres: data.data.cualitativo_talleres,
                    productos1: data.data.productos1,
                    productos2: data.data.productos2,
                    productos3: data.data.productos3,
                    promedio_productos: data.data.promedio_productos,
                    proyecto_integrador_f1: data.data.proyecto_integrador_f1,
                    cualitativo_proyecto_integrador_f1: data.data.cualitativo_proyecto_integrador_f1,
                aportes_cualitativo_s1: data.data.aportes_cualitativo_s1,
                 proyecto_integrador_f1: data.data.proyecto_integrador_f1,
                 promedio_aportes_90:data.data.promedio_aportes_90,
                 proyecto_interdisciplinario_90: data.data.proyecto_interdisciplinario_90,
                 evaluacion_semestre_:data.data.evaluacion_semestre_,
                 promedio_final:data.data.promedio_final,
                 grade:data.data.grade,
                 puntaje:data.data.puntaje,
                 asignatura:data.data.asignatura,
                 submission_id: data.entity.sid[0].value,
                  submission_uuid: data.entity.uuid[0].value,
                  };
                }

                return null;
              })
              .filter(Boolean);

            setSaved1(registros);

            // porcientoAsistencia();
          })
          .catch((error) => {
            console.error("Error al obtener los datos adicionales:", error);
          });
      });
  }

///////////Semestre2

useEffect(() => {
  if (isOk2) {
    RegistroNotasSemestre2(idM);
  }
}, [isOk2, idM]);
function RegistroNotasSemestre2(idM) {
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
                data.data.usuario === idM &&
                data.data.semestre === "Semestre2"  && data.data.asignatura===clase
              ) {
                return {
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
                  proyectos_investigaciones_1:data.data.proyectos_investigaciones_1,
                  proyectos_investigaciones_2:data.data.proyectos_investigaciones_2,
                  proyectos_investigaciones_3: data.data.proyectos_investigaciones_3,
                  promedio_investigaciones:data.data.   promedio_investigaciones,
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
                  aportes_cualitativo_s1: data.data.aportes_cualitativo_s1,
                  proyecto_integrador_f1: data.data.proyecto_integrador_f1,
                  cualitativo_proyecto_integrador_f1:
                    data.data.cualitativo_proyecto_integrador_f1,
                  promedio_final: data.data.promedio_final,
                  proyectofinal:data.data.proyectofinal,
                 puntaje:data.data.puntaje,
                  lidera: data.data.lidera,
                  cumple: data.data.cumple,
                  reiterado: data.data.reiterado,
                  ocasional: data.data.ocasional,
                  nocumple: data.data.nocumple,
                  semestre: data.data.semestre,
                  submission_id: data.entity.sid[0].value,
                  submission_uuid: data.entity.uuid[0].value,
                };
              }

              return null;
            })
            .filter(Boolean);

          setSaved2(registros);
        })
        .catch((error) => {
          console.error("Error al obtener los datos adicionales:", error);
        });
    });
}



  useEffect(() => {
    if (isOK3) {
      RegistroNotasSemestre3(idM);
    }
  }, [isOK3, idM]);


//registro Notas Semestre 3
function RegistroNotasSemestre3(idM) {
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
                data.data.usuario === idM &&
                data.data.semestre === "Semestre3" && data.data.asignatura===clase
              ) {
                return {
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
                  proyectos_investigaciones_1:data.data.proyectos_investigaciones_1,
                  proyectos_investigaciones_2:data.data.proyectos_investigaciones_2,
                  proyectos_investigaciones_3: data.data.proyectos_investigaciones_3,
                  promedio_investigaciones:data.data. 	promedio_investigaciones,
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
                  aportes_cualitativo_s1: data.data.aportes_cualitativo_s1,
                  proyecto_integrador_f1: data.data.proyecto_integrador_f1,
                  cualitativo_proyecto_integrador_f1:
                    data.data.cualitativo_proyecto_integrador_f1,
                  promedio_final: data.data.promedio_final,
                  proyectofinal:data.data.proyectofinal,
              evaluacion_nivel_subnivel:data.data.evaluacion_nivel_subnivel,
                 puntajeeva:data.data.puntajeeva,
                  lidera: data.data.lidera,
                  cumple: data.data.cumple,
                  reiterado: data.data.reiterado,
                  ocasional: data.data.ocasional,
                  nocumple: data.data.nocumple,
                  semestre: data.data.semestre,
                  submission_id: data.entity.sid[0].value,
                  submission_uuid: data.entity.uuid[0].value,
                };
              }

              return null;
            })
            .filter(Boolean);

          setSaved3(registros);
        })
        .catch((error) => {
          console.error("Error al obtener los datos adicionales:", error);
        });
    });
}


  //******************************************** End Field Table Semestre 1 *******************************************************************/

  return (
    <div>
      <Modal
        keepMounted
        open={openNotasEMN}
        onClose={handleCloseNotasEMN}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "60%", // Modificar el ancho al 80%
          height: "fit-content", // Agregar un tamaño fijo
          p: 4,
          textAlign: "center", // Alineación centrada para los contenidos
        }}
      >
        {/* <h4>{leccionesEscritas()}</h4> */}

        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            height: "700px",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            overflowY: "auto", // Agregar propiedad scroll vertical
          }}
        >
          <h2></h2>

          <Box sx={{ p: 4 }}>
            {
              //********************************************  Table Semestre 1 ****************************/
            }
            <Accordion sx={{ height: "fit-content" }}>
              <AccordionSummary
                expandIcon={<Typography>Expandir</Typography>}
                aria-label="Expand"
              >
                <Typography variant="h6">Semestre 1</Typography>
              </AccordionSummary>
              <AccordionDetails>


                <NotasSemestre1
                saved1={saved1}
                 idM={idM}



                />




              </AccordionDetails>
            </Accordion>
            {
              //******************************************** End  Table Semestre 1 ****************************/
            }
            {
              //********************************************  Table Semestre 2 ****************************/
            }

            <Accordion>
              <AccordionSummary
                expandIcon={<Typography>Expandir</Typography>}
                aria-label="Expand"
              >
                <Typography variant="h6">Semestre 2 </Typography>
              </AccordionSummary>
              <AccordionDetails>
              <NotasSemestre2
                saved2={saved2}
                 idM={idM}
                />


              </AccordionDetails>
            </Accordion>

            {
              //******************************************** End  Table Semestre 2 ****************************/
            }

            {
              //********************************************  Table Semestre 3 ****************************/
            }
            <Accordion>
              <AccordionSummary
                expandIcon={<Typography>Expandir</Typography>}
                aria-label="Expand"
              >
                <Typography variant="h6">Semestre 3 Nota Final</Typography>
              </AccordionSummary>
              <AccordionDetails>


              <NotasSemestre3
                saved1={saved1}
                saved2={saved2}
                saved3={saved3}

                 idM={idM}



                />

              </AccordionDetails>
            </Accordion>


          </Box>
        </Box>
      </Modal>
    </div>
  );
}
