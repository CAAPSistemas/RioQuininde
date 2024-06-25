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

import TestSemestre1Basica from "./RegistrarSemestre1Basica";
import TestSemestre2Basica from "./RegistrarSemestre2Basica";
import TestSemestre3Basica from "./RegistrarSemestre3Basica";

export default function KeepMountedModalAddNotasBasica({
  handleOpenNotasBs,
  handleCloseNotasBs,
   openNotasBs,
  id,
  id2,
  id3,
  postNotasb,
  postNotas2b,
  postNotas3b,
  asignatura,
  estudiante,
}) {
  const getMateria = (asignaturas) => {
    return asignaturas
      .filter((asignatura) => asignatura !== undefined)
      .map((asignatura) => asignatura.asignatura);
  };

  const materia = getMateria(asignatura)[0];

  // Id que imparte el profesor

  const getIdProfesor = (asignaturas) => {
    return asignaturas
      .filter((id_user) => id_user !== undefined)
      .map((id_user) => id_user.id_user);
  };
  const idprofesor = getIdProfesor(asignatura)[0];

  ///**---------------Grupo del estiudiante ------------------- */
  const getGrupoEstudiante = (estudiantes) => {
    return estudiantes
      .filter((est) => est.id_user === id)
      .map((est) => est.grupo);
  };
  const grupoE = getGrupoEstudiante(estudiante)[0];
  ///**---------------Nivel del estiudiante ------------------- */
  const getNivelEstudiante = (estudiantes) => {
    return estudiantes
      .filter((est) => est.id_user === id)
      .map((est) => est.nivel);
  };

  const NivelE = getNivelEstudiante(estudiante)[0];
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <Modal
        keepMounted
        open={openNotasBs}
        onClose={handleCloseNotasBs}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "60%",
          height: "fit-content",
          p: 2,
          textAlign: "center",
        }}
      >
        <div>
          {/**SOO1 */}
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
            sx={{ height: "fit-content" }}
          >
            <AccordionSummary
              expandIcon={<Button />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                Semestre 1
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                I am an accordion
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {expanded === "panel1" && (
                <TestSemestre1Basica
                postNotasb={postNotasb}
                  id={id}
                  idprofesor={idprofesor}
                  grupoE={grupoE}
                  NivelE={NivelE}
                  clase={materia}



                />
              )}
            </AccordionDetails>
          </Accordion>
          {/**SOO2 */}
          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
            sx={{ height: "fit-content" }}
          >
            <AccordionSummary
              expandIcon={<Button />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                Semestre 2
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                I am an accordion
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {expanded === "panel2" && (
                <TestSemestre2Basica
                  postNotas2b={postNotas2b}
                  id2={id2}
                  idprofesor={idprofesor}
                  grupoE={grupoE}
                  NivelE={NivelE}
                  clase={materia}


                />
              )}
            </AccordionDetails>
          </Accordion>
          {/**SOO3 */}
          <Accordion
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
            sx={{ height: "fit-content" }}
          >
            <AccordionSummary
              expandIcon={<Button />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                Semestre 3
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                I am an accordion
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {expanded === "panel3" && (
                <TestSemestre3Basica
                postNotas3b={postNotas3b}

                  id3={id3}
                  idprofesor={idprofesor}
                  grupoE={grupoE}
                  NivelE={NivelE}
                  clase={materia}
                />
              )}
            </AccordionDetails>
          </Accordion>
        </div>
      </Modal>
    </>
  );
}
