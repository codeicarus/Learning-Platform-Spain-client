import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import ExamenesOficialesAreaWExamenesOficialesSection from "../Includes/ExamenesOficialesAreaWExamenesOficialesSection";
import SimulacrosAreaWSimulacrosSection from "../Includes/SimulacrosAreaWSimulacrosSection";
import { toast } from "react-toastify";
import ReactGA from "react-ga";

class TestPorOficiales extends Component {
  state = {
    redirect_to_login: false,
    redirect_to_test: false,
    view_render: false,
    areasWExamenesOficiales: [],
    los_niveles: [],
    los_oficiales: [],
    los_simulacros: [],
    numero_preguntas: 150,
    respuesta_automatica: false,
    examenes_oficiales_selected: [],
    simulacros_selected: [],
    id_test: 0,
  };

  constructor(props) {
    super(props);
    this.changeExamenesOficialesSelected =
      this.changeExamenesOficialesSelected.bind(this);
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
          this.getOficiales();
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

  // async getOficiales() {
  //     axios.get(process.env.REACT_APP_URL_API + `getOficiales`, {
  //         headers: {
  //             authorization: localStorage.getItem('token_penitenciarios')
  //         }
  //     })
  //         .then(res => {
  //             let oficiales = [];
  //             let simulacros = [];
  //             let niveles = [];

  //             if (res.data.hasOwnProperty('oficiales')) {
  //                 for (const [key, value] of Object.entries(res.data.oficiales)) {
  //                     oficiales.push(value)
  //                 }
  //                 oficiales = oficiales.sort((a, b) => (a.name < b.name ? -1 : 1))
  //             }

  //             if (res.data.hasOwnProperty('simulacros')) {
  //                 for (const [key, value] of Object.entries(res.data.simulacros)) {
  //                     simulacros.push(value)
  //                 }
  //                 simulacros = simulacros.sort((a, b) => (a.name < b.name ? -1 : 1))
  //             }

  //             if (res.data.hasOwnProperty('niveles')) {
  //                 for (const [key, value] of Object.entries(res.data.niveles)) {
  //                     niveles.push(value)
  //                 }
  //             }

  //             this.setState({
  //                 los_oficiales: oficiales,
  //                 los_simulacros: simulacros,
  //                 los_niveles: niveles
  //             }, () => {
  //             });

  //         })
  //         .catch(error => {
  //             if (error.response) {
  //                 toast.error(error.response.data.error);
  //             }
  //         });
  // }

  async getOficiales() {
    try {
      const res = await axios.get(
        process.env.REACT_APP_URL_API + `getOficiales`,
        {
          headers: {
            authorization: localStorage.getItem("token_penitenciarios"),
          },
        }
      );

      let oficiales = [];
      let simulacros = [];
      let niveles = [];

      if (res.data.hasOwnProperty("oficiales")) {
        if (res.data.oficiales != null) {
          for (const [key, value] of Object.entries(res.data.oficiales)) {
            oficiales.push(value);
          }
          oficiales = oficiales.sort((a, b) => (a.name < b.name ? -1 : 1));
        }
      }

      if (res.data.hasOwnProperty("simulacros")) {
        if (res.data.simulacros != null) {
          for (const [key, value] of Object.entries(res.data.simulacros)) {
            simulacros.push(value);
          }
          simulacros = simulacros.sort((a, b) =>
            Number(a.name.split(" ")[1]) < Number(b.name.split(" ")[1]) ? -1 : 1
          );
        }
      }

      if (res.data.hasOwnProperty("niveles")) {
        if (res.data.niveles != null) {
          for (const [key, value] of Object.entries(res.data.niveles)) {
            niveles.push(value);
          }
        }
      }

      this.setState({
        los_oficiales: oficiales,
        los_simulacros: simulacros,
        los_niveles: niveles,
      });
    } catch (error) {
      console.error(error);
      //   }
    }
  }

  //#######################################################

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

  changeExamenesOficialesSelected = (id_examen_oficial, estado) => {
    if (estado) {
      this.setState({
        examenes_oficiales_selected: [id_examen_oficial],
        simulacros_selected: [],
      });
    } else {
    }
  };

  changeSimulacrosSelected = (id_examen_oficial, estado) => {
    if (estado) {
      this.setState({
        simulacros_selected: [id_examen_oficial],
        examenes_oficiales_selected: [],
      });
    } else {
    }
  };

  goToTest = () => {
    if (
      this.state.examenes_oficiales_selected.length > 0 ||
      this.state.simulacros_selected.length > 0
    ) {
      if (this.state.examenes_oficiales_selected.length > 0) {
        this.createTest();
      }

      if (this.state.simulacros_selected.length > 0) {
        this.createTestSimulacro();
      }
    } else {
      toast.error("Tienes que seleccionar al menos un examen");
    }
  };

  async createTest() {
    axios
      .post(
        process.env.REACT_APP_URL_API + `preguntasOficiales`,
        {
          tipo: "Test oficiales",
          oficiales: this.state.examenes_oficiales_selected,
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

  async createTestSimulacro() {
    axios
      .post(
        process.env.REACT_APP_URL_API + `preguntasSimulacros`,
        {
          tipo: "Test simulacros",
          simulacros: this.state.simulacros_selected,
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
                  <h2 className="featured">Simulacros y oficiales</h2>
                  <p>
                    Selecciona el simulacro o examen oficial de los que quieres
                    hacer el test
                  </p>
                </div>
              </div>
              {new Date().getTime() / 1000 >=
                localStorage.getItem("penitenciarios_mds") && (
                <div className="mensaje_capado">
                  <p>
                    Solo puedes hacer tests de simulacros y oficiales si estas
                    suscrito
                  </p>
                  <Link to="/suscribete" className="btn mx-auto primary-button">
                    <i className="icon-speech"></i>!Suscribete¡
                  </Link>
                </div>
              )}
              <div className="row justify-content-center text-center items lis_al_25">
                {this.state.los_simulacros.length > 0 && (
                  <div className="col-12 col-md-12 col-lg-12 align-self-auto item mb-5">
                    <div>
                      <h4 className="text-left">Simulacros</h4>
                      <div className="row">
                        {this.state.los_niveles.map((nivel, i) => {
                          return (
                            <div
                              key={i}
                              style={{ padding: "0" }}
                              className="col-12 col-md-12 col-lg-12 align-self-auto item"
                            >
                              <h5 className="text-left">{nivel.name}</h5>
                              <ul className="list-group list-group-flush">
                                {this.state.los_simulacros.map(
                                  (simulacro, i) => {
                                    if (simulacro.id_nivel == nivel.id) {
                                      return (
                                        <SimulacrosAreaWSimulacrosSection
                                          changeSimulacrosSelected={
                                            this.changeSimulacrosSelected
                                          }
                                          simulacro={simulacro}
                                          simulacros_selected={
                                            this.state.simulacros_selected
                                          }
                                          key={i}
                                        />
                                      );
                                    } else {
                                      return "";
                                    }
                                  }
                                )}
                              </ul>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="row justify-content-center text-center items lis_al_25">
                {this.state.los_oficiales.length > 0 && (
                  <div className="col-12 col-md-12 col-lg-12 align-self-auto item mb-5">
                    <div>
                      <h4 className="text-left">Exámenes Oficiales</h4>
                      <ul className="list-group list-group-flush">
                        {this.state.los_oficiales.map((examen_oficial, i) => (
                          <ExamenesOficialesAreaWExamenesOficialesSection
                            changeExamenesOficialesSelected={
                              this.changeExamenesOficialesSelected
                            }
                            examen_oficial={examen_oficial}
                            examenes_oficiales_selected={
                              this.state.examenes_oficiales_selected
                            }
                            key={i}
                          />
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
              <div className="row mt-2  mt-sm-2">
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
                  <div className="col-12 col-md-6 align-self-end  mt-sm-2">
                    <a
                      title="Solo puedes hacer los tests de simulacros y oficiales si estas suscrito"
                      className="btn mx-auto mr-md-0 ml-md-auto primary-button"
                    >
                      <i className="icon-speech"></i>Hacer Test
                    </a>
                  </div>
                )}

                {new Date().getTime() / 1000 <
                  localStorage.getItem("penitenciarios_mds") && (
                  <div className="col-12 col-md-6 align-self-end  mt-sm-2">
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

export default TestPorOficiales;
