import React, { Component } from "react";
import "./styles/style.css";
import axios from "axios";
import { toast } from "react-toastify";
import { GrEdit } from "react-icons/gr";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class SimulacrosAreaWSimulacrosSection extends Component {
  state = {
    selected: false,
    hidden: false,
    simulacroEdit: {},
    edit: false,
    newNameSimulacro: "",
    simulacroNivel: "",
  };

  constructor(props) {
    super(props);
    this.up = this.props.getThis;
  }

  deleteSimulacro(e, simulacro) {
    e.stopPropagation();
    axios
      .post(
        process.env.REACT_APP_URL_API + "delete_simulacro",
        {
          id: simulacro.id,
          name: simulacro.name,
          id_nivel: simulacro.id_nivel,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token_penitenciarios"),
          },
        }
      )
      .then((res) => {
        toast.success(`Simulacro "${simulacro.name}" eliminado con exito`);
        this.setState({ hidden: true });
      })
      .catch((err) => toast.error(err.response.data.message));
  }

  editNameSimulacro() {
    axios
      .post(
        process.env.REACT_APP_URL_API + "update-name-simulacro",
        {
          id: this.state.simulacroEdit.id,
          newName: this.state.newNameSimulacro,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token_penitenciarios"),
          },
        }
      )
      .then((res) => {
        toast.success(
          `Simulacro Actualizado con exito (actualiza para ver los cambios)`
        );
        this.setState({
          simulacroEdit: {},
          edit: false,
          newNameSimulacro: "",
          simulacroNivel: "",
        });
      })
      .catch((err) => toast.error(err.response.data.message));
  }

  selectEdit(e, simulacro) {
    e.stopPropagation();
    let newState = { simulacroEdit: simulacro, edit: true, simulacroNivel: "" };
    if (simulacro.id_nivel == "5ea6ad3dbb5c000045007637")
      newState.simulacroNivel = "Basico";
    else if (simulacro.id_nivel == "5ea6ad4abb5c000045007638")
      newState.simulacroNivel = "Intermedio";
    else if (simulacro.id_nivel == "5ea6ad51bb5c000045007639")
      newState.simulacroNivel = "Avanzado";

    this.setState(newState);
  }

  verifyAcountDelete(simulacro) {
    if (
      localStorage.getItem("email_penitenciarios") ===
        "Infopulbong@gmail.com" ||
      localStorage.getItem("email_penitenciarios") === "avilmor2@gmail.com" ||
      localStorage.getItem("email_penitenciarios") === "toledof764@gmail.com"
    ) {
      return (
        <div className="opt">
          <GrEdit
            className="edit"
            onClick={(e) => this.selectEdit(e, simulacro)}
          />
          <button onClick={(e) => this.deleteSimulacro(e, simulacro)}>X</button>
        </div>
      );
    }
  }

  changeSelected = () => {
    if (this.props.simulacros_selected.includes(this.props.simulacro.id)) {
    } else {
      this.setState(
        {
          selected: true,
        },
        this.emitChange
      );
    }
  };
  emitChange = () => {
    this.props.changeSimulacrosSelected(
      this.props.simulacro.id,
      this.state.selected
    );
  };
  className = () => {
    if (
      this.state.selected &&
      this.props.simulacros_selected.includes(this.props.simulacro.id)
    ) {
      return "radioStyle la la-check text-right selected";
    } else {
      return "radioStyle la la-check text-right";
    }
  };

  render() {
    return (
      <>
        <li
          style={this.state.hidden ? { display: "none" } : { display: "block" }}
          onClick={() => this.changeSelected()}
          className="list-group-item text-left simulacro"
        >
          <i className={this.className()}></i>
          <span> {this.props.simulacro.name}</span>
          {this.verifyAcountDelete(this.props.simulacro)}
        </li>
        <Dialog
          open={this.state.edit}
          onClose={() => this.setState({ edit: false })}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Cambiar nombre de simulacro
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
                    Elija un nuevo nombre para el simulacro{" "}
                    <label className="text-border">
                      {this.state.simulacroEdit.name}
                    </label>{" "}
                    del nivel{" "}
                    <label className="text-border">
                      {this.state.simulacroNivel}
                    </label>
                    . (Los nombres deben estar conformado por letras y numero de
                    esta forma {"=>"} "Simulacro 1" o "Simulacro 01" para poder
                    ordenarse)
                  </label>
                </div>
                <div className="col-12 input-group p-0">
                  <input
                    type="text"
                    onChange={(e) =>
                      this.setState({ newNameSimulacro: e.target.value })
                    }
                    name="nombre_simulacro"
                    placeholder="Ingesar nuevo nombre"
                    className="form-control"
                    required=""
                  ></input>
                </div>
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <div>
              <div>
                <Button
                  className="btn btn-primary"
                  onClick={() => this.setState({ edit: false })}
                  color="primary"
                >
                  Cancelar
                </Button>
                <Button
                  className="btn btn-primary"
                  onClick={() => this.editNameSimulacro()}
                  color="primary"
                  autoFocus
                >
                  Cambiar nombre
                </Button>
              </div>
            </div>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default SimulacrosAreaWSimulacrosSection;
