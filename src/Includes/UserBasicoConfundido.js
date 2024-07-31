import React, { Component } from "react";
import "react-toastify/dist/ReactToastify.css";
import NumberFormat from "react-number-format";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import { GrEdit } from "react-icons/gr";
import { BsFillTrashFill } from "react-icons/bs";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class UserBasicoConfundido extends Component {
  state = {
    redirect_to_test: false,
    id_test: 0,
    id_test_change: "",
    open_update_puntaje: false,
    puntaje: 0,
    newPuntaje: 0,
    test_change: "",
    deleteHistorial: false,
    id_historial_delete: "",
  };

  deleteHistorial(id) {
    this.setState({ deleteHistorial: true, id_historial_delete: id });
  }

  conirmDeleteHistorial() {
    // console.log(this.state);

    const token = localStorage.getItem("token_penitenciarios");
    if (token) {
      axios
        .post(
          process.env.REACT_APP_URL_API + `usuarios/delete-historial`,
          {
            id: this.state.id_historial_delete,
          },
          {
            headers: {
              authorization: localStorage.getItem("token_penitenciarios"),
            },
          }
        )
        .then((res) => {
          this.setState({ deleteHistorial: false, id_historial_delete: "" });
          toast.success("Historial Eliminado (recarge para ver datos nuevos)");
        })
        .catch((error) => {
          if (error.response) {
            toast.error(error.response.data.error);
          }
        });
    }
  }

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
            <div className="card card-rounded no-hover">
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
              <div className="buscar-test-id">
                <form onSubmit={(e) => this.searchTest(e)}>
                  <input
                    type="text"
                    onChange={(e) =>
                      this.setState({ id_test_change: e.target.value })
                    }
                    placeholder="Ingresar ID de test a buscar"
                  />
                  <button className="btn ml-lg-auto primary-button">
                    Buscar
                  </button>
                </form>
              </div>
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
                    {this.historial.map((historial, i) => {
                      if (historial.terminado) {
                        const title_a_poner =
                          "<b>" +
                          props.stats.tabla_relacion_basicosconfundidos[
                            historial.id_caso_practico
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
                              {this.timeConverter(historial.fecha)}
                            </td>
                            <td
                              title={title_a_poner}
                              style={{ textAlign: "left", maxWidth: "250px" }}
                            >
                              {historial.tipo}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {convertirSegundos(historial.tiempo_transcurrido)}
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
                            <td
                              style={{
                                cursor: "pointer",
                                textAlign: "center",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                              onClick={() =>
                                this.setState({
                                  open_update_puntaje: true,
                                  puntaje: historial.puntuacion,
                                  test_change: historial.id,
                                })
                              }
                            >
                              <NumberFormat
                                value={historial.puntuacion}
                                displayType={"text"}
                                decimalSeparator=","
                                renderText={(value) => <div>{value}</div>}
                                decimalScale="2"
                              />
                              <GrEdit />
                            </td>
                            <td style={{ textAlign: "right" }}>
                              <Link
                                to={"/test/" + historial.id}
                                className="btn_tabla"
                              >
                                VER
                              </Link>
                              <BsFillTrashFill
                                style={{
                                  cursor: "pointer",
                                  marginLeft: "5px",
                                  paddingBottom: "3px",
                                  height: "auto",
                                }}
                                size={18}
                                onClick={() =>
                                  this.deleteHistorial(historial.id)
                                }
                              />
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
        <Dialog
          open={this.state.open_update_puntaje}
          onClose={() => this.setState({ open_update_puntaje: false })}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Actuaizar puntuación
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
                  <label>
                    Puntaje actual es {this.state.puntaje.toFixed(2)} <br />{" "}
                    (los puntajes se almacenan en numero de tipo "float32" por o
                    que si coloca un numero con ceros decimales no
                    significativos se guardara como un numero entero ej. 4.00{" "}
                    {`=>`} 4)
                  </label>
                </div>
                <div className="col-12 input-group p-0">
                  <input
                    type="text"
                    onChange={(e) =>
                      this.setState({ newPuntaje: e.target.value })
                    }
                    name="nombre_simulacro"
                    placeholder="Ingesar nuevo puntaje"
                    className="form-control"
                    required=""
                  ></input>
                </div>
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <div
            // style={{
            //   display: "flex",
            //   width: "100%",
            //   gap: "10px",
            //   justifyContent: "center",
            // }}
            >
              <div
                style={
                  {
                    // width: "35%",
                    // display: "flex",
                    // justifyContent: "space-between",
                  }
                }
              >
                <Button
                  className="btn btn-primary"
                  onClick={() => this.setState({ open_update_puntaje: false })}
                  color="primary"
                >
                  Cancelar
                </Button>
                <Button
                  className="btn btn-primary"
                  onClick={() => this.updatePunajeTest()}
                  color="primary"
                  autoFocus
                >
                  Actualizar
                </Button>
              </div>
            </div>
          </DialogActions>
        </Dialog>

        <Dialog
          open={this.state.deleteHistorial}
          onClose={() => this.setState({ deleteHistorial: false })}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Eliminar Historial</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <div
                className="row"
                style={{
                  width: "500px",
                }}
              >
                <div className="col-12 input-group p-0">
                  <label>
                    Se eliminara el historial de este test. Desea continuar?
                  </label>
                </div>
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <div>
              <div>
                <Button
                  className="btn btn-primary"
                  onClick={() => this.setState({ deleteHistorial: false })}
                  color="primary"
                >
                  Cancelar
                </Button>
                <Button
                  className="btn btn-primary"
                  onClick={() => this.conirmDeleteHistorial()}
                  color="primary"
                  autoFocus
                >
                  Actualizar
                </Button>
              </div>
            </div>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default UserBasicoConfundido;
