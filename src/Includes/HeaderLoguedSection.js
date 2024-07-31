import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { ExitToApp } from "@material-ui/icons";
import { serverSocket } from "../App";

class HeaderLoguedSection extends Component {
  state = {
    redirect_to_login: false,
  };
  logout = () => {
    serverSocket.emit("user-disconnected", {
      email: localStorage.getItem("email_penitenciarios"),
    });
    localStorage.removeItem("token_penitenciarios");
    localStorage.removeItem("email_penitenciarios");
    this.props.update_menu();
    this.props.history.push("/login");
  };
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
            <ul className="navbar-nav action">
              <li className="nav-item ml-3">
                <a
                  onClick={() => this.logout()}
                  className="btn ml-lg-auto primary-button"
                >
                  <ExitToApp fontSize="small"></ExitToApp>Salir
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

export default withRouter(HeaderLoguedSection);
