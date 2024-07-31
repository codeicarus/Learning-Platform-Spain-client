import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import FileBase64 from "react-file-base64";
import { toast } from "react-toastify";
import ReactGA from "react-ga";

class ImportadorPage extends Component {
  initial_state = {
    file: "",
    tipo: "importadores",
    submited: false,
    view_render: false,
    redirect_to_login: false,
    errores_importacion: "",
    errors: {
      file: "El file debe estar relleno",
      tipo: "",
    },
  };
  state = this.initial_state;

  componentDidMount() {
    ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALITYCS);
    ReactGA.pageview(window.location.pathname + window.location.search);
    window.scrollTo(0, 0);
    this.doCheckSuper();
  }

  async doCheckSuper() {
    if (localStorage.hasOwnProperty("token_penitenciarios")) {
      axios
        .post(
          process.env.REACT_APP_URL_API + `usuarios/checksuper`,
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
            view_render: true,
          });
        })
        .catch((error) => {
          localStorage.removeItem("token_penitenciarios");
          localStorage.removeItem("email_penitenciarios");
          this.setState({
            redirect_to_login: true,
          });
        });
    }
  }

  renderRedirectToLogin = () => {
    if (this.state.redirect_to_login) {
      return <Redirect to="/login" />;
    }
  };

  changeFields = (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    let errors = this.state.errors;

    switch (name) {
      default:
        break;
    }
    this.setState({ errors, [name]: value });
  };

  validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      // if we have an error string set valid to false
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
  };

  submitImportadorForm = (e) => {
    e.preventDefault();
    this.setState({
      submited: true,
    });
    if (this.validateForm(this.state.errors)) {
      //e.target.reset();
      this.doImport();
    }
  };

  async doImport() {
    this.setState({
      errores_importacion: "",
    });
    let name = this.state.file.name.slice(0, this.state.file.name.length - 5);
    axios
      .post(
        process.env.REACT_APP_URL_API + `` + this.state.tipo,
        {
          email: localStorage.getItem("email_penitenciarios"),
          file: this.state.file.base64.split(",")[1],
          name: name.toLowerCase(),
        },
        {
          headers: {
            authorization: localStorage.getItem("token_penitenciarios"),
          },
        }
      )
      .then((res) => {
        toast.success("Fichero subido");
      })
      .catch((error) => {
        if (error.response) {
          this.setState({
            errores_importacion: error.response.data.error,
          });
        }
      });
  }

  // Callback~
  getFiles(files) {
    let errors = this.state.errors;
    errors.file = "";
    this.setState({ errors, file: files });
  }

  render() {
    if (this.state.view_render) {
      const { errors } = this.state;
      const { submited } = this.state;
      const { errores_importacion } = this.state;
      return (
        <div>
          <section id="services" className="offers featured left">
            <div className="container">
              <div className="row intro">
                <div className="col-12 col-md-12 align-self-center text-center text-md-left">
                  <h2 className="featured">Importador</h2>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-md-12 ">
                  <form
                    id="formImportadorForm"
                    onSubmit={this.submitImportadorForm}
                    noValidate
                  >
                    <fieldset className="step-group" id="step-group-1">
                      <div className="row">
                        <div className="col-12 p-0 mt-2 mb-2">
                          <div
                            style={{ padding: 0, height: 53 }}
                            className="form-control"
                          >
                            <FileBase64
                              multiple={false}
                              onDone={this.getFiles.bind(this)}
                            />
                          </div>
                          {errors.file.length > 0 && submited && (
                            <span className="error-form">{errors.file}</span>
                          )}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 p-0 mt-2 mb-2">
                          <select
                            onChange={this.changeFields}
                            className="form-control"
                            name="tipo"
                          >
                            <option value="importadores">Test por temas</option>
                            <option value="importadores_oficiales">
                              Test por oficiales
                            </option>
                            <option value="importadores_casos_practicos">
                              Casos practicos
                            </option>
                            <option value="importadores_casos_practicos_oficiales">
                              Casos practicos oficiales
                            </option>
                            <option value="importadores_test_nivel">
                              Test de nivel
                            </option>
                            <option value="importadores_areas">
                              Datos Principales
                            </option>
                            <option value="importadores_basico_confundidos">
                              Basicos confundidos
                            </option>
                          </select>
                          {errors.tipo.length > 0 && submited && (
                            <span className="error-form">{errors.tipo}</span>
                          )}
                        </div>
                      </div>
                      <div className="col-12 input-group p-0">
                        <button
                          type="submit"
                          className="step-next btn primary-button"
                        >
                          IMPORTAR{" "}
                          <i className="icon-arrow-right-circle left"></i>
                        </button>
                      </div>

                      {errores_importacion !== "" && (
                        <div
                          style={{ color: "red" }}
                          dangerouslySetInnerHTML={{
                            __html: errores_importacion,
                          }}
                        ></div>
                      )}
                    </fieldset>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      );
    } else {
      return <div>{this.renderRedirectToLogin()}</div>;
    }
  }
}

export default ImportadorPage;
