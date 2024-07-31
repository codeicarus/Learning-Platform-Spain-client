import React, { Component } from "react";
import preguntas from "./NewUser.json";
import Pregunta from "./FirstLogin/Pregunta";
import axios from "axios";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";
import "./FirstLogin/BarraProgreso.css";
import ImageNewUser from "./ImageNewUser";

class TestNuevoUsuario extends Component {
  constructor(props) {
    super(props);
    this.niveles = this.props.niveles;
    this.viewImg = [
      "/assets/images/questionImage/1.jpg",
      "/assets/images/questionImage/2.jpg",
      "/assets/images/questionImage/3.jpg",
      "/assets/images/questionImage/4.png",
      "/assets/images/questionImage/5.png",
      "/assets/images/questionImage/6.jpg",
    ];
    this.state = {
      complete: 0,
      pregunta_numero: 1,
      preguntas: [],
      niveles: this.props.niveles,
      redirect: null,
    };
  }

  setState(newState) {
    this.state = { ...newState };
    this.niveles = this.props.niveles;
    this.forceUpdate();
  }

  setRedirect(url) {
    this.state.redirect = url;
    this.forceUpdate();
  }

  sigPregunta = (respuesta, pregunta) => {
    let respuestas = this.state.preguntas;
    respuestas.push({ question: pregunta, answer: respuesta });
    if (this.state.pregunta_numero === preguntas.length) {
      this.setState({
        complete: (this.state.complete += 16.7),
        preguntas: respuestas,
      });

      this.setNivel("5ea6ad3dbb5c000045007637");
      return;
    }
    this.setState({
      complete: (this.state.complete += 16.7),
      pregunta_numero: this.state.pregunta_numero++,
      preguntas: respuestas,
    });
  };

  setNivel(id) {
    axios
      .put(
        process.env.REACT_APP_URL_API + `usuarios/nivel`,
        {
          email: localStorage.getItem("email_penitenciarios"),
          id_nivel: id,
          preguntas: this.state.preguntas,
        },
        {
          headers: {
            authorization: localStorage.getItem("token_penitenciarios"),
          },
        }
      )
      .then((res) => {
        this.setState({
          complete: (this.state.complete += 16.7),
        });
        // return <Redirect to="/dashboard" />;
        this.setRedirect("/dashboard");
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.error);
        }
      });
  }

  renderButtonsNiveles = () => {
    if (this.props.niveles.length > 0) {
      return (
        <div className="pregunta" style={{ width: "100%" }}>
          <p>Que nivel soy?</p>
          <div
            className="options"
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            {this.props.niveles.map((nivel, index) => {
              return (
                <a
                  key={index}
                  onClick={() => this.setNivel(nivel.id)}
                  className="btn ml-auto mr-auto mb-3 primary-button"
                >
                  <i className="icon-chart"></i> Soy nivel {nivel.name}
                </a>
              );
            })}
          </div>
        </div>
      );
    }
    return "";
  };
  volver() {
    let ant = this.state.preguntas.pop();
    this.setState({
      complete: (this.state.complete -= 16.7),
      pregunta_numero: this.state.pregunta_numero--,
      preguntas: ant,
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div className="first_login">
        <div className="barra_preguntas">
          <div style={{ width: `${this.state.complete}%` }}></div>
        </div>
        {/* <div style={{ height: "30px" }}> */}
        {/* {this.state.pregunta_numero > 1 && (
            <button
              onClick={() => this.volver()}
              className="btn secundary-button"
            >
              <i className="icon-arrow-left-circle"></i>Volver
            </button>
          )} */}
        {/* </div> */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
          className="text-title"
        >
          <p className="text-title" style={{ textAlign: "start" }}>
            Pregunta N°: {this.state.pregunta_numero}
          </p>
          {this.state.pregunta_numero > 1 && (
            <div style={{ alignItems: "start", margin: "0", padding: "0" }}>
              <button
                onClick={() => this.volver()}
                className="btn secundary-button"
                style={{ padding: "0", marginRight: "10px" }}
              >
                <i className="icon-arrow-left-circle"></i>Volver
              </button>
            </div>
          )}
        </div>
        <div className="preguntas-render">
          {
            this.state.pregunta_numero <= 6 && (
              <Pregunta
                key={this.state.pregunta_numero}
                next={this.sigPregunta}
                data={preguntas[this.state.pregunta_numero - 1]}
              />
            )
            //  : (
            //   // this.renderButtonsNiveles()
            //   null
            // )
          }
          {this.viewImg && (
            <ImageNewUser
              image={this.state.pregunta_numero - 1}
              className={
                this.state.pregunta_numero === 1 ? "img-scale" : "questin-image"
              }
            />
            // <img src={this.viewImg[this.state.pregunta_numero - 1]} alt />
          )}
        </div>
      </div>
    );
  }
}

export default TestNuevoUsuario;
