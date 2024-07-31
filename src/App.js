import "./global.css";
import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { io } from "socket.io-client";
import CookieConsent from "react-cookie-consent";

import HeaderSection from "./Includes/HeaderSection";
import FooterSection from "./Includes/FooterSection";
import MenuMovil from "./Includes/MenuMovil";
import HeaderLoguedSection from "./Includes/HeaderLoguedSection";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import VerifyPage from "./Pages/VerifyPage";
import DashboardPage from "./Pages/DashboardPage";
import MiPerfilPage from "./Pages/MiPerfilPage";
import FirstLoginPage from "./Pages/FirstLoginPage";
import TestPorTemasPage from "./Pages/TestPorTemasPage";
import TestPorBloquesPage from "./Pages/TestPorBloquesPage";
import TestPorLegislacionesPage from "./Pages/TestPorLegislacionesPage";
import TestPorBasicosConfundidosPage from "./Pages/TestPorBasicosConfundidosPage";
import TestPorOficiales from "./Pages/TestPorOficiales";
import TestPorCasosPracticos from "./Pages/TestPorCasosPracticos";
import TestFalladasBlancasGuardadas from "./Pages/TestFalladasBlancasGuardadas";
import SandraPage from "./Pages/SandraPage";
import TestCPPage from "./Pages/TestCPPage";
import ImportadorPage from "./Pages/ImportadorPage";
import AvisoLegalPage from "./Pages/AvisoLegalPage";
import PoliticaCookiesPage from "./Pages/PoliticaCookiesPage";
import PoliticaPrivacidadPage from "./Pages/PoliticaPrivacidadPage";
import TestPage from "./Pages/TestPage";


import SuscripcionPage from "./Pages/SuscripcionPage";
import GraciasPage from "./Pages/GraciasPage";
import LoSentimosPage from "./Pages/LoSentimosPage";
import UsersInfo from "./Pages/UsersInfo";
import Error404Page from "./Pages/Error404Page";
import UserInfoDataPage from "./Pages/UserInfoDataPage";
import CheckConections from "./Includes/CheckConections";
import ConfirmPagoPage2 from "./Pages/ConfirmarPagoPage2";
import PaymentUsersPage from "./Pages/PaymentUsersPage";
import EditAreas from "./Pages/EditAreas";
import EditTemas from "./Pages/EditTemas";
import EditLegislacion from "./Pages/EditLegislacion";
import DeleteFilePage from "./Pages/DeleteFilePage";

export const serverSocket = io(process.env.REACT_APP_SOCKET);

class App extends Component {
  constructor(props) {
    super(props);
    this.update_menu = this.update_menu.bind(this);
    this.handlerCopy = this.handlerCopy.bind(this);
  }

  handlerCopy(e) {
    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();
  }

  componentDidMount() {
    window.addEventListener("offline", () =>
      toast.warn("Sin conexion a internet")
    );
    window.addEventListener("online", () => {
      toast.info("De nuevo con conexion a internet");
      serverSocket.emit(
        "check-reconection",
        localStorage.getItem("email_penitenciarios")
      );
    });
    serverSocket.on("user-connected", (data) => console.log(data));
    window.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        if (
          localStorage.getItem("token_penitenciarios") != null &&
          localStorage.getItem("email_penitenciarios") != null
        )
          serverSocket.emit(
            "checkUserConectedToSocket",
            localStorage.getItem("email_penitenciarios")
          );
      }
    });
    serverSocket.on("error-login", () => {
      localStorage.removeItem("token_penitenciarios");
      localStorage.removeItem("email_penitenciarios");
      toast.error("Usuario ya conectado en otro dispositivo");
      this.update_menu();
      return <Redirect to="/login" />;
    });

    this.doCheck();
    // setInterval(() => {
    //   if (
    //     localStorage.getItem("token_penitenciarios") != null &&
    //     localStorage.getItem("email_penitenciarios") != null
    //   ) {
    //     // axios.get("https://api.ipify.org/")
    //     axios
    //       .get("https://api.ipify.org/")
    //       // .get("https://jsonip.com/")
    //       .then((res) => {
    //         console.log(res.data)
    //         axios
    //           .post(
    //             process.env.REACT_APP_URL_API + `usuarios/check_ip`,
    //             {
    //               ip: res.data,
    //               email: localStorage.getItem("email_penitenciarios"),
    //               token: localStorage.getItem("token_penitenciarios")
    //             },
    //             {
    //               headers: {
    //                 authorization: localStorage.getItem("token_penitenciarios"),
    //               },
    //             }
    //           )
    //           .then((res) => {})
    //           .catch((error) => {
    //             console.log(error.message);
    //             if (error.response) {
    //               toast.error(error.response.data.error);
    //             }
    //             localStorage.removeItem("token_penitenciarios");
    //             localStorage.removeItem("email_penitenciarios");
    //             this.update_menu();
    //           });
    //       })
    //       .catch((error) => {});
    //   }
    // }, 60000);
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
          serverSocket.emit("user-connected", { email: res.data.email });
          this.update_menu();
        })
        .catch((error) => {
          localStorage.removeItem("token_penitenciarios");
          localStorage.removeItem("email_penitenciarios");
          this.update_menu();
          return <Redirect to="/" />;
        });
    }
  }

  state = {
    menu_logued: false,
    redirect_to_login: false,
    viewMenu: true,
  };

  update_menu() {
    if (
      localStorage.getItem("token_penitenciarios") != null &&
      localStorage.getItem("email_penitenciarios") != null &&
      !this.state.menu_logued
    ) {
      this.setState({
        menu_logued: true,
      });
      setTimeout(function () {
        window["updateMenu"]();
      }, 200);
    } else if (this.state.menu_logued) {
      this.setState({
        menu_logued: false,
        redirect_to_login: true,
      });
      setTimeout(function () {
        window["updateMenu"]();
      }, 200);
    }
  }

  putHeader = () => {
    if (this.state.menu_logued) {
      return <HeaderLoguedSection update_menu={this.update_menu} />;
    } else {
      return <HeaderSection />;
    }
  };
  renderRedirectToLogin = () => {
    if (this.state.redirect_to_login) {
      return <Redirect to="/login" />;
    }
  };

  render() {
    return (
      <Router>
        <div onCopy={this.handlerCopy}>
          {this.state.viewMenu && <MenuMovil />}
          {/* <FraseSection /> */}
          <ToastContainer />
          <CheckConections update={this.update_menu} />
          {this.renderRedirectToLogin()}
          {this.state.viewMenu && this.putHeader()}
          <Switch>
            <Route
              exact
              path="/"
              component={() => <HomePage update_menu={this.update_menu} />}
            />
            <Route
              exact
              path="/verify/:verifyCode"
              component={() => <VerifyPage update_menu={this.update_menu} />}
            />
            <Route exact path="/mi-perfil" component={MiPerfilPage} />
            <Route
              exact
              path="/dashboard"
              component={() => <DashboardPage update_menu={this.update_menu} />}
            />
            <Route
              exact
              path="/first-login"
              component={() => (
                <FirstLoginPage update_menu={this.update_menu} />
              )}
            />
            <Route
              exact
              path="/test-por-temas"
              component={() => (
                <TestPorTemasPage update_menu={this.update_menu} />
              )}
            />
            <Route
              exact
              path="/test-por-bloques"
              component={() => (
                <TestPorBloquesPage update_menu={this.update_menu} />
              )}
            />
            <Route
              exact
              path="/legislacion"
              component={() => (
                <TestPorLegislacionesPage update_menu={this.update_menu} />
              )}
            />
            <Route
              exact
              path="/basicos-confundidos"
              component={() => (
                <TestPorBasicosConfundidosPage update_menu={this.update_menu} />
              )}
            />
            <Route
              exact
              path="/simulacros-oficiales"
              component={() => (
                <TestPorOficiales update_menu={this.update_menu} />
              )}
            />
            <Route
              exact
              path="/casos-practicos"
              component={() => (
                <TestPorCasosPracticos update_menu={this.update_menu} />
              )}
            />
            <Route
              exact
              path="/repaso"
              component={() => (
                <TestFalladasBlancasGuardadas update_menu={this.update_menu} />
              )}
            />
            <Route
              exact
              path="/login"
              component={() => <LoginPage update_menu={this.update_menu} />}
            />
            <Route
              exact
              path="/test/:idTest"
              render={(props) => (
                <TestPage update_menu={this.update_menu} {...props} />
              )}
            />
            <Route
              exact
              path="/test_cp/:idTest"
              component={(props) => (
                <TestCPPage update_menu={this.update_menu} {...props} />
              )}
            />
            <Route
              exact
              path="/importador"
              component={() => (
                <ImportadorPage update_menu={this.update_menu} />
              )}
            />
            <Route
              exact
              path="/sandra"
              component={() => <SandraPage update_menu={this.update_menu} />}
            />
            <Route
              exact
              path="/aviso-legal"
              component={() => (
                <AvisoLegalPage update_menu={this.update_menu} />
              )}
            />
            <Route
              exact
              path="/politica-de-cookies"
              component={() => (
                <PoliticaCookiesPage update_menu={this.update_menu} />
              )}
            />
            <Route
              exact
              path="/politica-de-privacidad"
              component={() => (
                <PoliticaPrivacidadPage update_menu={this.update_menu} />
              )}
            />
            <Route
              exact
              path="/suscribete"
              component={() => (
                <SuscripcionPage update_menu={this.update_menu} />
              )}
            />

            <Route
              exact
              path="/suscribete/:id"
              component={() => (
                <>
                  <ConfirmPagoPage2 update_menu={this.update_menu} />
                </>
              )}
            />

            <Route
              exact
              path="/gracias"
              component={() => <GraciasPage update_menu={this.update_menu} />}
            />
            <Route
              exact
              path="/lo-sentimos"
              component={() => (
                <LoSentimosPage update_menu={this.update_menu} />
              )}
            />

            <Route
              exact
              path="/usersinfo"
              component={() => <UsersInfo update_menu={this.update_menu} />}
            />

            <Route
              exact
              path="/userinfo/:id"
              component={(props) => (
                <UserInfoDataPage update_menu={this.update_menu} {...props} />
              )}
            />

            <Route
              exact
              path="/delete-file"
              component={() => <DeleteFilePage />}
            />

            <Route
              exact
              path="/payment-users"
              component={() => <PaymentUsersPage />}
            />
            <Route exact path="/edit_areas" component={() => <EditAreas />} />

            {/* <Route
              exact
              path="/edit_areas/temas"
              component={() => <EditTemas />}
            /> */}

            <Route
              exact
              path="/legislacion-edit/:id"
              component={() => <EditLegislacion />}
            />

            <Route
              exact
              path="/tema-edit/:id"
              component={() => <EditTemas />}
            />

            {/* <Route
              exact
              path="/edit_areas/bs-cf"
              component={() => <EditBasicoConfundidos />}
            /> */}

            <Route
              component={() => <Error404Page update_menu={this.update_menu} />}
            />
          </Switch>
          <FooterSection />
        </div>
        <CookieConsent
          buttonText="Acepto"
          acceptOnScroll={true}
          acceptOnScrollPercentage={50}
          cookieName="cockie_penitenciarios_com"
        >
          Penitenciarios.com usa cookies para mejorar la experiencia de usuario
          y recoger estadísticas.
          <span style={{ fontSize: "10px" }}>
            {" "}
            Si continua navegando entendemos que las aceptas
          </span>
        </CookieConsent>
      </Router>
    );
  }
}

export default App;
