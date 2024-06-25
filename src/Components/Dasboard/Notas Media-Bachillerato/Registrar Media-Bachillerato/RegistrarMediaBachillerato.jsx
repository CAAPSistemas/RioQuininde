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
import TestSemestre1 from "./RegistrarSemestre1";
import TestSemestre2 from "./RegistrarSemestre2";
import TestSemestre3 from "./RegistrarSemestre3";

export default function KeepMountedModalAddNotasMediaBachillerato({
  handleOpenNotasM,
  handleCloseNotasM,
  openNotasM,
  postNotas,
  postNotas2,
  id2,
  idM,
  id3,
  postNotas3,
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
      .filter((est) => est.id_user === idM)
      .map((est) => est.grupo);
  };
  const grupoE = getGrupoEstudiante(estudiante)[0];
  ///**---------------Nivel del estiudiante ------------------- */
  const getNivelEstudiante = (estudiantes) => {
    return estudiantes
      .filter((est) => est.id_user === idM)
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
        open={openNotasM}
        onClose={handleCloseNotasM}
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
                <TestSemestre1
                  postNotas={postNotas}
                  idM={idM}
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
                <TestSemestre2
                  postNotas2={postNotas2}
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
                <TestSemestre3
                  postNotas3={postNotas3}
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
