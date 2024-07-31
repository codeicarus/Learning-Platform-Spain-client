import React, {Component} from 'react';
import axios from "axios";
import {Link, Redirect} from "react-router-dom";
import {toast} from "react-toastify";
import ReactGA from "react-ga";
import SimulacrosAreaWSimulacrosSection from "../Includes/SimulacrosAreaWSimulacrosSection";
import ExamenesOficialesAreaWExamenesOficialesSection from "../Includes/ExamenesOficialesAreaWExamenesOficialesSection";

class TestFalladasBlancasGuardadas extends Component {
    state = {
        redirect_to_login: false,
        redirect_to_test: false,
        view_render: false,
        numero_preguntas: 20,
        respuesta_automatica: false,
        blancas: false,
        falladas: false,
        guardadas: false,
        n_blancas: 0,
        n_falladas: 0,
        n_guardadas: 0,
        id_test: 0
    };

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALITYCS);
        ReactGA.pageview(window.location.pathname + window.location.search);
        window.scrollTo(0, 0);
        this.doCheck();
    }

    async doCheck() {
        if (localStorage.hasOwnProperty('token_penitenciarios')) {
            axios.get(process.env.REACT_APP_URL_API + `usuarios/check`, {
                headers: {
                    authorization: localStorage.getItem('token_penitenciarios')
                }
            })
                .then(res => {
                    this.setState({
                        view_render: true
                    }, () => {
                        this.getDataFalladasBlancasGuardadas()
                    });
                })
                .catch(error => {
                    localStorage.removeItem('token_penitenciarios');
                    localStorage.removeItem('email_penitenciarios');
                    this.setState({
                        redirect_to_login: true
                    });
                });
        }
    }

    goToTest = () => {
        this.createTest()
    };

    async createTest() {
        let valor_respuesta_automatica = "0";
        if (this.state.respuesta_automatica) {
            valor_respuesta_automatica = "1";
        }
        let valor_blancas = "0";
        if (this.state.blancas) {
            valor_blancas = "1";
        }
        let valor_falladas = "0";
        if (this.state.falladas) {
            valor_falladas = "1";
        }
        let valor_guardadas = "0";
        if (this.state.guardadas) {
            valor_guardadas = "1";
        }

        axios.post(process.env.REACT_APP_URL_API + `preguntasFalladasBlancasGuardadas`, {
            tipo: "Test Falladas Blancas Guardadas",
            numero_preguntas: this.state.numero_preguntas + "",
            respuesta_automatica: valor_respuesta_automatica,
            blancas: valor_blancas,
            falladas: valor_falladas,
            guardadas: valor_guardadas,
            email: localStorage.getItem("email_penitenciarios")
        }, {
            headers: {
                authorization: localStorage.getItem('token_penitenciarios')
            }
        })
            .then(res => {
                this.setState({
                    id_test: res.data.id,
                    redirect_to_test: true
                });

            })
            .catch(error => {
                if (error.response) {
                    toast.error(error.response.data.error);
                }
            });
    }

    async getDataFalladasBlancasGuardadas() {

        axios.post(process.env.REACT_APP_URL_API + `getDataFalladasBlancasGuardadas`, {
            email: localStorage.getItem("email_penitenciarios")
        }, {
            headers: {
                authorization: localStorage.getItem('token_penitenciarios')
            }
        })
            .then(res => {
                this.setState({
                    n_blancas: res.data.blancas,
                    n_falladas: res.data.falladas,
                    n_guardadas: res.data.guardadas
                });

            })
            .catch(error => {
                if (error.response) {
                    toast.error(error.response.data.error);
                }
            });
    }

    changeSelectedRespuestaAutomatica = () => {
        this.setState({
            respuesta_automatica: !this.state.respuesta_automatica
        });
    };
    classNameRespuestaAutomatica = () => {
        if (this.state.respuesta_automatica) {
            return "checkStyle la la-check text-right selected"
        } else {
            return "checkStyle la la-check text-right"
        }
    };

    changeSelectedBlancas = () => {
        this.setState({
            blancas: !this.state.blancas
        });
    };
    classNameBlancas = () => {
        if (this.state.blancas) {
            return "checkStyle la la-check text-right selected"
        } else {
            return "checkStyle la la-check text-right"
        }
    };

    changeSelectedFalladas = () => {
        this.setState({
            falladas: !this.state.falladas
        });
    };
    classNameFalladas = () => {
        if (this.state.falladas) {
            return "checkStyle la la-check text-right selected"
        } else {
            return "checkStyle la la-check text-right"
        }
    };

    changeSelectedGuardadas = () => {
        this.setState({
            guardadas: !this.state.guardadas
        });
    };
    classNameGuardadas = () => {
        if (this.state.guardadas) {
            return "checkStyle la la-check text-right selected"
        } else {
            return "checkStyle la la-check text-right"
        }
    };

    changeSelectedNumeroPreguntas = (numero_preguntas) => {
        this.setState({
            numero_preguntas: numero_preguntas
        });
    };
    classNameNumeroPreguntas = (numero_preguntas) => {
        if (this.state.numero_preguntas === numero_preguntas) {
            return "radioStyle la la-check text-right selected"
        } else {
            return "radioStyle la la-check text-right"
        }
    };

    renderRedirectToLogin = () => {
        if (this.state.redirect_to_login) {
            return <Redirect to='/login'/>
        }
    };

    renderRedirectToTest = () => {
        if (this.state.redirect_to_test) {
            return <Redirect to={'/test/' + this.state.id_test}/>
        }
    };

    render() {
        if (this.state.view_render) {
            return (
                <div>
                    <section id="pricing" className="plans featured left">
                        <div className="container">
                            <div className="row intro mt-5 mt-sm-2">
                                <div className="col-12">
                                    <h2 className="featured">Repaso</h2>
                                </div>
                            </div>

                            {((new Date().getTime() / 1000) >= localStorage.getItem("penitenciarios_mds")) &&
                            <div className="mensaje_capado">
                                <p>Solo puedes hacer tests de preguntas falladas o blancas si estas suscrito</p>
                                <Link to="/suscribete" className="btn mx-auto primary-button">
                                    <i className="icon-speech"></i>!Suscribete¡
                                </Link>
                            </div>}
                            <div className="row justify-content-center text-center items">

                                <div className="col-12 col-md-4 col-lg-4 align-self-auto item mb-5">
                                    <div>
                                        <h4 className="text-center">Blancas</h4>
                                        <p>Hacer test de preguntas<br/>que he dejado en blanco.</p>
                                        <p><i className="radioStyle la la-check text-right"></i></p>
                                        <p><b>{this.state.n_blancas} preguntas</b> en blanco</p>
                                        <ul className="list-group list-group-flush">
                                            <li onClick={() => this.changeSelectedBlancas()} className="list-group-item text-center">
                                                <i className={this.classNameBlancas()}></i>
                                                <span> Seleccionar blancas</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="col-12 col-md-4 col-lg-4 align-self-auto item mb-5">
                                    <div>
                                        <h4 className="text-center">Falladas</h4>
                                        <p>Hacer test de preguntas<br/>que he fallado</p>
                                        <p className="contestada_incorrecta"><i className="radioStyle la la-check text-right selected"></i></p>
                                        <p><b>{this.state.n_falladas} preguntas</b> falladas</p>
                                        <ul className="list-group list-group-flush">
                                            <li onClick={() => this.changeSelectedFalladas()} className="list-group-item text-center">
                                                <i className={this.classNameFalladas()}></i>
                                                <span> Seleccionar falladas</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="col-12 col-md-4 col-lg-4 align-self-auto item mb-5">
                                    <div>
                                        <h4 className="text-center">Guardadas</h4>
                                        <p>Hacer test de preguntas<br/>que he guardado</p>
                                        <p><i className="la la-star-o pregunta_estrella_como_icon"></i></p>
                                        <p><b>{this.state.n_guardadas} preguntas</b> guardadas</p>

                                        <ul className="list-group list-group-flush">
                                            <li onClick={() => this.changeSelectedGuardadas()} className="list-group-item text-center">
                                                <i className={this.classNameGuardadas()}></i>
                                                <span> Seleccionar guardadas</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                            </div>

                            <div className="row intro mt-5 mt-sm-0">
                                <div className="col-12">
                                    <p>Selecciona el número de preguntas</p>
                                </div>
                            </div>
                            <div className="row justify-content-center text-center items">
                                <div className="col-6 col-md-3 col-lg-2 align-self-auto item">
                                    <div>
                                        <ul className="list-group list-group-flush">
                                            <li onClick={() => this.changeSelectedNumeroPreguntas(20)} className="list-group-item text-left">
                                                <i className={this.classNameNumeroPreguntas(20)}></i>
                                                <span> 20</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-6 col-md-3 col-lg-2 align-self-auto item">
                                    <div>
                                        <ul className="list-group list-group-flush">
                                            <li onClick={() => this.changeSelectedNumeroPreguntas(25)} className="list-group-item text-left">
                                                <i className={this.classNameNumeroPreguntas(25)}></i>
                                                <span> 25</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                {(new Date().getTime() / 1000 < localStorage.getItem("penitenciarios_mds")) &&
                                <div className="col-6 col-md-3 col-lg-2 align-self-auto item">
                                    <div>
                                        <ul className="list-group list-group-flush">
                                            <li onClick={() => this.changeSelectedNumeroPreguntas(40)} className="list-group-item text-left">
                                                <i className={this.classNameNumeroPreguntas(40)}></i>
                                                <span> 40</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>}
                                {((new Date().getTime() / 1000) >= localStorage.getItem("penitenciarios_mds")) &&
                                <div title="Para poder hacer test de 40 preguntas tienes que suscribirte" className="col-6 col-md-3 col-lg-2 align-self-auto item">
                                    <div>
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item text-left">
                                                <i className={this.classNameNumeroPreguntas(40)}></i>
                                                <span> 40</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>}

                                {(new Date().getTime() / 1000 < localStorage.getItem("penitenciarios_mds")) &&
                                <div className="col-6 col-md-3 col-lg-2 align-self-auto item">
                                    <div>
                                        <ul className="list-group list-group-flush">
                                            <li onClick={() => this.changeSelectedNumeroPreguntas(60)} className="list-group-item text-left">
                                                <i className={this.classNameNumeroPreguntas(60)}></i>
                                                <span> 60</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>}

                                {((new Date().getTime() / 1000) >= localStorage.getItem("penitenciarios_mds")) &&
                                <div title="Para poder hacer test de 60 preguntas tienes que suscribirte" className="col-6 col-md-3 col-lg-2 align-self-auto item">
                                    <div>
                                        <ul className="list-group list-group-flush">
                                            <li onClick={() => this.changeSelectedNumeroPreguntas(60)} className="list-group-item text-left">
                                                <i className={this.classNameNumeroPreguntas(60)}></i>
                                                <span> 60</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>}
                                {(new Date().getTime() / 1000 < localStorage.getItem("penitenciarios_mds")) &&
                                <div className="col-6 col-md-3 col-lg-2 align-self-auto item">
                                    <div>
                                        <ul className="list-group list-group-flush">
                                            <li onClick={() => this.changeSelectedNumeroPreguntas(100)} className="list-group-item text-left">
                                                <i className={this.classNameNumeroPreguntas(100)}></i>
                                                <span> 100</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>}
                                {((new Date().getTime() / 1000) >= localStorage.getItem("penitenciarios_mds")) &&
                                <div title="Para poder hacer test de 100 preguntas tienes que suscribirte" className="col-6 col-md-3 col-lg-2 align-self-auto item">
                                    <div>
                                        <ul className="list-group list-group-flush">
                                            <li onClick={() => this.changeSelectedNumeroPreguntas(100)} className="list-group-item text-left">
                                                <i className={this.classNameNumeroPreguntas(100)}></i>
                                                <span> 100</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>}
                                {(new Date().getTime() / 1000 < localStorage.getItem("penitenciarios_mds")) &&
                                <div className="col-6 col-md-3 col-lg-2 align-self-auto item">
                                    <div>
                                        <ul className="list-group list-group-flush">
                                            <li onClick={() => this.changeSelectedNumeroPreguntas(150)} className="list-group-item text-left">
                                                <i className={this.classNameNumeroPreguntas(150)}></i>
                                                <span> 150</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>}
                                {((new Date().getTime() / 1000) >= localStorage.getItem("penitenciarios_mds")) &&
                                <div title="Para poder hacer test de 150 preguntas tienes que suscribirte" className="col-6 col-md-3 col-lg-2 align-self-auto item">
                                    <div>
                                        <ul className="list-group list-group-flush">
                                            <li onClick={() => this.changeSelectedNumeroPreguntas(150)} className="list-group-item text-left">
                                                <i className={this.classNameNumeroPreguntas(150)}></i>
                                                <span> 150</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>}
                            </div>
                            <div className="row mt-5 mt-sm-0">
                                <div className="col-12 col-md-6 align-self-center text-center text-md-left">
                                    <ul className="list-group list-group-flush">
                                        <li onClick={() => this.changeSelectedRespuestaAutomatica()} className="list-group-item text-left">
                                            <i className={this.classNameRespuestaAutomatica()}></i>
                                            <span> Respuesta Inmediata</span>
                                        </li>
                                    </ul>
                                </div>

                                {((new Date().getTime() / 1000) >= localStorage.getItem("penitenciarios_mds")) &&
                                <div className="col-12 col-md-6 align-self-end mt-sm-2">
                                    <a title="Solo puedes hacer los tests de preguntas falladas o blancas si estas suscrito" className="btn mx-auto mr-md-0 ml-md-auto primary-button"><i className="icon-speech"></i>Hacer Test</a>
                                </div>}

                                {(new Date().getTime() / 1000 < localStorage.getItem("penitenciarios_mds")) &&
                                <div className="col-12 col-md-6 align-self-end mt-sm-2">
                                    <a onClick={() => this.goToTest()} className="btn mx-auto mr-md-0 ml-md-auto primary-button"><i className="icon-speech"></i>Hacer Test</a>
                                </div>}
                            </div>
                        </div>
                    </section>
                    {this.renderRedirectToTest()}
                </div>
            );
        } else {
            return (
                <div>
                    {this.renderRedirectToLogin()}
                </div>
            );
        }
    }
}

export default TestFalladasBlancasGuardadas;
