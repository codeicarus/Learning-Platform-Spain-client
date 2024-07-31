import React from "react";
import { Link } from "react-router-dom";

function FooterSection() {
  return (
    <footer>
      <section id="footer" className="odd footer">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-3 p-3 text-center text-lg-left">
              <div className="brand">
                <Link to="/" className="logo">
                  <img src="/assets/images/logo-w.png" />
                </Link>
              </div>
              <p>
                ¿Quieres ser funcionario de prisiones?
                <br />
                Nosotros te ayudamos con nuestra plataforma online de test y
                supuetos prácticos
              </p>
              <ul className="navbar-nav social share-list mt-0 ml-auto">
                <li className="nav-item">
                  <a
                    href="https://www.facebook.com/people/PenitenciarioS/100093511905034/"
                    target="_blank"
                    className="nav-link"
                  >
                    <i className="icon-social-facebook"></i>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    target="_blank"
                    href="https://www.instagram.com/penitenciarios_/"
                    className="nav-link"
                  >
                    <i className="icon-social-instagram ml-0"></i>
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-12 col-lg-3 p-3 text-center">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/login" className="nav-link smooth-anchor">
                    Prueba test Gratis
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to={{
                      pathname: "/",
                      hash: "#ofrecemos",
                    }}
                    className="nav-link smooth-anchor"
                  >
                    Ofrecemos
                  </Link>
                </li>
                {/* <li className="nav-item">
                  <Link
                    to={{
                      pathname: "/",
                      hash: "#precios",
                    }}
                    className="nav-link smooth-anchor"
                  >
                    Precios
                  </Link>
                </li> */}
                <li className="nav-item">
                  <Link
                    to={{
                      pathname: "/",
                      hash: "#contacto",
                    }}
                    className="nav-link smooth-anchor"
                  >
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-12 col-lg-3 p-3 text-center">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/politica-de-cookies" className="nav-link">
                    Política de cookies
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/politica-de-privacidad" className="nav-link">
                    Política de privacidad
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/aviso-legal" className="nav-link">
                    Aviso Legal
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-12 col-lg-3 p-3 text-center">
              <ul className="navbar-nav">
                {/* <li className="nav-item">
                  <a target="_blank" href="tel:603161768" className="nav-link">
                    <i className="icon-phone mr-2"></i>
                    603 161 768
                  </a>
                </li> */}
                <li className="nav-item">
                  <a
                    target="_blank"
                    href="mailto:penitenciarios@penitenciarios.com"
                    className="nav-link"
                  >
                    <i className="icon-envelope mr-2"></i>
                    penitenciarios@penitenciarios.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section id="copyright" className="p-3 odd copyright">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6 p-3 text-center text-lg-left">
              <p> </p>
            </div>
            <div className="col-12 col-md-6 p-3 text-center text-lg-right">
              <p>© 2020 penitenciarios.com - España</p>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}

export default FooterSection;
