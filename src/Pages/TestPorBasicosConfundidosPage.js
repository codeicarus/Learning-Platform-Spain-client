import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import AreaWBasicosConfundidosSection from "../Includes/AreaWBasicosConfundidosSection";
import { toast } from "react-toastify";
import ReactGA from "react-ga";
import "./chat.css";

class TestPorBasicosConfundidosPage extends Component {
  state = {
    redirect_to_login: false,
    redirect_to_test: false,
    view_render: false,
    areasWBasicosConfundidos: [],
    numero_preguntas: 20,
    respuesta_automatica: false,
    basicosconfundidos_selected: [],
    id_test: 0,
  };

  constructor(props) {
    super(props);
    this.changeBasicosConfundidosSelected =
      this.changeBasicosConfundidosSelected.bind(this);
  }

  componentDidMount() {
    ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALITYCS);
    ReactGA.pageview(window.location.pathname + window.location.search);
    window.scrollTo(0, 0);
    this.doCheck();
  }

  async doCheck() {
    if (localStorage.getItem("token_penitenciarios") !== undefined) {
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
          this.getareasWBasicosConfundidos();
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

  async getareasWBasicosConfundidos() {
    axios
      .get(process.env.REACT_APP_URL_API + `areasWBasicosConfundidos`, {
        headers: {
          authorization: localStorage.getItem("token_penitenciarios"),
        },
      })
      .then((res) => {
        this.setState({
          areasWBasicosConfundidos: res.data,
        });
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.error);
        }
      });
  }

  changeSelectedRespuestaAutomatica = () => {
    this.setState({
      respuesta_automatica: !this.state.respuesta_automatica,
    });
  };
  classNameRespuestaAutomatica = () => {
    if (this.state.respuesta_automatica) {
      return "checkStyle la la-check text-right selected";
    } else {
      return "checkStyle la la-check text-right";
    }
  };

  changeSelectedNumeroPreguntas = (numero_preguntas) => {
    this.setState({
      numero_preguntas: numero_preguntas,
    });
  };
  classNameNumeroPreguntas = (numero_preguntas) => {
    if (this.state.numero_preguntas === numero_preguntas) {
      return "radioStyle la la-check text-right selected";
    } else {
      return "radioStyle la la-check text-right";
    }
  };
  changeBasicosConfundidosSelected = (id_legislacion, estado) => {
    if (estado) {
      let actual_selected = this.state.basicosconfundidos_selected;
      actual_selected.push(id_legislacion);
      this.setState({
        basicosconfundidos_selected: actual_selected,
      });
    } else {
      let new_selected = [];
      let actual_selected = this.state.basicosconfundidos_selected;
      actual_selected.map((legislacion) => {
        if (legislacion !== id_legislacion) {
          new_selected.push(legislacion);
        }
      });
      this.setState({
        basicosconfundidos_selected: new_selected,
      });
    }
  };

  goToTest = () => {
    this.createTest();
  };

  async createTest() {
    if (this.state.basicosconfundidos_selected.length > 0) {
      axios
        .post(
          process.env.REACT_APP_URL_API + `preguntasBasicosConfundidos`,
          {
            tipo: "Test por basicosconfundidos",
            basicosconfundidos: this.state.basicosconfundidos_selected,
            numero_preguntas: this.state.numero_preguntas,
            respuesta_automatica: this.state.respuesta_automatica,
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
    } else {
      toast.error("Tienes que seleccionar al menos un básico confundido");
    }
  }

  renderRedirectToLogin = () => {
    if (this.state.redirect_to_login) {
      return <Redirect to="/login" />;
    }
  };

  renderRedirectToTest = () => {
    if (this.state.redirect_to_test) {
      return <Redirect to={"/test/" + this.state.id_test} />;
    }
  };

  render() {
    if (this.state.view_render) {
      return (
        <div>
          <section id="pricing" className="plans featured left">
            <div className="container">
              <div className="row intro mt-5 mt-sm-2">
                <div className="col-12">
                  <h2 className="featured">Test por Básicos Confundidos</h2>
                  <p>
                    Selecciona las básicos confundidos de los que quieres hacer
                    el test
                  </p>
                </div>
              </div>

              {new Date().getTime() / 1000 >=
                localStorage.getItem("penitenciarios_mds") && (
                <div className="mensaje_capado">
                  <p>
                    Solo puedes hacer tests de básicos confundidos si estas
                    suscrito
                  </p>
                  <Link to="/suscribete" className="btn mx-auto primary-button">
                    <i className="icon-speech"></i>!Suscribete¡
                  </Link>
                </div>
              )}
              {this.state.areasWBasicosConfundidos?.map((area, i) => (
                <AreaWBasicosConfundidosSection
                  changeBasicosConfundidosSelected={
                    this.changeBasicosConfundidosSelected
                  }
                  area={area}
                  key={i}
                />
              ))}
              <span className="line"></span>

              <div className="row intro mt-2 mt-sm-2">
                <div className="col-12">
                  <p style={{ WebkitTextStroke: "0.3px" }}>
                    Selecciona el número de preguntas
                  </p>
                </div>
              </div>
              <div className="row justify-content-center text-center items">
                <div className="col-6 col-md-3 col-lg-2 align-self-auto item">
                  <div>
                    <ul className="list-group list-group-flush">
                      <li
                        onClick={() => this.changeSelectedNumeroPreguntas(20)}
                        className="list-group-item text-left"
                      >
                        <i className={this.classNameNumeroPreguntas(20)}></i>
                        <span> 20</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-6 col-md-3 col-lg-2 align-self-auto item">
                  <div>
                    <ul className="list-group list-group-flush">
                      <li
                        onClick={() => this.changeSelectedNumeroPreguntas(25)}
                        className="list-group-item text-left"
                      >
                        <i className={this.classNameNumeroPreguntas(25)}></i>
                        <span> 25</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-6 col-md-3 col-lg-2 align-self-auto item">
                  <div>
                    <ul className="list-group list-group-flush">
                      <li
                        onClick={() => this.changeSelectedNumeroPreguntas(40)}
                        className="list-group-item text-left"
                      >
                        <i className={this.classNameNumeroPreguntas(40)}></i>
                        <span> 40</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-6 col-md-3 col-lg-2 align-self-auto item">
                  <div>
                    <ul className="list-group list-group-flush">
                      <li
                        onClick={() => this.changeSelectedNumeroPreguntas(60)}
                        className="list-group-item text-left"
                      >
                        <i className={this.classNameNumeroPreguntas(60)}></i>
                        <span> 60</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-6 col-md-3 col-lg-2 align-self-auto item">
                  <div>
                    <ul className="list-group list-group-flush">
                      <li
                        onClick={() => this.changeSelectedNumeroPreguntas(100)}
                        className="list-group-item text-left"
                      >
                        <i className={this.classNameNumeroPreguntas(100)}></i>
                        <span> 100</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-6 col-md-3 col-lg-2 align-self-auto item">
                  <div>
                    <ul className="list-group list-group-flush">
                      <li
                        onClick={() => this.changeSelectedNumeroPreguntas(150)}
                        className="list-group-item text-left"
                      >
                        <i className={this.classNameNumeroPreguntas(150)}></i>
                        <span> 150</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="row mt-5 mt-sm-2">
                <div className="col-12 col-md-6 align-self-center text-center text-md-left">
                  <ul className="list-group list-group-flush">
                    <li
                      onClick={() => this.changeSelectedRespuestaAutomatica()}
                      className="list-group-item text-left"
                    >
                      <i className={this.classNameRespuestaAutomatica()}></i>
                      <span style={{ WebkitTextStrokeWidth: "0.3px" }}>
                        Respuesta Inmediata
                      </span>
                    </li>
                  </ul>
                </div>

                {new Date().getTime() / 1000 >=
                  localStorage.getItem("penitenciarios_mds") && (
                  <div className="col-12 col-md-6 align-self-end mt-sm-2">
                    <a
                      title="Solo puedes hacer los tests de básicos confundidos si estas suscrito"
                      className="btn mx-auto mr-md-0 ml-md-auto primary-button"
                    >
                      <i className="icon-speech"></i>Hacer Test
                    </a>
                  </div>
                )}

                {new Date().getTime() / 1000 <
                  localStorage.getItem("penitenciarios_mds") && (
                  <div className="col-12 col-md-6 align-self-end mt-sm-2">
                    <a
                      onClick={() => this.goToTest()}
                      className="btn mx-auto mr-md-0 ml-md-auto primary-button"
                    >
                      <i className="icon-speech"></i>Hacer Test
                    </a>
                  </div>
                )}
              </div>
            </div>
          </section>
          {this.renderRedirectToTest()}
        </div>
      );
    } else {
      return <div>{this.renderRedirectToLogin()}</div>;
    }
  }
}

export default TestPorBasicosConfundidosPage;
