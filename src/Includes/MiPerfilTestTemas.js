import React, { Component } from "react";
import "react-toastify/dist/ReactToastify.css";
import NumberFormat from "react-number-format";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AiOutlineWarning } from "react-icons/ai";

import { GrEdit } from "react-icons/gr";
import { BsFillTrashFill } from "react-icons/bs";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class MiPerfilTestTemas extends Component {
  state = {
    redirect_to_test: false,
    id_test: 0,
    viewAdvertencia: false,
    historiaDelete: null,
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

  setHistorialDelete(historial) {
    this.setState({ historiaDelete: historial, viewAdvertencia: true });
  }

  deleteHistorial() {
    axios
      .post(
        process.env.REACT_APP_URL_API + `usuarios/delete-historial`,
        {
          id: this.state.historiaDelete.id,
        },
        {
          headers: {
            authorization: localStorage.getItem("token_penitenciarios"),
          },
        }
      )
      .then((res) => {
        this.setState({
          viewAdvertencia: false,
        });
        const result = this.props.stats.historiales.filter(
          (historial) => historial.id != this.state.historiaDelete.id
        );
        this.props.stats.historiales = result;
        this.forceUpdate();
        toast.success("Historial eliminado");
      })
      .catch((error) => {
        this.setState({ viewAdvertencia: false });
        if (error.response) {
          toast.error(error.response.data.error);
        }
      });
  }

  render() {
    const props = this.props;
    return (
      <div>
        {this.renderRedirectToTest()}
        <div className="row justify-content-center text-center items">
          {Object.keys(props.stats.tabla_relacion_nombre_areas).map(
            (id_area, keyIndex) => {
              const area = props.stats.tabla_relacion_nombre_areas[id_area];
              let num_temas_puestos = 0;
              let totales = 0;
              let acertadas = 0;
              let falladas = 0;
              let media = 0;
              if (props.stats.stats_areas_n_preguntas[id_area] !== undefined) {
                totales = props.stats.stats_areas_n_preguntas[id_area];
              } else {
                totales = 0;
              }
              if (
                props.stats.stats_areas_n_preguntas_acertadas[id_area] !==
                undefined
              ) {
                acertadas =
                  props.stats.stats_areas_n_preguntas_acertadas[id_area];
              } else {
                acertadas = 0;
              }
              if (
                props.stats.stats_areas_n_preguntas_falladas[id_area] !==
                undefined
              ) {
                falladas =
                  props.stats.stats_areas_n_preguntas_falladas[id_area];
              } else {
                falladas = 0;
              }
              if (totales != 0) {
                let cont = 0;
                // media = (10 / totales) * acertadas;

                // props.stats.historiales.map((h) =>
                //   h.temas.map(
                //     (t) =>
                //       props.stats.tabla_relacion_temas_areas[t] == id_area &&
                //       cont++
                //   )
                // );

                // console.log(props.stats.historiales);

                const xd = props.stats.historiales.map((h) =>
                  h.temas.filter((t) => {
                    return props.stats.tabla_relacion_temas_areas[t] == id_area;
                  })
                );

                xd.map((h) => h.length > 0 && cont++);

                let neta = parseFloat(acertadas) - parseFloat(falladas) / 3;
                let result = neta / cont;
                if (result < 0) media = 0;
                else media = result;

                // console.log(id_area);
                // console.log("######################################3");
                // props.stats.tabla_relacion_temas_areas
                // console.log(props.stats.tabla_relacion_temas_areas[id_area]);

                // console.log(xd);

                // console.log("########################");
                // console.log(`TOTALES: ${totales}`);
                // console.log(`Falladas: ${falladas}`);
                // console.log(`ACERTADAS: ${acertadas}`);
                // console.log(`MEDIA: ${media}`);
                // console.log(props.stats);
                // media = parseFloat(acertadas) - parseFloat(falladas) / 3;
                // console.log(parseFloat(acertadas) - parseFloat(falladas) / 3);
                // console.log(parseFloat(acertadas) - parseFloat(falladas) / 3);

                // console.log(xd);
                // console.log("########################");
              }

              return (
                <div
                  key={keyIndex}
                  className="col-12 col-md-6 col-lg-3 item mb-md-4 mb-lg-0 mb-xl-0"
                >
                  <div className="card card-area no-hover mb-4">
                    <h4
                      className="mt-0"
                      dangerouslySetInnerHTML={{
                        __html: this.changeTitle(area),
                        // .replace(/ Humana/g, "")
                        // .replace(/Derecho /g, ""),
                      }}
                    ></h4>
                    <div className="row justify-content-center text-center">
                      <div className="col-12">
                        <h3 className="mt-0">
                          <NumberFormat
                            value={media}
                            displayType={"text"}
                            decimalSeparator=","
                            renderText={(value) => <div>{value}</div>}
                            decimalScale="2"
                          />
                        </h3>
                        nota media
                      </div>
                    </div>
                  </div>
                  <div className="card no-hover ">
                    <h4 className="mt-0">Temas más fallados</h4>
                    <ul className="list-group list-group-flush">
                      {props.stats.stats_temas_mas_fallados.map(
                        (tema_mas_fallado, i) => {
                          if (
                            num_temas_puestos <= 3 &&
                            props.stats.tabla_relacion_temas_areas[
                              tema_mas_fallado.tema
                            ] == id_area
                          ) {
                            let TemaName =
                              props.stats.tabla_relacion_nombre_temas[
                                tema_mas_fallado.tema
                              ];
                            TemaName = TemaName.replace(/<\/?[^>]+(>|$)/g, "");
                            const newName = TemaName.slice(1);
                            const resultName = `<b>Tema ${newName}</b>`;

                            num_temas_puestos++;
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
                        }
                      )}
                      {[...Array(10)].map((x, i) => {
                        if (num_temas_puestos <= 3) {
                          num_temas_puestos++;
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
              );
            }
          )}
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
                      <th style={{ textAlign: "left", maxWidth: "250px" }}>
                        Tipo
                      </th>
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
                          historial.tipo == "Test por temas" ||
                          historial.tipo == "Test por bloques"
                        ) {
                          let title_a_poner = "";
                          historial.temas.map((id_tema, i) => {
                            title_a_poner +=
                              props.stats.tabla_relacion_nombre_temas_areas[
                                id_tema
                              ] + "<br>";
                          });
                          function convertirSegundos(segundos) {
                            let horas = Math.floor(segundos / 3600);
                            let minutos = Math.floor((segundos % 3600) / 60);
                            segundos = segundos % 60;
                            return [horas, minutos, segundos]
                              .map((v) => (v < 10 ? "0" + v : v))
                              .join(":");
                          }

                          return (
                            <tr
                              key={i}
                              style={
                                historial.isModified && {
                                  backgroundColor: "#ea777754",
                                }
                              }
                            >
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
                                {!historial.isModified ? (
                                  <>
                                    <Link
                                      to={"/test/" + historial.id}
                                      className="btn_tabla"
                                    >
                                      VER
                                    </Link>{" "}
                                    /{" "}
                                    <a
                                      onClick={() =>
                                        this.repetirTest(historial.id)
                                      }
                                      className="btn_tabla"
                                    >
                                      REPETIR
                                    </a>
                                  </>
                                ) : (
                                  <AiOutlineWarning
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                      this.setHistorialDelete(historial)
                                    }
                                    size={25}
                                  />
                                )}
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
        <Dialog
          open={this.state.viewAdvertencia}
          onClose={() => this.setState({ viewAdvertencia: false })}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Historial con preguntas actualizadas
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
                    El historial contiene preguntas eliminadas/actualizadas, por
                    lo que no podra repetir el test.
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
                  onClick={() => this.setState({ viewAdvertencia: false })}
                  color="primary"
                >
                  Cancelar
                </Button>
                <Button
                  className="btn btn-primary"
                  onClick={() => this.deleteHistorial()}
                  color="primary"
                  autoFocus
                >
                  Eliminar Test
                </Button>
              </div>
            </div>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default MiPerfilTestTemas;
