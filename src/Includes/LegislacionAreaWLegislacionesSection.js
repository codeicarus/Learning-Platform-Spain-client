import React, { Component } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { Redirect } from "react-router-dom";

class LegislacionAreaWLegislacionesSection extends Component {
  state = {
    selected: false,
    shouldRedirect: false,
  };

  redirigir() {
    this.setState({ shouldRedirect: true });
  }

  changeSelected = () => {
    this.setState(
      {
        selected: !this.state.selected,
      },
      this.emitChange
    );
  };
  emitChange = () => {
    this.props.changeLegislacionesSelected(
      this.props.legislacion.id,
      this.state.selected
    );
  };
  className = () => {
    if (this.state.selected) {
      return "checkStyle la la-check text-right selected";
    } else {
      return "checkStyle la la-check text-right";
    }
  };

  checkAdm() {
    if (
      localStorage.getItem("email_penitenciarios") ===
        "Infopulbong@gmail.com" ||
      localStorage.getItem("email_penitenciarios") === "avilmor2@gmail.com" ||
      localStorage.getItem("email_penitenciarios") === "toledof764@gmail.com"
    )
      return (
        <FaPencilAlt
          size={25}
          className="position-absolute top-0"
          style={{ right: 0 }}
          onClick={(e) => {
            e.stopPropagation();
            this.redirigir();
          }}
        />
      );
    else return <></>;
  }

  render() {
    if (this.state.shouldRedirect) {
      return <Redirect to={`/legislacion-edit/${this.props.legislacion.id}`} />;
    }

    return (
      <li
        onClick={() => this.changeSelected()}
        className="list-group-item text-left position-relative"
      >
        <i className={this.className()}></i>
        <span> {this.props.legislacion.name}</span>
        {this.checkAdm(this.props.legislacion)}
      </li>
    );
  }
}

export default LegislacionAreaWLegislacionesSection;
