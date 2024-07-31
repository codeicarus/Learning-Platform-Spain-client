import React, { Component } from "react";
import { HiOutlineClipboardList } from "react-icons/hi";
import "./FirstLogin/BarraProgreso.css";
import { TextField } from "@material-ui/core";
import md5 from "md5";
import axios from "axios";
import { toast } from "react-toastify";
import { serverSocket } from "../App";

class UserExtraInformacion extends Component {
  state = {
    new_password: "",
  };
  constructor(props) {
    super(props);
  }

  setNewPassword() {
    axios
      .put(
        process.env.REACT_APP_URL_API + "usuarios/set-password",
        {
          id: this.props.usuario.id,
          new_password: md5(this.state.new_password),
        },
        {
          headers: {
            authorization: localStorage.getItem("token_penitenciarios"),
          },
        }
      )
      .then((res) => {
        toast.success("Contraseña actualizada con exito");
        if (this.props.usuario.connected == "online")
          serverSocket.emit("change-password-user", this.props.usuario);
      })
      .catch((error) => {
        toast.error(error.response.data.msg);
      });
  }

  render() {
    return (
      <div className="infor_user_container">
        <div className="infor_user">
          {this.props.usuario?.detalle?.map((pregunta, index) => {
            return (
              <div key={index}>
                <span>
                  <HiOutlineClipboardList />
                  <label>{pregunta.question}</label>
                </span>
                <label className="respuesta">{pregunta.answer}</label>
              </div>
            );
          })}
        </div>
        <div className="newpasswodUser">
          <TextField
            variant="standard"
            className="input"
            onChange={(e) => {
              this.setState({ new_password: e.target.value });
            }}
            value={this.state.new_password}
            label="Nueva contraseña"
          />
          <button
            className="btn btn-primary"
            onClick={() => this.setNewPassword()}
          >
            Guardar
          </button>
        </div>
      </div>
    );
  }
}

export default UserExtraInformacion;
