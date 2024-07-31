import React, { Component } from "react";
import preguntas from "./NewUser.json";

class TestuserNuevoPreguntas extends Component {
  render() {
    return (
      <div>
        {preguntas.map(function (pregunta, i) {
          let classes_a_poner = "";
          if (i === 0) {
            classes_a_poner = "colores_intercambiados featured left pb-5 pt-5";
          } else if (i % 2 === 0) {
            classes_a_poner = "colores_intercambiados featured left pb-5 pt-5";
          } else {
            classes_a_poner = "colores_intercambiados featured right pb-5 pt-5";
          }

          let pregunta_a_poner = pregunta.question;
          //   let pregunta_a_poner = "";
          //   if (
          //     pregunta.pregunta.indexOf("<br") == -1 &&
          //     pregunta.pregunta.indexOf("<p") == -1
          //   ) {
          //     pregunta_a_poner = pregunta.pregunta.replace(/\n/g, "<br />");
          //   } else {
          //     pregunta_a_poner = pregunta.pregunta;
          //   }
          return (
            <section id={"la_pregunta" + i} className={classes_a_poner} key={i}>
              <div
                style={{ paddingLeft: "25px", paddingRight: "25px" }}
                className="container"
              >
                <div className="row intro">
                  <div className="col-12 col-md-12 align-self-center text-left pt-5">
                    <div className="p_pregunta">
                      {/* {thisComponent.renderPreguntaEstrella(pregunta.id)} */}
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
                      {pregunta.awnsers.map(function (respuesta, i) {
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
                        // } else {
                        respuesta_a_poner = respuesta;
                        // }

                        return (
                          <li
                            // onClick={() =>
                            //     thisComponent.changeSelectedMarcarRespuestas(
                            //       pregunta.id,
                            //       respuesta.id
                            //     )
                            // }
                            className="1a2s"
                            key={i}
                          >
                            <i
                              style={{ float: "left" }}
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
                </div>

                {/* {thisComponent.renderSuper(thisComponent, pregunta)} */}
              </div>
            </section>
          );
        })}
      </div>
    );
  }
}

export default TestuserNuevoPreguntas;
