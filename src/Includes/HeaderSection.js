import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ExitToApp, Edit } from "@material-ui/icons";

class HeaderSection extends Component {
  render() {
    return (
      <header>
        <nav
          data-aos="zoom-out"
          data-aos-delay="800"
          className="navbar navbar-sticky navbar-expand"
        >
          <div className="container header">
            <Link to="/" className="navbar-brand">
              <img src="/assets/images/logo.png" />
            </Link>
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
            <ul className="navbar-nav icons ml-auto m-xl-0">
              <li className="nav-item social">
                <a
                  href="https://www.facebook.com/people/PenitenciarioS/100093511905034/"
                  target="_blank"
                  className="nav-link"
                >
                  <i className="icon-social-facebook"></i>
                </a>
              </li>
              <li className="nav-item social">
                <a
                  target="_blank"
                  href="https://www.instagram.com/penitenciarios_/"
                  className="nav-link"
                >
                  <i className="icon-social-instagram"></i>
                </a>
              </li>
            </ul>
            <ul className="navbar-nav action">
              <li className="nav-item ml-3 hide_movil">
                <Link to="/login" className="btn ml-lg-auto primary-button">
                  <Edit fontSize="small"></Edit>Registrarme
                </Link>
              </li>
              <li className="nav-item ml-3">
                <Link to="/login" className="btn ml-lg-auto primary-button">
                  <ExitToApp fontSize="small"></ExitToApp>Entrar a mi cuenta
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav toggle">
              <li className="nav-item">
                <a
                  href="#"
                  className="nav-link"
                  data-toggle="modal"
                  data-target="#menu"
                >
                  <i className="icon-menu m-0"></i>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

export default HeaderSection;
