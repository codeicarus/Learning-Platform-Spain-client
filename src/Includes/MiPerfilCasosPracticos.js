import React, { Component } from "react";
import "react-toastify/dist/ReactToastify.css";
import NumberFormat from "react-number-format";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

class MiPerfilCasosPracticos extends Component {
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
        process.env.REACT_APP_URL_API + `repetirTestCP`,
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
      return <Redirect to={"/test_cp/" + this.state.id_test} />;
    }
  };

  render() {
    const props = this.props;

    return (
      <div>
        {this.renderRedirectToTest()}
        <div className="row justify-content-center text-center items">
          <div className="col-12 col-md-12 col-lg-6 item mb-md-4 mb-lg-0 mb-xl-0">
            <div className="card no-hover">
              <h4 className="mt-0">Simulacros</h4>
              <div className="row justify-content-center text-center">
                <div className="col-12 col-md-6 col-lg-6 mid_numero_stats">
                  <h3 className="mt-0">
                    {props.stats.stats_n_casos_practicos}
                  </h3>
                  Simulacros realizados
                </div>
                <div className="col-12 col-md-6 col-lg-6 mid_numero_stats">
                  <h3 className="mt-0">
                    <NumberFormat
                      value={props.stats.stats_avg_casos_practicos}
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
          </div>
          <div className="col-12 col-md-12 col-lg-6 item">
            <div className="card no-hover">
              <h4 className="mt-0">Oficiales</h4>
              <div className="row justify-content-center text-center">
                <div className="col-12 col-md-6 col-lg-6 mid_numero_stats">
                  <h3 className="mt-0">
                    {props.stats.stats_n_casos_practicos_oficiales}
                  </h3>
                  Oficiales realizados
                </div>
                <div className="col-12 col-md-6 col-lg-6 mid_numero_stats">
                  <h3 className="mt-0">
                    <NumberFormat
                      value={props.stats.stats_avg_casos_practicos_oficiales}
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
                      <th style={{ textAlign: "left" }}>Tipo</th>
                      <th style={{ textAlign: "center" }}>Tiempo</th>
                      <th style={{ textAlign: "center" }}>Acertadas</th>
                      <th style={{ textAlign: "center" }}>Falladas</th>
                      <th style={{ textAlign: "center" }}>Blancas</th>
                      <th style={{ textAlign: "center" }}>Netas</th>
                      <th style={{ textAlign: "right" }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.stats.historiales_cp.map((historial_cp, i) => {
                      if (historial_cp.terminado) {
                        const title_a_poner =
                          "<b>" +
                          props.stats.tabla_relacion_casos_practicos[
                            historial_cp.id_caso_practico
                          ] +
                          "</b>";
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
                              {this.timeConverter(historial_cp.fecha)}
                            </td>
                            <td
                              title={title_a_poner}
                              style={{ textAlign: "left", maxWidth: "250px" }}
                            >
                              {historial_cp.tipo}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {convertirSegundos(
                                historial_cp.tiempo_transcurrido
                              )}
                              s
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {historial_cp.preguntas_acertadas}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {historial_cp.preguntas_falladas}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {historial_cp.preguntas_blancas}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <NumberFormat
                                value={historial_cp.puntuacion}
                                displayType={"text"}
                                decimalSeparator=","
                                renderText={(value) => <div>{value}</div>}
                                decimalScale="2"
                              />
                            </td>
                            <td style={{ textAlign: "right" }}>
                              <Link
                                to={"/test_cp/" + historial_cp.id}
                                className="btn_tabla"
                              >
                                VER
                              </Link>{" "}
                              /{" "}
                              <a
                                onClick={() =>
                                  this.repetirTest(historial_cp.id)
                                }
                                className="btn_tabla"
                              >
                                REPETIR
                              </a>
                            </td>
                          </tr>
                        );
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

export default MiPerfilCasosPracticos;
