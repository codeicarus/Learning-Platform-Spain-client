import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import ReactGA from "react-ga";
import TestNuevoUsuario from "../Includes/TestNuevoUsuario";
import TestuserNuevoPreguntas from "../Includes/TestuserNuevoPreguntas";
import Pregunta from "../Includes/FirstLogin/Pregunta";

class FirstLoginPage extends Component {
  state = {
    niveles: [],
    view_render: false,
    redirect_to_test: false,
    redirect_to_login: false,
    redirect_to_dashboard: false,
  };

  componentDidMount() {
    ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALITYCS);
    ReactGA.pageview(window.location.pathname + window.location.search);
    window.scrollTo(0, 0);
    this.doCheck();
  }

  async doCheck() {
    if (localStorage.hasOwnProperty("token_penitenciarios")) {
      axios
        .get(process.env.REACT_APP_URL_API + `usuarios/check`, {
          headers: {
            authorization: localStorage.getItem("token_penitenciarios"),
          },
        })
        .then((res) => {
          this.setState({
            view_render: true,
          });
          this.getNiveles();
        })
        .catch((error) => {
          localStorage.removeItem("token_penitenciarios");
          localStorage.removeItem("email_penitenciarios");
          this.setState({
            redirect_to_login: true,
          });
        });
    }
  }

  async getNiveles() {
    axios
      .get(process.env.REACT_APP_URL_API + `niveles`, {
        headers: {
          authorization: localStorage.getItem("token_penitenciarios"),
        },
      })
      .then((res) => {
        this.setState({
          niveles: res.data,
        });
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.error);
        }
      });
  }

  async getTestNivel() {
    axios
      .post(
        process.env.REACT_APP_URL_API + `usuarios/test_nivel`,
        {
          email: localStorage.getItem("email_penitenciarios"),
        },
        {
          headers: {
            authorization: localStorage.getItem("token_penitenciarios"),
          },
        }
      )
      .then((res) => {
        this.setState({
          id_test: res.data.id,
          redirect_to_test: true,
        });
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.error);
        }
      });
  }

  setNivel(id) {
    axios
      .put(
        process.env.REACT_APP_URL_API + `usuarios/nivel`,
        {
          email: localStorage.getItem("email_penitenciarios"),
          id_nivel: id,
        },
        {
          headers: {
            authorization: localStorage.getItem("token_penitenciarios"),
          },
        }
      )
      .then((res) => {
        this.setState({
          redirect_to_dashboard: true,
        });
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.error);
        }
      });
  }

  renderRedirectToTest = () => {
    if (this.state.redirect_to_test) {
      return <Redirect to={"/test/" + this.state.id_test} />;
    }
  };

  renderRedirectToLogin = () => {
    if (this.state.redirect_to_login) {
      return <Redirect to="/login" />;
    }
  };

  renderRedirectToDashboard = () => {
    if (this.state.redirect_to_dashboard) {
      return <Redirect to="/dashboard" />;
    }
  };

  renderButtonsNiveles = () => {
    if (this.state.niveles?.length > 0) {
      return (
        <div>
          {this.state.niveles.map((nivel, index) => {
            return (
              <a
                key={index}
                onClick={() => this.setNivel(nivel.id)}
                className="btn ml-auto mr-auto mb-3 primary-button"
              >
                <i className="icon-chart"></i> Soy nivel {nivel.name}
              </a>
            );
          })}
        </div>
      );
    }
    return "";
  };

  render() {
    if (this.state.view_render) {
      return (
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100vh",
            zIndex: "9999",
            backgroundColor: "#fff",
          }}
        >
          {this.renderRedirectToDashboard()}
          {this.renderRedirectToTest()}
          <section
            id="services"
            style={{ padding: "80px 0px" }}
            className="offers featured left"
          >
            <div className="container">
              <div className="row intro relative">
                <div className="col-12 text-center">
                  <h2>Bienvenido</h2>
                  <p>
                    Vamos a comenzar con un test personal y breve para
                    conocerte. Así podremos ayudarte mejor
                  </p>
                </div>
              </div>
              <div className="">
                <TestNuevoUsuario niveles={this.state.niveles} />
              </div>
            </div>
          </section>
        </div>
      );
    } else {
      return <div>{this.renderRedirectToLogin()}</div>;
    }
  }
}

export default FirstLoginPage;
