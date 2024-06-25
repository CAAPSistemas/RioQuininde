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

export default function TestSemestre1Basica({
  postNotasb,
  id,
  idprofesor,
  grupoE,
  NivelE,
  clase,
}) {



console.log(postNotasb)

  const Semestre1 = "Semestre1";
  const [aeditar, setAeditar] = useState({}); //Semestre 1
  //Semestre1
  useEffect(() => {
    const usuarioAEditar = postNotasb?.filter(
      (postNotasb) =>
        postNotasb.usuario === id && postNotasb.semestre === "Semestre1" && postNotasb.asignatura===clase
    );
    if (usuarioAEditar) {
      setAeditar(usuarioAEditar[0]);
    }
  }, [id, postNotasb]);
  const handleSemestre1 = () => {
    Primer_Semestre(Semestre1);
  };

  const Primer_Semestre = () => {
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
              data.data.usuario === id &&
              data.data.semestre === "Semestre1" && data.data.asignatura===clase
            ) {
              return {
                usuario: data.data.usuario,
                lecciones_orales_escritas_1:
                  aeditar.lecciones_orales_escritas_1,
                lecciones_orales_escritas_2:
                  aeditar.lecciones_orales_escritas_2,
                lecciones_orales_escritas_3:
                  aeditar.lecciones_orales_escritas_3,
                cualitativo_orales: aeditar.cualitativo_orales,
                prueba_base_estructurada_1: aeditar.prueba_base_estructurada_1,
                prueba_base_estructurada_2: aeditar.prueba_base_estructurada_2,
                prueba_base_estructurada_3: aeditar.prueba_base_estructurada_3,
                cualitativo_pruebabase: aeditar.cualitativo_pruebabase,
                tareas_ejercicios_1: aeditar.tareas_ejercicios_1,
                tareas_ejercicios_2: aeditar.tareas_ejercicios_2,
                tareas_ejercicios_3: aeditar.tareas_ejercicios_3,
                cualitativo_tareas_ejercicios:
                  aeditar.cualitativo_tareas_ejercicios,
                proyectos_investigaciones_1:
                  aeditar.proyectos_investigaciones_1,
                proyectos_investigaciones_2:
                  aeditar.proyectos_investigaciones_2,
                proyectos_investigaciones_3:
                  aeditar.proyectos_investigaciones_3,
                cualitativo_proyectos_investigaciones_:
                  aeditar.cualitativo_proyectos_investigaciones_,
                proyectos_1: aeditar.proyectos_1,
                proyectos_2: aeditar.proyectos_2,
                proyectos_3: aeditar.proyectos_3,
                exposiciones_foros_1: aeditar.exposiciones_foros_1,
                exposiciones_foros_2: aeditar.exposiciones_foros_2,
                exposiciones_foros_3: aeditar.exposiciones_foros_3,
                cualitativo_expo_foros: aeditar.cualitativo_expo_foros,
                talleres_1: aeditar.talleres_1,
                talleres_2: aeditar.talleres_2,
                talleres_3: aeditar.talleres_3,
                cualitativo_talleres: aeditar.cualitativo_talleres,
                productos1: aeditar.productos1,
                productos2: aeditar.productos2,
                productos3: aeditar.productos3,

                aportes_cualitativo_s1: aeditar.aportes_cualitativo_s1,
                proyecto_integrador_f1: aeditar.proyecto_integrador_f1,
                cualitativo_proyecto_integrador_f1:
                  aeditar.cualitativo_proyecto_integrador_f1,
                lidera: aeditar.lidera,
                cumple: aeditar.cumple,
                reiterado: aeditar.reiterado,
                ocasional: aeditar.ocasional,
                nocumple: aeditar.nocumple,
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
              usuario: id,
              idprofesor: idprofesor,
              nivel: NivelE,
              grupo: grupoE,
              asignatura: clase,
              lecciones_orales_escritas_1: aeditar.lecciones_orales_escritas_1,
              lecciones_orales_escritas_2: aeditar.lecciones_orales_escritas_2,
              lecciones_orales_escritas_3: aeditar.lecciones_orales_escritas_3,
              cualitativo_orales: aeditar.cualitativo_orales,
              prueba_base_estructurada_1: aeditar.prueba_base_estructurada_1,
              prueba_base_estructurada_2: aeditar.prueba_base_estructurada_2,
              prueba_base_estructurada_3: aeditar.prueba_base_estructurada_3,
              cualitativo_pruebabase: aeditar.cualitativo_pruebabase,
              tareas_ejercicios_1: aeditar.tareas_ejercicios_1,
              tareas_ejercicios_2: aeditar.tareas_ejercicios_2,
              tareas_ejercicios_3: aeditar.tareas_ejercicios_3,
              cualitativo_tareas_ejercicios:
                aeditar.cualitativo_tareas_ejercicios,

              proyectos_investigaciones_1: aeditar.proyectos_investigaciones_1,
              proyectos_investigaciones_2: aeditar.proyectos_investigaciones_2,
              proyectos_investigaciones_3: aeditar.proyectos_investigaciones_3,
              cualitativo_proyectos_investigaciones_:
                aeditar.cualitativo_proyectos_investigaciones_,
              proyectos_1: aeditar.proyectos_1,
              proyectos_2: aeditar.proyectos_2,
              proyectos_3: aeditar.proyectos_3,
              exposiciones_foros_1: aeditar.exposiciones_foros_1,
              exposiciones_foros_2: aeditar.exposiciones_foros_2,
              exposiciones_foros_3: aeditar.exposiciones_foros_3,
              cualitativo_expo_foros: aeditar.cualitativo_expo_foros,
              talleres_1: aeditar.talleres_1,
              talleres_2: aeditar.talleres_2,
              talleres_3: aeditar.talleres_3,
              cualitativo_talleres: aeditar.cualitativo_talleres,

              productos1: aeditar.productos1,
              productos2: aeditar.productos2,
              productos3: aeditar.productos3,

              aportes_cualitativo_s1: aeditar.aportes_cualitativo_s1,
              proyecto_integrador_f1: aeditar.proyecto_integrador_f1,
              cualitativo_proyecto_integrador_f1:
                aeditar.cualitativo_proyecto_integrador_f1,
              lidera: aeditar.lidera,
              cumple: aeditar.cumple,
              reiterado: aeditar.reiterado,
              ocasional: aeditar.ocasional,
              nocumple: aeditar.nocumple,
              semestre: Semestre1,
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
                  aeditar.lecciones_orales_escritas_1,
                lecciones_orales_escritas_2:
                  aeditar.lecciones_orales_escritas_2,
                lecciones_orales_escritas_3:
                  aeditar.lecciones_orales_escritas_3,
                cualitativo_orales: aeditar.cualitativo_orales,
                prueba_base_estructurada_1: aeditar.prueba_base_estructurada_1,
                prueba_base_estructurada_2: aeditar.prueba_base_estructurada_2,
                prueba_base_estructurada_3: aeditar.prueba_base_estructurada_3,
                cualitativo_pruebabase: aeditar.cualitativo_pruebabase,
                tareas_ejercicios_1: aeditar.tareas_ejercicios_1,
                tareas_ejercicios_2: aeditar.tareas_ejercicios_2,
                tareas_ejercicios_3: aeditar.tareas_ejercicios_3,
                cualitativo_tareas_ejercicios:
                  aeditar.cualitativo_tareas_ejercicios,
                proyectos_investigaciones_1:
                  aeditar.proyectos_investigaciones_1,
                proyectos_investigaciones_2:
                  aeditar.proyectos_investigaciones_2,
                proyectos_investigaciones_3:
                  aeditar.proyectos_investigaciones_3,
                cualitativo_proyectos_investigaciones_:
                  aeditar.cualitativo_proyectos_investigaciones_,
                proyectos_1: aeditar.proyectos_1,
                proyectos_2: aeditar.proyectos_2,
                proyectos_3: aeditar.proyectos_3,
                exposiciones_foros_1: aeditar.exposiciones_foros_1,
                exposiciones_foros_2: aeditar.exposiciones_foros_2,
                exposiciones_foros_3: aeditar.exposiciones_foros_3,
                cualitativo_expo_foros: aeditar.cualitativo_expo_foros,
                talleres_1: aeditar.talleres_1,
                talleres_2: aeditar.talleres_2,
                talleres_3: aeditar.talleres_3,
                cualitativo_talleres: aeditar.cualitativo_talleres,
                productos1: aeditar.productos1,
                productos2: aeditar.productos2,
                productos3: aeditar.productos3,
                aportes_cualitativo_s1: aeditar.aportes_cualitativo_s1,
                proyecto_integrador_f1: aeditar.proyecto_integrador_f1,
                cualitativo_proyecto_integrador_f1:
                  aeditar.cualitativo_proyecto_integrador_f1,
                proyecto_integrador_f1: aeditar.proyecto_integrador_f1,
                cualitativo_proyecto_integrador_f1:
                  aeditar.cualitativo_proyecto_integrador_f1,
                lidera: aeditar.lidera,
                cumple: aeditar.cumple,
                reiterado: aeditar.reiterado,
                ocasional: aeditar.ocasional,
                nocumple: aeditar.nocumple,
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
              value={aeditar?.lecciones_orales_escritas_1 || ""}
              onChange={(e) => {
                setAeditar({
                  ...aeditar,
                  lecciones_orales_escritas_1: e.target.value,
                });
                const errors = validate({
                  ...aeditar,
                  lecciones_orales_escritas_1: e.target.value,
                });
                if (errors.lecciones_orales_escritas_1) {
                  alert(errors.lecciones_orales_escritas_1);
                }
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
              value={aeditar?.lecciones_orales_escritas_2 || ""}
              onChange={(e) =>
                setAeditar({
                  ...aeditar,
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
              value={aeditar?.lecciones_orales_escritas_3 || ""}
              onChange={(e) =>
                setAeditar({
                  ...aeditar,
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
              value={aeditar?.prueba_base_estructurada_1 || ""}
              onChange={(e) => {
                setAeditar({
                  ...aeditar,
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
              value={aeditar?.prueba_base_estructurada_2 || ""}
              onChange={(e) =>
                setAeditar({
                  ...aeditar,
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
              value={aeditar?.prueba_base_estructurada_3 || ""}
              onChange={(e) =>
                setAeditar({
                  ...aeditar,
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
              value={aeditar?.tareas_ejercicios_1 || ""}
              onChange={(e) => {
                setAeditar({
                  ...aeditar,
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
              value={aeditar?.tareas_ejercicios_2 || ""}
              onChange={(e) =>
                setAeditar({
                  ...aeditar,
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
              value={aeditar?.tareas_ejercicios_3 || ""}
              onChange={(e) =>
                setAeditar({
                  ...aeditar,
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
              value={aeditar?.proyectos_investigaciones_1 || ""}
              onChange={(e) =>
                setAeditar({
                  ...aeditar,
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
              value={aeditar?.proyectos_investigaciones_2 || ""}
              onChange={(e) =>
                setAeditar({
                  ...aeditar,
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
              value={aeditar?.proyectos_investigaciones_3 || ""}
              onChange={(e) =>
                setAeditar({
                  ...aeditar,
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
              value={aeditar?.proyectos_1 || ""}
              onChange={(e) =>
                setAeditar({
                  ...aeditar,
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
              value={aeditar?.proyectos_2 || ""}
              onChange={(e) =>
                setAeditar({
                  ...aeditar,
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
              value={aeditar?.proyectos_3 || ""}
              onChange={(e) =>
                setAeditar({
                  ...aeditar,
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
              value={aeditar?.exposiciones_foros_1 || ""}
              onChange={(e) =>
                setAeditar({
                  ...aeditar,
                  exposiciones_foros_1: e.target.value,
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
              value={aeditar?.exposiciones_foros_2 || ""}
              onChange={(e) =>
                setAeditar({
                  ...aeditar,
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
              value={aeditar?.exposiciones_foros_3 || ""}
              onChange={(e) =>
                setAeditar({
                  ...aeditar,
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
              value={aeditar?.talleres_1 || ""}
              onChange={(e) =>
                setAeditar({
                  ...aeditar,
                  talleres_1: e.target.value,
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
              value={aeditar?.talleres_2 || ""}
              onChange={(e) =>
                setAeditar({
                  ...aeditar,
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
              value={aeditar?.talleres_3 || ""}
              onChange={(e) =>
                setAeditar({
                  ...aeditar,
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
              value={aeditar?.proyecto_integrador_f1 || ""}
              onChange={(e) =>
                setAeditar({
                  ...aeditar,
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
              value={aeditar?.cualitativo_proyecto_integrador_f1 || ""}
              onChange={(e) =>
                setAeditar({
                  ...aeditar,
                  cualitativo_proyecto_integrador_f1: e.target.value,
                })
              }
            />
            <FormHelperText id="outlined-first-name-helper">
            Evaluación Periodo Academico
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
              value={aeditar?.lidera || ""}
              onChange={(e) =>
                setAeditar({
                  ...aeditar,
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
              value={aeditar?.cumple || ""}
              onChange={(e) =>
                setAeditar({
                  ...aeditar,
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
              value={aeditar?.reiterado || ""}
              onChange={(e) =>
                setAeditar({
                  ...aeditar,
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
              value={aeditar?.ocasional || ""}
              onChange={(e) =>
                setAeditar({
                  ...aeditar,
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
              value={aeditar?.nocumple || ""}
              onChange={(e) =>
                setAeditar({
                  ...aeditar,
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
              handleSemestre1();
            }}
          >
            Adicionar
          </Button>
        </Grid>
      </Grid>
    </>
  );
}


