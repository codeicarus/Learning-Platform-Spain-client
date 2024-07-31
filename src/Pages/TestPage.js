import React, { Component, PropTypes } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import "../Includes/viewSchema.css";
import "./modalSchema.css";
import nl2br from "react-nl2br";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import NumberFormat from "react-number-format";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ReactGA from "react-ga";
import EditarPreguntaDialog from "../Includes/EditarPreguntaDialog";
import CloseIcon from "@material-ui/icons/Close";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
import { FaAngleDown } from "react-icons/fa";
import TestInfo from "./TestInfo";
import TestInPause from "../Includes/TestPause";
import { TfiNewWindow } from "react-icons/tfi";
import Carousel from "react-bootstrap/Carousel";

class TestPage extends Component {
  intervalID = 0;

  state = {
    timePause: false,
    continueView: 0,
    loader: false,
    id_pregunta_edit: null,
    redirect_to_login: false,
    view_render: false,
    historial: null,
    preguntas: [],
    blancas_por_area: [],
    falladas_por_area: [],
    temas_a_enviar: [],
    nivel_establecido: "",
    open_for_edit: "",
    mensaje_nivel: "",
    open_save_simulacro: false,
    preguntas_ant: [],
    open: false,
    final_test_nivel: false,
    open_fin_tiempo: false,
    avisado_fin_tiempo: false,
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
    submited_nombre_simulacro: false,
    submited_hay_error: false,
    submited_hay_duda: false,
    detalles_hay_error: "",
    nombre_simulacro: "",
    detalles_hay_duda: "",
    errors: {
      detalles_hay_error: "Debes rellenar los detalles",
      detalles_hay_duda: "Debes rellenar los detalles",
      nombre_simulacro: "Debes rellenar el nombre",
    },
    niveles: [],
    schemas: [],
    viewSchemas: false,
    simulacroNivel: "5ea6ad3dbb5c000045007637", //Basico por defecto
    heightValue: 20,
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
  closeFinTiempo = () => this.setState({ open_fin_tiempo: false });
  close_simulacro = () =>
    this.setState({
      open_save_simulacro: false,
      submited_nombre_simulacro: false,
    });
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
      case "nombre_simulacro":
        errors.nombre_simulacro =
          value.length < 1 ? "Debes rellenar el nombre" : "";
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
    this.xd = this.props;
    // this.state2 = {
    //   context: [],
    //   chat: [],
    // };
    // this.carga = false,
    // this.botLoad = {
    //   estado: false,
    // };
  }

  componentDidMount() {
    this.getNiveles();
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

  componentWillMount() {
    // When this component mounts, begin listening for scroll changes
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    // If this component is unmounted, stop listening
    window.removeEventListener("scroll", this.handleScroll);
    clearInterval(this.intervalID);
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
    this.setState(
      {
        loader: true,
      },
      () => {
        axios
          .post(
            process.env.REACT_APP_URL_API + `preguntas/` + this.state.idTest,
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
                loader: false,
                respuestas_marcadas: res.data.respuestas_marcadas,
                preguntas: res.data.preguntas,
                historial: res.data.historial,
                tiempo: res.data.historial.tiempo_transcurrido,
              },
              () => this.getCheckSiYaEstabaTermiando()
            );
          })
          .catch((error) => {
            this.setState({
              loader: false,
            });
            if (error.response) {
              toast.error(error.response.data.error);
            }
          });
      }
    );
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
        process.env.REACT_APP_URL_API + `corregir_pregunta`,
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
    this.setState(
      {
        loader: true,
      },
      () => {
        axios
          .post(
            process.env.REACT_APP_URL_API + `corregir_pregunta_ya_contestada`,
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
              loader: false,
              respuestas_marcadas_correctas: arrayActual,
              preguntas_completas: arrayActualPreguntaCompletas,
            });
          })
          .catch((error) => {
            this.setState({
              loader: false,
            });
            if (error.response) {
              toast.error(error.response.data.error);
            }
          });
      }
    );
  }

  async setPreguntaContestada(id_pregunta, id_respuesta) {
    axios
      .post(
        process.env.REACT_APP_URL_API + `corregir_pregunta`,
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
        process.env.REACT_APP_URL_API + `cambiar_tiempo_transcurrido`,
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

  closeFinalTestNivel() {
    this.setState({ final_test_nivel: false });
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
          process.env.REACT_APP_URL_API + `hay_error`,
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

  async goCrearSimulacro() {
    this.setState({ submited_nombre_simulacro: true });
    if (this.state.errors.nombre_simulacro != "") {
    } else {
      this.setState(
        {
          loader: true,
        },
        () => {
          axios
            .post(
              process.env.REACT_APP_URL_API + `guardar_como_simulacro`,
              {
                id_test: this.state.idTest,
                nombre_simulacro: this.state.nombre_simulacro,
                email: localStorage.getItem("email_penitenciarios"),
                id_nivel: this.state.simulacroNivel,
              },
              {
                headers: {
                  authorization: localStorage.getItem("token_penitenciarios"),
                },
              }
            )
            .then((res) => {
              this.setState({ loader: false });
              toast.success("Simulacro creado correctamente");
              this.close_simulacro();
            })
            .catch((error) => {
              this.setState({ loader: false });
              if (error.response) {
                toast.error(error.response.data.error);
              }
            });
        }
      );
    }
  }

  async goTieneDuda() {
    this.setState({ submited_hay_duda: true });
    if (this.state.errors.detalles_hay_duda != "") {
    } else {
      this.setState(
        {
          loader: true,
        },
        () => {
          axios
            .post(
              process.env.REACT_APP_URL_API + `tiene_duda`,
              {
                id_pregunta: this.state.id_pregunta_tiene_duda,
                detalles: this.state.detalles_hay_duda,
                email: localStorage.getItem("email_penitenciarios"),
              },
              {
                headers: {
                  authorization: localStorage.getItem("token_penitenciarios"),
                },
              }
            )
            .then((res) => {
              this.setState({ loader: false });
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
              this.setState({ loader: false });
              if (error.response) {
                toast.error(error.response.data.error);
              }
            });
        }
      );
    }
  }

  async goCheckTest() {
    this.setState(
      {
        loader: true,
      },
      () => {
        var obj_respuestas = {};

        Object.entries(this.state.respuestas_marcadas).map(([k, v]) => {
          Reflect.set(obj_respuestas, k, v);
        });

        axios
          .post(
            process.env.REACT_APP_URL_API + `corregir_test`,
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
            // console.log(res.data);
            let preguntas = JSON.parse(res.data.preguntas);
            let respuestas_correctas = JSON.parse(
              res.data.respuestas_correctas
            );

            let arrayActual = this.state.respuestas_marcadas_correctas;
            Object.entries(respuestas_correctas).map(([k, v]) => {
              arrayActual[k] = v.id;
            });
            let arrayActualPreguntaCompletas = this.state.preguntas_completas;
            Object.entries(preguntas).map(([k, v]) => {
              arrayActualPreguntaCompletas[k] = v;
            });
            this.setState({
              loader: false,
              open: false,
              open_fin_tiempo: false,
              nivel_establecido: res.data.nivel,
              examen_para_corregir: true,
              respuestas_marcadas_correctas: arrayActual,
              preguntas_completas: arrayActualPreguntaCompletas,
            });
            if (this.state.historial.tipo == "Test de nivel") {
              this.setState({
                final_test_nivel: true,
                mensaje_nivel:
                  "Tu nivel asignado es: '<b>" + res.data.nivel + "</b>'",
              });
            }
            if (
              this.state.historial.tipo == "Test simulacros" ||
              this.state.historial.tipo == "Test oficiales"
            ) {
              this.setState({
                blancas_por_area: JSON.parse(res.data.blancas_por_area),
                falladas_por_area: JSON.parse(res.data.falladas_por_area),
                temas_a_enviar: JSON.parse(res.data.temas_a_enviar),
              });
            }

            window["scrollToTop"]();
          })
          .catch((error) => {
            this.setState({
              loader: false,
              open: false,
            });
            if (error.response) {
              toast.error(error.response.data.error);
            }
          });
      }
    );
  }

  async getPreguntaEstrella() {
    axios
      .post(
        process.env.REACT_APP_URL_API + `get_preguntas_favoritas`,
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
        process.env.REACT_APP_URL_API + `set_preguntas_favoritas`,
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

  async deletePreguntaEstrella(id_pregunta) {
    axios
      .post(
        process.env.REACT_APP_URL_API + `delete_preguntas_favoritas`,
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

  getSinContestarIcon() {
    const classes = makeStyles((theme) => ({
      fab: {
        margin: theme.spacing(2),
      },
      absolute: {
        position: "absolute",
        bottom: theme.spacing(2),
        right: theme.spacing(3),
      },
    }));

    const array_marcadas = [];
    Object.entries(this.state.respuestas_marcadas).map(([k, v]) => {
      array_marcadas.push(k);
    });

    return (
      <div className="div_blancas">
        <IconButton className={classes.margin} size="small">
          <FaAngleDown fontSize="inherit" />
        </IconButton>
        <div className="preguntas">
          {Object.entries(this.state.preguntas).map(([k, pregunta]) => {
            if (!array_marcadas.includes(pregunta.id)) {
              return (
                <a
                  key={k}
                  className="smooth-anchor-pregunta"
                  href={"#la_pregunta" + k}
                >
                  Pregunta {parseInt(k) + 1}
                </a>
              );
            }
          })}
        </div>
      </div>
    );
  }

  getTitleFalladas() {
    if (
      this.state.historial.tipo == "Test simulacros" ||
      this.state.historial.tipo == "Test oficiales"
    ) {
      const classes = makeStyles((theme) => ({
        fab: {
          margin: theme.spacing(2),
        },
        absolute: {
          position: "absolute",
          bottom: theme.spacing(2),
          right: theme.spacing(3),
        },
      }));
      let texto = "";
      for (var key in this.state.temas_a_enviar) {
        texto +=
          "<b>" +
          this.state.temas_a_enviar[key] +
          "</b> " +
          this.state.falladas_por_area[key] +
          " preguntas<br>";
      }
      return (
        <IconButton className={classes.margin} title={texto} size="small">
          <FaAngleDown fontSize="inherit" />
        </IconButton>
      );
    }
  }

  getTitleBlancas() {
    if (
      this.state.historial.tipo == "Test simulacros" ||
      this.state.historial.tipo == "Test oficiales"
    ) {
      const classes = makeStyles((theme) => ({
        fab: {
          margin: theme.spacing(2),
        },
        absolute: {
          position: "absolute",
          bottom: theme.spacing(2),
          right: theme.spacing(3),
        },
      }));
      let texto = "";
      for (var key in this.state.temas_a_enviar) {
        texto +=
          "<b>" +
          this.state.temas_a_enviar[key] +
          "</b> " +
          this.state.blancas_por_area[key] +
          " preguntas<br>";
      }
      return (
        <IconButton className={classes.margin} title={texto} size="small">
          <FaAngleDown fontSize="inherit" />
        </IconButton>
      );
    }
  }

  async goCheckTestYaContestado() {
    this.setState(
      {
        loader: true,
      },
      () => {
        var obj_respuestas = {};

        Object.entries(this.state.respuestas_marcadas).map(([k, v]) => {
          Reflect.set(obj_respuestas, k, v);
        });

        axios
          .post(
            process.env.REACT_APP_URL_API + `corregir_test_ya_contestado`,
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
            let respuestas_correctas = JSON.parse(
              res.data.respuestas_correctas
            );

            let arrayActual = this.state.respuestas_marcadas_correctas;
            Object.entries(respuestas_correctas).map(([k, v]) => {
              arrayActual[k] = v.id;
            });
            let arrayActualPreguntaCompletas = this.state.preguntas_completas;
            Object.entries(preguntas).map(([k, v]) => {
              arrayActualPreguntaCompletas[k] = v;
            });

            this.setState({
              loader: false,
              examen_para_corregir: true,
              respuestas_marcadas_correctas: arrayActual,
              preguntas_completas: arrayActualPreguntaCompletas,
            });
            if (
              this.state.historial.tipo == "Test simulacros" ||
              this.state.historial.tipo == "Test oficiales"
            ) {
              this.setState({
                blancas_por_area: JSON.parse(res.data.blancas_por_area),
                falladas_por_area: JSON.parse(res.data.falladas_por_area),
                temas_a_enviar: JSON.parse(res.data.temas_a_enviar),
              });
            }

            window["scrollToTop"]();
          })
          .catch((error) => {
            // console.log(error);
            clearInterval(this.intervalID);
            if (error.response) {
              if (error.response.data.error == "not found") {
                this.setState({ loader: false, open: false });
                return toast.error(
                  "Algunas preguntas fueron eliminadas y/o actualizadas"
                );
              }
              toast.error(error.response.data.error);
            }
          });
      }
    );
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
  renderSolucion = (pregunta, context) => {
    let id_pregunta = pregunta.id;
    if (
      (this.state.respuestas_marcadas_correctas[id_pregunta] !== undefined &&
        this.state.respuestas_marcadas[id_pregunta] !== undefined &&
        this.state.historial.respuesta_automatica) ||
      this.state.examen_para_corregir
    ) {
      let explicacion_a_poner = "";
      if (
        this.state.preguntas_completas[id_pregunta].explicacion.indexOf(
          "<br"
        ) == -1 &&
        this.state.preguntas_completas[id_pregunta].explicacion.indexOf("<p") ==
          -1
      ) {
        explicacion_a_poner = this.state.preguntas_completas[
          id_pregunta
        ].explicacion.replace(/\n/g, "<br />");
      } else {
        explicacion_a_poner =
          this.state.preguntas_completas[id_pregunta].explicacion;
      }
      if (
        this.state.respuestas_marcadas_correctas[id_pregunta] ==
        this.state.respuestas_marcadas[id_pregunta]
      ) {
        return (
          <div className="solucion solucion_correcta">
            {this.renderPreguntaOficial(pregunta)}
            <div
              className="contenedor_html_preguntas_respuestas"
              dangerouslySetInnerHTML={{ __html: explicacion_a_poner }}
            ></div>
            <div className="botones_dudas d-flex align-items-center">
              {/*
                        <a className="link_btn" onClick={() => this.tieneDuda(id_pregunta)}>Alguna duda</a>
                            * */}
              <a
                className="link_btn botones_dudas_buton"
                onClick={() => this.hayError(id_pregunta)}
              >
                Algún error
              </a>
              {pregunta.schema?.length > 0 ? (
                <button
                  className="link_btn boton_ver_esquema"
                  style={{
                    border: "1px solid #000000bf",
                    fontSize: "12px",
                    padding: "5px 10px",
                  }}
                  onClick={() =>
                    this.setState({
                      viewSchemas: true,
                      schemas: pregunta.schema,
                    })
                  }
                >
                  Ver Esquema
                </button>
              ) : null}
              <a
                className="link_btn"
                onClick={() =>
                  // this.getGPT(
                  //   id_pregunta,
                  //   this.state.respuestas_marcadas[id_pregunta],
                  //   context
                  // )
                  console.log("asdasdasd")
                }
              >
                Consultar a GPT
              </a>
            </div>
          </div>
        );
      } else {
        return (
          <div className="solucion solucion_incorrecta">
            {this.renderPreguntaOficial(pregunta)}
            <div
              className="contenedor_html_preguntas_respuestas"
              dangerouslySetInnerHTML={{ __html: explicacion_a_poner }}
            ></div>

            <div className="botones_dudas">
              {/*
                        <a className="link_btn" onClick={() => this.tieneDuda(id_pregunta)}>Alguna duda</a>
                            * */}
              <a
                className="link_btn botones_dudas_buton"
                onClick={() => this.hayError(id_pregunta)}
              >
                Algún error
              </a>
              {pregunta.schema?.length > 0 ? (
                <button
                  className="link_btn boton_ver_esquema"
                  style={{
                    border: "1px solid #000000bf",
                    fontSize: "12px",
                    padding: "5px 10px",
                  }}
                  onClick={() =>
                    this.setState({
                      viewSchemas: true,
                      schemas: pregunta.schema,
                    })
                  }
                >
                  Ver Esquema
                </button>
              ) : null}
              <a
                className="link_btn button_preguntar_gpt"
                onClick={() =>
                  this.getGPT(
                    id_pregunta,
                    this.state.respuestas_marcadas[id_pregunta],
                    this.state.respuestas_marcadas_correctas[id_pregunta],
                    context
                  )
                }
              >
                Consultar a GPT
              </a>
            </div>
          </div>
        );
      }
    }
  };

  setStateErr = (newState) => {
    this.error = newState.error;
    this.id_pregunta_hay_error = newState.id_pregunta_hay_error;
  };

  setCargaEstado = (newEstado) => {
    this.carga.estado = newEstado.estado;
    this.forceUpdate();
  };

  setState2Msg = (newState) => {
    this.state2.chat = [...this.state2.chat, ...newState];
    this.forceUpdate();
  };

  setBotLoad = (newEstado) => {
    this.botLoad.estado = newEstado.estado;
    this.forceUpdate();
  };

  async getGPT(pregunta, respuesta, context) {
    try {
      this.setCargaEstado({ estado: true });
      const { data } = await axios.post(
        process.env.REACT_APP_URL_API + "info_gpt",
        {
          context: context,
          preguntaID: pregunta,
          respuestaID: respuesta,
        },
        {
          headers: {
            authorization: localStorage.getItem("token_penitenciarios"),
          },
        }
      );
        // console.log(data)
      const { Contexto, response } = data;

      this.state2.context = Contexto;
      this.state2.chat = [...this.state2.chat, JSON.parse(response).response];

      this.setState2Msg([...this.state2.chat, JSON.parse(response).response]);
      this.setCargaEstado({ estado: false });

      console.log(Contexto);
    } catch (error) {
      console.log(error.message)
    }
  }

  async continueGPT(context, id) {
    let input = document.getElementById(`chat_GPT_${id}`);
    this.setState2Msg([input.value]);
    this.setBotLoad({ estado: true });
    // console.log(context.chat);
    input.value = "";
    let result = [];
    for (let i = 0; i < context.chat.length; i++) {
      if (context.context[i] !== undefined) result.push(context.context[i]);
      if (context.chat[i] !== undefined) result.push(context.chat[i]);
    }

    try {
      const { data } = await axios.post(
        process.env.REACT_APP_URL_API + "continue_gpt",
        {
          context: result,
        },
        {
          headers: {
            authorization: localStorage.getItem("token_penitenciarios"),
          },
        }
      );

      if (JSON.parse(data).response.length === 0) {
        // console.log("SIN RESPUESTA");
        this.setState2Msg(["Ocurrio un error, intente de nuevo"]);
        this.setBotLoad({ estado: false });
      } else {
        this.setState2Msg([JSON.parse(data).response]);
        this.setBotLoad({ estado: false });
      }
    } catch (error) {}
  }

  chatGPT() {
    let id = Math.round(Math.random() * 1000);
    return (
      <div className="chat_gpt">
        <div className="chat_gpt_msg">
          {this.state2.chat.map((chat, index) => {
            let classes_a_poner = "";
            if (index === 0) {
              classes_a_poner = "botMessage";
            } else if (index % 2 === 0) {
              classes_a_poner = "botMessage";
            } else {
              classes_a_poner = "userMessage";
            }
            return (
              <div
                className="message_Bot"
                key={index}
                style={
                  classes_a_poner === "userMessage"
                    ? { "justify-content": "right" }
                    : null
                }
              >
                {classes_a_poner === "botMessage" && (
                  <img
                    src="/assets/images/botProfile.jpg"
                    className="bot_icon"
                  />
                )}
                <div
                  className={classes_a_poner}
                  dangerouslySetInnerHTML={{
                    __html: `<p style="font-size: 13px">${chat}</p>`,
                  }}
                ></div>
              </div>
            );
          })}
          {this.botLoad.estado && (
            <div className="botMessage_Load">
              <img src="/assets/images/Load.svg" alt="load_chat" />
            </div>
          )}
        </div>
        <div className="input_chat">
          <input
            disabled={this.botLoad.estado}
            type="text"
            id={`chat_GPT_${id}`}
            className="form-control"
          />
          <button
            disabled={this.botLoad.estado}
            onClick={() => this.continueGPT(this.state2, id)}
          >
            Enviar
          </button>
        </div>
      </div>
    );
  }

  pauseTimeTest() {
    if (!this.state.timePause) {
      this.setState({ continueView: window.scrollY, timePause: true });
      window.scrollTo(0, 0);
      clearInterval(this.intervalID);
    } else {
      window.scrollTo(0, this.state.continueView);
      this.setState({ timePause: false });
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
            {/* <buton
              className="btn btn-primary pause-test"
              onClick={() => this.pauseTimeTest()}
            >
              {this.state.timePause ? "Continuar" : "Pausar"}
            </buton> */}

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
                  {this.getSinContestarIcon()}
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
                {this.getTitleFalladas()}
              </div>
              <div className="col-2 col-md-2 col-lg-2 item">
                <div className="numero_grande numero_amarillo">
                  <span>{this.getSinContestar()}</span>
                </div>
                <h4>En blanco</h4>
                {this.getTitleBlancas()}
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

  renderPreguntaOficial = (pregunta) => {
    if (this.state.examen_para_corregir && pregunta.oficial) {
      return (
        <i
          className="la la-award simbolo_oficial"
          title={"Pregunta del examen oficial del " + pregunta.anio_oficial}
        ></i>
      );
    } else {
      return "";
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

  openPreguntaEditar(id) {
    this.setState({
      id_pregunta_edit: id,
    });
  }

  closePreguntaEditar = () => {
    this.setState({
      id_pregunta_edit: null,
      formIdPregunta: "",
    });
  };

  renderSuper(thisComponent, pregunta) {
    if (
      localStorage.getItem("email_penitenciarios") ===
        "Infopulbong@gmail.com" ||
      localStorage.getItem("email_penitenciarios") === "avilmor2@gmail.com" ||
      localStorage.getItem("email_penitenciarios") === "nanitadr18@gmail.com" ||
      localStorage.getItem("email_penitenciarios") === "toledof764@gmail.com"
    ) {
      return (
        <div>
          <a
            className="btn btn-warning"
            style={{ color: "black" }}
            onClick={() => {
              thisComponent.setState({
                id_pregunta_edit: pregunta.id,
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

  async getNiveles() {
    axios
      .get(process.env.REACT_APP_URL_API + `niveles`, {
        headers: {
          authorization: localStorage.getItem("token_penitenciarios"),
        },
      })
      .then((res) => {
        this.setState({ niveles: res.data });
      })
      .catch((error) => {});
  }

  renderBtnSimulacro() {
    if (
      localStorage.getItem("email_penitenciarios") ===
        "Infopulbong@gmail.com" ||
      localStorage.getItem("email_penitenciarios") === "avilmor2@gmail.com" ||
      localStorage.getItem("email_penitenciarios") === "toledof764@gmail.com"
    ) {
      return (
        <a
          className="btn mx-auto mr-md-0 ml-md-auto btn-warning"
          style={{ color: "black", float: "left" }}
          onClick={() => {
            this.setState({
              open_save_simulacro: true,
              nombre_simulacro: "",
            });
          }}
        >
          Crear simulacro
        </a>
      );
    } else {
      return "";
    }
  }

  // changeNivelSimulacro(e){
  //   this.setState({simulacroNivel: e.target.value})

  // }

  openSchemaPage(url) {
    window.open(url, "_blank");
  }

  viewSchema() {
    document.querySelector("html").style.overflow = "hidden";
    return (
      <div className="viewSchema">
        <div className="modal_schema">
          <Link to="/" className="logo_modal">
            <img src="/assets/images/logo.png" />
          </Link>
          <button
            onClick={() => this.closeSchema()}
            className="button_close"
            id="close"
          >
            Cerrar
          </button>
          <Carousel className="h-100" interval={99999}>
            {this.state.schemas.map((schema) => {
              const ext = schema.filepath.split(".").pop();
              if (ext == "pdf") {
                return (
                  <Carousel.Item style={{ height: "90%" }}>
                    {schema.pagelink.length > 0 && (
                      <span
                        className="open_page_schema schema_test"
                        title="Ver pagina de esquema"
                      >
                        <label
                          onClick={() => this.openSchemaPage(schema.pagelink)}
                        >
                          <TfiNewWindow size={20} />
                        </label>
                      </span>
                    )}
                    <div className="container-pdf-schema">
                      <iframe
                        src={schema.filepath + "#toolbar=0"}
                        id="pdf-view"
                        height={"100%"}
                        frameborder="0"
                      ></iframe>
                    </div>
                  </Carousel.Item>
                );
              } else {
                return (
                  <Carousel.Item
                    style={{ textAlign: "center ", height: "87%" }}
                  >
                    {schema.pagelink.length > 0 && (
                      <span
                        className="open_page_schema schema_test"
                        title="Ver pagina de esquema"
                      >
                        <label
                          onClick={() => this.openSchemaPage(schema.pagelink)}
                        >
                          <TfiNewWindow size={20} />
                        </label>
                      </span>
                    )}
                    <div className="container-img-schema">
                      {/* <img id="img-view" src={schema.filepath} /> */}
                      <span
                        id="img-view"
                        style={{ backgroundImage: `url(${schema.filepath})` }}
                      ></span>
                    </div>
                  </Carousel.Item>
                );
              }
            })}
          </Carousel>
        </div>
      </div>
    );
  }

  closeSchema() {
    document.querySelector("html").style.overflow = "visible";
    this.setState({ viewSchemas: false, schemas: [] });
  }

  render() {
    let thisComponent = this;
    const { errors } = this.state;
    const { submited_nombre_simulacro } = this.state;
    const { submited_hay_error } = this.state;
    const { submited_hay_duda } = this.state;

    if (this.state.view_render) {
      return (
        <div>
          {this.state.viewSchemas && this.viewSchema()}
          {thisComponent.state.loader && <div className="loader_examen"></div>}
          <section className="colores_intercambiados p-0 for_tamano_header"></section>
          <div className={thisComponent.classNameStickyHeader()}>
            {this.renderTools()}
          </div>

          <section className="colores_intercambiados p-0 for_tamano_tools"></section>

          {/* return (
             <TestInfo
               props={thisComponent}
               data={i}
               pregunta={pregunta}
               key={i}
             />
           ); */}
          {this.state.timePause ? (
            <TestInPause />
          ) : (
            this.state.preguntas.map(function (pregunta, i) {
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

              let pregunta_a_poner = "";
              if (
                pregunta.pregunta.indexOf("<br") == -1 &&
                pregunta.pregunta.indexOf("<p") == -1
              ) {
                pregunta_a_poner = pregunta.pregunta.replace(/\n/g, "<br />");
              } else {
                pregunta_a_poner = pregunta.pregunta;
              }
              return (
                <section
                  id={"la_pregunta" + i}
                  className={classes_a_poner}
                  key={i}
                >
                  <div
                    style={{ paddingLeft: "25px", paddingRight: "25px" }}
                    className="container"
                  >
                    <div className="row intro">
                      <div className="col-12 col-md-12 align-self-center text-left pt-5">
                        {new Date().getTime() / 1000 >=
                          localStorage.getItem("penitenciarios_mds") &&
                          i == 0 &&
                          thisComponent.state.historial.terminado && (
                            <div className="mensaje_capado mb-5">
                              <p>Para poder hacer mas test suscribete</p>
                              <Link
                                to="/suscribete"
                                className="btn mx-auto primary-button"
                              >
                                <i className="icon-speech"></i>!Suscribete¡
                              </Link>
                            </div>
                          )}

                        <div className="p_pregunta">
                          {thisComponent.renderPreguntaEstrella(pregunta.id)}
                          <div
                            className="contenedor_html_preguntas_respuestas contenedor_html_preguntas"
                            dangerouslySetInnerHTML={{
                              __html:
                                "<b style='float:left;margin-right: 5px;'>" +
                                (i + 1) +
                                ". </b>" +
                                pregunta_a_poner,
                            }}
                          ></div>
                        </div>
                        <ul className="list-group list-group-flush">
                          {pregunta.respuestas?.map(function (respuesta, i) {
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
                            let respuesta_a_poner = "";
                            if (
                              respuesta.respuesta.indexOf("<br") == -1 &&
                              respuesta.respuesta.indexOf("<p") == -1
                            ) {
                              respuesta_a_poner = respuesta.respuesta.replace(
                                /\n/g,
                                "<br />"
                              );
                            } else {
                              respuesta_a_poner = respuesta.respuesta;
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
                                  style={{ float: "left" }}
                                  className={thisComponent.classNameMarcarRespuestas(
                                    pregunta.id,
                                    respuesta.id
                                  )}
                                ></i>
                                <span
                                  className="contenedor_html_preguntas_respuestas"
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      "<b style='float:left;margin-right: 5px;'>" +
                                      letter +
                                      ". </b>" +
                                      respuesta_a_poner,
                                  }}
                                ></span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                      {/* {thisComponent.renderSolucion(pregunta)} */}
                      <TestInfo
                        props={thisComponent}
                        data={i}
                        pregunta={pregunta}
                        key={i}
                      />
                      {/* {thisComponent.carga ? (
              <div className="loader_chat">
                <img src="/assets/images/Load.svg" alt="load_chat" />
              </div>
            ) : null}
            {thisComponent.state2.chat.length != 0 && this.chatGPT()}*/}
                    </div> 

                    {thisComponent.renderSuper(thisComponent, pregunta)}
                  </div>
                </section>
              );
            })
          )}

          {!this.state.timePause && !this.state.examen_para_corregir && (
            <div className="container">
              <div className="row mt-5 mb-5 pt-5 pb-5">
                <div className="col-12 col-md-12 align-self-end">
                  {this.renderBtnSimulacro()}

                  <a
                    onClick={() => this.checkPreguntasSinContestar()}
                    className="btn mx-auto mr-md-0 ml-md-auto primary-button"
                  >
                    <i className="icon-speech"></i> Corregir test
                  </a>
                </div>
              </div>
            </div>
          )}
          <Dialog
            open={this.state.open_save_simulacro}
            onClose={() => this.close_simulacro()}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Guardar para simulacro
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <div
                  className="row"
                  style={{
                    width: "500px",
                  }}
                >
                  <div className="col-12 input-group p-0">
                    <label>Nombre</label>
                  </div>
                  <div className="col-12 input-group p-0">
                    <input
                      type="text"
                      onChange={this.changeFields}
                      name="nombre_simulacro"
                      className="form-control"
                      required=""
                    ></input>
                  </div>
                  {errors.nombre_simulacro.length > 0 &&
                    submited_nombre_simulacro && (
                      <span className="error-form">
                        {errors.nombre_simulacro}
                      </span>
                    )}
                </div>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  gap: "10px",
                  justifyContent: "center",
                }}
              >
                <select
                  style={{ width: "57%" }}
                  onChange={(e) =>
                    this.setState({ simulacroNivel: e.target.value })
                  }
                >
                  {thisComponent.state.niveles &&
                    thisComponent.state.niveles.map((nivel, i) => (
                      <option key={i} value={nivel.id}>
                        {nivel.name}
                      </option>
                    ))}
                </select>
                <div
                  style={{
                    width: "35%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    className="btn btn-primary"
                    onClick={() => this.close_simulacro()}
                    color="primary"
                  >
                    Cancelar
                  </Button>
                  <Button
                    className="btn btn-primary"
                    onClick={() => this.goCrearSimulacro()}
                    color="primary"
                    autoFocus
                  >
                    Aceptar
                  </Button>
                </div>
              </div>
            </DialogActions>
          </Dialog>
          <Dialog
            open={this.state.open}
            onClose={() => this.close()}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Atención</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Aun tienes preguntas {this.state.preguntas_sin_contestar}{" "}
                preguntas sin contestar ¿Quieres continuar?
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
            open={this.state.open_fin_tiempo}
            onClose={() => this.closeFinTiempo()}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              <AccessAlarmIcon /> El tiempo ha finalizado
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Se ha acabado el tiempo del examen ¿Quieres continuar o quieres
                corregir el examen?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                className="btn btn-primary"
                onClick={() => this.closeFinTiempo()}
                color="primary"
              >
                Continuar
              </Button>
              <Button
                className="btn btn-primary"
                onClick={() => this.goCheckTest()}
                color="primary"
                autoFocus
              >
                Corregir
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
                Si has encontrado un error en esta pregunta detallalo en el
                siguiente campo de texto e intentaremos corregirlo lo antes
                posible.
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
            <DialogTitle id="alert-dialog-title">Tengo una duda</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Si tienes alguna duda con esta pregunta detallalo en el
                siguiente campo de texto e intentaremos date información lo
                antes posible.
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
                  {errors.detalles_hay_duda.length > 0 && submited_hay_duda && (
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
            open={this.state.final_test_nivel}
            onClose={() => this.closeFinalTestNivel()}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <DialogTitle
                style={{
                  padding: 0,
                }}
                disableTypography
              >
                <IconButton
                  style={{
                    float: "right",
                  }}
                  onClick={() => this.closeFinalTestNivel()}
                >
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              <DialogContentText
                className="contenido_sms_start"
                id="alert-dialog-description"
              >
                <div
                  style={{
                    clear: "both",
                  }}
                  className="content_start"
                >
                  <h3 className="text-center">Enhorabuena</h3>
                  <p
                    className="text-center"
                    dangerouslySetInnerHTML={{
                      __html: this.state.mensaje_nivel,
                    }}
                  ></p>
                  <img src="/assets/images/start.png" />
                  <p
                    style={{
                      color: "#5a92fa",
                    }}
                  >
                    Cree en ti mismo y el resto caerá en su lugar
                    <br />
                    <i>
                      <b>Brand Henry</b>
                    </i>
                  </p>
                  <br />
                </div>
              </DialogContentText>
            </DialogContent>
          </Dialog>

          {this.state.id_pregunta_edit != null && (
            <EditarPreguntaDialog
              id_pregunta={this.state.id_pregunta_edit}
              closePreguntaEditar={this.closePreguntaEditar}
            />
          )}
        </div>
      );
    } else {
      return <div>{this.renderRedirectToLogin()}</div>;
    }
  }
}

export default TestPage;
