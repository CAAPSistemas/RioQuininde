import React from "react";
import { Link } from "react-router-dom";

const CardTrabajos = ({
  sonDeInicio,
  
  id,
  nombre,
  lugar,
  area,
  tipoEmpleo,
  salarioMinimo,
  fechaPublicacion,
  web,
  descripcion,
  experiencias,
  correo,
}) => {
  return (
    <>
      <div className='container my-5'>
        <div className='card p-0 shadow'>
          <div className='row g-0'>
            <div
              className='col-lg-4'
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                style={{ width: "60%", height: "100%" }}
                src="../../../public/images/logo.png"
                className='img-fluid rounded-start'
                alt='Imagen'
              />
            </div>
            <div className='col-lg-8'>
              <div className='card-body d-flex flex-column justify-content-between h-100'>
                <div>
                  <h5 className='card-title'>
                    Nombre <i className='bi bi-fonts'></i>: {nombre}
                  </h5>
                  <p className='card-text'>
                    Lugar <i className='bi bi-geo-alt-fill'></i>: {lugar}
                  </p>
                  <p className='card-text'>
                    Area <i className='bi bi-textarea'></i>: {area}
                  </p>
                  <p className='card-text'>
                    Tipo de empleo:<i className='bi bi-browser-chrome'></i>
                    {tipoEmpleo}
                  </p>
                  <p className='card-text'>
                    Salario<i className='bi bi-currency-dollar'></i>:
                    {salarioMinimo}
                  </p>
                  
                  <p className='card-text'>
                    Fecha de publicacion{" "}
                    <i className='bi bi-calendar-check'></i>: {fechaPublicacion}
                  </p>
                </div>

                {sonDeInicio ? (
                  null
                  
                ) : (
                  <Link to={`/detalle-vacante/${id}`}>
                  <button
                    class='btn'
                    style={{
                      borderRadius: "2px",
                      color: "#FFF",
                      background: "#007ffe",
                      height: "50px",
                    }}
                    type='button'
                  >
                    Ver Vacante
                  </button>
                </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardTrabajos;
