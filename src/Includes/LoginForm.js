import React, { Component } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Redirect } from "react-router-dom";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { serverSocket } from "../App";

class LoginForm extends Component {
  initial_state = {
    submited_reset: false,
    open_reset: false,
    open_userConnected: false,
    email_reset: "",
    email: "",
    password: "",
    submited: false,
    redirectDashboard: false,
    redirectFirstLogin: false,
    errors: {
      email: "El email debe tener un formato válido",
      password: "",
    },
    errors_reset: {
      email_reset: "El email debe tener un formato válido",
    },
  };
  state = this.initial_state;

  open_reset = () => this.setState({ open_reset: true });
  close_reset = () => this.setState({ open_reset: false });

  open_userConnected = () => this.setState({ open_userConnected: true });
  close_userConnected = () => this.setState({ open_userConnected: false });

  changeFields = (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    let errors = this.state.errors;
    let errors_reset = this.state.errors_reset;
    const validEmailRegex = RegExp(
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    );

    switch (name) {
      case "email_reset":
        errors_reset.email_reset = validEmailRegex.test(value)
          ? ""
          : "El email debe tener un formato válido";
        this.setState({ errors_reset, [name]: value });
        break;
      case "email":
        errors.email = validEmailRegex.test(value)
          ? ""
          : "El email debe tener un formato válido";
        this.setState({ errors, [name]: value });
        break;
      case "password":
        errors.password = "";
        //   value.length < 8
        //     ? "La contraseña debe tener 8 caracteres como mínimo"
        //     : "";
        this.setState({ errors, [name]: value });
        break;
      default:
        break;
    }
  };

  validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      // if we have an error string set valid to false

      (val) => val.length > 0 && (valid = false)
    );
    return valid;
  };

  submitLoginForm = (e) => {
    e.preventDefault();
    this.setState({
      submited: true,
    });
    if (this.validateForm(this.state.errors)) {
      this.doLogin();
    }
  };

  async doLogin() {
    axios
      .get("https://jsonip.com/")
      .then((res) => {
        axios
          .post(process.env.REACT_APP_URL_API + `usuarios/login`, {
            ip: res.data.ip,
            email: this.state.email,
            password: this.state.password,
          })
          .then((res) => {
            document.getElementById("formLoginForm").reset();
            this.setState(() => this.initial_state);
            serverSocket.emit("user-connected", {
              token: res.data.token,
              email: res.data.email,
            });
            localStorage.setItem("token_penitenciarios", res.data.token);
            localStorage.setItem("email_penitenciarios", res.data.email);
            localStorage.setItem(
              "penitenciarios_mds",
              res.data.maximo_dia_suscripcion
            );
            if (!res.data.first_login) {
              this.setState({
                redirectFirstLogin: true,
              });
            } else {
              this.setState({
                redirectDashboard: true,
              });
            }
            this.props.update_menu();
          })
          .catch((error) => {
            if (
              error.response.data.error ==
              "Usuario conectado en otro dispositivo"
            ) {
              this.open_userConnected();
            }
            if (error.response) {
              toast.error(error.response.data.error);
            }
          });
      })
      .catch((error) => {});
  }

  submit_reset() {
    this.setState({
      submited_reset: true,
    });

    if (this.state.errors_reset.email_reset == "") {
      this.goReset();
    }
  }

  async goReset() {
    axios
      .post(process.env.REACT_APP_URL_API + `usuarios/reset_password`, {
        email: this.state.email_reset,
      })
      .then((res) => {
        toast.success(
          "Le hemos enviado un email con las instrucciones para cambiar su contraseña"
        );
        this.setState({
          open_reset: false,
          submited_reset: false,
          email_reset: "",
        });
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.error);
        }
      });
  }

  renderRedirectDashboard = () => {
    if (this.state.redirectDashboard) {
      return <Redirect to="/dashboard" />;
    }
  };
  renderRedirectFirstLogin = () => {
    if (this.state.redirectFirstLogin) {
      return <Redirect to="/first-login" />;
    }
  };

  closeOtherSessions(data) {
    serverSocket.emit("close-other-sessions", data);
    this.doLogin();
  }

  render() {
    const { errors } = this.state;
    const { errors_reset } = this.state;
    const { submited } = this.state;
    const { submited_reset } = this.state;
    return (
      <div>
        {this.renderRedirectDashboard()}
        {this.renderRedirectFirstLogin()}
        <div className="row intro">
          <div className="col-12 p-0">
            <h2 className="featured alt">Entrar</h2>
            <p>
              Si ya estas registrado escribe tus datos y haz click en "Entrar"
            </p>
          </div>
        </div>
        <div className="row text-center">
          <div className="col-12 p-0">
            <form id="formLoginForm" onSubmit={this.submitLoginForm} noValidate>
              <div className="row">
                <div className="col-12 p-0 mt-2 mb-2">
                  <input
                    onChange={this.changeFields}
                    type="email"
                    id="formEmailLogin"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    required
                  />
                  {errors.email.length > 0 && submited && (
                    <span className="error-form">{errors.email}</span>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-12 p-0 mt-2 mb-2">
                  <input
                    onChange={this.changeFields}
                    type="password"
                    id="formPasswordLogin"
                    name="password"
                    className="form-control"
                    placeholder="Contraseña"
                    required
                  />
                  {errors.password.length > 0 && submited && (
                    <span className="error-form">{errors.password}</span>
                  )}
                </div>
              </div>
              <div className="col-12 p-0 mt-2 mb-2">
                <a
                  style={{
                    color: "rgb(30, 80, 188)",
                    float: "right",
                    cursor: "pointer",
                  }}
                  className="pull-right"
                  onClick={() => this.open_reset()}
                >
                  ¿Olvidaste la contraseña?
                </a>
                <button type="submit" className="send btn primary-button">
                  Entrar <i className="icon-login left"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
        <Dialog
          open={this.state.open_reset}
          onClose={() => this.close_reset()}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Cambiar contraseña</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <div
                className="row"
                style={{
                  width: "500px",
                }}
              >
                <p>
                  Introduce tu email y le enviaremos un email con las
                  instrucciones para cambiar contraseña
                </p>
                <div className="col-12 input-group p-0">
                  <input
                    type="email"
                    onChange={this.changeFields}
                    name="email_reset"
                    className="form-control"
                    placeholder="email@email.com"
                    required=""
                  ></input>
                </div>
                {errors_reset.email_reset.length > 0 && submited_reset && (
                  <span className="error-form">{errors_reset.email_reset}</span>
                )}
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              className="btn btn-primary"
              onClick={() => this.close_reset()}
              color="primary"
            >
              Cancelar
            </Button>
            <Button
              className="btn btn-primary"
              onClick={() => this.submit_reset()}
              color="primary"
              autoFocus
            >
              CAMBIAR
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={this.state.open_userConnected}
          onClose={() => this.close_userConnected()}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Usuario conectado en otro dispositivo
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <div
                className="row"
                style={{
                  width: "500px",
                }}
              >
                <p>
                  Para iniciar sesión en este dispositivo deberás cerrar las
                  demás sesiones
                </p>
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              className="btn btn-primary"
              onClick={() => this.close_userConnected()}
              color="primary"
            >
              Cancelar
            </Button>
            <Button
              className="btn btn-primary"
              onClick={() => this.closeOtherSessions(this.state.email)}
              color="primary"
              autoFocus
            >
              Mantener esta sesion
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default LoginForm;
