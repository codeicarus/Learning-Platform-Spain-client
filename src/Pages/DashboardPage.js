import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
// import Dialog from "@material-ui/core/Dialog";
// import DialogTitle from "@material-ui/core/DialogTitle";
// import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
// import DialogActions from "@material-ui/core/DialogActions";
// import Button from "@material-ui/core/Button";
// import { toast } from "react-toastify";
import ReactGA from "react-ga";
import EditarPreguntaDialog from "../Includes/EditarPreguntaDialog";
import {
  HiOutlineBookOpen,
  HiOutlineClipboardList,
  HiOutlineViewGridAdd,
} from "react-icons/hi";
import { FiUsers } from "react-icons/fi";
import { GiBookshelf } from "react-icons/gi";
import { FaBalanceScaleRight, FaTasks } from "react-icons/fa";
import {
  BsBookmarkPlus,
  BsCardChecklist,
  BsPencilFill,
  BsTrash,
} from "react-icons/bs";
import { IoMdRibbon } from "react-icons/io";

class DashboardPage extends Component {
  state = {
    formIdPregunta: "",
    id_pregunta_edit: null,
    view_render: false,
    redirect_to_login: false,
  };

  componentDidMount() {
    ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALITYCS);
    ReactGA.pageview();
    window.scrollTo(0, 0);

    this.doCheck();
  }

  async doCheck() {
    if (localStorage.hasOwnProperty("token_penitenciarios")) {
      axios
        .get(process.env.REACT_APP_URL_API + `usuarios/check`, {
          headers: {
            authorization: localStorage.getItem("token_penitenciarios"),
          },
        })
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
          return <Redirect to="/" />;
        });
    } else {
      return <Redirect to="/" />;
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
    this.setState({
      [name]: value,
    });
  };

  openPreguntaEditar() {
    this.setState({
      id_pregunta_edit: this.state.formIdPregunta,
    });
  }

  closePreguntaEditar = () => {
    this.setState({
      id_pregunta_edit: null,
      formIdPregunta: "",
    });
  };

  renderSuper = () => {
    const thisComponent = this;

    if (
      localStorage.getItem("email_penitenciarios") ===
        "Infopulbong@gmail.com" ||
      localStorage.getItem("email_penitenciarios") === "avilmor2@gmail.com" ||
      localStorage.getItem("email_penitenciarios") === "toledof764@gmail.com"
    ) {
      return (
        <section id="services" className="offers featured left">
          <div className="container">
            <div className="row intro">
              <div className="col-12 col-md-12 align-self-center text-center text-md-left">
                <h2 className="featured">SUPER</h2>
              </div>
            </div>
            <div className="row justify-content-center text-center items">
              {/* <div className="col-12 col-md-6 col-lg-3 item">
                <Link to="/basicos-confundidos" className="card_basicos card">
                  {new Date().getTime() / 1000 >=
                    localStorage.getItem("penitenciarios_mds") && (
                    <i
                      title="Te permitimos entrar en esta sección pero no podrás realizar ninguna función hasta que no te suscribas"
                      className="la la-ban check_ban"
                    ></i>
                  )}
                  <HiOutlineViewGridAdd />
                  <h4>
                    Básicos
                    <br />
                    Confundidos
                  </h4>
                  <i className="btn-icon icon-arrow-right-circle"></i>
                </Link>
              </div> */}
              <div className="col-12 col-md-6 col-lg-4 item">
                <Link to="/importador" className="card featured ">
                  <i className="icon icon-cloud-upload"></i>
                  <h4>Importador</h4>
                  <i className="btn-icon icon-arrow-right-circle"></i>
                </Link>
              </div>

              <div className="col-12 col-md-6 col-lg-4 item">
                <div className="card featured ">
                  <BsPencilFill className="icon" style={{ color: "#5A92FA" }} />
                  <h4>Editar pregunta</h4>
                  <input
                    onChange={this.changeFields}
                    value={this.state.formIdPregunta}
                    type="text"
                    id="formIdPregunta"
                    name="formIdPregunta"
                  />
                  <i
                    onClick={() => this.openPreguntaEditar()}
                    className="btn-icon icon-arrow-right-circle"
                  ></i>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-4 item">
                <Link to="/usersinfo" className="card featured ">
                  <FiUsers className="icon" />
                  <h4>
                    Clasificacion <br /> de Usuarios
                  </h4>
                  <i className="btn-icon icon-arrow-right-circle"></i>
                </Link>
              </div>

              <div className="col-12 col-md-6 col-lg-4 item">
                <Link to="/payment-users" className="card featured ">
                  <BsCardChecklist className="icon" />
                  <h4>
                    Pagos <br /> de Usuarios
                  </h4>
                  <i className="btn-icon icon-arrow-right-circle"></i>
                </Link>
              </div>

              <div className="col-12 col-md-6 col-lg-4 item">
                <Link to="/delete-file" className="card featured ">
                  <BsTrash size={30} className="icon" />
                  <h4>Eliminar esquema</h4>
                  <i className="btn-icon icon-arrow-right-circle"></i>
                </Link>
              </div>

              {/* <div className="col-12 col-md-6 col-lg-4 item">
                <Link to="/edit_areas" className="card featured ">
                  <FaTasks className="icon" />
                  <h4>Editar Areas</h4>
                  <i className="btn-icon icon-arrow-right-circle"></i>
                </Link>
              </div> */}
            </div>
          </div>
          {this.state.id_pregunta_edit != null && (
            <EditarPreguntaDialog
              id_pregunta={this.state.id_pregunta_edit}
              closePreguntaEditar={this.closePreguntaEditar}
            />
          )}
        </section>
      );
    }
  };

  render() {
    if (this.state.view_render) {
      return (
        <div>
          <section
            id="services"
            className="cuadros_dashboard offers featured left"
          >
            <div className="container">
              <div className="row intro">
                <div className="col-12 col-md-12 align-self-center text-center text-md-left">
                  <h3>Elige la categoría a la que quieres acceder</h3>
                </div>
              </div>

              {new Date().getTime() / 1000 >=
                localStorage.getItem("penitenciarios_mds") && (
                <div className="mensaje_capado mb-5">
                  <p>Para poder hacer mas test suscribete</p>
                  <Link to="/suscribete" className="btn mx-auto primary-button">
                    <i className="icon-speech"></i>!Suscribete¡
                  </Link>
                </div>
              )}
              <div className="row justify-content-center text-center items">
                <div className="col-12 col-md-6 col-lg-4 item">
                  <div className="rallita_decoracion">
                    <Link to="/test-por-temas" className="card_temas  card ">
                      {new Date().getTime() / 1000 >=
                        localStorage.getItem("penitenciarios_mds") && (
                        <i
                          title="Te permitimos entrar en esta sección pero no podrás realizar todas las funciones hasta que no te suscribas"
                          className="la la-check check_ok"
                        ></i>
                      )}
                      <HiOutlineBookOpen />
                      <h4>
                        Test
                        <br />
                        por temas
                      </h4>
                      <i className="btn-icon icon-arrow-right-circle"></i>
                    </Link>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-3 item">
                  <Link to="/basicos-confundidos" className="card_basicos card">
                    {new Date().getTime() / 1000 >=
                      localStorage.getItem("penitenciarios_mds") && (
                      <i
                        title="Te permitimos entrar en esta sección pero no podrás realizar ninguna función hasta que no te suscribas"
                        className="la la-ban check_ban"
                      ></i>
                    )}
                    <HiOutlineViewGridAdd />
                    <h4>
                      Básicos
                      <br />
                      Confundidos
                    </h4>
                    <i className="btn-icon icon-arrow-right-circle"></i>
                  </Link>
                </div>
                <div className="col-12 col-md-6 col-lg-4 item">
                  <Link to="/test-por-bloques" className="card_bloques card">
                    {new Date().getTime() / 1000 >=
                      localStorage.getItem("penitenciarios_mds") && (
                      <i
                        title="Te permitimos entrar en esta sección pero no podrás realizar ninguna función hasta que no te suscribas"
                        className="la la-ban check_ban"
                      ></i>
                    )}
                    <GiBookshelf />
                    <h4>
                      Test
                      <br />
                      por bloques
                    </h4>
                    <i className="btn-icon icon-arrow-right-circle"></i>
                  </Link>
                </div>
                <div className="col-12 col-md-6 col-lg-4 item">
                  <Link
                    to="/simulacros-oficiales"
                    className="card_oficiales card"
                  >
                    {new Date().getTime() / 1000 >=
                      localStorage.getItem("penitenciarios_mds") && (
                      <i
                        title="Te permitimos entrar en esta sección pero no podrás realizar ninguna función hasta que no te suscribas"
                        className="la la-ban check_ban"
                      ></i>
                    )}
                    <IoMdRibbon />
                    <h4>
                      Simulacros y<br />
                      Oficiales
                    </h4>
                    <i className="btn-icon icon-arrow-right-circle"></i>
                  </Link>
                </div>
                {/* 
                                    <div className="col-12 col-md-6 col-lg-3 item">
                                        <Link to="/basicos-confundidos" className="card_basicos card">
                                            {((new Date().getTime()/1000) >= localStorage.getItem("penitenciarios_mds")) &&
                                            <i title="Te permitimos entrar en esta sección pero no podrás realizar ninguna función hasta que no te suscribas" className='la la-ban check_ban'></i>}
                                            <HiOutlineViewGridAdd/>
                                            <h4>Básicos<br/>Confundidos</h4>
                                            <i className="btn-icon icon-arrow-right-circle"></i>
                                        </Link>
                                    </div>
                                    */}

                <div className="col-12 col-md-6 col-lg-4 item">
                  <Link to="/legislacion" className="card_legilacion card">
                    {new Date().getTime() / 1000 >=
                      localStorage.getItem("penitenciarios_mds") && (
                      <i
                        title="Te permitimos entrar en esta sección pero no podrás realizar ninguna función hasta que no te suscribas"
                        className="la la-ban check_ban"
                      ></i>
                    )}
                    <FaBalanceScaleRight />
                    <h4>
                      Legislación
                      <br />
                      &nbsp;
                    </h4>
                    <i className="btn-icon icon-arrow-right-circle"></i>
                  </Link>
                </div>
                <div className="col-12 col-md-6 col-lg-4 item">
                  <Link to="/repaso" className="card_blancas card ">
                    {new Date().getTime() / 1000 >=
                      localStorage.getItem("penitenciarios_mds") && (
                      <i
                        title="Te permitimos entrar en esta sección pero no podrás realizar ninguna función hasta que no te suscribas"
                        className="la la-ban check_ban"
                      ></i>
                    )}
                    <HiOutlineClipboardList />
                    <h4>
                      Repaso
                      <br />
                      &nbsp;
                    </h4>
                    <i className="btn-icon icon-arrow-right-circle"></i>
                  </Link>
                </div>
                <div className="col-12 col-md-6 col-lg-4 item">
                  <div className="rallita_decoracion">
                    <Link to="/casos-practicos" className="card_casos card ">
                      {new Date().getTime() / 1000 >=
                        localStorage.getItem("penitenciarios_mds") && (
                        <i
                          title="Te permitimos entrar en esta sección pero no podrás realizar ninguna función hasta que no te suscribas"
                          className="la la-ban check_ban"
                        ></i>
                      )}
                      <BsBookmarkPlus />
                      <h4>
                        Supuestos
                        <br />
                        prácticos
                      </h4>
                      <i className="btn-icon icon-arrow-right-circle"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {this.renderSuper()}
        </div>
      );
    } else {
      return <div>{this.renderRedirectToLogin()}</div>;
    }
  }
}

export default DashboardPage;
