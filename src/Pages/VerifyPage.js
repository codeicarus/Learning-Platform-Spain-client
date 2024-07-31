import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import ReactGA from "react-ga";
import { ExitToApp } from "@material-ui/icons";

class VerifyPage extends Component {
  state = {
    title: "",
    message: "",
    class: "",
    btn_login: false,
  };

  componentDidMount() {
    ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALITYCS);
    ReactGA.pageview(window.location.pathname + window.location.search);
    window.scrollTo(0, 0);
    window["loadSlides"]();
    this.doVerify();
  }

  async doVerify() {
    axios
      .post(process.env.REACT_APP_URL_API + `usuarios/verify`, {
        verificador: this.props.match.params.verifyCode,
      })
      .then((res) => {
        this.setState(
          {
            btn_login: true,
          },
          () => {
            window["loadSlides"]();
          }
        );
      })
      .catch((error) => {
        if (error.response) {
          this.setState(
            {
              title: "ERROR",
              message: error.response.data.error,
              class: "error_sms",
            },
            () => {
              // window["loadSlides"]();
            }
          );
        }
      });
  }

  render() {
    return (
      <div>
        {this.state.btn_login && (
          <section id="slider" className="p-0 featured all">
            <div className="swiper-container no-slider animation slider-h-100 alt">
              <div className="swiper-wrapper">
                <div className="swiper-slide slide-center">
                  <div className="container">
                    <div className="slide-content row">
                      <div className="col-md-12 col-lg-6 d-flex inner imagen_slide_movil">
                        <div className="align-self-center text-center">
                          <div className=" ">
                            <img
                              className="fit-image"
                              src="/assets/images/verify.png"
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          marginTop: 0,
                        }}
                        className="col-md-12 col-lg-6 d-flex inner texto_slide"
                      >
                        <div className="align-self-center text-center text-md-left">
                          <h1
                            data-aos="zoom-out-up"
                            data-aos-delay="400"
                            className="h1_slider title effect-static-text"
                          >
                            ¡GENIAL!
                          </h1>
                          <p
                            data-aos="zoom-out-up"
                            data-aos-delay="800"
                            className="description"
                          >
                            Te has verificado correctamente, ya puedes iniciar
                            sesión en <b>penitenciarios.com </b>
                            <br />
                            <br />
                          </p>
                          <Link
                            to="/login"
                            data-aos="zoom-out-up"
                            data-aos-delay="1200"
                            className="smooth-anchor ml-auto mr-auto ml-md-0  btn primary-button mt-5"
                          >
                            <ExitToApp fontSize="small"></ExitToApp>
                            &nbsp;&nbsp;Entrar a mi cuenta
                          </Link>
                        </div>
                      </div>
                      <div className="col-md-12 col-lg-6 d-flex inner imagen_slide_desktop">
                        <div className="align-self-center text-center">
                          <div className=" ">
                            <img
                              className="fit-image"
                              src="/assets/images/verify.png"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper-pagination"></div>
            </div>
          </section>
        )}
        {!this.state.btn_login && (
          <section id="slider" className="p-0 featured all">
            <div className="swiper-container no-slider animation slider-h-100 alt">
              <div className="swiper-wrapper">
                <div className="swiper-slide slide-center">
                  <div className="container">
                    <div className="slide-content row">
                      <div className="col-md-12 col-lg-6 d-flex inner imagen_slide_movil">
                        <div className="align-self-center text-center">
                          <div className=" ">
                            <img
                              className="fit-image"
                              src="/assets/images/lo-sentimos.png"
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          marginTop: 0,
                        }}
                        className="col-md-12 col-lg-6 d-flex inner texto_slide"
                      >
                        <div className="align-self-center text-center text-md-left">
                          <h1
                            data-aos="zoom-out-up"
                            data-aos-delay="400"
                            className="h1_slider title effect-static-text"
                          >
                            <span className={this.state.class}>
                              Se ha producido un error
                            </span>
                          </h1>
                          <p
                            data-aos="zoom-out-up"
                            data-aos-delay="800"
                            className="description"
                          >
                            {this.state.message}
                            <br /> <br /> Vuelve a intentarlo más tarde, y si el
                            problema persiste no dudes en ponerte en contacto
                            con nosotros a través del correo{" "}
                            <a
                              href="mailto:info@penitenciarios.com"
                              target="_blank"
                            >
                              info@penitenciarios.com
                            </a>
                          </p>
                        </div>
                      </div>
                      <div className="col-md-12 col-lg-6 d-flex inner imagen_slide_desktop">
                        <div className="align-self-center text-center">
                          <div className=" ">
                            <img
                              className="fit-image"
                              src="/assets/images/lo-sentimos.png"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper-pagination"></div>
            </div>
          </section>
        )}
      </div>
    );
  }
}

export default withRouter(VerifyPage);
