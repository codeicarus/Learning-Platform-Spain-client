import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FiUsers } from "react-icons/fi";
import { BsPencilFill } from "react-icons/bs";

function EditAreas() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section id="services" className="offers featured left">
      <div className="container">
        <div className="row intro">
          <div className="col-12 col-md-12 align-self-center text-center text-md-left">
            <h2 className="featured">Editar</h2>
          </div>
        </div>
        <div className="row justify-content-center text-center items">
          <div className="col-12 col-md-6 col-lg-4 item">
            <Link to="/edit_areas/temas" className="card featured ">
              <i className="icon icon-cloud-upload"></i>
              <h4>Test por Temas</h4>
              <i className="btn-icon icon-arrow-right-circle"></i>
            </Link>
          </div>

          <div className="col-12 col-md-6 col-lg-4 item">
            <Link to="/edit_areas/bs-cf" className="card featured ">
              <BsPencilFill className="icon" style={{ color: "#5A92FA" }} />
              <h4>Basicos Confundidos</h4>
              <i className="btn-icon icon-arrow-right-circle"></i>
            </Link>
          </div>
          <div className="col-12 col-md-6 col-lg-4 item">
            <Link to="/edit_areas/legislacion" className="card featured ">
              <FiUsers className="icon" />
              <h4>Legislaciones</h4>
              <i className="btn-icon icon-arrow-right-circle"></i>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EditAreas;
