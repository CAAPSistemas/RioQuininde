import React from "react";
import { Link } from "react-router-dom";
import CardTrabajos from "./CardTrabajos";

const UTrabajospulicados = ({vacantes2}) => {
  return (
    <section style={{ minHeight: "500px" , background: "rgb(213, 218, 224)"}}>
      <div
        className='container'
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          className='container '
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: "60px",
          }}
        >
          <p style={{ fontSize: "36px", textAlign: "center" }}>
            Trabajos publicados recientamente
          </p>
          {
            vacantes2?.map((ele,i)=>(
              <CardTrabajos
              key={i}
              sonDeInicio={true}
              id={ele.nid}
              nombre={ele.title}
              lugar={ele.field_lugar}
              area={ele.field_area_de_trabajo}
              tipoEmpleo={ele.field_typee}
              salarioMinimo={ele.field_salario_minimo}
              fechaPublicacion={ele.field_fecha_de_publicacion}
            />

            ))
          }
          <div
            class='gap-2 col-6 mx-auto mb-5'
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Link to='/todos-los-trbajos'>
              <button
                class='btn'
                style={{
                  borderRadius: "2px",
                  color: "#FFF",
                  background: " rgb(218, 8, 51)",
                  height: "50px",
                }}
                type='button'
              >
                BUSCAR TODOS LOS TRABAJOS
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UTrabajospulicados;
