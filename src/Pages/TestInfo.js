import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import "./chat.css";

class TestInfo extends Component {
  constructor(props) {
    super(props);
    this.i = this.props.data;
    this.pregunta = this.props.pregunta;
    this.error = false;
    this.id_pregunta_hay_error = "";
    this.state2 = {
      context: [],
      chat: [],
    };
    this.carga = {
      estado: false,
    };
    this.botLoad = {
      estado: false,
    };
  }

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

  renderPreguntaOficial = (pregunta) => {
    this.state = this.props.props.state;

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

      const { Contexto, response } = data;
      // this.state2.context = Contexto;
      // this.state2.chat = [...this.state2.chat, JSON.parse(response).response];
      this.setState2Msg([...this.state2.chat, JSON.parse(response).response]);
      this.setCargaEstado({ estado: false });
      // console.log(Contexto);
    } catch (error) {}
  }

  hayError(id_pregunta) {
    // this.setState({ open_hay_error: true, id_pregunta_hay_error: id_pregunta });
    // this.error = true;
    // this.id_pregunta_hay_error = id_pregunta;
    this.setStateErr({ error: true, id_pregunta_hay_error: id_pregunta });
  }

  renderSolucion = (pregunta, context) => {
    let id_pregunta = pregunta.id;
    this.state = this.props.props.state;

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

  render() {
    let thisComponent = this.props.props;
    let i = this.i;
    let pregunta = this.pregunta;

    const { errors } = this.props.props.state;
    const { submited_nombre_simulacro } = this.props.props.state;
    const { submited_hay_error } = this.props.props.state;
    const { submited_hay_duda } = this.props.props.state;
    // console.log(this.props.props.state);

    let classes_a_poner = "";
    if (i === 0) {
      classes_a_poner = "colores_intercambiados featured left pb-5 pt-5";
    } else if (i % 2 === 0) {
      classes_a_poner = "colores_intercambiados featured left pb-5 pt-5";
    } else {
      classes_a_poner = "colores_intercambiados featured right pb-5 pt-5";
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
      <section id={"la_pregunta" + i} className={classes_a_poner} key={i}>
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
                {pregunta.respuestas.map(function (respuesta, i) {
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
            {this.renderSolucion(pregunta, this.state2.msj)}
            {this.carga.estado ? (
              <div className="loader_chat">
                <img src="/assets/images/Load.svg" alt="load_chat" />
              </div>
            ) : null}
            {this.state2.chat.length != 0 && this.chatGPT()}
          </div>
          {thisComponent.renderSuper(thisComponent, pregunta)}
        </div>
        <Dialog
          open={this.error}
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
                {errors.detalles_hay_error.length > 0 && submited_hay_error && (
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
      </section>
    );
  }
}

export default TestInfo;
