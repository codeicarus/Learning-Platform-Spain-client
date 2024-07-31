import React, { Component } from "react";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import axios from "axios";
import PestanaInfoUser from "../Includes/UserInfoData";
import { Grid, TextField } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import "./UserInfo.css";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import { toast } from "react-toastify";

class UserInfoDataPage extends Component {
  //   state = {
  //     data: [],
  //     loader: false,
  //     view_render: false,
  //     redirect_to_login: false,
  //   };
  state = {
    stats: {
      stats_n_examenes_simulacros_oficiales: 0,
      stats_n_examenes_temas_bloques: 0,
      stats_n_examenes_simulacros: 0,
      stats_n_examenes_oficiales: 0,
      stats_sum_nota_examenes_simulacros: 0,
      stats_sum_nota_examenes_oficiales: 0,
      stats_avg_examenes_simulacros: 0,
      stats_avg_examenes_oficiales: 0,
      stats_n_preguntas_acertadas: 0,
      stats_n_preguntas_falladas: 0,
      stats_n_preguntas_blancas: 0,
      stats_temas_mas_fallados: [],
      stats_temas_mas_fallados_oficiales: [],
      stats_temas_mas_fallados_simulacros: [],
      stats_areas_mas_fallados: [],
      stats_areas_mas_fallados_oficiales: [],
      stats_areas_mas_fallados_simulacros: [],
      stats_areas_n_preguntas: [],
      stats_areas_n_preguntas_acertadas: [],
      stats_areas_n_preguntas_falladas: [],
      tabla_relacion_temas_areas: [],
      tabla_relacion_nombre_areas: [],
      tabla_relacion_nombre_temas: [],
      tabla_relacion_nombre_temas_areas: [],
      tabla_relacion_oficiales_simulacros: [],
      tabla_relacion_casos_practicos: [],
      tabla_relacion_basicosconfundidos: [],
      tabla_relacion_legislaciones: [],
      historiales: [],
      historiales_cp: [],
      historiales_terminados: [],
      historiales_sin_terminar: [],
      stats_n_casos_practicos: 0,
      stats_sum_nota_casos_practicos: 0,
      stats_n_casos_practicos_oficiales: 0,
      stats_sum_nota_casos_practicos_oficiales: 0,
      stats_avg_casos_practicos: 0,
      stats_avg_casos_practicos_oficiales: 0,
    },
    loader: false,
    usuario: {},
    view_render: false,
    redirect_to_login: false,
    notify: false,
    view_confirm: false,
    new_password: "",

    open_chane_days: false,
    nuevoDia: 0,
    antiguoDia: 0,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    this.doCheck();
    this.doStats();
  }

  async doStats() {
    this.setState({
      loader: true,
    });
    axios
      .post(
        process.env.REACT_APP_URL_API + `usuarios/get_user_info`,
        {
          email: localStorage.getItem("email_penitenciarios"),
          userid: this.props.match.params.id,
        },
        {
          headers: {
            authorization: localStorage.getItem("token_penitenciarios"),
          },
        }
      )
      .then((res) => {
        let stats = this.state.stats;
        const historiales = JSON.parse(res.data.historiales);
        const historiales_cp = JSON.parse(res.data.historiales_cp);
        const preguntas = JSON.parse(res.data.preguntas);
        const areasWTemas = JSON.parse(res.data.areasWTemas);
        const examenes_oficiales = JSON.parse(res.data.examenes_oficiales);
        const simulacros = JSON.parse(res.data.simulacros);
        const casos_practicos = JSON.parse(res.data.casos_practicos);
        const basicosconfundidos = JSON.parse(res.data.basicosconfundidos);
        const legislaciones = JSON.parse(res.data.legislaciones);
        const usuario = JSON.parse(res.data.usuario);
        const historiales_sin_terminar = new Array();
        const historiales_terminados = new Array();

        const tabla_relacion_temas_areas = [];
        const tabla_relacion_nombre_areas = new Array();
        const tabla_relacion_nombre_temas = [];
        const tabla_relacion_nombre_temas_areas = [];
        const tabla_relacion_oficiales_simulacros = new Array();
        const tabla_relacion_casos_practicos = new Array();
        const tabla_relacion_basicosconfundidos = new Array();
        const tabla_relacion_legislaciones = new Array();

        examenes_oficiales.forEach((examen_oficial, indice, array) => {
          tabla_relacion_oficiales_simulacros[examen_oficial.id] =
            examen_oficial.name;
        });
        simulacros.forEach((simulacro, indice, array) => {
          tabla_relacion_oficiales_simulacros[simulacro.id] = simulacro.name;
        });
        casos_practicos.forEach((caso_practico, indice, array) => {
          tabla_relacion_casos_practicos[caso_practico.id] = caso_practico.name;
        });
        basicosconfundidos.forEach((basicosconfundido, indice, array) => {
          tabla_relacion_basicosconfundidos[basicosconfundido.id] =
            basicosconfundido.name;
        });
        legislaciones.forEach((legislacion, indice, array) => {
          tabla_relacion_legislaciones[legislacion.id] = legislacion.name;
        });

        areasWTemas.forEach((area, indice, array) => {
          tabla_relacion_nombre_areas[area.id] = "<b>" + area.name + "</b>";
          area.temas.forEach((tema, indice, array) => {
            tabla_relacion_temas_areas[tema.id] = area.id;
            tabla_relacion_nombre_temas[tema.id] =
              "<b>" + tema.abreviacion_publica + "</b>";
            tabla_relacion_nombre_temas_areas[tema.id] =
              "<b>" + tema.abreviacion_publica + "</b> (" + area.name + ")";
          });
        });

        historiales.forEach((historial, indice, array) => {
          if (historial.terminado) {
            if (historial.tipo == "Test por bloques") {
              stats.stats_n_examenes_temas_bloques++;
            } else if (historial.tipo == "Test por temas") {
              stats.stats_n_examenes_temas_bloques++;
            } else if (historial.tipo == "Test oficiales") {
              stats.stats_n_examenes_oficiales++;
              stats.stats_sum_nota_examenes_oficiales += historial.puntuacion;
              stats.stats_n_examenes_simulacros_oficiales++;
            } else if (historial.tipo == "Test simulacros") {
              stats.stats_n_examenes_simulacros_oficiales++;
              stats.stats_sum_nota_examenes_simulacros += historial.puntuacion;
              stats.stats_n_examenes_simulacros++;
            }
            historial.contestaciones.forEach((contestacion, indice, array) => {
              if (
                preguntas[contestacion.id_pregunta].id_tema !=
                "5f22933d1527000066007995"
              ) {
                if (contestacion.id_respuesta !== undefined) {
                  //contestada
                  if (
                    contestacion.correcta !== undefined &&
                    contestacion.correcta
                  ) {
                    //acertada
                    stats.stats_n_preguntas_acertadas++;
                    if (
                      stats.stats_areas_n_preguntas[
                        tabla_relacion_temas_areas[
                          preguntas[contestacion.id_pregunta].id_tema
                        ]
                      ] !== undefined
                    ) {
                      stats.stats_areas_n_preguntas[
                        tabla_relacion_temas_areas[
                          preguntas[contestacion.id_pregunta].id_tema
                        ]
                      ]++;
                    } else {
                      stats.stats_areas_n_preguntas[
                        tabla_relacion_temas_areas[
                          preguntas[contestacion.id_pregunta].id_tema
                        ]
                      ] = 1;
                    }
                    if (
                      stats.stats_areas_n_preguntas_acertadas[
                        tabla_relacion_temas_areas[
                          preguntas[contestacion.id_pregunta].id_tema
                        ]
                      ] !== undefined
                    ) {
                      stats.stats_areas_n_preguntas_acertadas[
                        tabla_relacion_temas_areas[
                          preguntas[contestacion.id_pregunta].id_tema
                        ]
                      ]++;
                    } else {
                      stats.stats_areas_n_preguntas_acertadas[
                        tabla_relacion_temas_areas[
                          preguntas[contestacion.id_pregunta].id_tema
                        ]
                      ] = 1;
                    }
                  } else {
                    //no acertada
                    stats.stats_n_preguntas_falladas++;
                    if (
                      stats.stats_areas_n_preguntas[
                        tabla_relacion_temas_areas[
                          preguntas[contestacion.id_pregunta].id_tema
                        ]
                      ] !== undefined
                    ) {
                      stats.stats_areas_n_preguntas[
                        tabla_relacion_temas_areas[
                          preguntas[contestacion.id_pregunta].id_tema
                        ]
                      ]++;
                    } else {
                      stats.stats_areas_n_preguntas[
                        tabla_relacion_temas_areas[
                          preguntas[contestacion.id_pregunta].id_tema
                        ]
                      ] = 1;
                    }
                    if (
                      stats.stats_areas_n_preguntas_falladas[
                        tabla_relacion_temas_areas[
                          preguntas[contestacion.id_pregunta].id_tema
                        ]
                      ] !== undefined
                    ) {
                      stats.stats_areas_n_preguntas_falladas[
                        tabla_relacion_temas_areas[
                          preguntas[contestacion.id_pregunta].id_tema
                        ]
                      ]++;
                    } else {
                      stats.stats_areas_n_preguntas_falladas[
                        tabla_relacion_temas_areas[
                          preguntas[contestacion.id_pregunta].id_tema
                        ]
                      ] = 1;
                    }

                    if (
                      stats.stats_temas_mas_fallados[
                        preguntas[contestacion.id_pregunta].id_tema
                      ] !== undefined
                    ) {
                      stats.stats_temas_mas_fallados[
                        preguntas[contestacion.id_pregunta].id_tema
                      ]++;
                      stats.stats_areas_mas_fallados[
                        tabla_relacion_temas_areas[
                          preguntas[contestacion.id_pregunta].id_tema
                        ]
                      ]++;
                    } else {
                      stats.stats_temas_mas_fallados[
                        preguntas[contestacion.id_pregunta].id_tema
                      ] = 1;
                      stats.stats_areas_mas_fallados[
                        tabla_relacion_temas_areas[
                          preguntas[contestacion.id_pregunta].id_tema
                        ]
                      ] = 1;
                    }

                    if (historial.tipo == "Test oficiales") {
                      if (
                        stats.stats_temas_mas_fallados_oficiales[
                          preguntas[contestacion.id_pregunta].id_tema
                        ] !== undefined
                      ) {
                        stats.stats_temas_mas_fallados_oficiales[
                          preguntas[contestacion.id_pregunta].id_tema
                        ]++;
                        stats.stats_areas_mas_fallados_oficiales[
                          tabla_relacion_temas_areas[
                            preguntas[contestacion.id_pregunta].id_tema
                          ]
                        ]++;
                      } else {
                        stats.stats_temas_mas_fallados_oficiales[
                          preguntas[contestacion.id_pregunta].id_tema
                        ] = 1;
                        stats.stats_areas_mas_fallados_oficiales[
                          tabla_relacion_temas_areas[
                            preguntas[contestacion.id_pregunta].id_tema
                          ]
                        ] = 1;
                      }
                    } else if (historial.tipo == "Test simulacros") {
                      if (
                        stats.stats_temas_mas_fallados_simulacros[
                          preguntas[contestacion.id_pregunta].id_tema
                        ] !== undefined
                      ) {
                        stats.stats_temas_mas_fallados_simulacros[
                          preguntas[contestacion.id_pregunta].id_tema
                        ]++;
                        stats.stats_areas_mas_fallados_simulacros[
                          tabla_relacion_temas_areas[
                            preguntas[contestacion.id_pregunta].id_tema
                          ]
                        ]++;
                      } else {
                        stats.stats_temas_mas_fallados_simulacros[
                          preguntas[contestacion.id_pregunta].id_tema
                        ] = 1;
                        stats.stats_areas_mas_fallados_simulacros[
                          tabla_relacion_temas_areas[
                            preguntas[contestacion.id_pregunta].id_tema
                          ]
                        ] = 1;
                      }
                    }
                  }
                } else {
                  //no contestada
                  stats.stats_n_preguntas_blancas++;
                }
              }
            });
            historiales_terminados.push(historial);
          } else {
            historiales_sin_terminar.push(historial);
          }
        });

        if (stats.stats_n_examenes_oficiales == 0) {
          stats.stats_avg_examenes_oficiales = 0;
        } else {
          stats.stats_avg_examenes_oficiales =
            stats.stats_sum_nota_examenes_oficiales /
            stats.stats_n_examenes_oficiales;
        }
        if (stats.stats_n_examenes_simulacros == 0) {
          stats.stats_avg_examenes_simulacros = 0;
        } else {
          stats.stats_avg_examenes_simulacros =
            stats.stats_sum_nota_examenes_simulacros /
            stats.stats_n_examenes_simulacros;
        }

        historiales_cp.forEach((historial_cp, indice, array) => {
          if (historial_cp.terminado) {
            if (historial_cp.tipo == "Caso práctico") {
              stats.stats_n_casos_practicos++;
              stats.stats_sum_nota_casos_practicos += historial_cp.puntuacion;
            } else if (historial_cp.tipo == "Caso práctico oficial") {
              stats.stats_n_casos_practicos_oficiales++;
              stats.stats_sum_nota_casos_practicos_oficiales +=
                historial_cp.puntuacion;
            }
            historiales_terminados.push(historial_cp);
          } else {
            historiales_sin_terminar.push(historial_cp);
          }
        });
        if (stats.stats_n_casos_practicos == 0) {
          stats.stats_avg_casos_practicos = 0;
        } else {
          stats.stats_avg_casos_practicos =
            stats.stats_sum_nota_casos_practicos /
            stats.stats_n_casos_practicos;
        }
        if (stats.stats_n_casos_practicos_oficiales == 0) {
          stats.stats_avg_casos_practicos_oficiales = 0;
        } else {
          stats.stats_avg_casos_practicos_oficiales =
            stats.stats_sum_nota_casos_practicos_oficiales /
            stats.stats_n_casos_practicos_oficiales;
        }
        stats.tabla_relacion_temas_areas = tabla_relacion_temas_areas;
        stats.tabla_relacion_nombre_areas = tabla_relacion_nombre_areas;
        stats.tabla_relacion_nombre_temas = tabla_relacion_nombre_temas;
        stats.tabla_relacion_nombre_temas_areas =
          tabla_relacion_nombre_temas_areas;
        stats.tabla_relacion_oficiales_simulacros =
          tabla_relacion_oficiales_simulacros;
        stats.tabla_relacion_casos_practicos = tabla_relacion_casos_practicos;
        stats.tabla_relacion_basicosconfundidos =
          tabla_relacion_basicosconfundidos;
        stats.tabla_relacion_legislaciones = tabla_relacion_legislaciones;

        stats.historiales = historiales.sort((a, b) =>
          a.fecha > b.fecha ? -1 : 1
        );

        stats.historiales_cp = historiales_cp.sort((a, b) =>
          a.fecha > b.fecha ? -1 : 1
        );

        stats.historiales_sin_terminar = historiales_sin_terminar.sort((a, b) =>
          a.fecha > b.fecha ? -1 : 1
        );

        stats.historiales_terminados = historiales_terminados.sort((a, b) =>
          a.fecha > b.fecha ? -1 : 1
        );

        const array_stats_temas_mas_fallados = [];
        for (const [key, value] of Object.entries(
          stats.stats_temas_mas_fallados
        )) {
          array_stats_temas_mas_fallados.push({
            faltas: value,
            tema: key,
          });
        }
        stats.stats_temas_mas_fallados = array_stats_temas_mas_fallados.sort(
          (a, b) => (a.faltas > b.faltas ? -1 : 1)
        );

        const array_stats_areas_mas_fallados = [];
        for (const [key, value] of Object.entries(
          stats.stats_areas_mas_fallados
        )) {
          array_stats_areas_mas_fallados.push({
            faltas: value,
            area: key,
          });
        }
        stats.stats_areas_mas_fallados = array_stats_areas_mas_fallados.sort(
          (a, b) => (a.faltas > b.faltas ? -1 : 1)
        );

        const array_stats_temas_mas_fallados_oficiales = [];
        for (const [key, value] of Object.entries(
          stats.stats_temas_mas_fallados_oficiales
        )) {
          array_stats_temas_mas_fallados_oficiales.push({
            faltas: value,
            tema: key,
          });
        }
        stats.stats_temas_mas_fallados_oficiales =
          array_stats_temas_mas_fallados_oficiales.sort((a, b) =>
            a.faltas > b.faltas ? -1 : 1
          );

        const array_stats_areas_mas_fallados_oficiales = [];
        for (const [key, value] of Object.entries(
          stats.stats_areas_mas_fallados_oficiales
        )) {
          array_stats_areas_mas_fallados_oficiales.push({
            faltas: value,
            area: key,
          });
        }
        stats.stats_areas_mas_fallados_oficiales =
          array_stats_areas_mas_fallados_oficiales.sort((a, b) =>
            a.faltas > b.faltas ? -1 : 1
          );

        const array_stats_temas_mas_fallados_simulacros = [];
        for (const [key, value] of Object.entries(
          stats.stats_temas_mas_fallados_simulacros
        )) {
          array_stats_temas_mas_fallados_simulacros.push({
            faltas: value,
            tema: key,
          });
        }
        stats.stats_temas_mas_fallados_simulacros =
          array_stats_temas_mas_fallados_simulacros.sort((a, b) =>
            a.faltas > b.faltas ? -1 : 1
          );

        const array_stats_areas_mas_fallados_simulacros = [];
        for (const [key, value] of Object.entries(
          stats.stats_areas_mas_fallados_simulacros
        )) {
          array_stats_areas_mas_fallados_simulacros.push({
            faltas: value,
            area: key,
          });
        }
        stats.stats_areas_mas_fallados_simulacros =
          array_stats_areas_mas_fallados_simulacros.sort((a, b) =>
            a.faltas > b.faltas ? -1 : 1
          );

        this.setState({
          stats: stats,
          usuario: usuario,
          loader: false,
        });
      })
      .catch((err) => {
        if (err.response.data.error === "Usuario no autorizado") {
          this.props.history.push("/");
        }
      });
  }

  timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time =
      this.str_pad(date + "", 2, "0", "STR_PAD_LEFT") +
      "/" +
      this.str_pad(a.getMonth() + 1 + "", 2, "0", "STR_PAD_LEFT") +
      "/" +
      year;
    return time;
  }

  str_pad(str, pad_length, pad_string, pad_type) {
    var len = pad_length - str.length;
    if (len < 0) return str;
    for (var i = 0; i < len; i++) {
      if (pad_type == "STR_PAD_LEFT") {
        str = pad_string + str;
      } else {
        str += pad_string;
      }
    }
    return str;
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

  copyEmail(email) {
    navigator.clipboard
      .writeText(email)
      .then(() => toast.success("Copiado en portapapeles"))
      .catch((error) => toast.success(error));
  }

  verifiAcount(user) {
    axios
      .post(
        process.env.REACT_APP_URL_API + `usuarios/verify-user-acount`,
        {
          id: user.id,
        },
        {
          headers: {
            authorization: localStorage.getItem("token_penitenciarios"),
          },
        }
      )
      .then((res) => {
        this.state.usuario.estado = "VERIFICADO";
        toast.success("Usuario verificado");
        this.setState(this.state);
      })
      .catch((error) => {
        localStorage.removeItem("token_penitenciarios");
        localStorage.removeItem("email_penitenciarios");
        this.setState({
          redirect_to_login: true,
        });
      });
  }

  deleteUsar(user) {
    axios
      .delete(
        process.env.REACT_APP_URL_API + `usuarios/delete-usuario/${user.id}`,
        {
          headers: {
            authorization: localStorage.getItem("token_penitenciarios"),
          },
        }
      )
      .then((res) => {
        toast.success("Usuario Eliminado con exito");
        this.props.history.push("/usersinfo");
      })
      .catch((error) => {
        toast.error(error.response.data.msg);
      });
  }

  getTimeUnixFormat(timeUnix) {
    const time = timeUnix * 1000;
    const fechaActual = new Date().getTime();
    const diferencia = fechaActual - time;

    const segundos = Math.floor(diferencia / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);
    const semanas = Math.floor(dias / 7);

    let resultado = "";

    if (semanas > 0) {
      resultado = semanas + " semana(s)";
    } else if (dias > 0) {
      resultado = dias + " día(s)";
    } else if (horas > 0) {
      resultado = horas + " hora(s)";
    } else if (minutos > 0) {
      resultado = minutos + " minuto(s)";
    } else {
      resultado = "unos segundos";
    }
    return resultado;
  }

  getTimeUnixChangeUser(unixTimestamp) {
    const fecha = new Date(unixTimestamp * 1000);

    const dia = fecha.getDate().toString().padStart(2, "0");
    const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
    const anio = fecha.getFullYear().toString().slice(-2);
    const horas = fecha.getHours().toString().padStart(2, "0");
    const minutos = fecha.getMinutes().toString().padStart(2, "0");
    const segundos = fecha.getSeconds().toString().padStart(2, "0");

    return `${dia}/${mes}/20${anio} ${horas}:${minutos}:${segundos}`;
  }

  changeMaximoDia() {
    const fecha = Number(this.state.nuevoDia);
    if (isNaN(fecha))
      return toast.warning("La fecha debe ser solo numero (Formato UNIX)");
    else {
      axios
        .post(
          process.env.REACT_APP_URL_API + `usuarios/change-day`,
          {
            id: this.state.usuario.id,
            Maximo_dia_suscripcion: fecha,
          },
          {
            headers: {
              authorization: localStorage.getItem("token_penitenciarios"),
            },
          }
        )
        .then((res) => {
          toast.success("Fecha de usuario actualizado con exito");
          this.state.usuario.Maximo_dia_suscripcion = fecha;
          let usuario = { ...this.state.usuario };
          usuario.maximo_dia_suscripcion = fecha;
          this.setState({ usuario: usuario, open_chane_days: false });
          this.forceUpdate();
        })
        .catch((error) => {
          toast.error(error.response.data.msg);
        });

      // console.log(this.state.usuario.id);
      // console.log(typeof this.state.nuevoDia);
    }
  }

  render() {
    return (
      <div className="section_mi_perfil">
        {this.state.loader && <div className="loader_examen"></div>}
        <section className="offers featured left">
          <div className="container">
            <div className="row intro items">
              <div className="col-12 col-md-4 col-lg-5 align-self-center text-center text-md-left">
                <h2 className="featured">Perfil del Usuario</h2>
                <Grid container justifyContent="left">
                  <Grid item>
                    Email: {this.state.usuario.email}
                    <IconButton
                      aria-label="Copiar"
                      onClick={() => this.copyEmail(this.state.usuario.email)}
                    >
                      <FileCopyIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </div>
              <div className="col-12 col-md-8 col-lg-7 item">
                <div className="card no-hover featured userCardInfo">
                  <img
                    src="/assets/images/trash.svg"
                    className="trashIcon"
                    alt="delete-user"
                    onClick={() => this.setState({ view_confirm: true })}
                  />
                  <p
                    className={
                      this.state.usuario.connected == "online"
                        ? "online"
                        : "offline"
                    }
                  >
                    {this.state.usuario.connected == "online"
                      ? "online"
                      : `Hace ${this.getTimeUnixFormat(
                          this.state.usuario.last_heart_beat
                        )} offline`}
                    <span></span>
                  </p>
                  <div className="row text-left">
                    <div className="col-12 col-md-2 col-lg-2 text-left box_icono">
                      <i className="icon icon-user mt-2 mr-0"></i>
                    </div>
                    <div className="col-12 col-md-10 col-lg-10 box_texto_user">
                      <h4 className="m-0">{this.state.usuario.name}</h4>
                      <p className="m-0">
                        Estado:{" "}
                        <b
                          className={
                            this.state.usuario.estado == "VERIFICADO"
                              ? "verificado"
                              : "pendiente"
                          }
                        >
                          {this.state.usuario.estado}
                        </b>
                        {this.state.usuario.estado == "VERIFICADO" ? (
                          ""
                        ) : (
                          <button
                            onClick={() =>
                              this.verifiAcount(this.state.usuario)
                            }
                            className="verificar-cuenta"
                          >
                            (Verificar cuenta)
                          </button>
                        )}
                      </p>
                      {/* {this.state.usuario.id_nivel ==
                        "5ea6ad3dbb5c000045007637" && <span>Nivel Básico</span>}
                      {this.state.usuario.id_nivel ==
                        "5ea6ad4abb5c000045007638" && (
                        <span>Nivel Intermedio</span>
                      )}
                      {this.state.usuario.id_nivel ==
                        "5ea6ad51bb5c000045007639" && (
                        <span>Nivel Avanzado</span>
                      )} */}
                      {this.state.usuario.maximo_dia_suscripcion == "0" && (
                        <span>
                          {" "}
                          - <b>No suscrito</b>
                        </span>
                      )}
                      {this.state.usuario.maximo_dia_suscripcion ==
                        "2500000000" && (
                        <span>
                          {" "}
                          - <b>Hasta el día del examen</b>
                        </span>
                      )}
                      {this.state.usuario.maximo_dia_suscripcion !=
                        "2500000000" &&
                        this.state.usuario.maximo_dia_suscripcion != "0" && (
                          <span
                            className="suscripcion"
                            onClick={() =>
                              this.setState({ open_chane_days: true })
                            }
                          >
                            {" "}
                            -{" "}
                            <b>
                              Hasta el{" "}
                              {this.timeConverter(
                                this.state.usuario.maximo_dia_suscripcion
                              )}
                            </b>
                            {/* <br />
                            <input
                              className="nuevo-dia-usuario"
                              type="text"
                              placeholder="ingrese nu8eva fecha en formato unix"
                            /> */}
                          </span>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-5">
              <div className="col-12 col-md-12 ">
                <PestanaInfoUser
                  stats={this.state.stats}
                  usuario={this.state.usuario}
                />
              </div>
            </div>
          </div>
        </section>
        <Dialog
          open={this.state.view_confirm}
          onClose={() => this.setState({ view_confirm: false })}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Eliminar usuario</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Esta seguro de eliminar el usuario con correo{" "}
              <b className="text-secundary">{this.state.usuario.email}</b>?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              className="btn btn-primary"
              onClick={() => this.setState({ view_confirm: false })}
              color="primary"
            >
              Cancelar
            </Button>
            <Button
              className="btn btn-primary"
              onClick={() => this.deleteUsar(this.state.usuario)}
              color="primary"
              autoFocus
            >
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>

        {/*  */}
        {/*  */}
        {/*  */}

        <Dialog
          open={this.state.open_chane_days}
          onClose={() => this.setState({ open_chane_days: false })}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Cambiar fecha de suscripción
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Para cambiar la fecha de suscripción del usuario debera colocar la
              nueva fecha en formato UNIX (
              {Math.floor(new Date().getTime() / 1000)}) {"=>"} Fecha actual.
            </DialogContentText>
            <input
              type="text"
              placeholder="Nueva fecha en formato unix"
              onChange={(e) => this.setState({ nuevoDia: e.target.value })}
            />
            <DialogContentText id="alert-dialog-description">
              La nueva fecha es {"=>"}{" "}
              {this.getTimeUnixChangeUser(this.state.nuevoDia)}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              className="btn btn-primary"
              onClick={() => this.setState({ open_chane_days: false })}
              color="primary"
            >
              Cancelar
            </Button>
            <Button
              className="btn btn-primary"
              onClick={() => this.changeMaximoDia()}
              color="primary"
              autoFocus
            >
              Actualizar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withRouter(UserInfoDataPage);
