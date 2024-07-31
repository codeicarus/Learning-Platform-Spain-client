import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import md5 from "md5";
import { Link, Redirect } from "react-router-dom";

class MisDatosForm extends Component {
  state = {
    nombre: "",
    email: "",
    password: "",
    id_nivel: "",
    password_repeat: "",
    change_password: false,
    submited: false,
    errors: {
      nombre: "",
      email: "",
      id_nivel: "",
      password: "",
      password_repeat: "",
    },
    usuario: {},
  };

  componentDidMount() {
    this.setState({
      usuario: this.props.usuario,
      nombre: this.props.usuario.name,
      email: this.props.usuario.email,
      id_nivel: this.props.usuario.id_nivel,
    });
  }

  constructor(props) {
    super(props);
  }

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
        break;
      case "id_nivel":
        errors.id_nivel = value.length < 1 ? "El nivel debe estar relleno" : "";
        break;
      case "password":
        errors.password =
          value.length < 8
            ? "La contraseña debe tener 8 caracteres como mínimo"
            : "";
        errors.password =
          value === this.state.password_repeat
            ? ""
            : 'El campo "contraseña" y "Repita contraseña" deben ser iguales';

        if (!this.state.change_password) {
          errors.password = "";
        }

        break;
      case "password_repeat":
        errors.password =
          value === this.state.password
            ? ""
            : 'El campo "contraseña" y "Repita contraseña" deben ser iguales';

        if (!this.state.change_password) {
          errors.password = "";
        }
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

  submitMisDatosForm = (e) => {
    e.preventDefault();
    this.setState({
      submited: true,
    });
    if (this.validateForm(this.state.errors)) {
      this.doChangeMisDatos();
    }
  };

  async doChangeMisDatos() {
    let passAMandar = "";
    if (this.state.password != "") {
      passAMandar = md5(this.state.password);
    }
    axios
      .post(
        process.env.REACT_APP_URL_API + `usuarios/change_mis_datos`,
        {
          id_usuario: this.state.id,
          nombre: this.state.nombre,
          email: this.state.email,
          id_nivel: this.state.id_nivel,
          password: passAMandar,
          email_user_logued: localStorage.getItem("email_penitenciarios"),
        },
        {
          headers: {
            authorization: localStorage.getItem("token_penitenciarios"),
          },
        }
      )
      .then((res) => {
        document.location.href = "/mi-perfil?notify=1";
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.error);
        }
      });
  }

  changeSelectedChangePassword = () => {
    let errors = this.state.errors;
    errors.password = "La contraseña debe tener 8 caracteres como mínimo";
    this.setState({ errors });
    this.setState({
      change_password: !this.state.change_password,
    });
  };
  classNameChangePassword = () => {
    if (this.state.change_password) {
      return "checkStyle la la-check text-right selected";
    } else {
      return "checkStyle la la-check text-right";
    }
  };

  async getTestNivel() {
    axios
      .post(
        process.env.REACT_APP_URL_API + `usuarios/test_nivel`,
        {
          email: localStorage.getItem("email_penitenciarios"),
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

  render() {
    const { errors } = this.state;
    const { submited } = this.state;
    const { usuario } = this.state;
    return (
      <div>
        {this.renderRedirectToTest()}
        <div>
          <div className="row text-center">
            <div className="col-12 p-0">
              <form
                id="formRegisterForm"
                onSubmit={this.submitMisDatosForm}
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
                      defaultValue={this.state.nombre}
                      required
                    />
                    {errors.nombre.length > 0 && submited && (
                      <span className="error-form">{errors.nombre}</span>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div
                    className="col-md-12 col-lg-4 pl-0 pr-0 pr-lg-2 mt-2 mb-2"
                    style={{ width: "100%" }}
                  >
                    <input
                      onChange={this.changeFields}
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Email"
                      defaultValue={this.state.email}
                      required
                    />
                    {errors.email.length > 0 && submited && (
                      <span className="error-form">{errors.email}</span>
                    )}
                  </div>

                  {/* <div className="col-md-12 col-lg-4 pl-0 pr-0 pl-lg-2 mt-2 mb-2">
                                        <select onChange={this.changeFields} name="id_nivel" className="form-control" value={this.state.id_nivel} required>
                                            <option value="5ea6ad3dbb5c000045007637">Básico</option>
                                            <option value="5ea6ad4abb5c000045007638">Intermedio</option>
                                            <option value="5ea6ad51bb5c000045007639">Avanzado</option>
                                        </select>
                                        {(errors.id_nivel.length > 0 && submited) &&
                                        <span className='error-form'>{errors.id_nivel}</span>}
                                    </div> */}
                  {/* <div className="col-md-12 col-lg-4 pl-0 pr-0 pl-lg-2 mt-2 mb-2">
                                        <a onClick={() => {
                                            this.getTestNivel()
                                        }} className="btn primary-button">Hacer test de evaluación <i className="icon-question left"></i></a>
                                    </div> */}
                </div>
                <div className="col-12 p-0 mt-2 mb-2">
                  <ul className="list-group list-group-flush">
                    <li
                      onClick={() => this.changeSelectedChangePassword()}
                      className="list-group-item text-left"
                    >
                      <i className={this.classNameChangePassword()}></i>
                      <span> Cambiar contraseña</span>
                    </li>
                  </ul>
                </div>
                {this.state.change_password && (
                  <div className="row">
                    <div className="col-md-12 col-lg-6 pl-0 pr-0 pr-lg-2 mt-2 mb-2">
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
                    <div className="col-md-12 col-lg-6 pl-0 pr-0 pl-lg-2 mt-2 mb-2">
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
                        <span className="error-form">
                          {errors.password_repeat}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <div className="col-12 p-0 mt-2 mb-2">
                  <button type="submit" className="send btn primary-button">
                    Guardar <i className="icon-login left"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MisDatosForm;
