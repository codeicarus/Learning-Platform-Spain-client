import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
import ReactGA from "react-ga";
import { Link } from "react-router-dom";
import ContactForm from "../Includes/ContactForm";
import Precios from "../Includes/Precios";

import { GrUpdate, GrEdit } from "react-icons/gr";
import { HiOutlineBookOpen } from "react-icons/hi";
import { BsBookmarkPlus } from "react-icons/bs";
import { IoMdRibbon } from "react-icons/io";

class HomePage extends Component {
  componentDidMount() {
    ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALITYCS);
    ReactGA.pageview(window.location.pathname + window.location.search);
    window.scrollTo(0, 0);
    window["loadSlides"]();
  }

  render() {
    return (
      <div>
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
                            src="/assets/images/home.png"
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
                          ¿Quieres ser
                          <br /> funcionario de prisiones?
                        </h1>
                        <p
                          data-aos="zoom-out-up"
                          data-aos-delay="800"
                          className="description"
                        >
                          Plataforma de test y supuestos prácticos <br />
                          para el cuerpo de Ayudantes de Instituciones
                          Penitenciarias
                        </p>
                        <Link
                          to="/login"
                          data-aos="zoom-out-up"
                          data-aos-delay="1200"
                          className="smooth-anchor ml-auto mr-auto ml-md-0  btn primary-button mt-5"
                        >
                          <i className="icon-pencil"></i>3 Días de prueba
                        </Link>
                      </div>
                    </div>
                    <div className="col-md-12 col-lg-6 d-flex inner imagen_slide_desktop">
                      <div className="align-self-center text-center">
                        <div className=" ">
                          <img
                            className="fit-image"
                            src="/assets/images/home.png"
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

        <section id="ofrecemos" className="highlights featured left">
          <div className="container">
            <div className="row intro">
              <div className="col-12 col-md-12 align-self-center text-center text-md-left">
                <div className="row">
                  <div className="col-12 p-0">
                    <h2 className="featured alt">Ofrecemos</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="container"
            style={{
              marginBottom: "6rem",
            }}
          >
            <div className="row intro">
              <div className="gallery_no_click col-12 col-md-6 visible_desktop">
                <img
                  src="/assets/images/soluciones_cruzadas.png"
                  className="fit-image"
                />
              </div>
              <div className="col-12 col-md-6 align-self-center text-center text-md-left">
                <div className="row">
                  <div className="col-12 p-0">
                    <h3>Soluciones cruzadas</h3>
                    <p>
                      Las soluciones muestran tanto el artículo o referencia,
                      como otros artículos estrechamente relacionados que pueden
                      depender de otras leyes.
                    </p>
                  </div>
                </div>
              </div>
              <div className="gallery_no_click col-12 col-md-6 visible_movil">
                <img
                  src="/assets/images/soluciones_cruzadas.png"
                  className="fit-image"
                />
              </div>
            </div>
          </div>
          <div
            className="container"
            style={{
              marginBottom: "6rem",
            }}
          >
            <div className="row intro">
              <div className="col-12 col-md-6 align-self-center text-center text-md-left">
                <div className="row">
                  <div className="col-12 p-0">
                    <h3>Test por niveles</h3>
                    <p>
                      Evaluamos tu nivel mediante un test inicial. Los test que
                      realices contendrán preguntas en función de tu nivel.
                    </p>
                  </div>
                </div>
              </div>
              <div className="gallery_no_click col-12 col-md-6 visible_desktop">
                <img src="/assets/images/niveles.png" className="fit-image" />
              </div>
              <div className="gallery_no_click col-12 col-md-6 visible_movil">
                <img src="/assets/images/niveles.png" className="fit-image" />
              </div>
            </div>
          </div>
          {
            // <div className="container" style={{
            //     marginBottom: '6rem'
            // }}>
            //     <div className="row intro">
            //         <div className="gallery_no_click col-12 col-md-6">
            //             <img src="/assets/images/basicos_confundidos.png" className="fit-image"/>
            //         </div>
            //         <div className="col-12 col-md-6 align-self-center text-center text-md-left">
            //             <div className="row">
            //                 <div className="col-12 p-0">
            //                     <h3>Básicos Confundidos</h3>
            //                     <p>Recoge las preguntas que más se suelen fallar, siendo básicas en la preparación de la oposición.
            //                     </p>
            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            // </div>
          }
          <div
            className="container"
            style={{
              marginBottom: "6rem",
            }}
          >
            <div className="row intro">
              <div className="gallery_no_click col-12 col-md-6 visible_desktop">
                <img
                  src="/assets/images/evaluacion.png"
                  className="fit-image"
                />
              </div>
              <div className="col-12 col-md-6 align-self-center text-center text-md-left">
                <div className="row">
                  <div className="col-12 p-0">
                    <h3>Evaluación</h3>
                    <p>
                      Podrás acceder a todos los datos estadísticos sobre los
                      test que hayas realizados, las áreas y temas que más
                      fallas.
                    </p>
                  </div>
                </div>
              </div>
              <div className="gallery_no_click col-12 col-md-6 visible_movil">
                <img
                  src="/assets/images/evaluacion.png"
                  className="fit-image"
                />
              </div>
            </div>
          </div>
        </section>
        <section id="ademas" className="offers featured right">
          <div className="container">
            <div className="row intro">
              <div className="col-12 col-md-12 align-self-center text-center text-md-left">
                <div className="row">
                  <div className="col-12 p-0">
                    <h2 className="featured alt">Además</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row justify-content-center text-center items">
              <div className="col-12 col-md-6 col-lg-4 item">
                <div className="card_temas card no-hover">
                  <HiOutlineBookOpen />
                  <h4> Test por temas</h4>
                  <p>
                    Podrás realizar preguntas de cada uno de los temas de forma
                    aleatoria.
                  </p>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-4 item">
                <div className="card_casos card no-hover">
                  <BsBookmarkPlus />
                  <h4>
                    Supuestos
                    <br />
                    prácticos
                  </h4>
                  <p>Podrás realizar supuestos prácticos de forma aleatoria.</p>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-4 item">
                <div className="card_oficiales card no-hover">
                  <IoMdRibbon />
                  <h4>Test Oficiales y Simulacros</h4>
                  <p>
                    Test Oficiales de Ayudante de Instituciones Penitenciarias.
                  </p>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-4 item">
                <div className="card_personalizacion card no-hover">
                  <GrEdit />
                  <h4>Personalización</h4>
                  <p>
                    En función de tus estadísticas, te indicaremos qué temas y
                    qué áreas concretas debes hacer más hincapié.
                  </p>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-4 item">
                <div className="card_actualizaciones card no-hover">
                  <GrUpdate />
                  <h4>Actualizaciones</h4>
                  <p>
                    Test actualizados. Compartimos todas las actualizaciones.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Precios />
        <ContactForm />
      </div>
    );
  }
}

export default HomePage;
