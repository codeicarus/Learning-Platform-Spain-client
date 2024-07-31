import React, {Component} from 'react';
import {Link} from "react-router-dom";
import AreaWTemasSection from "../Includes/AreaWTemasSection";
import ReactGA from "react-ga";

class PoliticaCookiesPage extends Component {

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
                                    <h2 className="featured">Política de Cookies</h2>

                                    <p>La Plataforma PENITENCIARIOS.COM te informa acerca del uso de las cookies en sus p&aacute;ginas web.</p>
                                    <h2><strong>1. &iquest;Qu&eacute; son las cookies?</strong></h2>
                                    <p>Una cookie es un archivo o dispositivo que se descarga en el ordenador/smartphone/tablet del usuario al acceder a determinadas p&aacute;ginas web para almacenar y recuperar informaci&oacute;n del equipo terminal. Entre otras funciones, permite almacenar y recuperar informaci&oacute;n sobre los h&aacute;bitos de navegaci&oacute;n de un usuario con el fin de mejorar el servicio ofrecido.</p>
                                    <h3><strong>2. Tipo de cookies.</strong></h3>
                                    <p><strong>Seg&uacute;n los distintos tipos de clasificaci&oacute;n:</strong></p>
                                    <ol>
                                        <li> Seg&uacute;n quien sea la entidad que gestione el dominio desde donde se env&iacute;an las cookies y trate los datos que se obtengan se pueden distinguir dos tipos:</li>
                                    </ol>
                                    <ul>
                                        <li><strong>Cookies propias</strong>: son aquellas que se env&iacute;an a tu equipo terminal desde nuestros propios equipos o dominios.</li>
                                        <li><strong>Cookies de terceros</strong>: son aquellas que se env&iacute;an a tu equipo terminal desde un equipo o dominio de otra entidad colaboradora.</li>
                                    </ul>
                                    <ol start="2">
                                        <li> Seg&uacute;n el plazo de tiempo que permanecen almacenadas en el navegador del cliente, pudiendo tratarse de:</li>
                                    </ol>
                                    <ul>
                                        <li><strong>Cookies de sesi&oacute;n</strong>: aquellas cookies activadas mientras el usuario accede a la p&aacute;gina web o para la prestaci&oacute;n del servicio solicitado.</li>
                                        <li><strong>Cookies persistentes</strong>: aquellas cookies almacenadas por un tiempo determinado en el equipo terminal del usuario, para las que el responsable tiene acceso cuando el usuario se conecta a su p&aacute;gina web.</li>
                                    </ul>
                                    <ol start="3">
                                        <li> Seg&uacute;n la finalidad para la que se traten los datos obtenidos:</li>
                                    </ol>
                                    <ul>
                                        <li><strong>Cookies t&eacute;cnicas</strong>: aquellas cookies necesarias para el uso del sitio web y para la prestaci&oacute;n de servicios.</li>
                                        <li><strong>Cookies de personalizaci&oacute;n</strong>: aqu&eacute;llas que permiten al usuario acceder al servicio con algunas caracter&iacute;sticas de car&aacute;cter general predefinidas en funci&oacute;n de una serie de criterios en el terminal del usuario (idioma, tipo de navegador&hellip;).</li>
                                        <li><strong>Cookies de an&aacute;lisis</strong>: aqu&eacute;llas que permiten el seguimiento y an&aacute;lisis estad&iacute;stico del comportamiento del conjunto de los usuarios de los sitios web a los que est&aacute;n vinculadas.</li>
                                        <li><strong>Cookies publicitarias</strong>: aqu&eacute;llas que permiten la gesti&oacute;n de los espacios publicitarios en la p&aacute;gina web, aplicaci&oacute;n o plataforma desde la que se presta el servicio solicitado.</li>
                                        <li><strong>Cookies de publicidad comportamental</strong>: aqu&eacute;llas que almacenan informaci&oacute;n del comportamiento de los usuarios obtenida a trav&eacute;s de los h&aacute;bitos de navegaci&oacute;n del usuario, lo que permite desarrollar un perfil espec&iacute;fico para mostrar publicidad.</li>
                                    </ul>
                                    <h3><strong>3. Cookies utilizadas en nuestro Sitio Web.</strong></h3>
                                    <p><strong>Cookies t&eacute;cnicas y de personalizaci&oacute;n</strong></p>
                                    <table>
                                        <tbody>
                                        <tr>
                                            <td>
                                                <p>Denominaci&oacute;n</p>
                                            </td>
                                            <td>
                                                <p>Finalidad</p>
                                            </td>
                                            <td>
                                                <p>Duraci&oacute;n</p>
                                            </td>
                                            <td>
                                                <p>Titular</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>PENITENCIARIOS.COM</p>
                                            </td>
                                            <td>
                                                <p>Generada para identificar los par&aacute;metros de configuraci&oacute;n de cookies que ha seleccionado el usuario.</p>
                                            </td>
                                            <td>
                                                <p>Sesi&oacute;n</p>
                                            </td>
                                            <td>
                                                <p>Penitenciarios</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>&nbsp;</td>
                                            <td>
                                                <p>Generada por el servidor de aplicaciones cuando crea una sesi&oacute;n de usuario en la Web.</p>
                                            </td>
                                            <td>
                                                <p>Sesi&oacute;n</p>
                                            </td>
                                            <td>
                                                <p>Penitenciarios</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>&nbsp;</td>
                                            <td>
                                                <p>Generada por el servidor de aplicaciones cuando crea una sesi&oacute;n de usuario en la Web.</p>
                                            </td>
                                            <td>
                                                <p>Sesi&oacute;n</p>
                                            </td>
                                            <td>
                                                <p>Penitenciarios</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>&nbsp;</td>
                                            <td>
                                                <p>Generada por el calculador de Tarifas por cacheo de COM+, para cargar combo inicial con productos.</p>
                                            </td>
                                            <td>
                                                <p>Sesi&oacute;n</p>
                                            </td>
                                            <td>
                                                <p>Penitenciarios</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>&nbsp;</td>
                                            <td>
                                                <p>Generada en la web pero es propiedad de Oficina Virtual para mantener la sesi&oacute;n que un usuario ha abierto previamente en la OV. Primer fragmento de la cookie de convivencia de OV2 con COL.</p>
                                            </td>
                                            <td>
                                                <p>Sesi&oacute;n</p>
                                            </td>
                                            <td>
                                                <p>Penitenciarios</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>&nbsp;</td>
                                            <td>
                                                <p>Generada en la web pero es propiedad de Oficina Virtual para mantener la sesi&oacute;n que un usuario ha abierto previamente en la OV. Segundo fragmento de la cookie de convivencia de OV2 con COL.</p>
                                            </td>
                                            <td>
                                                <p>Sesi&oacute;n</p>
                                            </td>
                                            <td>
                                                <p>Penitenciarios</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>&nbsp;</td>
                                            <td>
                                                <p>Cookie utilizada para conocer el idioma de navegaci&oacute;n al saltar de Web a aplicaciones.</p>
                                            </td>
                                            <td>
                                                <p>Persistente</p>
                                            </td>
                                            <td>
                                                <p>Penitenciarios</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>&nbsp;</td>
                                            <td>
                                                <p>Cookie que sirve a OV2/COL para mostrar los mensajes en el idioma correcto (duraci&oacute;n m&aacute;xima de un a&ntilde;o)</p>
                                            </td>
                                            <td>
                                                <p>Persistente</p>
                                            </td>
                                            <td>
                                                <p>Penitenciarios</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>&nbsp;</td>
                                            <td>
                                                <p>Cookie para la aceptaci&oacute;n de la pol&iacute;tica de cookies</p>
                                            </td>
                                            <td>
                                                <p>Persistente</p>
                                            </td>
                                            <td>
                                                <p>Penitenciarios</p>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <p><strong><br />Cookies anal&iacute;ticas</strong></p>
                                    <table>
                                        <tbody>
                                        <tr>
                                            <td>
                                                <p>Denominaci&oacute;n</p>
                                            </td>
                                            <td>
                                                <p>Finalidad</p>
                                            </td>
                                            <td>
                                                <p>Duraci&oacute;n</p>
                                            </td>
                                            <td>
                                                <p>Titular</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>Google Analytics (__utma, __utmb, __utmc, __utmz)</p>
                                            </td>
                                            <td>
                                                <p>Saber c&oacute;mo navegas por nuestra web con el fin de mejorar los servicios que te podemos ofrecer. Esta informaci&oacute;n es an&oacute;nima, y solo la necesitamos para fines estad&iacute;sticos.</p>
                                                <p><a href="https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage?hl=es">M&aacute;s informaci&oacute;n aqu&iacute;</a></p>
                                            </td>
                                            <td>
                                                <p>Persistente</p>
                                            </td>
                                            <td>
                                                <p>Terceros</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>Google Analytics(_utmx)</p>
                                            </td>
                                            <td>
                                                <p>Realizaci&oacute;n de test A/B para medir la eficiencia de cambios de dise&ntilde;o.</p>
                                                <p><a href="https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage?hl=es">M&aacute;s informaci&oacute;n aqu&iacute;</a></p>
                                            </td>
                                            <td>
                                                <p>Persistente</p>
                                            </td>
                                            <td>
                                                <p>Terceros</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>Google Analytics (_ga, _gat_UA-45665987-2, _gat_correos,_gat_global, _gcl_au, _gid)</p>
                                            </td>
                                            <td>
                                                <p>Son utilizadas para elaborar perfiles de navegaci&oacute;n y poder conocer las preferencias de los usuarios del mismo con el fin de mejorar la oferta de productos y servicios.</p>
                                                <p><a href="https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage?hl=es">M&aacute;s informaci&oacute;n aqu&iacute;</a></p>
                                            </td>
                                            <td>
                                                <p>Persistente</p>
                                            </td>
                                            <td>
                                                <p>Terceros</p>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <p><br />La presente Pol&iacute;tica de Cookies podr&aacute; ser objeto de modificaciones, por lo que se recomienda al usuario que la consulte cada vez que acceda al sitio web de Penitenciarios.com.</p>
                                    <h3><strong>4. C&oacute;mo modificar la configuraci&oacute;n de las cookies</strong></h3>
                                    <p>El usuario puede prestar su consentimiento al uso de cookies o revocar en cualquier momento a trav&eacute;s del enlace configuraci&oacute;n de cookies.</p>
                                    <p>Tambi&eacute;n puede hacerlo utilizando su navegador, por el que puede permitir, restringir, bloquear o borrar las cookies utilizadas desde nuestro Sitio Web.</p>
                                    <p>La forma de hacerlo ser&aacute; diferente en funci&oacute;n del tipo de navegador utilizado durante la navegaci&oacute;n. En los siguientes enlaces tiene a su disposici&oacute;n toda la informaci&oacute;n para configurar o deshabilitar las cookies en cada navegador:</p>
                                    <ul>
                                        <li><strong>Internet Explorer</strong>: <a href="http://windows.microsoft.com/es-xl/internet-explorer/delete-manage-cookies#ie=">windows.microsoft.com/es-xl/internet-explorer/delete-manage-cookies#ie="ie-10"</a></li>
                                        <li><strong>Firefox</strong>: <a href="http://support.mozilla.org/es/kb/Borrar%20cookies">support.mozilla.org/es/kb/Borrar%20cookies</a></li>
                                        <li><strong>Chrome</strong>: <a href="https://support.google.com/chrome/answer/95647?hl=">support.google.com/chrome/answer/95647?hl="es"</a></li>
                                        <li><strong>Safari</strong>: <a href="http://www.apple.com/es/privacy/use-of-cookies/">www.apple.com/es/privacy/use-of-cookies/</a></li>
                                    </ul>
                                    <p>Adem&aacute;s, tambi&eacute;n el usuario puede gestionar el almac&eacute;n de cookies de su navegador y su desactivaci&oacute;n a trav&eacute;s de herramientas como:</p>
                                    <ul>
                                        <li><strong>Ghostery</strong>: <a href="http://www.ghostery.com/">www.ghostery.com/</a></li>
                                        <li><strong>Your online choices</strong>: <a href="http://www.youronlinechoices.com/es/">www.youronlinechoices.com/es/</a></li>
                                    </ul>
                                    <p><strong>IMPORTANTE:</strong> En caso de que el usuario no permita la instalaci&oacute;n de las cookies estrictamente necesarias en su equipo terminal a trav&eacute;s de su navegador (las identificadas en el punto primero del apartado anterior), es posible que no pueda acceder correctamente a los contenidos y servicios de nuestra web.</p>
                                    <p>No obstante, si el usuario contin&uacute;a navegando en nuestra web sin cambiar la configuraci&oacute;n de su navegador, se entender&aacute; que presta su consentimiento al uso de las cookies antes enunciadas, y en las condiciones contenidas en la presente Pol&iacute;tica de Cookies.</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            );
    }
}

export default PoliticaCookiesPage;
