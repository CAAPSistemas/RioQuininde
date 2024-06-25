import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";

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
  Tooltip,
  Grid,
} from "@mui/material";
import axios from "axios";

export default function TestSemestre3Basica({
    postNotas3b,
  id3,
  idprofesor,
  grupoE,
  NivelE,
  clase,
}) {

  // const grupos = ["Séptimo A", "Septimo B", "Decimo A", "Decimo B"];
  const Semestre3 = "Semestre3";
  const [aeditar3, setAeditar3] = useState({});
  console.log(  postNotas3b, id3);
  //Semestre3
  useEffect(() => {
    const usuarioAEditar3 =   postNotas3b?.filter(
      (  postNotas3b) =>
          postNotas3b.usuario === id3 &&   postNotas3b.semestre === "Semestre3" && postNotas3b.asignatura===clase
    );
    if (usuarioAEditar3) {
      setAeditar3(usuarioAEditar3[0]);
    }
  }, [id3,   postNotas3b]);

  const handleSemestre3 = () => {
    Tercer_Semestre(Semestre3);
  };



  const [evaluacionNivelSubnivel, setEvaluacionNivelSubnivel] = useState('');


  const Tercer_Semestre = () => {
    let registros;
    axios
      .get("http://ahorasi.dd:8083/webformID?_format=json")
      .then((response) => {
        const nove = response.data;
        const webformJobb = nove.filter(
          (item) => item.webform_id === "notas_segundo_tercero_cuartos"
        );
        const requests = webformJobb.map((item) =>
          axios.get(
            `http://ahorasi.dd:8083/webform_rest/notas_segundo_tercero_cuartos/submission/${item.uuid}`
          )
        );
        return Promise.all(requests);
      })
      .then((responses) => {
        const registros = responses
          .map((response, index) => {
            const data = response.data;
            if (
              data.data.usuario === id3 &&
              data.data.semestre === "Semestre3" && data.data.asignatura===clase
            ) {
              return {
                usuario: data.data.usuario,
                lecciones_orales_escritas_1:
                  aeditar3.lecciones_orales_escritas_1,
                lecciones_orales_escritas_2:
                  aeditar3.lecciones_orales_escritas_2,
                lecciones_orales_escritas_3:
                  aeditar3.lecciones_orales_escritas_3,
                cualitativo_orales: aeditar3.cualitativo_orales,
                prueba_base_estructurada_1: aeditar3.prueba_base_estructurada_1,
                prueba_base_estructurada_2: aeditar3.prueba_base_estructurada_2,
                prueba_base_estructurada_3: aeditar3.prueba_base_estructurada_3,
                cualitativo_pruebabase: aeditar3.cualitativo_pruebabase,
                tareas_ejercicios_1: aeditar3.tareas_ejercicios_1,
                tareas_ejercicios_2: aeditar3.tareas_ejercicios_2,
                tareas_ejercicios_3: aeditar3.tareas_ejercicios_3,
                cualitativo_tareas_ejercicios:
                  aeditar3.cualitativo_tareas_ejercicios,
                proyectos_investigaciones_1:
                  aeditar3.proyectos_investigaciones_1,
                proyectos_investigaciones_2:
                  aeditar3.proyectos_investigaciones_2,
                proyectos_investigaciones_3:
                  aeditar3.proyectos_investigaciones_3,
                cualitativo_proyectos_investigaciones_:
                  aeditar3.cualitativo_proyectos_investigaciones_,
                proyectos_1: aeditar3.proyectos_1,
                proyectos_2: aeditar3.proyectos_2,
                proyectos_3: aeditar3.proyectos_3,
                exposiciones_foros_1: aeditar3.exposiciones_foros_1,
                exposiciones_foros_2: aeditar3.exposiciones_foros_2,
                exposiciones_foros_3: aeditar3.exposiciones_foros_3,
                cualitativo_expo_foros: aeditar3.cualitativo_expo_foros,
                talleres_1: aeditar3.talleres_1,
                talleres_2: aeditar3.talleres_2,
                talleres_3: aeditar3.talleres_3,
                cualitativo_talleres: aeditar3.cualitativo_talleres,
                productos1: aeditar3.productos1,
                productos2: aeditar3.productos2,
                productos3: aeditar3.productos3,

                aportes_cualitativo_s1: aeditar3.aportes_cualitativo_s1,
                proyecto_integrador_f1: aeditar3.proyecto_integrador_f1,
                cualitativo_proyecto_integrador_f1:  aeditar3.cualitativo_proyecto_integrador_f1,

                  proyectofinal:aeditar3.proyectofinal,
                  evaluacion_nivel_subnivel:aeditar3.evaluacion_nivel_subnivel,

                lidera: aeditar3.lidera,
                cumple: aeditar3.cumple,
                reiterado: aeditar3.reiterado,
                ocasional: aeditar3.ocasional,
                nocumple: aeditar3.nocumple,
                semestre: data.data.semestre,
                submission_id: data.entity.sid[0].value,
                submission_uuid: data.entity.uuid[0].value,
              };
            }

            return null;
          })
          .filter(Boolean);
        if (registros.length === 0) {
          axios
            .post("http://ahorasi.dd:8083/webform_rest/submit", {
              headers: {
                "content-type": "application/json",
              },
              webform_id: "notas_segundo_tercero_cuartos",
              usuario: id3,
              idprofesor: idprofesor,
              nivel: NivelE,
              grupo: grupoE,
              asignatura: clase,
              lecciones_orales_escritas_1: aeditar3.lecciones_orales_escritas_1,
              lecciones_orales_escritas_2: aeditar3.lecciones_orales_escritas_2,
              lecciones_orales_escritas_3: aeditar3.lecciones_orales_escritas_3,
              cualitativo_orales: aeditar3.cualitativo_orales,
              prueba_base_estructurada_1: aeditar3.prueba_base_estructurada_1,
              prueba_base_estructurada_2: aeditar3.prueba_base_estructurada_2,
              prueba_base_estructurada_3: aeditar3.prueba_base_estructurada_3,
              cualitativo_pruebabase: aeditar3.cualitativo_pruebabase,
              tareas_ejercicios_1: aeditar3.tareas_ejercicios_1,
              tareas_ejercicios_2: aeditar3.tareas_ejercicios_2,
              tareas_ejercicios_3: aeditar3.tareas_ejercicios_3,
              cualitativo_tareas_ejercicios:
                aeditar3.cualitativo_tareas_ejercicios,

              proyectos_investigaciones_1: aeditar3.proyectos_investigaciones_1,
              proyectos_investigaciones_2: aeditar3.proyectos_investigaciones_2,
              proyectos_investigaciones_3: aeditar3.proyectos_investigaciones_3,
              cualitativo_proyectos_investigaciones_:
                aeditar3.cualitativo_proyectos_investigaciones_,
              proyectos_1: aeditar3.proyectos_1,
              proyectos_2: aeditar3.proyectos_2,
              proyectos_3: aeditar3.proyectos_3,
              exposiciones_foros_1: aeditar3.exposiciones_foros_1,
              exposiciones_foros_2: aeditar3.exposiciones_foros_2,
              exposiciones_foros_3: aeditar3.exposiciones_foros_3,
              cualitativo_expo_foros: aeditar3.cualitativo_expo_foros,
              talleres_1: aeditar3.talleres_1,
              talleres_2: aeditar3.talleres_2,
              talleres_3: aeditar3.talleres_3,
              cualitativo_talleres: aeditar3.cualitativo_talleres,

              productos1: aeditar3.productos1,
              productos2: aeditar3.productos2,
              productos3: aeditar3.productos3,

              aportes_cualitativo_s1: aeditar3.aportes_cualitativo_s1,
              proyecto_integrador_f1: aeditar3.proyecto_integrador_f1,
              cualitativo_proyecto_integrador_f1:
                aeditar3.cualitativo_proyecto_integrador_f1,
                proyectofinal:aeditar3.proyectofinal,
                evaluacion_nivel_subnivel:aeditar3.evaluacion_nivel_subnivel,
              lidera: aeditar3.lidera,
              cumple: aeditar3.cumple,
              reiterado: aeditar3.reiterado,
              ocasional: aeditar3.ocasional,
              nocumple: aeditar3.nocumple,
              semestre: Semestre3,
            })
            .then((response) => {})

            .catch((error) => {
              console.error(error);
            });
        } else {
          // La tupla existe, editar con el nuevo estado
          axios
            .patch(
              `http://ahorasi.dd:8083/webform_rest/notas_segundo_tercero_cuartos/submission/${registros[0].submission_uuid}`,
              {
                webform_id: "notas_segundo_tercero_cuartos",
                lecciones_orales_escritas_1:
                  aeditar3.lecciones_orales_escritas_1,
                lecciones_orales_escritas_2:
                  aeditar3.lecciones_orales_escritas_2,
                lecciones_orales_escritas_3:
                  aeditar3.lecciones_orales_escritas_3,
                cualitativo_orales: aeditar3.cualitativo_orales,
                prueba_base_estructurada_1: aeditar3.prueba_base_estructurada_1,
                prueba_base_estructurada_2: aeditar3.prueba_base_estructurada_2,
                prueba_base_estructurada_3: aeditar3.prueba_base_estructurada_3,
                cualitativo_pruebabase: aeditar3.cualitativo_pruebabase,
                tareas_ejercicios_1: aeditar3.tareas_ejercicios_1,
                tareas_ejercicios_2: aeditar3.tareas_ejercicios_2,
                tareas_ejercicios_3: aeditar3.tareas_ejercicios_3,
                cualitativo_tareas_ejercicios:
                  aeditar3.cualitativo_tareas_ejercicios,
                proyectos_investigaciones_1:
                  aeditar3.proyectos_investigaciones_1,
                proyectos_investigaciones_2:
                  aeditar3.proyectos_investigaciones_2,
                proyectos_investigaciones_3:
                  aeditar3.proyectos_investigaciones_3,
                cualitativo_proyectos_investigaciones_:
                  aeditar3.cualitativo_proyectos_investigaciones_,
                proyectos_1: aeditar3.proyectos_1,
                proyectos_2: aeditar3.proyectos_2,
                proyectos_3: aeditar3.proyectos_3,
                exposiciones_foros_1: aeditar3.exposiciones_foros_1,
                exposiciones_foros_2: aeditar3.exposiciones_foros_2,
                exposiciones_foros_3: aeditar3.exposiciones_foros_3,
                cualitativo_expo_foros: aeditar3.cualitativo_expo_foros,
                talleres_1: aeditar3.talleres_1,
                talleres_2: aeditar3.talleres_2,
                talleres_3: aeditar3.talleres_3,
                cualitativo_talleres: aeditar3.cualitativo_talleres,
                productos1: aeditar3.productos1,
                productos2: aeditar3.productos2,
                productos3: aeditar3.productos3,
                aportes_cualitativo_s1: aeditar3.aportes_cualitativo_s1,
                proyecto_integrador_f1: aeditar3.proyecto_integrador_f1,
                cualitativo_proyecto_integrador_f1:
                  aeditar3.cualitativo_proyecto_integrador_f1,
                proyecto_integrador_f1: aeditar3.proyecto_integrador_f1,
                cualitativo_proyecto_integrador_f1:
                  aeditar3.cualitativo_proyecto_integrador_f1,
                  proyectofinal:aeditar3.proyectofinal,
                  evaluacion_nivel_subnivel:aeditar3.evaluacion_nivel_subnivel,
                lidera: aeditar3.lidera,
                cumple: aeditar3.cumple,
                reiterado: aeditar3.reiterado,
                ocasional: aeditar3.ocasional,
                nocumple: aeditar3.nocumple,
              }
            )
            .then((response) => {})
            .catch((error) => {
              console.error(error);
            });
        }
      });
  };

  const validate = (values) => {
    const errors = {};
    // Verificar si los campos cumplen con ciertos patrones
    if (!/^[a-zA-Z0-9]+$/.test(values.lecciones_orales_escritas_1)) {
      errors.lecciones_orales_escritas_1 =
        "Este campo solo admite letras y números";
    }
    if (!/^[a-zA-Z0-9]+$/.test(values.prueba_base_estructurada_1)) {
      errors.prueba_base_estructurada_1 =
        "Este campo solo admite letras y números";
    }
    if (!/^[a-zA-Z0-9]+$/.test(values.tareas_ejercicios_1)) {
      errors.tareas_ejercicios_1 = "Este campo solo admite letras y números";
    }

    return errors;
  };

  return (
    <>
      <Grid
        container
        spacing={1}
        justify="center"
        sx={{ padding: "16px", height: "fit-content", overflowY: "auto" }}
      >
        {/* Lecciones Orales */}
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          xl={2}
          style={{ overflowY: "auto" }}
        >
          <h6>Lecciones Orales</h6>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FormControl fullWidth>
            <OutlinedInput
              size="xs"
              margin="dense"
              placeholder=" "
              value={aeditar3?.lecciones_orales_escritas_1 || ""}
              onChange={(e) => {
                setAeditar3({
                  ...aeditar3,
                  lecciones_orales_escritas_1: e.target.value,
                });
              }}
            />
            <FormHelperText id="outlined-first-name-helper">1</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FormControl fullWidth>
            <OutlinedInput
              size="xs"
              margin="dense"
              placeholder=" "
              value={aeditar3?.lecciones_orales_escritas_2 || ""}
              onChange={(e) =>
                setAeditar3({
                  ...aeditar3,
                  lecciones_orales_escritas_2: e.target.value,
                })
              }
            />
            <FormHelperText id="outlined-first-name-helper">2</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FormControl fullWidth>
            <OutlinedInput
              size="xs"
              margin="dense"
              placeholder=" "
              value={aeditar3?.lecciones_orales_escritas_3 || ""}
              onChange={(e) =>
                setAeditar3({
                  ...aeditar3,
                  lecciones_orales_escritas_3: e.target.value,
                })
              }
            />
            <FormHelperText id="outlined-first-name-helper">3</FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <h6>Prueba Base</h6>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FormControl fullWidth>
            <OutlinedInput
              size="xs"
              margin="dense"
              placeholder=" "
              value={aeditar3?.prueba_base_estructurada_1 || ""}
              onChange={(e) => {
                setAeditar3({
                  ...aeditar3,
                  prueba_base_estructurada_1: e.target.value,
                });
              }}
            />
            <FormHelperText id="outlined-first-name-helper">1</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FormControl fullWidth>
            <OutlinedInput
              size="xs"
              margin="dense"
              placeholder=" "
              value={aeditar3?.prueba_base_estructurada_2 || ""}
              onChange={(e) =>
                setAeditar3({
                  ...aeditar3,
                  prueba_base_estructurada_2: e.target.value,
                })
              }
            />{" "}
            <FormHelperText id="outlined-first-name-helper">2</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FormControl fullWidth>
            <OutlinedInput
              size="xs"
              margin="dense"
              placeholder=" "
              value={aeditar3?.prueba_base_estructurada_3 || ""}
              onChange={(e) =>
                setAeditar3({
                  ...aeditar3,
                  prueba_base_estructurada_3: e.target.value,
                })
              }
            />
            <FormHelperText id="outlined-first-name-helper">3</FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <h6>Tarea ejercicios</h6>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FormControl fullWidth>
            <OutlinedInput
              size="xs"
              margin="dense"
              placeholder=" "
              value={aeditar3?.tareas_ejercicios_1 || ""}
              onChange={(e) => {
                setAeditar3({
                  ...aeditar3,
                  tareas_ejercicios_1: e.target.value,
                });
              }}
            />
            <FormHelperText id="outlined-first-name-helper">1</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FormControl fullWidth>
            <OutlinedInput
              size="xs"
              margin="dense"
              placeholder=" "
              value={aeditar3?.tareas_ejercicios_2 || ""}
              onChange={(e) =>
                setAeditar3({
                  ...aeditar3,
                  tareas_ejercicios_2: e.target.value,
                })
              }
            />
            <FormHelperText id="outlined-first-name-helper">2</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FormControl fullWidth>
            <OutlinedInput
              size="xs"
              margin="dense"
              placeholder=" "
              value={aeditar3?.tareas_ejercicios_3 || ""}
              onChange={(e) =>
                setAeditar3({
                  ...aeditar3,
                  tareas_ejercicios_3: e.target.value,
                })
              }
            />
            <FormHelperText id="outlined-first-name-helper">3</FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <h6>Proyectos Investigaciones</h6>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FormControl fullWidth>
            <OutlinedInput
              size="xs"
              margin="dense"
              placeholder=" "
              value={aeditar3?.proyectos_investigaciones_1 || ""}
              onChange={(e) =>
                setAeditar3({
                  ...aeditar3,
                  proyectos_investigaciones_1: e.target.value,
                })
              }
            />
            <FormHelperText id="outlined-first-name-helper">1</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FormControl fullWidth>
            <OutlinedInput
              size="xs"
              margin="dense"
              placeholder=" "
              value={aeditar3?.proyectos_investigaciones_2 || ""}
              onChange={(e) =>
                setAeditar3({
                  ...aeditar3,
                  proyectos_investigaciones_2: e.target.value,
                })
              }
            />
            <FormHelperText id="outlined-first-name-helper">2</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FormControl fullWidth>
            <OutlinedInput
              size="xs"
              margin="dense"
              placeholder=" "
              value={aeditar3?.proyectos_investigaciones_3 || ""}
              onChange={(e) =>
                setAeditar3({
                  ...aeditar3,
                  proyectos_investigaciones_3: e.target.value,
                })
              }
            />
            <FormHelperText id="outlined-first-name-helper">3</FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <h6>Proyectos</h6>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FormControl fullWidth>
            <OutlinedInput
              size="xs"
              margin="dense"
              placeholder=" "
              value={aeditar3?.proyectos_1 || ""}
              onChange={(e) =>
                setAeditar3({
                  ...aeditar3,
                  proyectos_1: e.target.value,
                })
              }
            />
            <FormHelperText id="outlined-first-name-helper">1</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FormControl fullWidth>
            <OutlinedInput
              size="xs"
              margin="dense"
              placeholder=" "
              value={aeditar3?.proyectos_2 || ""}
              onChange={(e) =>
                setAeditar3({
                  ...aeditar3,
                  proyectos_2: e.target.value,
                })
              }
            />
            <FormHelperText id="outlined-first-name-helper">2</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FormControl fullWidth>
            <OutlinedInput
              size="xs"
              margin="dense"
              placeholder=" "
              value={aeditar3?.proyectos_3 || ""}
              onChange={(e) =>
                setAeditar3({
                  ...aeditar3,
                  proyectos_3: e.target.value,
                })
              }
            />
            <FormHelperText id="outlined-first-name-helper">3</FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <h6>Exposiciones Foros</h6>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FormControl fullWidth>
            <OutlinedInput
              size="xs"
              margin="dense"
              placeholder=" "
              value={aeditar3?.exposiciones_foros_1 || ""}
              onChange={(e) =>
                setAeditar3({
                  ...aeditar3,
                  exposiciones_foros_1: e.target.value,
                })
              }
            />
            <FormHelperText id="outlined-first-name-helper">3</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FormControl fullWidth>
            <OutlinedInput
              size="xs"
              margin="dense"
              placeholder=" "
              value={aeditar3?.exposiciones_foros_2 || ""}
              onChange={(e) =>
                setAeditar3({
                  ...aeditar3,
                  exposiciones_foros_2: e.target.value,
                })
              }
            />
            <FormHelperText id="outlined-first-name-helper">2</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FormControl fullWidth>
            <OutlinedInput
              size="xs"
              margin="dense"
              placeholder=" "
              value={aeditar3?.exposiciones_foros_3 || ""}
              onChange={(e) =>
                setAeditar3({
                  ...aeditar3,
                  exposiciones_foros_3: e.target.value,
                })
              }
            />
            <FormHelperText id="outlined-first-name-helper">3</FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <h6>Talleres</h6>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FormControl fullWidth>
            <OutlinedInput
              size="xs"
              margin="dense"
              placeholder=" "
              value={aeditar3?.talleres_1 || ""}
              onChange={(e) =>
                setAeditar3({
                  ...aeditar3,
                  talleres_1: e.target.value,
                })
              }
            />
            <FormHelperText id="outlined-first-name-helper">3</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FormControl fullWidth>
            <OutlinedInput
              size="xs"
              margin="dense"
              placeholder=" "
              value={aeditar3?.talleres_2 || ""}
              onChange={(e) =>
                setAeditar3({
                  ...aeditar3,
                  talleres_2: e.target.value,
                })
              }
            />
            <FormHelperText id="outlined-first-name-helper">2</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FormControl fullWidth>
            <OutlinedInput
              size="xs"
              margin="dense"
              placeholder=" "
              value={aeditar3?.talleres_3 || ""}
              onChange={(e) =>
                setAeditar3({
                  ...aeditar3,
                  talleres_3: e.target.value,
                })
              }
            />
            <FormHelperText id="outlined-first-name-helper">3</FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FormControl fullWidth>
            <OutlinedInput
              size="xs"
              margin="dense"
              placeholder=" "
              value={aeditar3?.proyecto_integrador_f1 || ""}
              onChange={(e) =>
                setAeditar3({
                  ...aeditar3,
                  proyecto_integrador_f1: e.target.value,
                })
              }
            />
            <FormHelperText id="outlined-first-name-helper">
              Proyecto Integrador
            </FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FormControl fullWidth>
            <OutlinedInput
              size="xs"
              margin="dense"
              placeholder=" "
              value={aeditar3?.cualitativo_proyecto_integrador_f1 || ""}
              onChange={(e) =>
                setAeditar3({
                  ...aeditar3,
                  cualitativo_proyecto_integrador_f1: e.target.value,
                })
              }
            />
            <FormHelperText id="outlined-first-name-helper">
              Evaluación Periodo Acádemico
            </FormHelperText>
          </FormControl>
        </Grid>



        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
  <FormControl fullWidth>
    <OutlinedInput
      size="xs"
      margin="dense"
      placeholder=" "
      value={aeditar3?.evaluacion_nivel_subnivel}
      onChange={(e) =>
        setAeditar3({
          ...aeditar3, evaluacion_nivel_subnivel: e.target.value,
        })
      }
    />
    <FormHelperText id="outlined-first-name-helper">
      Evaluación de subnivel
    </FormHelperText>
  </FormControl>
</Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <h6>Evaluación de comportamiento</h6>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FormControl fullWidth>
            <OutlinedInput
              size="xs"
              margin="dense"
              placeholder=" "
              value={aeditar3?.lidera || ""}
              onChange={(e) =>
                setAeditar3({
                  ...aeditar3,
                  lidera: e.target.value,
                })
              }
            />
            <FormHelperText id="outlined-first-name-helper">
              Lidera
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FormControl fullWidth>
            <OutlinedInput
              size="xs"
              margin="dense"
              placeholder=" "
              value={aeditar3?.cumple || ""}
              onChange={(e) =>
                setAeditar3({
                  ...aeditar3,
                  cumple: e.target.value,
                })
              }
            />
            <FormHelperText id="outlined-first-name-helper">
              Cumple
            </FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FormControl fullWidth>
            <OutlinedInput
              size="xs"
              margin="dense"
              placeholder=" "
              value={aeditar3?.reiterado || ""}
              onChange={(e) =>
                setAeditar3({
                  ...aeditar3,
                  reiterado: e.target.value,
                })
              }
            />
            <FormHelperText id="outlined-first-name-helper">
              Reiterado
            </FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FormControl fullWidth>
            <OutlinedInput
              size="xs"
              margin="dense"
              placeholder=" "
              value={aeditar3?.ocasional || ""}
              onChange={(e) =>
                setAeditar3({
                  ...aeditar3,
                  ocasional: e.target.value,
                })
              }
            />
            <FormHelperText id="outlined-first-name-helper">
              Ocasional
            </FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FormControl fullWidth>
            <OutlinedInput
              size="xs"
              margin="dense"
              placeholder=" "
              value={aeditar3?.nocumple || ""}
              onChange={(e) =>
                setAeditar3({
                  ...aeditar3,
                  nocumple: e.target.value,
                })
              }
            />
            <FormHelperText id="outlined-first-name-helper">
              No cumple
            </FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            style={{ height: "40px" }}
            onClick={() => {
              handleSemestre3();
            }}
          >
            Adicionar
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
