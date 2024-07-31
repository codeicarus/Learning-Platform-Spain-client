import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import CasosPracticosAreaWCasosPracticosSection from "../Includes/CasosPracticosAreaWCasosPracticosSection";
import { toast } from "react-toastify";
import CasosPracticosOficialesAreaWCasosPracticosSection from "../Includes/CasosPracticosOficialesAreaWCasosPracticosSection";
import ReactGA from "react-ga";

class TestPorCasosPracticos extends Component {
  state = {
    redirect_to_login: false,
    redirect_to_test: false,
    view_render: false,
    areasWCasosPracticos: [],
    numero_preguntas: 150,
    respuesta_automatica: false,
    casos_practicos_selected: [],
    simulacros_selected: [],
    id_test: 0,
  };

  constructor(props) {
    super(props);
    this.changeCasosPracticosSelected =
      this.changeCasosPracticosSelected.bind(this);
  }

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
          this.getCasosPracticos();
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

  async getCasosPracticos() {
    axios
      .get(process.env.REACT_APP_URL_API + `getCasosPracticos`, {
        headers: {
          authorization: localStorage.getItem("token_penitenciarios"),
        },
      })
      .then((res) => {
        this.setState({
          areasWCasosPracticos: res.data || [],
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

  changeCasosPracticosSelected = (id_caso_practico, estado) => {
    if (estado) {
      this.setState({
        casos_practicos_selected: [id_caso_practico],
        simulacros_selected: [],
      });
    } else {
    }
  };

  changeSimulacrosSelected = (id_caso_practico, estado) => {
    if (estado) {
      let actual_selected = this.state.simulacros_selected;
      actual_selected.push(id_caso_practico);
      this.setState({
        simulacros_selected: actual_selected,
        casos_practicos_selected: [],
      });
    } else {
      let new_selected = [];
      let actual_selected = this.state.simulacros_selected;
      actual_selected.map((tema) => {
        if (tema !== id_caso_practico) {
          new_selected.push(tema);
        }
      });
      this.setState({
        simulacros_selected: new_selected,
        casos_practicos_selected: [],
      });
    }
  };

  goToTest = () => {
    if (
      this.state.casos_practicos_selected.length > 0 ||
      this.state.simulacros_selected.length > 0
    ) {
      if (this.state.casos_practicos_selected.length > 0) {
        this.createTest();
      }
      if (this.state.simulacros_selected.length > 0) {
        this.createTest();
      }
    } else {
      toast.error("Tienes que seleccionar al menos un caso práctico");
    }
  };

  async createTest() {
    let tipoAPoner = "Caso práctico";
    let arrayToSend = this.state.simulacros_selected;
    this.state.areasWCasosPracticos.forEach((caso_practico) => {
      if (this.state.casos_practicos_selected[0] == caso_practico.id) {
        if (caso_practico.oficial) {
          tipoAPoner = "Caso práctico oficial";
          arrayToSend = this.state.casos_practicos_selected;
        }
      }
    });
    console.log({
      tipo: tipoAPoner,
      casos_practicos: arrayToSend,
      numero_preguntas: this.state.numero_preguntas,
      respuesta_automatica: this.state.respuesta_automatica,
      email: localStorage.getItem("email_penitenciarios"),
    });

    axios
      .post(
        process.env.REACT_APP_URL_API + `preguntasCasosPracticos`,
        {
          tipo: tipoAPoner,
          casos_practicos: arrayToSend,
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
  }

  renderRedirectToLogin = () => {
    if (this.state.redirect_to_login) {
      return <Redirect to="/login" />;
    }
  };

  renderRedirectToTest = () => {
    if (this.state.redirect_to_test) {
      return <Redirect to={"/test_cp/" + this.state.id_test} />;
    }
  };

  render() {
    if (this.state.view_render) {
      return (
        <div>
          <section id="pricing" className="plans featured left">
            <div className="container">
              <div className="row intro mt-5">
                <div className="col-12">
                  <h2 className="featured">Casos prácticos</h2>
                  <p>
                    Selecciona el caso práctico del que quieres hacer el test
                  </p>
                </div>
              </div>

              {new Date().getTime() / 1000 >=
                localStorage.getItem("penitenciarios_mds") && (
                <div className="mensaje_capado">
                  <p>Solo puedes hacer casos prácticos si estas suscrito</p>
                  <Link to="/suscribete" className="btn mx-auto primary-button">
                    <i className="icon-speech"></i>!Suscribete¡
                  </Link>
                </div>
              )}
              <div className="row justify-content-center text-center items lis_al_33">
                {this.state.areasWCasosPracticos.length > 0 && (
                  <div className="col-12 col-md-12 col-lg-12 align-self-auto item mb-5">
                    <div>
                      <h4 className="text-left">
                        Supuestos Examenes Oficiales
                      </h4>
                      <ul className="list-group list-group-flush">
                        {this.state.areasWCasosPracticos?.map(
                          (caso_practico, i) => (
                            <CasosPracticosOficialesAreaWCasosPracticosSection
                              changeCasosPracticosSelected={
                                this.changeCasosPracticosSelected
                              }
                              caso_practico={caso_practico}
                              casos_practicos_selected={
                                this.state.casos_practicos_selected
                              }
                              key={i}
                            />
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
              <div className="row justify-content-center text-center items lis_al_25">
                {this.state.areasWCasosPracticos.length > 0 && (
                  <div className="col-12 col-md-12 col-lg-12 align-self-auto item mb-5">
                    <div>
                      <h4 className="text-left">Supuestos</h4>
                      <ul className="list-group list-group-flush">
                        {this.state.areasWCasosPracticos.map(
                          (caso_practico, i) => (
                            <CasosPracticosAreaWCasosPracticosSection
                              changeSimulacrosSelected={
                                this.changeSimulacrosSelected
                              }
                              caso_practico={caso_practico}
                              simulacros_selected={
                                this.state.simulacros_selected
                              }
                              key={i}
                            />
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                )}
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
                        {" "}
                        Respuesta Inmediata
                      </span>
                    </li>
                  </ul>
                </div>

                {new Date().getTime() / 1000 >=
                  localStorage.getItem("penitenciarios_mds") && (
                  <div className="col-12 col-md-6 align-self-end mt-sm-2">
                    <a
                      title="Solo puedes hacer casos prácticos si estas suscrito"
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

export default TestPorCasosPracticos;
