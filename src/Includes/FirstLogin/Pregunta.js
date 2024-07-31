import React, { Component } from "react";
import "./BarraProgreso.css";

class Pregunta extends Component {
  constructor(props) {
    super(props);
    this.data = this.props.data;
    this.next1 = this.props.next;
  }

  render() {
    return (
      <div className="pregunta">
        <h6>{this.data.question}</h6>
        <div className="options">
          {this.data.awnsers.map((respuesta, i) => (
            <a
              key={i}
              onClick={() => this.next1(respuesta, this.data.adm)}
              className="btn ml-auto mr-auto mb-3 primary-button"
            >
              <i className="icon-chart"></i> {respuesta}
            </a>
          ))}
        </div>
      </div>
    );
  }
}

export default Pregunta;
