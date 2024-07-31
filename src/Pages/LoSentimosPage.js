import React, {Component} from 'react';
import axios from "axios";
import {BrowserRouter as Router} from "react-router-dom";
import ReactGA from "react-ga";
import {Link} from 'react-router-dom';
import ContactForm from "../Includes/ContactForm";
import Precios from "../Includes/Precios";

import {GrUpdate, GrEdit} from "react-icons/gr";
import {HiOutlineBookOpen} from "react-icons/hi";
import {BsBookmarkPlus} from "react-icons/bs";
import {IoMdRibbon} from "react-icons/io";


class LoSentimosPage extends Component {

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
                                        <div style={{
                                            marginTop: 0
                                        }} className="col-6 d-flex inner">
                                            <div className="align-self-center text-center text-md-left">
                                                <h1 data-aos="zoom-out-up" data-aos-delay="400" className="h1_slider title effect-static-text">Lo sentimos</h1>
                                                <p data-aos="zoom-out-up" data-aos-delay="800" className="description">Se he producido un error en el proceso de pago. Vuelve a intentarlo y si el problema persiste pongase en contacto con nosotros.</p>
                                                <Link to="/suscribete" data-aos="zoom-out-up" data-aos-delay="1200" className="smooth-anchor ml-auto mr-auto ml-md-0  btn primary-button mt-5"><i className="icon-refresh"></i>Volverlo a intentar</Link>
                                            </div>
                                        </div>
                                        <div className="col-6 d-flex inner">
                                            <div className="align-self-center text-center">
                                                <div className=" ">
                                                    <img className="fit-image" src="/assets/images/lo-sentimos.png"/>
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
            </div>
        );
    }
}

export default LoSentimosPage;
