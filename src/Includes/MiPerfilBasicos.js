import React, { Component } from "react";
import "react-toastify/dist/ReactToastify.css";
import NumberFormat from "react-number-format";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

class MiPerfilBasicos extends Component {
  state = {
    redirect_to_test: false,
    id_test: 0,
  };

  searchTest(e) {
    e.preventDefault();
    if (this.state.id_test_change.length === 0) {
      this.historial = this.aux;
      this.forceUpdate();
    } else {
      const historial = this.historial.find(
        (item) => item.id == this.state.id_test_change
      );
      if (historial) this.historial = [historial];
      else this.historial = [];
      this.forceUpdate();
    }
  }

  updatePunajeTest() {
    var regex = /^-?\d+(\.\d+)?$/;

    if (regex.test(this.state.newPuntaje)) {
      axios
        .post(
          process.env.REACT_APP_URL_API + `update-puntaje`,
          {
            id_test: this.state.test_change,
            newPuntaje: this.state.newPuntaje,
          },
          {
            headers: {
              authorization: localStorage.getItem("token_penitenciarios"),
            },
          }
        )
        .then((res) => {
          this.setState({ open_update_puntaje: false });
          toast.success("Puntaje actualizado (recarge para ver datos nuevos)");
        })
        .catch((error) => {
          if (error.response) {
            toast.error(error.response.data.error);
          }
        });
    } else {
      toast.error(
        "Solo se puede actualizar por numeros decimales, enteros, positivo o negativos"
      );
    }
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
    this.num = props.stats.historiales.filter(
      (e) => e.tipo == "Test por basicosconfundidos"
    );
    this.historial = this.num;
    this.aux = this.num;
  }

  getNotaMedia() {
    let num = 0;
    this.num.forEach((history) => {
      num += history.puntuacion;
    });
    num = num / this.num.length;
    return num;
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
              <h4 className="mt-0">Basicos confundidos</h4>
              <div className="row justify-content-center text-center">
                <div className="col-12 col-md-6 col-lg-6 mid_numero_stats">
                  <h3 className="mt-0">{this.num.length}</h3>
                  Test realizados
                </div>
                <div className="col-12 col-md-6 col-lg-6 mid_numero_stats">
                  <h3 className="mt-0">
                    <NumberFormat
                      value={this.getNotaMedia()}
                      displayType={"text"}
                      decimalSeparator=","
                      renderText={(value) => <div>{value || 0}</div>}
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
                      <th style={{ textAlign: "center" }}>Puntuación</th>
                      <th style={{ textAlign: "right" }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.historial.map((historial, i) => {
                      if (historial.terminado) {
                        const title_a_poner =
                          "<b>" +
                          props.stats.tabla_relacion_basicosconfundidos[
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
                            <td
                              style={{
                                textAlign: "center",
                              }}
                            >
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
                              </Link>
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

export default MiPerfilBasicos;
