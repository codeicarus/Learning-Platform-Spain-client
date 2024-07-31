import React, { Component } from "react";
import { Link } from "react-router-dom";
import AreaWTemasSection from "../Includes/AreaWTemasSection";
import ReactGA from "react-ga";

class PoliticaPrivacidadPage extends Component {
  componentDidMount() {
    ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALITYCS);
    ReactGA.pageview(window.location.pathname + window.location.search);
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div>
        <section id="pricing" className="plans featured left contenido_texto">
          <div className="container">
            <div className="row intro mt-5">
              <div className="col-12">
                <h2 className="featured">Política de privacidad</h2>
                <p>
                  PENITENCIARIOS informa seguidamente de su pol&iacute;tica de
                  privacidad aplicada a los datos personales. De esta manera,
                  todos los datos personales que tenga bajo su responsabilidad
                  ser&aacute;n tratados de acuerdo con la Ley Org&aacute;nica
                  3/2018, de 5 de diciembre, de Protecci&oacute;n de Datos
                  Personales y garant&iacute;a de los derechos digitales y se
                  guardar&aacute;n las debidas medidas de seguridad y
                  confidencialidad de los mismos.
                </p>
                <p>
                  La visita del sitio web PENITENCIARIOS no implica que el
                  usuario deba suministrar informaci&oacute;n alguna respecto a
                  su identidad, no pudiendo ser asociada a un usuario concreto
                  por la empresa. En el supuesto que se suministre datos de
                  car&aacute;cter personal, estos datos ser&aacute;n recogidos y
                  utilizados conforme a las limitaciones y los derechos
                  recogidos en la citada norma de protecci&oacute;n de datos.
                </p>
                <p>
                  Los usuarios que faciliten datos de car&aacute;cter personal
                  consienten de forma clara, exacta e inequ&iacute;voca las
                  presentes condiciones.
                </p>
                <h3>1. Recogida de datos.</h3>
                <p>
                  La recogida de datos de car&aacute;cter personal en el momento
                  de crear una cuenta de usuario o a trav&eacute;s del
                  formulario de contacto publicado en la web y de los correos
                  electr&oacute;nicos que los usuarios puedan remitir a
                  PENITENCIARIOS, que ser&aacute;n incluidos en un fichero
                  automatizado.
                </p>
                <p>
                  Los ficheros titularidad de PENITENCIARIOS figuran inscritos
                  en el Registro General de la Agencia Espa&ntilde;ola de
                  Protecci&oacute;n de Datos, al que podr&aacute; acceder el
                  usuario o visitante para comprobar la situaci&oacute;n de
                  aquellos.
                </p>
                <p>
                  PENITENCIARIOS conservar&aacute; sus datos una vez finalizada
                  la relaci&oacute;n con el usuario para cumplir las
                  obligaciones legales necesarias. A su vez, proceder&aacute; a
                  la cancelaci&oacute;n de los datos recogidos cuando dejen de
                  ser necesarios para la finalidad para la que fueron recabados.
                </p>
                <h3>2. Seguridad de la informaci&oacute;n.&nbsp;</h3>
                <p>
                  PENITENCIARIOS ha desarrollado todos los sistemas y medidas
                  t&eacute;cnicas y organizativas a su alcance, previstas en la
                  normativa de protecci&oacute;n de datos de car&aacute;cter
                  personal para evitar la p&eacute;rdida, mal uso,
                  alteraci&oacute;n, acceso no autorizado y sustracci&oacute;n
                  de los datos de car&aacute;cter personal facilitados por el
                  usuario o visitante.
                </p>
                <p>
                  No obstante, el usuario o visitante debe ser consciente de que
                  las medidas de seguridad en Internet no son inexpugnables.
                </p>
                <h3>3. Confidencialidad y Secreto profesional.</h3>
                <p>
                  Las comunicaciones privadas que pudieran darse entre el
                  personal de PENITENCIARIOS y los usuarios o visitantes
                  ser&aacute;n consideradas como confidenciales. El acceso a
                  esta informaci&oacute;n est&aacute; restringido mediante
                  herramientas tecnol&oacute;gicas y mediante estrictos
                  controles internos.
                </p>
                <h3>4. Enlaces con otros sitios web.</h3>
                <p>
                  El presente sitio web puede contener enlaces o links con otros
                  sitios. Se informa que PENITENCIARIOS no dispone de control
                  alguno ni ostenta responsabilidad alguna sobre las
                  pol&iacute;ticas o medidas de protecci&oacute;n de datos de
                  otros sitios web.
                </p>
                <h3>5. POL&Iacute;TICA DE COOKIES</h3>
                <h4>
                  <strong>Definici&oacute;n de cookies</strong>
                </h4>
                <p>
                  Las cookies son identificadores que enviamos al disco duro de
                  su ordenador a trav&eacute;s de su navegador Web con el fin de
                  que nuestros sistemas puedan reconocer su navegador y
                  ofrecerle ciertos servicios,&nbsp; a continuaci&oacute;n se
                  detallan las cookies utilizadas en www.lockup.es
                </p>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <p>COOKIE</p>
                      </td>
                      <td>
                        <p>Informaci&oacute;n recogida</p>
                      </td>
                      <td>
                        <p>Pr&oacute;posito</p>
                      </td>
                      <td>
                        <p>Periodo de validez</p>
                      </td>
                      <td>
                        <p>Modo de desactivarla</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p>Cookies propias</p>
                      </td>
                      <td>
                        <p>Si esta logueando(S&Iacute;/NO)</p>
                      </td>
                      <td>
                        <p>
                          Evitar volver a hacer login si antes no ha cerrado
                          sesi&oacute;n.
                        </p>
                      </td>
                      <td>
                        <p>Cookie sesi&oacute;n.</p>
                      </td>
                      <td>
                        <p>
                          No se puede. Es necesario para el funcionamiento de la
                          web.
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p>Cookies propias</p>
                      </td>
                      <td>
                        <p>Informaci&oacute;n binaria(S&Iacute;/NO)</p>
                      </td>
                      <td>
                        <p>
                          Saber si por ejemplo el usuario ha aceptado la
                          advertencia de las cookies
                        </p>
                      </td>
                      <td>
                        <p>1 a&ntilde;o.</p>
                      </td>
                      <td>
                        <p>
                          No se puede. Es necesario para el funcionamiento de la
                          web.
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p>Cookies de terceros</p>
                      </td>
                      <td>&nbsp;</td>
                      <td>&nbsp;</td>
                      <td>&nbsp;</td>
                      <td>&nbsp;</td>
                    </tr>
                    <tr>
                      <td>
                        <p>Google Analytics</p>
                      </td>
                      <td>
                        <p>
                          Informaci&oacute;n anal&iacute;tica de la visita,
                          tiempo, secciones visitadas, clicks y sitios de
                          procedencia.
                        </p>
                      </td>
                      <td>
                        <p>
                          Un an&aacute;lisis del comportamiento del usuario en
                          la web y as&iacute; poder mejorar el servicio.
                        </p>
                      </td>
                      <td>
                        <p>
                          Cookies de sesi&oacute;n o 2 a&ntilde;os
                          m&aacute;ximos.
                        </p>
                      </td>
                      <td>
                        <p>Instalando:</p>
                        <br />
                        <p>https://tools.google.com/dlpage/gaoptout?hl=es</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <h4>Cookies utilizadas</h4>
                <p>
                  C&oacute;mo deshabilitar las Cookies en los principales
                  navegadores:
                </p>
                <p>
                  Normalmente es posible dejar de aceptar las Cookies del
                  navegador, o dejar de aceptar las Cookies de un Servicio en
                  particular.
                </p>
                <p>
                  Todos los navegadores modernos permiten cambiar la
                  configuraci&oacute;n de Cookies. Estos ajustes normalmente se
                  encuentran en las &lsquo;opciones&rsquo; o
                  &lsquo;Preferencias&rsquo; del men&uacute; de su navegador.
                  Asimismo, puede configurar su navegador o su gestor de correo
                  electr&oacute;nico.
                </p>
                <p>
                  A continuaci&oacute;n se ofrece orientaci&oacute;n al Usuario
                  sobre los pasos para acceder al men&uacute; de
                  configuraci&oacute;n de las cookies y, en su caso, de la
                  navegaci&oacute;n privada en cada uno de los navegadores
                  principales:
                </p>
                <ol>
                  <li>
                    Internet Explorer: Herramientas -&gt; Opciones de Internet
                    -&gt; Privacidad -&gt; Configuraci&oacute;n. Para m&aacute;s
                    informaci&oacute;n, puede consultar el soporte de Microsoft
                    o la Ayuda del navegador.
                  </li>
                  <li>
                    Firefox: Herramientas -&gt; Opciones -&gt; Privacidad -&gt;
                    Historial -&gt; Configuraci&oacute;n Personalizada. Para
                    m&aacute;s informaci&oacute;n, puede consultar el soporte de
                    Mozilla o la Ayuda del navegador.
                  </li>
                  <li>
                    Chrome: Configuraci&oacute;n -&gt; Mostrar opciones
                    avanzadas -&gt; Privacidad -&gt; Configuraci&oacute;n de
                    contenido. Para m&aacute;s informaci&oacute;n, puede
                    consultar el soporte de Google o la Ayuda del navegador.
                  </li>
                  <li>
                    Safari: Preferencias -&gt; Seguridad. Para m&aacute;s
                    informaci&oacute;n, puede consultar el soporte de Apple o la
                    Ayuda del navegador.
                  </li>
                </ol>
                <h4>
                  <strong>
                    &iquest;Qu&eacute; ocurre si se deshabilitan las Cookies?
                  </strong>
                </h4>
                <p>
                  Algunas funcionalidades de los Servicios quedar&aacute;n
                  deshabilitados como, por ejemplo, permanecer&nbsp;
                  identificado, mantener las compras en el &ldquo;carrito de la
                  compra&rdquo;, etc.
                </p>
                <h3>6. Derechos de los usuarios.&nbsp;</h3>
                <p>
                  El usuario podr&aacute; ejercitar, respecto a los datos
                  recabados en la forma prevista, los derechos reconocidos por
                  la Ley Org&aacute;nica 3/2018, de 5 de diciembre, de
                  Protecci&oacute;n de Datos Personales y garant&iacute;a de los
                  derechos digitales, y en particular los derechos de acceso,
                  rectificaci&oacute;n o cancelaci&oacute;n de datos y
                  oposici&oacute;n.
                </p>
                {/* <p>
                  Podr&aacute; ejercer sus derechos, mediante solicitud remitida
                  por correo ordinario, firmado y acompa&ntilde;ado de fotocopia
                  del D.N.I., a la direcci&oacute;n Calle Aneto 13, 41710
                  (Sevilla - España).
                </p> */}
                <p>
                  PENITENCIARIOS informa que los datos personales recabados,
                  cuando hayan dejado de ser necesarios o pertinentes para la
                  finalidad para la cual fueron recogidos, ser&aacute;n
                  cancelados conforme establece la normativa de
                  protecci&oacute;n de datos de car&aacute;cter personal.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default PoliticaPrivacidadPage;
