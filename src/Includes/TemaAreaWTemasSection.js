import React, { Component } from "react";
import { Link } from "react-router-dom";
import { GrEdit } from "react-icons/gr";

class TemaAreaWTemasSection extends Component {
  state = {
    selected: false,
    // deleteTema: false,
  };

  changeSelected = () => {
    this.setState(
      {
        selected: !this.state.selected,
      },
      this.emitChange
    );
  };
  emitChange = () => {
    this.props.changeTemasSelected(this.props.tema.id, this.state.selected);
  };
  className = () => {
    if (this.state.selected) {
      return "checkStyle la la-check text-right selected";
    } else {
      return "checkStyle la la-check text-right";
    }
  };

  checkAdm(tema) {
    if (
      localStorage.getItem("email_penitenciarios") ===
        "Infopulbong@gmail.com" ||
      localStorage.getItem("email_penitenciarios") === "avilmor2@gmail.com" ||
      localStorage.getItem("email_penitenciarios") === "toledof764@gmail.com"
    ) {
      return (
        <Link to={`/tema-edit/${tema.id}`}>
          <GrEdit
            className="position-absolute"
            style={{ right: 0 }}
            size={25}
          />
        </Link>
      );
    }
    return <></>;
  }

  render() {
    if (this.props.tema.abreviacion_publica == "NO") {
      return "";
    } else {
      if (
        new Date().getTime() / 1000 <
        localStorage.getItem("penitenciarios_mds")
      ) {
        return (
          <li
            onClick={() => this.changeSelected()}
            className="list-group-item text-left position-relative"
          >
            <i className={this.className()}></i>
            <span>
              {" "}
              {this.props.tema.abreviacion_publica} - {this.props.tema.name}
            </span>
            {this.checkAdm(this.props.tema)}
          </li>
        );
      } else if (
        new Date().getTime() / 1000 >=
          localStorage.getItem("penitenciarios_mds") &&
        this.props.tema.abreviacion == "T5DP"
      ) {
        return (
          <li
            onClick={() => this.changeSelected()}
            className="list-group-item text-left tema_activado"
          >
            <i className={this.className()}></i>
            <span className="relative">
              {" "}
              {this.props.tema.abreviacion_publica} - {this.props.tema.name}
            </span>
          </li>
        );
      } else {
        return (
          <li
            title="Hasta que no te suscribas solo puedes hacer tests del tema 5 de Derecho Penitenciario"
            className="list-group-item text-left tema_capado"
          >
            <i className={this.className()}></i>
            <span>
              {" "}
              {this.props.tema.abreviacion_publica} - {this.props.tema.name}
            </span>
          </li>
        );
      }
    }
  }
}

export default TemaAreaWTemasSection;
