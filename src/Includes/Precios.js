import React, { Component } from "react";
import BasicoConfundidoAreaWBasicosConfundidosSection from "../Includes/BasicoConfundidoAreaWBasicosConfundidosSection";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "../Pages/ConfirmPago.css";

class Precios extends Component {
  openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  constructor(props) {
    super(props);
    this.xd = this.props;
  }

  async goToPay(producto) {
    // axios
    //   .post(
    //     process.env.REACT_APP_URL_API + `usuarios/createTransacction`,
    //     {
    //       producto: producto,
    //       email: localStorage.getItem("email_penitenciarios"),
    //     },
    //     {
    //       headers: {
    //         authorization: localStorage.getItem("token_penitenciarios"),
    //       },
    //     }
    //   )
    //   .then((res) => {
    //     this.openInNewTab(res.data.url);
    //   })
    //   .catch((error) => {
    //     if (error.response) {
    //       toast.error(error.response.data.error);
    //     }
    //   });
  }

  /*urlPagoFinal(precio){
        let url=process.env.REACT_APP_MERCHANT_URL_IFRAME
        url += "?MERCHANT_MERCHANTCODE="+process.env.REACT_APP_MERCHANT_MERCHANTCODE;
        url += "&MERCHANT_TERMINAL="+process.env.REACT_APP_MERCHANT_TERMINAL;
        url += "&OPERATION=1";
        url += "&LANGUAGE=ES";
        url += "&MERCHANT_MERCHANTSIGNATURE=ES";
        url += "&MERCHANT_ORDER=000000000000";
        url += "&MERCHANT_AMOUNT=3000";
        url += "&MERCHANT_CURRENCY=EUR";
        url += "&MERCHANT_PRODUCTDESCRIPTION=Curso de preguntas tipo test y ejecicios prácticos";
        url += "&MERCHANT_DESCRIPTOR=PENITENCIARIOS.COM";
        return url;
    }*/

  botonSuscribete(producto) {
    if (
      localStorage.getItem("token_penitenciarios") != null &&
      localStorage.getItem("email_penitenciarios") != null
    ) {
      return (
        // <button
        //   onClick={() => this.goToPay(producto)}
        //   className="smooth-anchor btn mx-auto primary-button"
        // >
        //   <i className="icon-arrow-right-circle"></i>Suscríbete
        // </button>
        <Link
          to={{
            pathname: `/suscribete/${producto.split("_")[1]}`,
          }}
          className="smooth-anchor btn mx-auto primary-button"
        >
          <i className="icon-arrow-right-circle"></i>Suscríbete
        </Link>
      );
    } else {
      return (
        <Link
          to={{
            pathname: "/login",
          }}
          className="smooth-anchor btn mx-auto primary-button"
        >
          <i className="icon-arrow-right-circle"></i>Suscríbete
        </Link>
      );
    }
  }

  renderPromo() {
    let currentDate = Math.floor(new Date().getTime() / 1000);
    let fin = 1690858799; // 31 de julio
    if (currentDate > fin) return <></>;
    else {
      return (
        <>
          <div className="row justify-content-center text-center items">
            <div className="col-12 col-md-6 col-lg-6 align-self-center text-center item">
              <div className="card card_promo">
                <i className="icon icon-star"></i>
                <p className="mb-0 mt-4">
                  <b>Promoción exclusiva</b>, disfruta de todo nuestro contenido
                </p>
                <h4>Hasta el 15 de Septiembre</h4>
                <span className="price">
                  17,50<i>€</i>
                </span>
                {this.botonSuscribete("promocion_salida")}
                <p className="mt-4">
                  <i>
                    <small>Solo válido desde 15 de Julio a 31 de Julio</small>
                  </i>
                </p>
                <div className="barra_porcentaje">
                  <div
                    className="porcentaje"
                    style={{
                      maxWidth: "100%",
                      width:
                        ((new Date() - new Date("2023-07-15")) /
                          (new Date("2023-07-31") - new Date("2023-07-15"))) *
                          100 +
                        "%",
                    }}
                  ></div>
                </div>
                <span className="para_aviso_legal">
                  * más información en nuestro{" "}
                  <Link to={{ pathname: "/aviso-legal", hash: "#promo" }}>
                    aviso legal
                  </Link>
                </span>
              </div>
            </div>
          </div>
          <div className="ejemplos">
            <div className="container-title">
              <p className="titleEjemplo">Ejemplo de promoción</p>
            </div>
            <p>
              I. Andr&eacute;s se suscribe a la promoción el 28 de Julio y paga
              17,90 euros. Como resultado, tendrá acceso a la plataforma y a
              todos sus recursos hasta el 15 de Septiembre, incluido ese día.
            </p>
            <p>
              II. Mar&iacute;a se suscribe y paga el 16 de Julio. Al igual que
              Andr&eacute;s, Mar&iacute;a tendrá acceso a la plataforma hasta el
              15 de Septiembre.
            </p>
          </div>
        </>
      );
    }
  }

  render() {
    return (
      <section id="precios" className="section-6 plans featured left">
        <div className="container">
          <div className="row text-center intro">
            <div className="col-12">
              <h2>Precios</h2>
              <p className="text-max-800">
                Con tu suscripción podrás acceder a todos nuestros test y
                supuestos prácticos de forma ilimitada.
              </p>
            </div>
          </div>
          {this.renderPromo()}
          <div className="row justify-content-center text-center items mt-5">
            <div className="col-12 col-md-6 col-lg-4 align-self-center text-center item">
              {/* <div className="col-12 col-md-6 col-lg-3 align-self-center text-center item"> */}
              <div className="card">
                <i className="icon icon-handbag"></i>
                <h4>1 mes</h4>
                <span className="price">
                  9,90<i>€</i>
                </span>
                {this.botonSuscribete("suscripcion_0990")}
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4 align-self-center text-center item">
              {/* <div className="col-12 col-md-6 col-lg-3 align-self-center text-center item"> */}
              <div className="card">
                <i className="icon icon-handbag"></i>
                <h4>3 meses</h4>
                <span className="price">
                  26,90<i>€</i>
                </span>
                {this.botonSuscribete("suscripcion_2790")}
              </div>
            </div>
            {/* <div className="col-12 col-md-6 col-lg-3 align-self-center text-center item">
              <div className="card">
                <i className="icon icon-handbag"></i>
                <h4>6 meses</h4>
                <span className="price">
                  55,90<i>€</i>
                </span>
                {this.botonSuscribete("suscripcion_5590")}
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3 align-self-center text-center item">
              <div className="card">
                <i className="icon icon-handbag"></i>
                <h4>12 meses</h4>
                <span className="price">
                  99,90<i>€</i>
                </span>
                {this.botonSuscribete("suscripcion_9990")}
              </div>
            </div> */}
          </div>

          {/* <div className="row text-left mt-4">
            <div className="col-12">
              <p>
                <small>
                  <i>* IVA incluido en todos nuestros precios</i>
                </small>
              </p>
            </div>
          </div> */}
        </div>
      </section>
    );
  }
}

export default Precios;
