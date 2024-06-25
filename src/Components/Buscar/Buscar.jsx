import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardTrabajos from "../UTrabajospublicados/CardTrabajos";
import axios from "axios";

const Buscar = () => {
  const [vacantes, setVacantes] = useState([]);
  let { palabra, experiencia, area } = useParams();

  useEffect(() => {
    axios
      .get("http://ahorasi.dd:8083/getVacantes/?_format=json")
      .then((res) => {
        const vacantesFiltradas = res.data.filter(
          (vacante) =>
            vacante.field_area_de_trabajo === area &&
            vacante.field_experiencias === experiencia &&
            (vacante.title.includes(palabra) || vacante.body.includes(palabra))
        );
        setVacantes(vacantesFiltradas);
      });
  }, [palabra, experiencia, area]);

  return (
    <>
      <div className='container'>
        <div className='conatainer'>
          <div
            style={{
              width: "100%",
              height: "400px",
              background: "#4a4848",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h1 style={{ color: "#FFF", fontSize: "82px" }}>Vacantes Disponibles</h1>
          </div>
          <h4 style={{ textAlign: "center", marginTop: "20px", fontSize: "36px" }}>Todas la vacantes</h4>
          <div
            className='container'
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Formulario para filtrar */}
          </div>

          <div className='container'>
            {vacantes.map((ele, i) => (
              <CardTrabajos
                key={i}
                sonDeInicio={false}
                id={ele.nid}
                nombre={ele.title}
                lugar={ele.field_lugar}
                area={ele.field_area_de_trabajo}
                tipoEmpleo={ele.field_typee}
                salarioMinimo={ele.field_salario_minimo}
                fechaPublicacion={ele.field_fecha_de_publicacion}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Buscar;