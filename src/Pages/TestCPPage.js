import React, { Component, PropTypes } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import nl2br from "react-nl2br";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import NumberFormat from "react-number-format";
import RichTextEditor from "react-rte";
import ReactGA from "react-ga";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
import TestInPause from "../Includes/TestPause";
import { HiQueueList } from "react-icons/hi2";
import { TfiLayoutListThumbAlt } from "react-icons/tfi";
import "./supuestosPracticos.css";

class TestCPPage extends Component {
  intervalID = 0;

  state = {
    timePause: false,
    continueView: 0,
    redirect_to_login: false,
    view_render: false,
    historial: null,
    casos_practicos: [],
    preguntas: [],
    pregunta_edit: {
      id: -1,
      pregunta: "",
      explicacion: "",
      respuestas: [],
    },
    open_for_edit: "",
    preguntas_ant: [],
    open: false,
    examen_para_corregir: false,
    sticky_tools: false,
    respuestas_marcadas: [],
    respuestas_marcadas_correctas: [],
    preguntas_completas: [],
    preguntas_favoritas: null,
    preguntas_sin_contestar: 0,
    idTest: 0,
    tiempo: 0,
    open_hay_error: false,
    open_tiene_duda: false,
    id_pregunta_hay_error: null,
    id_pregunta_tiene_duda: null,
    submited_hay_error: false,
    submited_hay_duda: false,
    detalles_hay_error: "",
    detalles_hay_duda: "",
    errors: {
      detalles_hay_error: "Debes rellenar los detalles",
      detalles_hay_duda: "Debes rellenar los detalles",
    },
    value_rich: RichTextEditor.createEmptyValue(),
    newStyleTest: false,
  };
  onChange = (value) => {
    this.setState({ value_rich: value });
    if (this.props.onChange) {
      // Send the changes up to the parent component as an HTML string.
      // This is here to demonstrate using `.toString()` but in a real app it
      // would be better to avoid generating a string on each change.
      this.props.onChange(value.toString("html"));
    }
  };
  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });
  changeFields = (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    let errors = this.state.errors;
    const validEmailRegex = RegExp(
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
    );

    this.setState({
      [name]: value,
    });

    switch (name) {
      case "detalles_hay_error":
        errors.detalles_hay_error =
          value.length < 1 ? "Debes rellenar los detalles" : "";
        break;
      case "detalles_hay_duda":
        errors.detalles_hay_duda =
          value.length < 1 ? "Debes rellenar los detalles" : "";
        break;
      default:
        break;
    }
    this.setState({ errors });
  };

  constructor(props) {
    super(props);

    // Bind the function to this component, so it has access to this.state
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALITYCS);
    ReactGA.pageview(window.location.pathname + window.location.search);
    window.scrollTo(0, 0);
    this.doCheck();

    this.setState({
      idTest: this.props.match.params.idTest,
    });

    this.intervalID = setInterval(() => {
      if (this.state.historial != null) {
        window["initCounterReact"](this.state.historial.numero_preguntas);
        if (this.state.examen_para_corregir === false) {
          this.setState({ tiempo: this.state.tiempo + 1 }, () => {
            if (this.state.tiempo % 10 == 0) {
              if (
                this.state.tiempo >=
                54 * this.state.historial.numero_preguntas
              ) {
                this.goCheckTest();
              } else {
                this.setTiempoTranscurrido();
              }
            }
          });
        }
      }
    }, 1000);
  }

  componentWillMount() {
    // When this component mounts, begin listening for scroll changes
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    // If this component is unmounted, stop listening
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll(e) {
    let lastScrollTop = 0;
    const currentScrollTop = 400;

    // Set the state of hidden depending on scroll position
    // We only change the state if it needs to be changed
    if (!this.state.sticky_tools && currentScrollTop > lastScrollTop) {
      this.setState({ sticky_tools: true });
    } else if (this.state.sticky_tools) {
      this.setState({ sticky_tools: false });
    }
    lastScrollTop = currentScrollTop;
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
          this.getTest();
          this.getPreguntaEstrella();
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

  async getTest() {
    axios
      .post(
        process.env.REACT_APP_URL_API + `preguntas_cp/` + this.state.idTest,
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
        this.setState(
          {
            respuestas_marcadas: res.data.respuestas_marcadas,
            preguntas: res.data.preguntas,
            casos_practicos: res.data.casos_practicos,
            historial: res.data.historial,
            tiempo: res.data.historial.tiempo_transcurrido,
          },
          () => this.getCheckSiYaEstabaTermiando()
        );
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.error);
        }
      });
  }

  getCheckSiYaEstabaTermiando() {
    window["initCounterReactInit"](this.state.historial.numero_preguntas);
    window.scrollTo(0, 0);
    if (this.state.historial.terminado) {
      this.goCheckTestYaContestado();
    } else {
      if (this.state.historial.respuesta_automatica) {
        Object.entries(this.state.respuestas_marcadas).map(([k, v]) => {
          this.getCorreccionRespuestaYaContestada(k, v);
        });
      }
    }
  }

  async getCorreccionRespuesta(id_pregunta, id_respuesta) {
    axios
      .post(
        process.env.REACT_APP_URL_API + `corregir_pregunta_cp`,
        {
          id_test: this.state.idTest,
          id_pregunta: id_pregunta,
          id_respuesta: id_respuesta,
          tiempo: this.state.tiempo + "",
        },
        {
          headers: {
            authorization: localStorage.getItem("token_penitenciarios"),
          },
        }
      )
      .then((res) => {
        let pregunta = JSON.parse(res.data.pregunta);
        let respuesta_correcta = JSON.parse(res.data.respuesta_correcta);
        let arrayActual = this.state.respuestas_marcadas_correctas;
        arrayActual[pregunta.id] = respuesta_correcta.id;
        let arrayActualPreguntaCompletas = this.state.preguntas_completas;
        arrayActualPreguntaCompletas[pregunta.id] = pregunta;
        this.setState({
          respuestas_marcadas_correctas: arrayActual,
          preguntas_completas: arrayActualPreguntaCompletas,
        });
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.error);
        }
      });
  }

  async getCorreccionRespuestaYaContestada(id_pregunta, id_respuesta) {
    axios
      .post(
        process.env.REACT_APP_URL_API + `corregir_pregunta_cp_ya_contestada`,
        {
          id_test: this.state.idTest,
          id_pregunta: id_pregunta,
          id_respuesta: id_respuesta,
          tiempo: this.state.tiempo + "",
        },
        {
          headers: {
            authorization: localStorage.getItem("token_penitenciarios"),
          },
        }
      )
      .then((res) => {
        let pregunta = JSON.parse(res.data.pregunta);
        let respuesta_correcta = JSON.parse(res.data.respuesta_correcta);
        let arrayActual = this.state.respuestas_marcadas_correctas;
        arrayActual[pregunta.id] = respuesta_correcta.id;
        let arrayActualPreguntaCompletas = this.state.preguntas_completas;
        arrayActualPreguntaCompletas[pregunta.id] = pregunta;
        this.setState({
          respuestas_marcadas_correctas: arrayActual,
          preguntas_completas: arrayActualPreguntaCompletas,
        });
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.error);
        }
      });
  }

  async setPreguntaContestada(id_pregunta, id_respuesta) {
    axios
      .post(
        process.env.REACT_APP_URL_API + `corregir_pregunta_cp`,
        {
          id_test: this.state.idTest,
          id_pregunta: id_pregunta,
          id_respuesta: id_respuesta,
          tiempo: this.state.tiempo + "",
        },
        {
          headers: {
            authorization: localStorage.getItem("token_penitenciarios"),
          },
        }
      )
      .then((res) => {})
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.error);
        }
      });
  }

  async setTiempoTranscurrido() {
    axios
      .post(
        process.env.REACT_APP_URL_API + `cambiar_tiempo_transcurrido_cp`,
        {
          id_test: this.state.idTest,
          tiempo: this.state.tiempo + "",
        },
        {
          headers: {
            authorization: localStorage.getItem("token_penitenciarios"),
          },
        }
      )
      .then((res) => {})
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.error);
        }
      });
  }

  checkPreguntasSinContestar(idTest) {
    let sin_contestar = 0;
    let thisComponent = this;
    this.state.preguntas.map(function (pregunta, i) {
      if (thisComponent.state.respuestas_marcadas[pregunta.id] === undefined) {
        sin_contestar++;
      }
    });
    if (sin_contestar > 0) {
      this.setState({ open: true, preguntas_sin_contestar: sin_contestar });
    } else {
      this.goCheckTest();
    }
  }

  tieneDuda(id_pregunta) {
    this.setState({
      open_tiene_duda: true,
      id_pregunta_tiene_duda: id_pregunta,
    });
  }

  closeTieneDuda() {
    this.setState({
      open_tiene_duda: false,
      id_pregunta_tiene_duda: null,
      submited_hay_duda: false,
    });
  }

  hayError(id_pregunta) {
    this.setState({ open_hay_error: true, id_pregunta_hay_error: id_pregunta });
  }

  closeHayError() {
    this.setState({
      open_hay_error: false,
      id_pregunta_hay_error: null,
      submited_hay_error: false,
    });
  }

  async goHayError() {
    this.setState({ submited_hay_error: true });
    if (this.state.errors.detalles_hay_error != "") {
    } else {
      axios
        .post(
          process.env.REACT_APP_URL_API + `hay_error_cp`,
          {
            id_pregunta: this.state.id_pregunta_hay_error,
            id_test: this.props.match.params.idTest,
            detalles: this.state.detalles_hay_error,
            email: localStorage.getItem("email_penitenciarios"),
          },
          {
            headers: {
              authorization: localStorage.getItem("token_penitenciarios"),
            },
          }
        )
        .then((res) => {
          toast.success(
            "Error enviado a la plataforma. Gracias por colaborar con nosotros"
          );
          this.setState({
            open_hay_error: false,
            id_pregunta_hay_error: false,
            submited_hay_error: false,
          });
        })
        .catch((error) => {
          if (error.response) {
            toast.error(error.response.data.error);
          }
        });
    }
  }

  async goTieneDuda() {
    this.setState({ submited_hay_duda: true });
    if (this.state.errors.detalles_tiene_duda != "") {
    } else {
      axios
        .post(
          process.env.REACT_APP_URL_API + `tiene_duda_cp`,
          {
            id_pregunta: this.state.id_pregunta_tiene_duda,
            detalles: this.state.detalle_tiene_duda,
            email: localStorage.getItem("email_penitenciarios"),
          },
          {
            headers: {
              authorization: localStorage.getItem("token_penitenciarios"),
            },
          }
        )
        .then((res) => {
          toast.success(
            "Duda enviado a la plataforma. Le contestaremos lo antes posible"
          );
          this.setState({
            open_tiene_duda: false,
            id_pregunta_tiene_duda: false,
            submited_hay_duda: false,
          });
        })
        .catch((error) => {
          if (error.response) {
            toast.error(error.response.data.error);
          }
        });
    }
  }

  async goCheckTest() {
    var obj_respuestas = {};

    Object.entries(this.state.respuestas_marcadas).map(([k, v]) => {
      Reflect.set(obj_respuestas, k, v);
    });

    axios
      .post(
        process.env.REACT_APP_URL_API + `corregir_test_cp`,
        {
          id_test: this.state.idTest,
          respuestas_marcadas: JSON.stringify(obj_respuestas),
          tiempo: this.state.tiempo,
        },
        {
          headers: {
            authorization: localStorage.getItem("token_penitenciarios"),
          },
        }
      )
      .then((res) => {
        this.setState({ open: false });

        let preguntas = JSON.parse(res.data.preguntas);
        let respuestas_correctas = JSON.parse(res.data.respuestas_correctas);

        let arrayActual = this.state.respuestas_marcadas_correctas;
        Object.entries(respuestas_correctas).map(([k, v]) => {
          arrayActual[k] = v.id;
        });
        let arrayActualPreguntaCompletas = this.state.preguntas_completas;
        Object.entries(preguntas).map(([k, v]) => {
          arrayActualPreguntaCompletas[k] = v;
        });

        this.setState({
          examen_para_corregir: true,
          respuestas_marcadas_correctas: arrayActual,
          preguntas_completas: arrayActualPreguntaCompletas,
        });

        window["scrollToTop"]();
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.error);
        }
        this.setState({ open: false });
      });
  }

  async getPreguntaEstrella() {
    axios
      .post(
        process.env.REACT_APP_URL_API + `get_preguntas_cp_favoritas`,
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
        this.setState({ preguntas_favoritas: res.data });
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.error);
        }
      });
  }

  async setPreguntaEstrella(id_pregunta) {
    axios
      .post(
        process.env.REACT_APP_URL_API + `set_preguntas_cp_favoritas`,
        {
          id_pregunta: id_pregunta,
          email: localStorage.getItem("email_penitenciarios"),
        },
        {
          headers: {
            authorization: localStorage.getItem("token_penitenciarios"),
          },
        }
      )
      .then((res) => {
        this.setState({ preguntas_favoritas: res.data });
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.error);
        }
      });
  }

  async savePregunta() {
    axios
      .post(
        process.env.REACT_APP_URL_API + `save_pregunta_cp`,
        {
          pregunta: this.state.pregunta_edit,
          email: localStorage.getItem("email_penitenciarios"),
        },
        {
          headers: {
            authorization: localStorage.getItem("token_penitenciarios"),
          },
        }
      )
      .then((res) => {
        let pregunta_a_comparar = this.state.pregunta_edit;
        let new_preguntas = [];
        this.state.preguntas.map(function (pregunta, i) {
          if (pregunta.id == pregunta_a_comparar.id) {
            pregunta.pregunta = pregunta_a_comparar.pregunta;
            pregunta.explicacion = pregunta_a_comparar.explicacion;

            let new_respuestas = [];
            let cont = 0;
            pregunta.respuestas.map(function (respuesta, i) {
              respuesta.respuesta =
                pregunta_a_comparar.respuestas[cont].respuesta;
              respuesta.correcta =
                pregunta_a_comparar.respuestas[cont].correcta;
              new_respuestas.push(respuesta);
              cont++;
            });
            pregunta.respuestas = new_respuestas;
          }
          new_preguntas.push(pregunta);
        });

        this.setState({
          preguntas: new_preguntas,
          open_for_edit: "",
          pregunta_edit: {
            id: -1,
            pregunta: "",
            explicacion: "",
            respuestas: [],
          },
        });
        toast.success("Pregunta modificada");
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.error);
        }
      });
  }

  async deletePreguntaEstrella(id_pregunta) {
    axios
      .post(
        process.env.REACT_APP_URL_API + `delete_preguntas_cp_favoritas`,
        {
          id_pregunta: id_pregunta,
          email: localStorage.getItem("email_penitenciarios"),
        },
        {
          headers: {
            authorization: localStorage.getItem("token_penitenciarios"),
          },
        }
      )
      .then((res) => {
        this.setState({ preguntas_favoritas: res.data });
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.error);
        }
      });
  }

  async goCheckTestYaContestado() {
    var obj_respuestas = {};

    Object.entries(this.state.respuestas_marcadas).map(([k, v]) => {
      Reflect.set(obj_respuestas, k, v);
    });

    axios
      .post(
        process.env.REACT_APP_URL_API + `corregir_test_cp_ya_contestado`,
        {
          id_test: this.state.idTest,
          respuestas_marcadas: JSON.stringify(obj_respuestas),
          tiempo: this.state.tiempo,
        },
        {
          headers: {
            authorization: localStorage.getItem("token_penitenciarios"),
          },
        }
      )
      .then((res) => {
        this.setState({ open: false });

        let preguntas = JSON.parse(res.data.preguntas);
        let respuestas_correctas = JSON.parse(res.data.respuestas_correctas);

        let arrayActual = this.state.respuestas_marcadas_correctas;
        Object.entries(respuestas_correctas).map(([k, v]) => {
          arrayActual[k] = v.id;
        });
        let arrayActualPreguntaCompletas = this.state.preguntas_completas;
        Object.entries(preguntas).map(([k, v]) => {
          arrayActualPreguntaCompletas[k] = v;
        });

        this.setState({
          examen_para_corregir: true,
          respuestas_marcadas_correctas: arrayActual,
          preguntas_completas: arrayActualPreguntaCompletas,
        });

        window["scrollToTop"]();
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.error);
        }
        this.setState({ open: false });
      });
  }

  pad = (str, max) => {
    str = str.toString();
    return str.length < max ? this.pad("0" + str, max) : str;
  };
  secondsToHms = (d) => {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);

    var hDisplay = h > 0 ? this.pad(h, 2) + (h == 1 ? ":" : ":") : "00:";
    var mDisplay = m > 0 ? this.pad(m, 2) + (m == 1 ? ":" : ":") : "00:";
    var sDisplay = s > 0 ? this.pad(s, 2) + (s == 1 ? "" : "") : "00";
    return hDisplay + mDisplay + sDisplay;
  };
  renderRedirectToLogin = () => {
    if (this.state.redirect_to_login) {
      return <Redirect to="/login" />;
    }
  };
  renderSolucion = (pregunta) => {
    let id_pregunta = pregunta.id;
    if (
      (this.state.respuestas_marcadas_correctas[id_pregunta] !== undefined &&
        this.state.respuestas_marcadas[id_pregunta] !== undefined &&
        this.state.historial.respuesta_automatica) ||
      this.state.examen_para_corregir
    ) {
      if (
        this.state.respuestas_marcadas_correctas[id_pregunta] ==
        this.state.respuestas_marcadas[id_pregunta]
      ) {
        return (
          <div className="solucion solucion_correcta">
            {nl2br(this.state.preguntas_completas[id_pregunta].explicacion)}
            <div className="botones_dudas">
              {/*
                        <a className="link_btn" onClick={() => this.tieneDuda(id_pregunta)}>Alguna duda</a>
                            * */}
              <a
                className="link_btn"
                onClick={() => this.hayError(id_pregunta)}
              >
                Algún error
              </a>
            </div>
          </div>
        );
      } else {
        return (
          <div className="solucion solucion_incorrecta">
            {nl2br(this.state.preguntas_completas[id_pregunta].explicacion)}
            <div className="botones_dudas">
              {/*
                        <a className="link_btn" onClick={() => this.tieneDuda(id_pregunta)}>Alguna duda</a>
                            * */}
              <a
                className="link_btn"
                onClick={() => this.hayError(id_pregunta)}
              >
                Algún error
              </a>
            </div>
          </div>
        );
      }
    }
  };

  pauseTimeTest() {
    if (!this.state.timePause) {
      this.setState({ continueView: window.scrollY, timePause: true });
      window.scrollTo(0, 0);
      clearInterval(this.intervalID);
    } else {
      this.setState({ timePause: false });
      window.scrollTo(0, this.state.continueView);
      this.intervalID = setInterval(() => {
        if (this.state.historial != null) {
          window["initCounterReact"](this.state.historial.numero_preguntas);
          if (this.state.examen_para_corregir === false) {
            this.setState({ tiempo: this.state.tiempo + 1 }, () => {
              if (this.state.tiempo % 10 == 0) {
                if (
                  this.state.tiempo >=
                  54 * this.state.historial.numero_preguntas
                ) {
                  if (!this.state.avisado_fin_tiempo) {
                    this.setState({
                      open_fin_tiempo: true,
                      avisado_fin_tiempo: true,
                    });
                  }
                } else {
                  this.setTiempoTranscurrido();
                }
              }
            });
          }
        }
      }, 1000);
    }
  }

  renderTools = () => {
    if (this.state.examen_para_corregir === false) {
      return (
        <div className="container">
          <div className="counter skills featured">
            <div
              data-aos-id="counter"
              data-aos="fade-up"
              data-aos-delay="200"
              className="row justify-content-center text-center items aos-init aos-animate"
            >
              <div className="col-4 col-md-4 col-lg-4 item item_reloj">
                <div
                  data-percent={this.state.tiempo}
                  className="radial left_tool"
                >
                  <span className="time">
                    <i
                      className={`la la-${
                        this.state.timePause ? "play" : "pause"
                      }`}
                      onClick={() => this.pauseTimeTest()}
                    ></i>
                  </span>
                </div>
                <div className="right_tool">
                  <h4>{this.secondsToHms(this.state.tiempo)}</h4>
                  <span
                    style={{
                      marginTop: "-20px",
                      position: "relative",
                      display: "block",
                    }}
                    id="tiempo_total"
                  ></span>
                </div>
              </div>
              <div className="col-4 col-md-4 col-lg-4 item">
                <div className="numero_grande left_tool">
                  <span>{this.getRespuestasMarcadas()}</span>
                </div>
                <div className="right_tool">
                  <h4>Contestadas</h4>
                </div>
              </div>
              <div className="col-4 col-md-4 col-lg-4 item">
                <div className="numero_grande left_tool">
                  <span>{this.getSinContestar()}</span>
                </div>
                <div className="right_tool">
                  <h4>Sin contestar</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container tools_finish">
          <div className="counter skills featured">
            <div
              data-aos-id="counter"
              data-aos="fade-up"
              data-aos-delay="200"
              className="row justify-content-center text-center items aos-init aos-animate"
            >
              <div className="col-4 col-md-4 col-lg-4 item item_reloj">
                <div
                  data-percent={this.state.tiempo}
                  className="radial left_tool"
                >
                  <span className="time">
                    <i className="la la-clock"></i>
                  </span>
                </div>
                <div className="right_tool">
                  <h4>{this.secondsToHms(this.state.tiempo)}</h4>
                  <span
                    style={{
                      marginTop: "-20px",
                      position: "relative",
                      display: "block",
                    }}
                    id="tiempo_total"
                  ></span>
                </div>
              </div>
              <div className="col-2 col-md-2 col-lg-2 item">
                <div className="numero_grande numero_verde">
                  <span>{this.getRespuestasAcertadas()}</span>
                </div>
                <h4>Acertadas</h4>
              </div>
              <div className="col-2 col-md-2 col-lg-2 item">
                <div className="numero_grande numero_rojo">
                  <span>{this.getRespuestasFalladas()}</span>
                </div>
                <h4>Falladas</h4>
              </div>
              <div className="col-2 col-md-2 col-lg-2 item">
                <div className="numero_grande numero_amarillo">
                  <span>{this.getSinContestar()}</span>
                </div>
                <h4>En blanco</h4>
              </div>
              <div className="col-2 col-md-2 col-lg-2 item">
                <div className="numero_grande">
                  <span>
                    <NumberFormat
                      value={this.getResultado()}
                      displayType={"text"}
                      decimalSeparator=","
                      renderText={(value) => <div>{value}</div>}
                      decimalScale="2"
                    />
                  </span>
                </div>
                <h4>Resultado</h4>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };
  getRespuestasMarcadas = () => {
    let cont_marcadas = 0;
    Object.entries(this.state.respuestas_marcadas).map(([k, v]) => {
      cont_marcadas++;
    });
    return cont_marcadas;
  };
  getRespuestasAcertadas = () => {
    let cont_acertadas = 0;
    Object.entries(this.state.respuestas_marcadas).map(([k, v]) => {
      if (this.state.respuestas_marcadas_correctas[k] === v) {
        cont_acertadas++;
      }
    });
    return cont_acertadas;
  };
  getRespuestasFalladas = () => {
    let num_preguntas = 0;
    Object.entries(this.state.preguntas).map(([k, v]) => {
      num_preguntas++;
    });

    let cont_marcadas = 0;
    Object.entries(this.state.respuestas_marcadas).map(([k, v]) => {
      cont_marcadas++;
    });

    let cont_acertadas = 0;
    Object.entries(this.state.respuestas_marcadas).map(([k, v]) => {
      if (this.state.respuestas_marcadas_correctas[k] === v) {
        cont_acertadas++;
      }
    });

    return num_preguntas - (num_preguntas - cont_marcadas) - cont_acertadas;
  };
  getSinContestar = () => {
    let cont_marcadas = 0;
    Object.entries(this.state.respuestas_marcadas).map(([k, v]) => {
      cont_marcadas++;
    });
    let num_preguntas = 0;
    Object.entries(this.state.preguntas).map(([k, v]) => {
      num_preguntas++;
    });
    return num_preguntas - cont_marcadas;
  };
  getResultado = () => {
    let num_preguntas = 0;
    Object.entries(this.state.preguntas).map(([k, v]) => {
      num_preguntas++;
    });

    let cont_marcadas = 0;
    Object.entries(this.state.respuestas_marcadas).map(([k, v]) => {
      cont_marcadas++;
    });

    let cont_acertadas = 0;
    Object.entries(this.state.respuestas_marcadas).map(([k, v]) => {
      if (this.state.respuestas_marcadas_correctas[k] === v) {
        cont_acertadas++;
      }
    });

    let falladas =
      num_preguntas - (num_preguntas - cont_marcadas) - cont_acertadas;

    const result = cont_acertadas - falladas * 0.33;
    return result < 0 ? 0 : result;
  };
  changeSelectedMarcarRespuestas = (id_pregunta, id_respuesta) => {
    if (!this.state.examen_para_corregir) {
      if (this.state.preguntas_completas[id_pregunta] === undefined) {
        let arrayActual = this.state.respuestas_marcadas;
        if (arrayActual[id_pregunta] == id_respuesta) {
          delete arrayActual[id_pregunta];
        } else {
          arrayActual[id_pregunta] = id_respuesta;
        }
        this.setState({
          respuestas_marcadas: arrayActual,
        });
        if (this.state.historial.respuesta_automatica) {
          this.getCorreccionRespuesta(id_pregunta, id_respuesta);
        } else {
          this.setPreguntaContestada(id_pregunta, id_respuesta);
        }
      }
    }
  };
  classNameMarcarRespuestas = (id_pregunta, id_respuesta) => {
    if (this.state.respuestas_marcadas[id_pregunta] === id_respuesta) {
      return "radioStyle la la-check text-right selected";
    } else {
      if (this.state.respuestas_marcadas_correctas[id_pregunta] !== undefined) {
        return "radioStyle la la-check text-right pregunta_contestada";
      } else {
        return "radioStyle la la-check text-right";
      }
    }
  };
  classNameMarcarRespuestasLi = (id_pregunta, id_respuesta) => {
    if (this.state.respuestas_marcadas[id_pregunta] === id_respuesta) {
      if (this.state.respuestas_marcadas_correctas[id_pregunta] !== undefined) {
        if (
          this.state.respuestas_marcadas_correctas[id_pregunta] === id_respuesta
        ) {
          return "list-group-item text-left contestada_correcta";
        } else {
          return "list-group-item text-left contestada_incorrecta";
        }
      } else {
        return "list-group-item text-left";
      }
    } else {
      if (this.state.respuestas_marcadas_correctas[id_pregunta] !== undefined) {
        if (
          this.state.respuestas_marcadas_correctas[id_pregunta] === id_respuesta
        ) {
          return "list-group-item text-left no_contestada_correcta";
        } else {
          return "list-group-item text-left";
        }
      } else {
        return "list-group-item text-left";
      }
    }
  };
  classNameStickyHeader = () => {
    if (this.state.sticky_tools) {
      if (this.state.examen_para_corregir) {
        return "header_tools sticky_tools never_sticky";
      } else {
        return "header_tools sticky_tools";
      }
    } else {
      if (this.state.examen_para_corregir) {
        return "header_tools sticky_tools never_sticky";
      } else {
        return "header_tools sticky_tools";
      }
    }
  };
  renderPreguntaEstrella = (id_pregunta) => {
    if (this.state.examen_para_corregir) {
      if (this.state.preguntas_favoritas != null) {
        if (this.state.preguntas_favoritas[id_pregunta] !== undefined) {
          return (
            <i
              onClick={() => this.deletePreguntaEstrella(id_pregunta)}
              className="la la-star pregunta_estrella"
              title="Quitar pregunta estrella"
            ></i>
          );
        } else {
          return (
            <i
              onClick={() => this.setPreguntaEstrella(id_pregunta)}
              className="la la-star-o pregunta_estrella"
              title='Me ha gustado esta pregunta.<i class="la la-thumbs-up" style="font-size: 20px" ></i><br> Guardarla para volver a resolverla.'
            ></i>
          );
        }
      }
    } else if (this.state.respuestas_marcadas[id_pregunta] !== undefined) {
      if (this.state.respuestas_marcadas_correctas[id_pregunta] !== undefined) {
        if (this.state.preguntas_favoritas != null) {
          if (this.state.preguntas_favoritas[id_pregunta] !== undefined) {
            return (
              <i
                onClick={() => this.deletePreguntaEstrella(id_pregunta)}
                className="la la-star pregunta_estrella"
                title="Quitar pregunta estrella"
              ></i>
            );
          } else {
            return (
              <i
                onClick={() => this.setPreguntaEstrella(id_pregunta)}
                className="la la-star-o pregunta_estrella"
                title='Me ha gustado esta pregunta.<i class="la la-thumbs-up" style="font-size: 20px" ></i><br> Guardarla para volver a resolverla.'
              ></i>
            );
          }
        }
      } else {
        return "";
      }
    }
  };
  changeEditPregunta = (e) => {
    e.preventDefault();
    let pregunta = this.state.pregunta_edit;
    if (pregunta.id == e.target.getAttribute("data-id-pregunta")) {
      if (e.target.getAttribute("data-campo") == "pregunta") {
        pregunta.pregunta = e.target.value;
      } else if (e.target.getAttribute("data-campo") == "solucion") {
        pregunta.explicacion = e.target.value;
      } else {
        if (e.target.getAttribute("data-campo") == "respuesta") {
          let new_respuestas = [];
          pregunta.respuestas.map(function (respuesta, i) {
            if (respuesta.id == e.target.getAttribute("data-id-respuesta")) {
              respuesta.respuesta = e.target.value;
            }
            new_respuestas.push(respuesta);
          });
          pregunta.respuestas = new_respuestas;
        } else if (e.target.getAttribute("data-campo") == "correcta") {
          let new_respuestas = [];
          pregunta.respuestas.map(function (respuesta, i) {
            if (respuesta.id == e.target.getAttribute("data-id-respuesta")) {
              respuesta.correcta = true;
            } else {
              respuesta.correcta = false;
            }
            new_respuestas.push(respuesta);
          });
          pregunta.respuestas = new_respuestas;
        }
      }
    }

    this.setState({
      pregunta_edit: pregunta,
    });
  };

  renderSuper(thisComponent, pregunta) {
    if (
      localStorage.getItem("email_penitenciarios") === "djkruske@gmail.com" ||
      localStorage.getItem("email_penitenciarios") === "avilmor2@gmail.com" ||
      localStorage.getItem("email_penitenciarios") === "nanitadr18@gmail.com" ||
      localStorage.getItem("email_penitenciarios") === "toledof764@gmail.com"
    ) {
      let pregunta_a_mandar = {
        id: pregunta.id,
        pregunta: pregunta.pregunta,
        explicacion: pregunta.explicacion,
        respuestas: [
          {
            id: pregunta.respuestas[0].id,
            respuesta: pregunta.respuestas[0].respuesta,
            correcta: pregunta.respuestas[0].correcta,
          },
          {
            id: pregunta.respuestas[1].id,
            respuesta: pregunta.respuestas[1].respuesta,
            correcta: pregunta.respuestas[1].correcta,
          },
          {
            id: pregunta.respuestas[2].id,
            respuesta: pregunta.respuestas[2].respuesta,
            correcta: pregunta.respuestas[2].correcta,
          },
          {
            id: pregunta.respuestas[3].id,
            respuesta: pregunta.respuestas[3].respuesta,
            correcta: pregunta.respuestas[3].correcta,
          },
        ],
      };

      return (
        <div>
          <a
            className="btn btn-warning"
            style={{ color: "black" }}
            onClick={() => {
              thisComponent.setState({
                open_for_edit: pregunta.id,
                pregunta_edit: pregunta_a_mandar,
              });
            }}
          >
            Editar pregunta
          </a>
        </div>
      );
    } else {
      return "";
    }
  }

  changeTypeStyleTest() {
    this.setState({ newStyleTest: !this.state.newStyleTest });
  }

  render() {
    let thisComponent = this;
    const { errors } = this.state;
    const { submited_hay_error } = this.state;
    const { submited_hay_duda } = this.state;
    const { newStyleTest } = this.state;

    if (this.state.view_render) {
      return (
        <div className="container_test_cp">
          <section className="colores_intercambiados p-0 for_tamano_header"></section>
          <div className={thisComponent.classNameStickyHeader()}>
            {this.renderTools()}
          </div>

          <section className="colores_intercambiados p-0 for_tamano_tools"></section>

          <div className="tipe_test">
            <HiQueueList size={35} color="#5a92fa" />
            <div class="switch-button">
              <input
                type="checkbox"
                name="switch-button"
                id="switch-label"
                className="switch-button__checkbox"
                onClick={() => this.changeTypeStyleTest()}
              />
              <label
                for="switch-label"
                className="switch-button__label"
              ></label>
            </div>
            <TfiLayoutListThumbAlt size={35} color="#5a92fa" />
          </div>
          {this.state.timePause ? (
            <TestInPause />
          ) : (
            this.state.casos_practicos.map(function (caso_practico, i) {
              if (
                caso_practico.texto.indexOf("<br") == -1 &&
                caso_practico.texto.indexOf("<p") == -1
              ) {
                caso_practico.texto = caso_practico.texto.replace(
                  /\n/g,
                  "<br />"
                );
              }

              const heigth = document.getElementById(`altura_${i}`);
              const content = document.getElementById(`practico_${i}`);
              const preguntas = document.getElementById(`preguntas_${i}`);

              if (newStyleTest) {
                if (content && preguntas && heigth) {
                  content.style.height = `${heigth.offsetHeight}px`;
                  preguntas.style.height = `${heigth.offsetHeight}px`;
                }
              } else {
                if (content && preguntas && heigth) {
                  content.style.height = `max-content`;
                  preguntas.style.height = `max-content`;
                }
              }

              // if (newStyleTest)

              let classes_a_poner = "";
              if (i === 0) {
                classes_a_poner =
                  "colores_intercambiados featured left pb-5 pt-5";
              } else if (i % 2 === 0) {
                classes_a_poner =
                  "colores_intercambiados featured left pb-5 pt-5";
              } else {
                classes_a_poner =
                  "colores_intercambiados featured right pb-5 pt-5";
              }

              return (
                <div
                  className={`featured right`}
                  style={{ maxHeight: "max-content" }}
                  key={i}
                >
                  <section className="colores_intercambiados right pb-0 pt-0">
                    <div
                      style={{ paddingLeft: "25px", paddingRight: "25px" }}
                      className="container"
                    >
                      <h3 style={{ fontSize: "2.5rem" }}>Supuesto {i + 1}</h3>
                      {!newStyleTest && (
                        <div className="marco_texto">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: caso_practico.texto,
                            }}
                          ></div>
                        </div>
                      )}
                    </div>
                  </section>
                  <div className="container practico_flex" id={`practico_${i}`}>
                    {newStyleTest && (
                      <div
                        className="marco_texto informacion_text_cp"
                        id={`altura_${i}`}
                      >
                        <div
                          dangerouslySetInnerHTML={{
                            __html: caso_practico.texto,
                          }}
                        ></div>
                      </div>
                    )}
                    <div
                      className={newStyleTest ? "preguntas_test_cp" : ""}
                      id={newStyleTest ? `preguntas_${i}` : ""}
                    >
                      {caso_practico.preguntas.map(function (pregunta, i) {
                        let classes_a_poner = "";
                        if (i === 0) {
                          classes_a_poner =
                            "colores_intercambiados featured left pb-5 pt-0";
                        } else if (i % 2 === 0) {
                          classes_a_poner =
                            "colores_intercambiados featured left pb-5 pt-5";
                        } else {
                          classes_a_poner =
                            "colores_intercambiados featured right pb-5 pt-5";
                        }

                        return (
                          <section
                            className={
                              newStyleTest
                                ? classes_a_poner
                                : "pregunta_cp colores_intercambiados featured right pb-5 pt-5"
                            }
                            // style={{ paddingTop: 0 }}
                            key={i}
                            // className={`pregunta_cp colores_intercambiados featured right pb-5 pt-5`}
                          >
                            <div
                              style={{
                                paddingLeft: "25px",
                                paddingRight: "25px",
                              }}
                              className="container"
                            >
                              <div className="row intro">
                                <div className="col-12 col-md-12 align-self-center text-left pt-0">
                                  <p className="p_pregunta">
                                    {thisComponent.renderPreguntaEstrella(
                                      pregunta.id
                                    )}
                                    <b>{i + 1}.</b> {pregunta.pregunta}
                                  </p>
                                  <ul className="list-group list-group-flush">
                                    {pregunta.respuestas.map(function (
                                      respuesta,
                                      i
                                    ) {
                                      let letter = "";
                                      if (i === 0) {
                                        letter = "A";
                                      } else if (i === 1) {
                                        letter = "B";
                                      } else if (i === 2) {
                                        letter = "C";
                                      } else if (i === 3) {
                                        letter = "D";
                                      }

                                      return (
                                        <li
                                          onClick={() =>
                                            thisComponent.changeSelectedMarcarRespuestas(
                                              pregunta.id,
                                              respuesta.id
                                            )
                                          }
                                          className={thisComponent.classNameMarcarRespuestasLi(
                                            pregunta.id,
                                            respuesta.id
                                          )}
                                          key={i}
                                        >
                                          <i
                                            className={thisComponent.classNameMarcarRespuestas(
                                              pregunta.id,
                                              respuesta.id
                                            )}
                                          ></i>
                                          <span>
                                            {" "}
                                            <b>{letter}.</b>{" "}
                                            {respuesta.respuesta}
                                          </span>
                                        </li>
                                      );
                                    })}
                                  </ul>
                                </div>
                                {thisComponent.renderSolucion(pregunta)}
                              </div>

                              {thisComponent.renderSuper(
                                thisComponent,
                                pregunta
                              )}
                            </div>
                          </section>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })
          )}

          {!this.state.timePause && (
            <div className="container">
              <div className="row mt-5 mb-5 pt-5 pb-5">
                <div className="col-12 col-md-12 align-self-end">
                  <a
                    onClick={() => this.checkPreguntasSinContestar()}
                    className="btn mx-auto mr-md-0 ml-md-auto primary-button"
                  >
                    <i className="icon-speech"></i> Corregir test
                  </a>

                  <Dialog
                    open={this.state.open}
                    onClose={() => this.close()}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">Atención</DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        Aun tienes preguntas{" "}
                        {this.state.preguntas_sin_contestar} preguntas sin
                        contestar ¿Quieres continuar?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        className="btn btn-primary"
                        onClick={() => this.close()}
                        color="primary"
                      >
                        Cancelar
                      </Button>
                      <Button
                        className="btn btn-primary"
                        onClick={() => this.goCheckTest()}
                        color="primary"
                        autoFocus
                      >
                        Aceptar
                      </Button>
                    </DialogActions>
                  </Dialog>
                  <Dialog
                    open={this.state.open_hay_error}
                    onClose={() => this.closeHayError()}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      He encontrado un error
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        Si has encontrado un error en esta pregunta detallalo en
                        el siguiente campo de texto e intentaremos corregirlo lo
                        antes posible.
                        <div className="row">
                          <div className="col-12 input-group p-0">
                            <textarea
                              onChange={this.changeFields}
                              name="detalles_hay_error"
                              className="form-control"
                              placeholder="Detalles"
                              required=""
                            ></textarea>
                          </div>
                          {errors.detalles_hay_error.length > 0 &&
                            submited_hay_error && (
                              <span className="error-form">
                                {errors.detalles_hay_error}
                              </span>
                            )}
                        </div>
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        className="btn btn-primary"
                        onClick={() => this.closeHayError()}
                        color="primary"
                      >
                        Cancelar
                      </Button>
                      <Button
                        className="btn btn-primary"
                        onClick={() => this.goHayError()}
                        color="primary"
                        autoFocus
                      >
                        Enviar
                      </Button>
                    </DialogActions>
                  </Dialog>
                  <Dialog
                    open={this.state.open_tiene_duda}
                    onClose={() => this.closeTieneDuda()}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      Tengo una duda
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        Si tienes alguna duda con esta pregunta detallalo en el
                        siguiente campo de texto e intentaremos date información
                        lo antes posible.
                        <div className="row">
                          <div className="col-12 input-group p-0">
                            <textarea
                              onChange={this.changeFields}
                              name="detalles_hay_duda"
                              className="form-control"
                              placeholder="Detalles"
                              required=""
                            ></textarea>
                          </div>
                          {errors.detalles_hay_duda.length > 0 &&
                            submited_hay_duda && (
                              <span className="error-form">
                                {errors.detalles_hay_duda}
                              </span>
                            )}
                        </div>
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        className="btn btn-primary"
                        onClick={() => this.closeTieneDuda()}
                        color="primary"
                      >
                        Cancelar
                      </Button>
                      <Button
                        className="btn btn-primary"
                        onClick={() => this.goTieneDuda()}
                        color="primary"
                        autoFocus
                      >
                        Enviar
                      </Button>
                    </DialogActions>
                  </Dialog>
                  <Dialog
                    open={
                      thisComponent.state.open_for_edit ==
                      thisComponent.state.pregunta_edit.id
                    }
                    onClose={() => {
                      thisComponent.setState({
                        open_for_edit: "",
                        pregunta_edit: {
                          id: -1,
                          pregunta: "",
                          explicacion: "",
                          respuestas: [],
                        },
                      });
                    }}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      <AccessAlarmIcon /> El tiempo ha finalizado
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        <form style={{ width: "500px" }}>
                          <label>Pregunta</label>
                          <textarea
                            data-id-pregunta={
                              thisComponent.state.pregunta_edit.id
                            }
                            data-campo="pregunta"
                            onChange={thisComponent.changeEditPregunta}
                            defaultValue={
                              thisComponent.state.pregunta_edit.pregunta
                            }
                            name={
                              "formPregunta" +
                              thisComponent.state.pregunta_edit.id
                            }
                          ></textarea>
                          {thisComponent.state.pregunta_edit.respuestas.map(
                            function (respuesta, i) {
                              let nameRespuesta =
                                "formRespuesta" + respuesta.id;
                              let nameRadio = "formRespuestaRadio";
                              let idRadio = "formRespuestaRadio" + respuesta.id;
                              return (
                                <div key={i}>
                                  <label>
                                    {respuesta.correcta && (
                                      <input
                                        data-id-pregunta={
                                          thisComponent.state.pregunta_edit.id
                                        }
                                        data-id-respuesta={respuesta.id}
                                        data-campo="correcta"
                                        onChange={
                                          thisComponent.changeEditPregunta
                                        }
                                        type="radio"
                                        name={nameRadio}
                                        id={idRadio}
                                        checked
                                      />
                                    )}
                                    {!respuesta.correcta && (
                                      <input
                                        data-id-pregunta={
                                          thisComponent.state.pregunta_edit.id
                                        }
                                        data-id-respuesta={respuesta.id}
                                        data-campo="correcta"
                                        onChange={
                                          thisComponent.changeEditPregunta
                                        }
                                        type="radio"
                                        name={nameRadio}
                                        id={idRadio}
                                      />
                                    )}
                                    Respuesta {i + 1}
                                  </label>
                                  <textarea
                                    data-id-pregunta={
                                      thisComponent.state.pregunta_edit.id
                                    }
                                    data-id-respuesta={respuesta.id}
                                    data-campo="respuesta"
                                    onChange={thisComponent.changeEditPregunta}
                                    defaultValue={respuesta.respuesta}
                                    name={nameRespuesta}
                                  ></textarea>
                                </div>
                              );
                            }
                          )}
                          <label>Solución</label>
                          <textarea
                            data-id-pregunta={
                              thisComponent.state.pregunta_edit.id
                            }
                            data-campo="solucion"
                            onChange={thisComponent.changeEditPregunta}
                            defaultValue={
                              thisComponent.state.pregunta_edit.explicacion
                            }
                            name={
                              "formSolucion" +
                              thisComponent.state.pregunta_edit.id
                            }
                          ></textarea>
                        </form>
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        className="btn btn-primary"
                        onClick={() => {
                          thisComponent.setState({
                            open_for_edit: "",
                            pregunta_edit: {
                              id: -1,
                              pregunta: "",
                              explicacion: "",
                              respuestas: [],
                            },
                          });
                        }}
                        color="primary"
                      >
                        Cancelar
                      </Button>
                      <Button
                        className="btn btn-primary"
                        onClick={() => thisComponent.savePregunta()}
                        color="primary"
                        autoFocus
                      >
                        Guardar cambios
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              </div>
            </div>
          )}
          {/* </> */}
        </div>
      );
    } else {
      return <div>{this.renderRedirectToLogin()}</div>;
    }
  }
}

export default TestCPPage;
