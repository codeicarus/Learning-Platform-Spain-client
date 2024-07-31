import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ExitToApp } from "@material-ui/icons";

class MenuMovil extends Component {
  render() {
    return (
      <div
        id="menu"
        className="p-0 modal fade"
        role="dialog"
        aria-labelledby="menu"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-slideout" role="document">
          <div className="modal-content full">
            <div className="modal-header" data-dismiss="modal">
              <i className="icon-close"></i>
            </div>
            <div className="menu modal-body">
              <div className="row w-100">
                <div className="items p-0 col-12 text-center">
                  {localStorage.getItem("token_penitenciarios") != null && (
                    <ul className="navbar-nav items ml-auto">
                      <li className="nav-item">
                        <Link to="/dashboard" className="nav-link">
                          Hacer un test
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/suscribete" className="nav-link">
                          Suscripción
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/mi-perfil" className="nav-link">
                          Mi perfil
                        </Link>
                      </li>
                    </ul>
                  )}
                  {localStorage.getItem("token_penitenciarios") == null && (
                    <ul className="navbar-nav items ml-auto">
                      <li className="nav-item">
                        <Link to="/login" className="nav-link smooth-anchor">
                          Prueba test Gratis
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          to={{
                            pathname: "/",
                            hash: "#ofrecemos",
                          }}
                          className="nav-link smooth-anchor"
                        >
                          Ofrecemos
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          to={{
                            pathname: "/",
                            hash: "#precios",
                          }}
                          className="nav-link smooth-anchor"
                        >
                          Precios
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          to={{
                            pathname: "/",
                            hash: "#contacto",
                          }}
                          className="nav-link smooth-anchor"
                        >
                          Contacto
                        </Link>
                      </li>
                    </ul>
                  )}
                </div>
                <div className="contacts p-0 col-12 text-center"> </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MenuMovil;
