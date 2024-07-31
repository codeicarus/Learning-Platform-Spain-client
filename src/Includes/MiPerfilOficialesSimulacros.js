import React, { Component } from "react";
import "react-toastify/dist/ReactToastify.css";
import NumberFormat from "react-number-format";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

class MiPerfilOficialesSimulacros extends Component {
  state = {
    redirect_to_test: false,
    id_test: 0,
  };

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
      year +
      " " +
      this.str_pad(hour + "", 2, "0", "STR_PAD_LEFT") +
      ":" +
      this.str_pad(min + "", 2, "0", "STR_PAD_LEFT") +
      ":" +
      this.str_pad(sec + "", 2, "0", "STR_PAD_LEFT");

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

  constructor(props) {
    super(props);
  }

  async repetirTest(id) {
    axios
      .post(
        process.env.REACT_APP_URL_API + `repetirTest`,
        {
          email: localStorage.getItem("email_penitenciarios"),
          id: id,
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

  renderRedirectToTest = () => {
    if (this.state.redirect_to_test) {
      return <Redirect to={"/test/" + this.state.id_test} />;
    }
  };

  changeTitle = (nameArea) => {
    const name = nameArea.replace("<b>", "").replace("</b>", "");
    const newName = name.split(" ");
    for (let i = 0; i < newName.length; i++) {
      newName[i] = newName[i][0].toUpperCase() + newName[i].substring(1);
    }
    return newName.join(" ");
  };

  render() {
    const props = this.props;
    let num_areas_puestos_simulacros = 0;
    let num_temas_puestos_simulacros = 0;
    let num_areas_puestos_oficiales = 0;
    let num_temas_puestos_oficiales = 0;
    let chaneTitle = this.changeTitle;

    return (
      <div>
        {this.renderRedirectToTest()}
        <div className="row justify-content-center text-center items">
          <div className="col-12 col-md-12 col-lg-6 item mb-md-4 mb-lg-0 mb-xl-0">
            <div className="card no-hover mb-4">
              <h4 className="mt-0">Simulacros</h4>
              <div className="row justify-content-center text-center">
                <div className="col-12 col-md-6 col-lg-6 mid_numero_stats">
                  <h3 className="mt-0">
                    {props.stats.stats_n_examenes_simulacros}
                  </h3>
                  Simulacros realizados
                </div>
                <div className="col-12 col-md-6 col-lg-6 mid_numero_stats">
                  <h3 className="mt-0">
                    <NumberFormat
                      value={props.stats.stats_avg_examenes_simulacros}
                      displayType={"text"}
                      decimalSeparator=","
                      renderText={(value) => <div>{value}</div>}
                      decimalScale="2"
                    />
                  </h3>
                  Nota media
                </div>
              </div>
            </div>
            <div className="card no-hover  mb-4">
              <h4 className="mt-0">Areas más falladas</h4>
              <ul className="list-group list-group-flush">
                {props.stats.stats_areas_mas_fallados_simulacros.map(function (
                  area_mas_fallada,
                  i
                ) {
                  let nameArea =
                    props.stats.tabla_relacion_nombre_areas[
                      area_mas_fallada.area
                    ];
                  nameArea = nameArea.replace(/<\/?[^>]+(>|$)/g, "");
                  const newName = nameArea.split(" ");
                  for (let i = 0; i < newName.length; i++) {
                    newName[i] =
                      newName[i][0].toUpperCase() + newName[i].substring(1);
                  }
                  const resultName = `<b>${newName.join(" ")}</b>`;

                  num_areas_puestos_simulacros++;
                  return (
                    <li
                      key={i}
                      className="list-group-item d-flex justify-content-between align-items-center text-left"
                    >
                      <span
                        dangerouslySetInnerHTML={{
                          __html: resultName,
                        }}
                      ></span>
                      <span className="text-right">
                        {area_mas_fallada.faltas}
                      </span>
                    </li>
                  );
                })}

                {[...Array(10)].map((x, i) => {
                  if (num_areas_puestos_simulacros <= 3) {
                    num_areas_puestos_simulacros++;
                    return (
                      <li
                        key={i}
                        className="list-group-item d-flex justify-content-between align-items-center text-left"
                      >
                        <span>&nbsp;</span>
                        <span className="text-right">&nbsp;</span>
                      </li>
                    );
                  }
                })}
              </ul>
            </div>
            <div className="card no-hover ">
              <h4 className="mt-0">Temas más fallados</h4>
              <ul className="list-group list-group-flush">
                {props.stats.stats_temas_mas_fallados_simulacros.map(function (
                  tema_mas_fallado,
                  i
                ) {
                  if (i <= 3) {
                    let TemaName =
                      props.stats.tabla_relacion_nombre_temas_areas[
                        tema_mas_fallado.tema
                      ];
                    TemaName = TemaName.replace(/<\/?[^>]+(>|$)/g, "");
                    let newName = TemaName.slice(1);

                    newName = newName.split(" (");

                    let temaName = newName[1].slice(0, -1);

                    const resultName = `<b>Tema ${newName[0]} (${chaneTitle(
                      temaName
                    )})</b>`;

                    num_temas_puestos_simulacros++;
                    return (
                      <li
                        key={i}
                        className="list-group-item d-flex justify-content-between align-items-center text-left"
                      >
                        <span
                          dangerouslySetInnerHTML={{
                            __html: resultName,
                          }}
                        ></span>
                        <span className="text-right">
                          {tema_mas_fallado.faltas}
                        </span>
                      </li>
                    );
                  }
                })}

                {[...Array(10)].map((x, i) => {
                  if (num_temas_puestos_simulacros <= 3) {
                    num_temas_puestos_simulacros++;
                    return (
                      <li
                        key={i}
                        className="list-group-item d-flex justify-content-between align-items-center text-left"
                      >
                        <span>&nbsp;</span>
                        <span className="text-right">&nbsp;</span>
                      </li>
                    );
                  }
                })}
              </ul>
            </div>
          </div>
          <div className="col-12 col-md-12 col-lg-6 item">
            <div className="card no-hover  mb-4">
              <h4 className="mt-0">Oficiales</h4>
              <div className="row justify-content-center text-center">
                <div className="col-12 col-md-6 col-lg-6 mid_numero_stats">
                  <h3 className="mt-0">
                    {props.stats.stats_n_examenes_oficiales}
                  </h3>
                  Oficiales realizados
                </div>
                <div className="col-12 col-md-6 col-lg-6 mid_numero_stats">
                  <h3 className="mt-0">
                    <NumberFormat
                      value={props.stats.stats_avg_examenes_oficiales}
                      displayType={"text"}
                      decimalSeparator=","
                      renderText={(value) => <div>{value}</div>}
                      decimalScale="2"
                    />
                  </h3>
                  Nota media
                </div>
              </div>
            </div>
            <div className="card no-hover  mb-4">
              <h4 className="mt-0">Areas más falladas</h4>
              <ul className="list-group list-group-flush">
                {props.stats.stats_areas_mas_fallados_oficiales.map(function (
                  area_mas_fallada,
                  i
                ) {
                  let nameArea =
                    props.stats.tabla_relacion_nombre_areas[
                      area_mas_fallada.area
                    ];
                  nameArea = nameArea.replace(/<\/?[^>]+(>|$)/g, "");
                  const newName = nameArea.split(" ");
                  for (let i = 0; i < newName.length; i++) {
                    newName[i] =
                      newName[i][0].toUpperCase() + newName[i].substring(1);
                  }
                  const resultName = `<b>${newName.join(" ")}</b>`;

                  num_areas_puestos_oficiales++;
                  return (
                    <li
                      key={i}
                      className="list-group-item d-flex justify-content-between align-items-center text-left"
                    >
                      <span
                        dangerouslySetInnerHTML={{
                          __html: resultName,
                        }}
                      ></span>
                      <span className="text-right">
                        {area_mas_fallada.faltas}
                      </span>
                    </li>
                  );
                })}

                {[...Array(10)].map((x, i) => {
                  if (num_areas_puestos_oficiales <= 3) {
                    num_areas_puestos_oficiales++;
                    return (
                      <li
                        key={i}
                        className="list-group-item d-flex justify-content-between align-items-center text-left"
                      >
                        <span>&nbsp;</span>
                        <span className="text-right">&nbsp;</span>
                      </li>
                    );
                  }
                })}
              </ul>
            </div>
            <div className="card no-hover ">
              <h4 className="mt-0">Temas más fallados</h4>
              <ul className="list-group list-group-flush">
                {props.stats.stats_temas_mas_fallados_oficiales.map(function (
                  tema_mas_fallado,
                  i
                ) {
                  let TemaName =
                    props.stats.tabla_relacion_nombre_temas_areas[
                      tema_mas_fallado.tema
                    ];
                  TemaName = TemaName.replace(/<\/?[^>]+(>|$)/g, "");
                  let newName = TemaName.slice(1);

                  newName = newName.split(" (");

                  let temaName = newName[1].slice(0, -1);

                  const resultName = `<b>Tema ${newName[0]} (${chaneTitle(
                    temaName
                  )})</b>`;

                  if (i <= 3) {
                    num_temas_puestos_oficiales++;
                    return (
                      <li
                        key={i}
                        className="list-group-item d-flex justify-content-between align-items-center text-left"
                      >
                        <span
                          dangerouslySetInnerHTML={{
                            __html: resultName,
                          }}
                        ></span>
                        <span className="text-right">
                          {tema_mas_fallado.faltas}
                        </span>
                      </li>
                    );
                  }
                })}

                {[...Array(10)].map((x, i) => {
                  if (num_temas_puestos_oficiales <= 3) {
                    num_temas_puestos_oficiales++;
                    return (
                      <li
                        key={i}
                        className="list-group-item d-flex justify-content-between align-items-center text-left"
                      >
                        <span>&nbsp;</span>
                        <span className="text-right">&nbsp;</span>
                      </li>
                    );
                  }
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="row justify-content-center text-center items mt-4">
          <div className="col-12 col-md-12 item">
            <div
              style={{
                height: "100%",
              }}
              className="card no-hover "
            >
              <h4 className="mt-0">Histórico</h4>
              <div className="table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th style={{ textAlign: "left" }}>Fecha</th>
                      <th style={{ textAlign: "left" }}>Examen</th>
                      <th style={{ textAlign: "center" }}>Tiempo</th>
                      <th style={{ textAlign: "center" }}>Acertadas</th>
                      <th style={{ textAlign: "center" }}>Falladas</th>
                      <th style={{ textAlign: "center" }}>Blancas</th>
                      <th style={{ textAlign: "center" }}>Netas</th>
                      <th style={{ textAlign: "right" }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.stats.historiales.map((historial, i) => {
                      if (historial.terminado) {
                        if (
                          historial.tipo == "Test oficiales" ||
                          historial.tipo == "Test simulacros"
                        ) {
                          let title_a_poner = "";
                          if (historial.tipo == "Test oficiales") {
                            title_a_poner =
                              "<b>" +
                              props.stats.tabla_relacion_oficiales_simulacros[
                                historial.oficiales[0]
                              ] +
                              "</b>";
                          } else if (historial.tipo == "Test simulacros") {
                            title_a_poner =
                              "<b>" +
                              props.stats.tabla_relacion_oficiales_simulacros[
                                historial.simulacros[0]
                              ] +
                              "</b>";
                          }

                          function convertirSegundos(segundos) {
                            let horas = Math.floor(segundos / 3600);
                            let minutos = Math.floor((segundos % 3600) / 60);
                            segundos = segundos % 60;
                            return [horas, minutos, segundos]
                              .map((v) => (v < 10 ? "0" + v : v))
                              .join(":");
                          }

                          return (
                            <tr key={i}>
                              <td style={{ textAlign: "left" }}>
                                {this.timeConverter(historial.fecha)}
                              </td>
                              <td
                                title={title_a_poner}
                                style={{ textAlign: "left", maxWidth: "250px" }}
                              >
                                {historial.tipo}{" "}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                {convertirSegundos(
                                  historial.tiempo_transcurrido
                                )}
                                s
                              </td>
                              <td style={{ textAlign: "center" }}>
                                {historial.preguntas_acertadas}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                {historial.preguntas_falladas}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                {historial.preguntas_blancas}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                <NumberFormat
                                  value={historial.puntuacion}
                                  displayType={"text"}
                                  decimalSeparator=","
                                  renderText={(value) => <div>{value}</div>}
                                  decimalScale="2"
                                />
                              </td>
                              <td style={{ textAlign: "right" }}>
                                <Link
                                  to={"/test/" + historial.id}
                                  className="btn_tabla"
                                >
                                  VER
                                </Link>{" "}
                                /{" "}
                                <a
                                  onClick={() => this.repetirTest(historial.id)}
                                  className="btn_tabla"
                                >
                                  REPETIR
                                </a>
                              </td>
                            </tr>
                          );
                        }
                      }
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MiPerfilOficialesSimulacros;
