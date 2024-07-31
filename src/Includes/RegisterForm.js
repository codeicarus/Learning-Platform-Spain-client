import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import md5 from "md5";
import "./register.css";
import { Link } from "react-router-dom";

class RegisterForm extends Component {
  initial_state = {
    nombre: "",
    email: "",
    email_repeat: "",
    password: "",
    password_repeat: "",
    cod_pro_academia: "",
    submited: false,
    terminos_aceptados: false,
    newsletter: false,
    loading: false,
    errors: {
      nombre: "El nombre debe estar relleno",
      email: "El email debe tener un formato válido",
      email_repeat: "",
      password: "La contraseña debe tener 8 caracteres como mínimo",
      password_repeat: "",
    },
  };
  state = this.initial_state;

  changeFields = (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    let errors = this.state.errors;
    const validEmailRegex = RegExp(
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
    );

    this.setState({
      [name]: value,
    });

    switch (name) {
      case "nombre":
        errors.nombre = value.length < 1 ? "El nombre debe estar relleno" : "";
        break;
      case "email":
        errors.email = validEmailRegex.test(value)
          ? ""
          : "El email debe tener un formato válido";

        errors.email =
          value === this.state.email_repeat
            ? ""
            : 'El campo "Email" y "Repita el Email" deben ser iguales';
        break;
      case "email_repeat":
        errors.email =
          value === this.state.email
            ? ""
            : 'El campo "Email" y "Repita el Email" deben ser iguales';
        break;
      case "password":
        errors.password =
          value.length < 8
            ? "La contraseña debe tener 8 caracteres como mínimo"
            : "";
        errors.password =
          value === this.state.password_repeat
            ? ""
            : 'El campo "Contraseña" y "Repita contraseña" deben ser iguales';
        break;
      case "password_repeat":
        errors.password =
          value === this.state.password
            ? ""
            : 'El campo "Contraseña" y "Repita contraseña" deben ser iguales';
        break;
      default:
        break;
    }
    this.setState({ errors });
  };

  validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      // if we have an error string set valid to false
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
  };

  submitRegisterForm = (e) => {
    e.preventDefault();
    this.setState({
      submited: true,
    });
    if (this.validateForm(this.state.errors)) {
      if (!this.state.terminos_aceptados) {
        toast.error(
          "Debes aceptar la política de privacidad y el aviso legal para poder registrarte"
        );
      } else {
        this.doRegister();
      }
    }
  };

  async doRegister() {
    let newsletter = "0";
    if (this.state.newsletter) {
      newsletter = "1";
    }

    this.setState({
      loading: true,
    });

    axios
      .post(process.env.REACT_APP_URL_API + `usuarios/register`, {
        nombre: this.state.nombre,
        email: this.state.email.toLocaleLowerCase(),
        password: md5(this.state.password),
        codigo_promocional: this.state.cod_pro_academia,
        n_letter: newsletter,
      })
      .then((res) => {
        document.getElementById("formRegisterForm").reset();
        this.setState(() => this.initial_state);
        toast.success(
          "Se ha registrado correctamente, le hemos enviado un email para confirmar su correo electrónico"
        );
      })
      .catch((error) => {
        if (error.response) {
          this.setState({ loading: false });
          toast.error(error.response.data.error);
        }
      });
  }
  changeSelectedTerminosAceptados = () => {
    this.setState({
      terminos_aceptados: !this.state.terminos_aceptados,
    });
  };
  classNameTerminosAceptados = () => {
    if (this.state.terminos_aceptados) {
      return "checkStyle la la-check text-right selected";
    } else {
      return "checkStyle la la-check text-right";
    }
  };
  changeSelectedNewsletter = () => {
    this.setState({
      newsletter: !this.state.newsletter,
    });
  };
  classNameNewsletter = () => {
    if (this.state.newsletter) {
      return "checkStyle la la-check text-right selected";
    } else {
      return "checkStyle la la-check text-right";
    }
  };

  render() {
    const { errors } = this.state;
    const { submited } = this.state;
    return (
      <div>
        <div className="row intro">
          <div className="col-12 p-0">
            <div id="text-1">
              <h2 className="featured alt">Registrarme</h2>
              <p>
                Aún no te has unido a penitenciarios.com, <b>¡regístrate!</b>,
                es muy sencillo
              </p>
            </div>
          </div>
        </div>
        <div className="row text-center">
          <div className="col-12 p-0">
            <form
              id="formRegisterForm"
              onSubmit={this.submitRegisterForm}
              noValidate
            >
              <div className="row">
                <div className="col-12 p-0 mt-2 mb-2">
                  <input
                    onChange={this.changeFields}
                    type="text"
                    name="nombre"
                    minLength="3"
                    className="form-control"
                    placeholder="Nombre"
                    required
                  />
                  {errors.nombre.length > 0 && submited && (
                    <span className="error-form">{errors.nombre}</span>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-6 pl-0 mt-2 mb-2">
                  <input
                    onChange={this.changeFields}
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    required
                  />
                  {errors.email.length > 0 && submited && (
                    <span className="error-form">{errors.email}</span>
                  )}
                </div>
                <div className="col-6 pr-0 mt-2 mb-2">
                  <input
                    onChange={this.changeFields}
                    type="email"
                    name="email_repeat"
                    className="form-control"
                    placeholder="Repite el Email"
                    required
                  />
                  {errors.email_repeat.length > 0 && submited && (
                    <span className="error-form">{errors.email_repeat}</span>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-6 pl-0 mt-2 mb-2">
                  <input
                    onChange={this.changeFields}
                    type="password"
                    name="password"
                    minLength="8"
                    className="form-control"
                    placeholder="Contraseña"
                    required
                  />
                  {errors.password.length > 0 && submited && (
                    <span className="error-form">{errors.password}</span>
                  )}
                </div>
                <div className="col-6 pr-0 mt-2 mb-2">
                  <input
                    onChange={this.changeFields}
                    type="password"
                    name="password_repeat"
                    minLength="8"
                    className="form-control"
                    placeholder="Repite contraseña"
                    required
                  />
                  {errors.password_repeat.length > 0 && submited && (
                    <span className="error-form">{errors.password_repeat}</span>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-12 p-0 mt-2 mb-2">
                  <input
                    onChange={this.changeFields}
                    type="text"
                    name="cod_pro_academia"
                    minLength="3"
                    className="form-control"
                    placeholder="Código promocional"
                    required
                  />
                </div>
              </div>
              <div className="col-12 p-0 mt-2 mb-2">
                <ul className="list-group list-group-flush">
                  <li
                    onClick={() => this.changeSelectedTerminosAceptados()}
                    className="list-group-item text-left"
                  >
                    <i className={this.classNameTerminosAceptados()}></i>
                    <span>
                      {" "}
                      He leído y acepto la{" "}
                      <a
                        target="_blank"
                        href="/politica-de-privacidad"
                        style={{
                          textDecoration: "underline",
                        }}
                      >
                        política de privacidad
                      </a>{" "}
                      y el{" "}
                      <a
                        target="_blank"
                        href="/aviso-legal"
                        style={{
                          textDecoration: "underline",
                        }}
                      >
                        aviso legal
                      </a>
                      .
                    </span>
                  </li>
                </ul>
              </div>
              <div className="col-12 p-0 mt-2 mb-2">
                <ul className="list-group list-group-flush">
                  <li
                    onClick={() => this.changeSelectedNewsletter()}
                    className="list-group-item text-left"
                  >
                    <i className={this.classNameNewsletter()}></i>
                    <span>
                      {" "}
                      Deseo recibir información sobre promociones y noticias de
                      penitenciarios.com.
                    </span>
                  </li>
                </ul>
              </div>
              <div className="col-12 p-0 mt-2 mb-2">
                <button
                  type="submit"
                  disabled={this.state.loading}
                  className="send btn primary-button"
                >
                  {this.state.loading ? (
                    <img
                      className="load-animated"
                      src="/assets/images/load-animated.svg"
                      alt="load-animated"
                    />
                  ) : (
                    "Registrarme"
                  )}
                  <i className="icon-login left"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
