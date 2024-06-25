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
import { useState } from "react";
import axios from "axios";

export default function KeepMountedModalEditNotasMediaBachillerato({
  handleOpenNotasEM,
        handleCloseNotasEM,
        openNotasEM,
        idM,

}) {
  const isOk = openNotasEM;
  useEffect(() => {
    if (isOk) {
      RegistroConductaSemestre1(idM);
      RegistroConductaSemestre2(idM);
       RegistroConductaSemestre3(idM)
    }
  }, [isOk, idM]);

  const [saved1, setSaved1] = useState([]);
  const [saved2, setSaved2] = useState([]);
  const [saved3, setSaved3] = useState([]);
  let registros = [];
  let promedio1;
  let promedio2;
  let promedio3;
  let promedio_general;
  let grade1 = "";
  let grade2 = "";
  let grade3 = "";
  let conducta="";



  //registro Conducta Semestre 1
  function RegistroConductaSemestre1(idM) {
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
                  data.data.semestre === "Semestre1"
                ) {
                  return {
                    usuario: data.data.usuario,
                    semestre: data.data.semestre,
                    lidera: data.data.lidera,
                    cumple: data.data.cumple,
                    reiterado: data.data.reiterado,
                    ocasional: data.data.ocasional,
                    nocumple: data.data.nocumple,
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

  //Puntaje Conducta Semestre 1
  function PuntajeConductaSemestre1() {


    let summa;
    const user=idM;
    const lidera = saved1
      .map((registro) => parseInt(registro.lidera))
      .filter((campo) => campo !== "");
    const cumple = saved1
      .map((registro) => parseInt(registro.cumple))
      .filter((campo) => campo !== "");
    const reiterado = saved1
      .map((registro) => parseInt(registro.reiterado))
      .filter((campo) => campo !== "");
    const ocasional = saved1
      .map((registro) => parseInt(registro.ocasional))
      .filter((campo) => campo !== "");
    const nocumple = saved1
      .map((registro) => parseInt(registro.nocumple))
      .filter((campo) => campo !== "");
    if (
      lidera.length > 0 &&
      cumple.length > 0 &&
      reiterado.length > 0 &&
      ocasional.length > 0 &&
      nocumple.length > 0
    ) {
      summa =
        lidera.reduce((acc, current) => acc + current, 0) +
        cumple.reduce((acc, current) => acc + current, 0) +
        reiterado.reduce((acc, current) => acc + current, 0) +
        ocasional.reduce((acc, current) => acc + current, 0) +
        nocumple.reduce((acc, current) => acc + current, 0);
      promedio1 = summa / 5;
    }

    if (promedio1 >= 5) {
      grade1 = "A";
    } else if (promedio1 >= 4 && promedio1 < 5) {
      grade1 = "B";
    } else if (promedio1 >= 3 && promedio1 < 4) {
      grade1 = "C";
    } else if (promedio1 >= 2 && promedio1 < 3) {
      grade1 = "D";
    } else {
      grade1 = "E";
    }


    const submissionUuids = saved1.map((registro) => registro.submission_uuid);
    axios
      .patch(
        `http://ahorasi.dd:8083/webform_rest/notas_quinto_noveno_segundos/submission/${submissionUuids}`,
        {
          webform_id: "notas_quinto_noveno_segundos",
          sumaconducta: summa,
          promedioconducta: promedio1,
          cualitativaconducta: grade1,
        }
      )
      .then((response) => {})
      .catch((error) => {
        console.error("Ocurrió un error durante la solicitud:", error);
      });


    return (
      <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <Typography variant="h6">Usuario {idM}</Typography>
        </Grid>
       <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <Typography variant="h6">Lidera {lidera}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <Typography variant="h6">Cumple {cumple}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <Typography variant="h6">Ocasional {ocasional}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <Typography variant="h6">Reiterado {reiterado}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <Typography variant="h6">No cumple {nocumple}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <Typography variant="h6">Suma: {summa}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <Typography variant="h6">Promedio: {promedio1}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <Typography variant="h6">Nota Cualitativa: {grade1}</Typography>
        </Grid>
      </Grid>


    );
  }

  //registro Conducta Semestre 2
  function RegistroConductaSemestre2(idM) {

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
                  data.data.semestre === "Semestre2"
                ) {
                  return {
                    usuario: data.data.usuario,
                    semestre: data.data.semestre,
                    lidera: data.data.lidera,
                    cumple: data.data.cumple,
                    reiterado: data.data.reiterado,
                    ocasional: data.data.ocasional,
                    nocumple: data.data.nocumple,
                    submission_id: data.entity.sid[0].value,
                    submission_uuid: data.entity.uuid[0].value,
                  };
                }

                return null;
              })
              .filter(Boolean);
            setSaved2(registros);
            // porcientoAsistencia();
          })
          .catch((error) => {
            console.error("Error al obtener los datos adicionales:", error);
          });
      });
  }
  //Puntaje Conducta Semestre 2
  function PuntajeConductaSemestre2() {


    let summa;
    // const puntos = saved2.filter(
    //   (registro) => registro.usuario === id && registro.semestre === "Semestre2"
    // );
    const lidera = saved2
      .map((registro) => parseInt(registro.lidera))
      .filter((campo) => campo !== "");
    const cumple = saved2
      .map((registro) => parseInt(registro.cumple))
      .filter((campo) => campo !== "");
    const reiterado = saved2
      .map((registro) => parseInt(registro.reiterado))
      .filter((campo) => campo !== "");
    const ocasional = saved2
      .map((registro) => parseInt(registro.ocasional))
      .filter((campo) => campo !== "");
    const nocumple = saved2
      .map((registro) => parseInt(registro.nocumple))
      .filter((campo) => campo !== "");
    if (
      lidera.length > 0 &&
      cumple.length > 0 &&
      reiterado.length > 0 &&
      ocasional.length > 0 &&
      nocumple.length > 0
    ) {
      const summa =
        lidera.reduce((acc, current) => acc + current, 0) +
        cumple.reduce((acc, current) => acc + current, 0) +
        reiterado.reduce((acc, current) => acc + current, 0) +
        ocasional.reduce((acc, current) => acc + current, 0) +
        nocumple.reduce((acc, current) => acc + current, 0);
      promedio2 = summa / 5;
    }

    if (promedio2 >= 5) {
      grade2 = "A";
    } else if (promedio2 >= 4 && promedio2 < 5) {
      grade2 = "B";
    } else if (promedio2 >= 3 && promedio2 < 4) {
      grade2 = "C";
    } else if (promedio2 >= 2 && promedio2 < 3) {
      grade2 = "D";
    } else {
      grade2 = "E";
    }


    const submissionUuids = saved2.map((registro) => registro.submission_uuid);
    axios
      .patch(
        `http://ahorasi.dd:8083/webform_rest/notas_quinto_noveno_segundos/submission/${submissionUuids}`,
        {
          webform_id: "notas_quinto_noveno_segundo",
          sumaconducta: summa,
          promedioconducta: promedio2,
          cualitativaconducta: grade2,
        }
      )
      .then((response) => {})
      .catch((error) => {
        console.error("Ocurrió un error durante la solicitud:", error);
      });

      return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Typography variant="h6">Usuario {idM}</Typography>
          </Grid>
         <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Typography variant="h6">Lidera {lidera}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Typography variant="h6">Cumple {cumple}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Typography variant="h6">Ocasional {ocasional}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Typography variant="h6">Reiterado {reiterado}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Typography variant="h6">No cumple {nocumple}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Typography variant="h6">Suma: {summa}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Typography variant="h6">Promedio: {promedio2}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Typography variant="h6">Nota Cualitativa: {grade2}</Typography>
          </Grid>
        </Grid>


      );
  }

  //registro Conducta Semestre 3
  function RegistroConductaSemestre3(idM) {
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
                  data.data.semestre === "Semestre3"
                ) {
                  return {
                    usuario: data.data.usuario,
                    semestre: data.data.semestre,
                    lidera: data.data.lidera,
                    cumple: data.data.cumple,
                    reiterado: data.data.reiterado,
                    ocasional: data.data.ocasional,
                    nocumple: data.data.nocumple,
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
  //Puntaje Conducta Semestre 3
  function PuntajeConductaSemestre3() {


    let summa;

    const lidera = saved3
      .map((registro) => parseInt(registro.lidera))
      .filter((campo) => campo !== "");
    const cumple = saved3
      .map((registro) => parseInt(registro.cumple))
      .filter((campo) => campo !== "");
    const reiterado = saved3
      .map((registro) => parseInt(registro.reiterado))
      .filter((campo) => campo !== "");
    const ocasional = saved3
      .map((registro) => parseInt(registro.ocasional))
      .filter((campo) => campo !== "");
    const nocumple = saved3
      .map((registro) => parseInt(registro.nocumple))
      .filter((campo) => campo !== "");
    if (
      lidera.length > 0 &&
      cumple.length > 0 &&
      reiterado.length > 0 &&
      ocasional.length > 0 &&
      nocumple.length > 0
    ) {
      const summa =
        lidera.reduce((acc, current) => acc + current, 0) +
        cumple.reduce((acc, current) => acc + current, 0) +
        reiterado.reduce((acc, current) => acc + current, 0) +
        ocasional.reduce((acc, current) => acc + current, 0) +
        nocumple.reduce((acc, current) => acc + current, 0);
      promedio3 = summa / 5;
    }

    if (promedio3 >= 5) {
      grade3 = "A";
    } else if (promedio3 >= 4 && promedio3 < 5) {
      grade3 = "B";
    } else if (promedio3 >= 3 && promedio3 < 4) {
      grade3 = "C";
    } else if (promedio3 >= 2 && promedio3 < 3) {
      grade3 = "D";
    } else {
      grade3 = "E";
    }
    console.log(lidera, cumple, reiterado, ocasional, nocumple);

    const submissionUuids = saved3.map((registro) => registro.submission_uuid);
    axios
      .patch(
        `http://ahorasi.dd:8083/webform_rest/notas_quinto_noveno_segundos/submission/${submissionUuids}`,
        {
          webform_id: "notas_quinto_noveno_segundos",
          sumaconducta: summa,
          promedioconducta: promedio3,
          cualitativaconducta: grade3,
        }
      )
      .then((response) => {})
      .catch((error) => {
        console.error("Ocurrió un error durante la solicitud:", error);
      });

      return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Typography variant="h6">Usuario {idM}</Typography>
          </Grid>
         <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Typography variant="h6">Lidera {lidera}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Typography variant="h6">Cumple {cumple}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Typography variant="h6">Ocasional {ocasional}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Typography variant="h6">Reiterado {reiterado}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Typography variant="h6">No cumple {nocumple}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Typography variant="h6">Suma: {summa}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Typography variant="h6">Promedio: {promedio3}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Typography variant="h6">Nota Cualitativa: {grade3}</Typography>
          </Grid>
        </Grid>


      );
  }

//General
function Conducta_General(){

    promedio_general=(promedio1+promedio2+promedio3)/3;

    console.log(promedio_general)

    if(!isNaN(promedio_general))
    {

    const submissionUuids = saved3.map((registro) => registro.submission_uuid);


    if (promedio_general >= 5) {
      conducta = "Muy Satisfactorio";
     } else if (promedio_general >= 4 && promedio_general < 5) {
       conducta = "Satisfactorio";
     } else if (promedio_general >= 3 && promedio_general < 4) {
       conducta = "Poco Satisfactorio";
     } else if (promedio_general >= 2 && promedio_general < 3) {
       conducta = "Mejorable";
     } else {
       conducta = "Insatisfactorio";
     }



  axios
    .patch(
      `http://ahorasi.dd:8083/webform_rest/notas_quinto_noveno_segundos/submission/${submissionUuids}`,
      {
        webform_id: "notas_quinto_noveno_segundos",
        promediogeneral: promedio_general,
        conductageneral: conducta,


      }
    )
    .then((response) => {})
    .catch((error) => {
      console.error("Ocurrió un error durante la solicitud:", error);
    });











return (

  <Grid container spacing={2}>

<Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Typography variant="h6">Semestre I</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Typography variant="h6">Promedio: {promedio1}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Typography variant="h6">Nota Cualitativa: {grade1}</Typography>
          </Grid>
<Divider/>
<Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Typography variant="h6">Semestre II</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Typography variant="h6">Promedio: {promedio2}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Typography variant="h6">Nota Cualitativa: {grade2}</Typography>
          </Grid>
          <Divider/>
<Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Typography variant="h6">Semestre III</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Typography variant="h6">Promedio: {promedio3}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Typography variant="h6">Nota Cualitativa: {grade3}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
        <Typography variant="h6">Total Promedio: { promedio_general}</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
        <Typography variant="h6">Cualitativo: {conducta}</Typography>
      </Grid>


        </Grid>

);
    }

}
  return (
    <div>
      <Modal
        keepMounted
        open={openNotasEM}
        onClose={handleCloseNotasEM}
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
            <Accordion sx={{ height: "fit-content" }}>
              <AccordionSummary
                expandIcon={<Typography>Expandir</Typography>}
                aria-label="Expand"
              >
                <Typography variant="h6">Semestre 1</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="body1">
                      {PuntajeConductaSemestre1()}
                    </Typography>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<Typography>Expandir</Typography>}
                aria-label="Expand"
              >
                <Typography variant="h6">Semestre 2 </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="body1">
                      {PuntajeConductaSemestre2()}
                    </Typography>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<Typography>Expandir</Typography>}
                aria-label="Expand"
              >
                <Typography variant="h6">Semestre 3</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="body1">
                      {PuntajeConductaSemestre3()}

                    </Typography>
                  </Grid>
                </Grid>
              </AccordionDetails>


              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="body1">
                      {PuntajeConductaSemestre3()}

                    </Typography>
                  </Grid>
                </Grid>
              </AccordionDetails>



            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<Typography>Expandir</Typography>}
                aria-label="Expand"
              >
                <Typography variant="h6">Conducta General</Typography>
              </AccordionSummary>



              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="body1">
                      {Conducta_General()}

                    </Typography>
                  </Grid>
                </Grid>
              </AccordionDetails>



            </Accordion>

          </Box>
        </Box>
      </Modal>
    </div>
  );

}
