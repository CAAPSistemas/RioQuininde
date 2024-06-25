import * as React from "react";
import Modal from "@mui/material/Modal";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  OutlinedInput,
  Select,
  MenuItem,
  createSvgIcon,
  ListItemText,
  ListItem,
  List,
} from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import MUIDataTable from "mui-datatables";

export default function KeepMountedModalAsistenciaDetail({


    handleAsistenciaDetail,
              handleCloseDetail,
              usuario1,
              asistenciaDetail,
              materia
  ,
}) {


   const [aeditar, setAeditar] = useState({});
   const [estados, setEstados] = useState(["Presente", "Ausente"]);
   const [totalClases, setTotalClases] = useState(0);
   const [saved1, setSaved1] = useState([]);
   const [errorMensaje, setErrorMensaje] = useState(null);
   const [saved, setSaved] = useState([]);
   let registros = [];

  const isOk = asistenciaDetail;
  useEffect(() => {
    if (isOk) {
      Registro(usuario1);
    }
  }, [isOk, usuario1]);

  console.log("que0"+usuario1);
  function Registro(usuario1) {
    console.log(usuario1);
    axios
      .get("http://ahorasi.dd:8083/webformID?_format=json")
      .then((response) => {
        const nov = response.data;
        const webformJob = nov?.filter(
          (item) => item.webform_id === "asistencia"
        );
        const requests = webformJob?.map((item) =>
          axios.get(
            `http://ahorasi.dd:8083/webform_rest/asistencia/submission/${item.uuid}`
          )
        );
        Promise.all(requests).then((responses) => {
            registros = responses
              .map((response, index) => {
                const data = response.data;
                console.log(data.data.usuario);

                if (data.data.usuario === usuario1 &&  data.data.asignatura===materia) {
                  return {

                    usuario:data.data.usuario,
                    estado:data.data.estado,
                    asignatura:data.data.asignatura,
                    fecha:data.data.fecha,
                    submission_id: data.entity.sid[0].value,
                    submission_uuid: data.entity.uuid[0].value,
                  };
                }

                return null;
              })
              .filter(Boolean);
              setSaved1(registros);
              porcientoAsistencia();

          })
          .catch((error) => {
            console.error("Error al obtener los datos adicionales:", error);
          });
      });
  }


console.log(saved1);
function porcientoAsistencia() {

    const presente = saved1.filter((registro) => registro.estado === "Presente");
    const justificado = saved1.filter((registro) => registro.estado === "Justificado");
    const injustificado = saved1.filter((registro) => registro.estado === "Injustificado");

    const diaAsistidos = presente.length;
    const diasInjustificados=injustificado.length;
    const diasJustificado=justificado.length;

    const fechasInjustificados = injustificado.map((registro) => registro.fecha);
    const fechasPresentes = presente.map((registro) => registro.fecha);
    const fechasJustificados = justificado.map((registro) => registro.fecha);



    return (
<Box sx={{ p: 3, border: '1px solid #e5e5e5', borderRadius: 4, width: '50%' }}>      <h5>Asistencia</h5>
      <p>Asistidos : {diaAsistidos}</p>

      <List>
        {fechasPresentes.map((fecha) => (
          <ListItem key={fecha} sx={{ py: 1 }}>
            <ListItemText primary={fecha} />
          </ListItem>
        ))}
      </List>

      <p>Ausencias Justificadas: {diasJustificado}</p>

      <List>
        {fechasJustificados.map((fecha) => (
          <ListItem key={fecha} sx={{ py: 1 }}>
            <ListItemText primary={fecha} />
          </ListItem>
        ))}
      </List>

      <p>Ausencias injustificadas: {diasInjustificados}</p>

      <List>
        {fechasInjustificados.map((fecha) => (
          <ListItem key={fecha} sx={{ py: 1 }}>
            <ListItemText primary={fecha} />
          </ListItem>
        ))}
      </List>
    </Box>
      );
  }


  return (
    <div>
      <Modal
        keepMounted
        open={asistenciaDetail}
        onClose={handleCloseDetail}
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


          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>




            {porcientoAsistencia()}

          </Box>

        </Box>
      </Modal>
    </div>
  );
}
