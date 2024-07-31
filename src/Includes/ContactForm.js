import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";

class ContactForm extends Component {
  initial_state = {
    nombre: "",
    email: "",
    mensaje: "",
    submited: false,
    errors: {
      nombre: "El nombre debe estar relleno",
      email: "El email debe tener un formato válido",
      mensaje: "El mensaje debe estar relleno",
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
        break;
      case "mensaje":
        errors.mensaje =
          value.length < 1 ? "El mensaje debe estar relleno" : "";
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

  submitContactForm = (e) => {
    e.preventDefault();
    this.setState({
      submited: true,
    });
    if (this.validateForm(this.state.errors)) {
      this.doContact();
    }
  };

  async doContact() {
    axios
      .post(process.env.REACT_APP_URL_API + `contact`, {
        nombre: this.state.nombre,
        email: this.state.email,
        mensaje: this.state.mensaje,
      })
      .then((res) => {
        document.getElementById("formContactForm").reset();
        this.setState(() => this.initial_state);
        toast.success("Mensaje enviado correctamente");
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.error);
        }
      });
  }

  render() {
    const { errors } = this.state;
    const { submited } = this.state;
    return (
      <section id="contacto" className="form featured all">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-6 align-self-center text-center text-md-left">
              <div className="row success message">
                <div className="col-12 p-0">
                  <i className="icon bigger icon-check"></i>
                  <h3>Success</h3>
                  <p>Your message has been sent successfully.</p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipiscing elit
                    quisque sed leo vel dolor dictum hendrerit.
                  </p>
                  <a href="#" className="btn mx-auto primary-button">
                    <i className="icon-refresh"></i>REFRESH
                  </a>
                </div>
              </div>

              <div className="row intro mb-3">
                <div className="col-12 p-0">
                  <div id="text-1">
                    <h2 className="featured alt">Contacto</h2>
                    <p>
                      Si tienes cualquier consulta, no dudes en contactarnos.
                    </p>
                  </div>
                </div>
              </div>

              <div className="row text-center">
                <div className="col-12 p-0">
                  <form
                    id="formContactForm"
                    onSubmit={this.submitContactForm}
                    noValidate
                  >
                    <fieldset id="group-1">
                      <div className="row">
                        <div className="col-sm-12 col-md-6 col-lg-6 pl-0 mb-3">
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
                        <div className="col-sm-12 col-md-6 col-lg-6 pr-0 mb-3">
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
                      </div>
                      <div className="row">
                        <div className="col-12 p-0 mb-3">
                          <textarea
                            onChange={this.changeFields}
                            type="text"
                            name="mensaje"
                            minLength="3"
                            className="form-control"
                            placeholder="Mensaje"
                            required
                          ></textarea>
                          {errors.mensaje.length > 0 && submited && (
                            <span className="error-form">{errors.mensaje}</span>
                          )}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 p-0 mt-2 mb-2">
                          <button
                            type="submit"
                            className="send btn primary-button"
                          >
                            Enviar <i className="icon-login left"></i>
                          </button>
                        </div>
                      </div>
                    </fieldset>
                  </form>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-6 align-self-center pl-md-5 bloque_mas_contacto">
              <p>Si lo prefieres puedes contactar con nosotros por:</p>
              {/* <p style={ { marginBottom: '30px' } }><b style={ { display: 'block' } } className="mb-2">Whatsapp</b>
                                <a target="_blank" href="tel:603161768"><i style={ { color: '#0DBF42', fontSize: '40px', lineHeight: '30px', verticalAlign: 'bottom' } } className="la la-whatsapp mr-2" ></i><span style={ { color: '#6f6f6f', fontSize: '25px', lineHeight: '30px' } }>603 161 768</span></a>
                            </p> */}

              <p>
                <b style={{ display: "block" }} className="mb-2">
                  Email
                </b>
                <a
                  target="_blank"
                  href="mailto:penitenciarios@penitenciarios.com"
                >
                  <i
                    style={{
                      color: "#5a92fa",
                      fontSize: "40px",
                      lineHeight: "30px",
                      verticalAlign: "bottom",
                    }}
                    className="icon-envelope mr-2"
                  ></i>
                  <span
                    style={{
                      color: "#6f6f6f",
                      fontSize: "25px",
                      lineHeight: "30px",
                    }}
                  >
                    penitenciarios@penitenciarios.com
                  </span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default ContactForm;
