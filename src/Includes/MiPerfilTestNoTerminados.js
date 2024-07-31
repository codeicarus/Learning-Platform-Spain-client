import React, { Component } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

class MiPerfilTestNoTerminados extends Component {
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

  render() {
    const props = this.props;

    return (
      <div>
        <div className="row justify-content-center text-center items">
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
                      <th style={{ textAlign: "left", maxWidth: "250px" }}>
                        Tipo
                      </th>
                      <th style={{ textAlign: "center" }}>Tiempo</th>
                      <th style={{ textAlign: "center" }}>Acertadas</th>
                      <th style={{ textAlign: "center" }}>Falladas</th>
                      <th style={{ textAlign: "center" }}>Blancas</th>
                      <th style={{ textAlign: "right" }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.stats.historiales_sin_terminar.map(
                      (historial, i) => {
                        if (
                          historial.tipo == "Caso práctico" ||
                          historial.tipo == "Caso práctico oficial"
                        ) {
                          const title_a_poner =
                            "<b>" +
                            props.stats.tabla_relacion_casos_practicos[
                              historial.id_caso_practico
                            ] +
                            "</b>";
                          return (
                            <tr key={i}>
                              <td style={{ textAlign: "left" }}>
                                {this.timeConverter(historial.fecha)}
                              </td>
                              <td
                                title={title_a_poner}
                                style={{ textAlign: "left", maxWidth: "250px" }}
                              >
                                {historial.tipo}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                {historial.tiempo_transcurrido}s
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
                              <td style={{ textAlign: "right" }}>
                                <Link
                                  to={"/test_cp/" + historial.id}
                                  className="btn_tabla"
                                >
                                  TERMINAR
                                </Link>
                              </td>
                            </tr>
                          );
                        } else {
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
                          } else if (
                            historial.tipo == "Test por temas" ||
                            historial.tipo == "Test por bloques"
                          ) {
                            historial.temas.map((id_tema, i) => {
                              title_a_poner +=
                                props.stats.tabla_relacion_nombre_temas_areas[
                                  id_tema
                                ] + "<br>";
                            });
                          } else if (
                            historial.tipo == "Test por legislaciones"
                          ) {
                            historial.legislaciones.map((id_legislacion, i) => {
                              title_a_poner +=
                                "<b>" +
                                props.stats.tabla_relacion_legislaciones[
                                  id_legislacion
                                ] +
                                "</b><br>";
                            });
                          } else if (
                            historial.tipo == "Test por basicosconfundidos"
                          ) {
                            historial.basicosconfundidos.map(
                              (id_basicoconfundido, i) => {
                                title_a_poner +=
                                  "<b>" +
                                  props.stats.tabla_relacion_basicosconfundidos[
                                    id_basicoconfundido
                                  ] +
                                  "</b><br>";
                              }
                            );
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
                                {historial.tipo}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                {historial.tiempo_transcurrido}s
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
                              <td style={{ textAlign: "right" }}>
                                <Link
                                  to={"/test/" + historial.id}
                                  className="btn_tabla"
                                >
                                  TERMINAR
                                </Link>
                              </td>
                            </tr>
                          );
                        }
                      }
                    )}
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

export default MiPerfilTestNoTerminados;
