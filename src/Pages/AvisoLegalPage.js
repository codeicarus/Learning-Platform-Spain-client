import React, { Component } from "react";
import ReactGA from "react-ga";

class AvisoLegalPage extends Component {
  componentDidMount() {
    ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALITYCS);
    ReactGA.pageview(window.location.pathname + window.location.search);
    window.scrollTo(0, 0);
  }

  componentDidMount() {
    const url = new URL(window.location);
    if (url.hash === "#promo") {
      const promoElement = document.getElementById("promo");
      if (promoElement) {
        promoElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }

  render() {
    return (
      <div>
        <section id="pricing" className="plans featured left contenido_texto">
          <div className="container">
            <div className="row intro mt-5">
              <div className="col-12">
                <h2 className="featured">Aviso Legal</h2>
                <h3>
                  <strong>
                    1. OBJETO Y ACEPTACI&Oacute;N DE OBLIGACI&Oacute;N.
                  </strong>
                </h3>
                <p>
                  El presente aviso legal regula el uso del sitio web{" "}
                  <strong>www.penitenciarios.com</strong> del que es
                  titular,&nbsp;
                </p>
                <p>
                  La navegaci&oacute;n por el sitio web de{" "}
                  <strong>Penitenciarios</strong> atribuye la condici&oacute;n
                  de usuario del mismo e implica la aceptaci&oacute;n plena y
                  sin reservas de todas y cada una de las disposiciones
                  incluidas en este <strong>&ldquo;AVISO LEGAL&rdquo;,</strong>{" "}
                  que pueden sufrir modificaciones.
                </p>
                <p>
                  El usuario se obliga a hacer un uso correcto del sitio web, de
                  conformidad con las leyes, la buena fe, el orden
                  p&uacute;blico, los usos del tr&aacute;fico y el presente{" "}
                  <strong>&ldquo;AVISO LEGAL&rdquo;.</strong> El usuario
                  responder&aacute; frente a <strong>PENITENCIARIOS</strong> o
                  frente a terceros, de cualesquiera da&ntilde;os y perjuicios
                  que pudieran causarse como consecuencia del incumplimiento de
                  dicha obligaci&oacute;n.
                </p>
                <h3>
                  <strong>2. IDENTIFICACI&Oacute;N Y COMUNICACIONES.</strong>
                </h3>
                <p>
                  <strong>PENITENCIARIOS</strong>, en cumplimiento de la Ley
                  34/2002, de 11 de julio, de servicios de la sociedad de la
                  informaci&oacute;n y de correo electr&oacute;nico, le informa
                  que:
                </p>
                <ul>
                  <li>
                    Su denominaci&oacute;n social es{" "}
                    <strong>PENITENCIARIOS</strong>
                  </li>
                  <li>
                    Su domicilio social est&aacute; situado en:{" "}
                    <strong>Calle Aneto 13, 41710 (Sevilla - España)</strong>
                  </li>
                </ul>
                <p>
                  Para comunicarse con nosotros, ponemos a su disposici&oacute;n
                  diferentes medios de contacto:
                </p>
                <ul>
                  <li>
                    E-mail: <strong>penitenciarios@penitenciarios.com</strong>
                  </li>
                  <li>
                    Tel&eacute;fono: <strong>&nbsp;603161768</strong>
                  </li>
                </ul>
                <p>
                  Todas las notificaciones y comunicaciones entre los usuarios y{" "}
                  <strong>PENITENCIARIOS</strong> se considerar&aacute;n
                  eficaces a todos los efectos, cuando se realicen a
                  trav&eacute;s de correo postal o cualquier otro medio de los
                  detallados anteriormente.
                </p>
                <h3>
                  <strong>3. CONDICIONES DE USO Y ACCESO.</strong>
                </h3>
                <p>
                  El sitio web y sus servicios son de acceso libre y gratuito,
                  no obstante, <strong>PENITENCIARIOS</strong> permitir&aacute;
                  la utilizaci&oacute;n de algunos de los servicios ofrecidos en
                  su web cuando previamente se cumplimente el correspondiente
                  formulario. El usuario garantiza la autenticidad y actualidad
                  de todos aquellos datos que comunique a{" "}
                  <strong>PENITENCIARIOS</strong> y ser&aacute; el &uacute;nico
                  responsable de las manifestaciones falsas o inexactas que
                  realice. El usuario se compromete expresamente a hacer un uso
                  adecuado de los contenidos y servicios de{" "}
                  <strong>PENITENCIARIOS</strong>.
                </p>
                <h3>
                  <strong>4. PROPIEDAD INTELECTUAL.</strong>
                </h3>
                <p>
                  Todos los contenidos del sitio web, como textos,
                  fotograf&iacute;as, gr&aacute;ficos, im&aacute;genes, iconos,
                  tecnolog&iacute;a, software, as&iacute; como su dise&ntilde;o
                  gr&aacute;fico y c&oacute;digos fuente, son propiedad de{" "}
                  <strong>PENITENCIARIOS</strong>
                  <strong>, </strong>sin que puedan entenderse cedidos al
                  usuario ninguno de los derechos de explotaci&oacute;n sobre
                  los mismos m&aacute;s all&aacute; de lo estrictamente
                  necesario para el correcto uso de la web.
                </p>
                <p>
                  En definitiva, los usuarios que accedan a este sitio web
                  pueden visualizar los contenidos y efectuar, en su caso,
                  copias privadas autorizadas siempre que los elementos
                  reproducidos{" "}
                  <strong>no sean cedidos posteriormente a terceros</strong>, ni
                  se instalen a servidores conectados a redes, ni sean objeto de
                  ning&uacute;n tipo de explotaci&oacute;n.
                </p>
                <p>
                  Asimismo, todas las marcas, nombres comerciales o signos
                  distintivos de cualquier clase que aparecen en el sitio web
                  son propiedad de <strong>PENITENCIARIOS</strong>, sin que
                  pueda entenderse que el uso o acceso al mismo atribuya al
                  usuario derecho alguno sobre los mismos.
                </p>
                <p>
                  La distribuci&oacute;n, modificaci&oacute;n, cesi&oacute;n o
                  comunicaci&oacute;n p&uacute;blica de los contenidos y
                  cualquier otro acto que no haya sido expresamente autorizado
                  por el titular de los derechos de explotaci&oacute;n quedan
                  prohibidos.
                </p>
                <h3>
                  <strong>
                    5. CLAUSULAS SOBRE LA POL&Iacute;TICA DE ENLACES DE LA WEB.
                  </strong>
                </h3>
                <p>
                  El establecimiento de un hiperenlace no implica en
                  ning&uacute;n caso la existencia de relaciones entre{" "}
                  <strong>PENITENCIARIOS</strong> y el propietario del sitio web
                  en el que se establezca, ni la aceptaci&oacute;n y
                  aprobaci&oacute;n por parte de <strong>PENITENCIARIOS</strong>{" "}
                  de sus contenidos o servicios. En ning&uacute;n caso,{" "}
                  <strong>PENITENCIARIOS</strong> asumir&aacute; responsabilidad
                  alguna por los contenidos de alg&uacute;n enlace perteneciente
                  a un sitio web ajeno, ni garantizar&aacute; la disponibilidad
                  t&eacute;cnica, calidad, fiabilidad, exactitud, amplitud,
                  veracidad, validez y constitucionalidad de cualquier material
                  o informaci&oacute;n contenida en ninguno de dichos enlaces u
                  otros sitios de Internet. Igualmente, la inclusi&oacute;n de
                  estas conexiones externas no implicar&aacute; ning&uacute;n
                  tipo de relaci&oacute;n con las entidades conectadas. Aquellas
                  personas que se propongan establecer un hiperenlace
                  previamente deber&aacute;n solicitar autorizaci&oacute;n por
                  escrito a <strong>PENITENCIARIOS</strong>
                  <strong>. </strong>En todo caso, el hiperenlace
                  &uacute;nicamente permitir&aacute; el acceso a la
                  p&aacute;gina de inicio de nuestro sitio web, asimismo
                  deber&aacute; abstenerse de realizar manifestaciones o
                  indicaciones falsas, inexactas o incorrectas sobre{" "}
                  <strong>PENITENCIARIOS</strong>
                  <strong>, </strong>o incluir contenidos il&iacute;citos,
                  contrarios a las buenas costumbres y al orden p&uacute;blico.
                </p>
                <p>
                  <strong>PENITENCIARIOS</strong> no se responsabiliza del uso
                  que cada usuario les d&eacute; a los distintos tipos de
                  materiales que se ponen a disposici&oacute;n para los usuarios
                  ni de las posteriores actuaciones que se realicen en base a
                  los mismos.
                </p>
                <h3>
                  <strong>
                    6. EXCLUSI&Oacute;N DE GARANT&Iacute;AS Y DE
                    RESPONSABILIDAD.
                  </strong>
                </h3>
                <p>
                  <strong>PENITENCIARIOS </strong>se reserva el derecho a
                  denegar o retirar el acceso a su &ldquo;p&aacute;gina
                  web&rdquo; y/o los servicios ofrecidos sin necesidad de
                  preaviso, a instancia propia o de un tercero, a aquellos
                  usuarios que incumplan las presentes condiciones generales de
                  uso.
                </p>
                <p>
                  <strong>PENITENCIARIOS</strong> no se hace responsable, hasta
                  donde permite el ordenamiento jur&iacute;dico, cualquier
                  responsabilidad por los da&ntilde;os y perjuicios de toda
                  naturaleza derivados de:
                </p>
                <ol>
                  <li>
                    La imposibilidad de acceso al sitio web o la falta de
                    veracidad, exactitud y/o actualidad de los contenidos,
                    as&iacute; como la existencia de vicios y defectos de toda
                    clase de los contenidos transmitidos, difundidos,
                    almacenados, puestos a disposici&oacute;n, a los que se haya
                    accedido a trav&eacute;s del sitio web o de los servicios
                    que se ofrecen.
                  </li>
                  <li>
                    La presencia de virus o de otros elementos en los contenidos
                    que puedan producir alteraciones en los sistemas
                    inform&aacute;ticos, documentos electr&oacute;nicos o datos
                    de los usuarios.
                  </li>
                  <li>
                    El incumplimiento de las leyes, la buena fe, el orden
                    p&uacute;blico, los usos del tr&aacute;fico y el presente
                    aviso legal como consecuencia del uso incorrecto del sitio
                    web. En particular, y a modo de ejemplo,{" "}
                    <strong>PENITENCIARIOS</strong> no se hace responsable de
                    las actuaciones de terceros que vulneren derechos de
                    propiedad intelectual e industrial, secretos empresariales,
                    derechos al honor, a la intimidad personal y familiar y a la
                    propia imagen, as&iacute; como la normativa en materia de
                    competencia desleal y publicidad il&iacute;cita.
                  </li>
                </ol>
                <p>
                  Asimismo, <strong>PENITENCIARIOS</strong> no acepta cualquier
                  responsabilidad respecto a la informaci&oacute;n que se
                  encuentre fuera de esta web y no sea gestionada directamente
                  por nuestros responsables. La funci&oacute;n de los enlaces
                  que aparecen en esta web es exclusivamente la de informar al
                  usuario sobre la existencia de otras fuentes susceptibles de
                  ampliar los contenidos que ofrece este sitio web.{" "}
                  <strong>PENITENCIARIOS</strong> no garantiza ni se
                  responsabiliza del funcionamiento o accesibilidad de los
                  sitios enlazados; ni sugiere, invita o recomienda la visita a
                  los mismos, por lo que tampoco ser&aacute; responsable del
                  resultado obtenido. <strong>PENITENCIARIOS</strong> no se
                  responsabiliza del establecimiento de hiperv&iacute;nculos por
                  parte de terceros.
                </p>
                <h3>
                  <strong>
                    7. PROCEDIMIENTO EN CASO DE REALIZACI&Oacute;N DE
                    ACTIVIDADES ILEGALES.
                  </strong>
                </h3>
                <p>
                  En el caso de que cualquier usuario o un tercero considere que
                  existen hechos o circunstancias que revelen un car&aacute;cter
                  ilegal en la utilizaci&oacute;n de cualquier contenido y/o de
                  la realizaci&oacute;n de cualquier actividad en las
                  p&aacute;ginas web incluidas o accesibles a trav&eacute;s del
                  sitio web, deber&aacute; enviar una notificaci&oacute;n a{" "}
                  <strong>PENITENCIARIOS</strong> identific&aacute;ndose
                  debidamente, especificando las supuestas infracciones y
                  declarando expresamente y bajo su responsabilidad que la
                  informaci&oacute;n proporcionada en la notificaci&oacute;n es
                  exacta.
                </p>
                <p>
                  Para toda cuesti&oacute;n litigiosa que incumba al sitio web
                  de <strong>PENITENCIARIOS</strong>, ser&aacute; de
                  aplicaci&oacute;n la legislaci&oacute;n espa&ntilde;ola.
                </p>
                <h3>
                  <strong>8. CONDICIONES DE CONTRATACI&Oacute;N.</strong>
                </h3>
                <h4>
                  <strong>
                    A.- CARACTER&Iacute;STICAS ESENCIALES DEL SERVICIO
                    CONTRATADO.
                  </strong>
                </h4>
                <p>
                  En adelante, para hacer referencia en este contrato a la
                  entidad prestadora del servicio se utilizar&aacute; la
                  denominaci&oacute;n comercial <strong>PENITENCIARIOS</strong>.
                </p>
                <p>
                  <strong>PENITENCIARIOS</strong> se obliga frente al alumno/a a
                  poner a disposici&oacute;n de los mismos que han contratado
                  con <strong>PENITENCIARIOS</strong>, y bajo las condiciones
                  particulares especificadas en el contrato los contenidos que
                  se detallan en la documentaci&oacute;n correspondiente y
                  sujetos a las <strong>CONDICIONES GENERALES</strong>.
                </p>
                <ul>
                  <li>
                    A trav&eacute;s de <strong>PENITENCIARIOS</strong> se presta
                    un servicio on line de preparaci&oacute;n de oposiciones. No
                    garantiza en modo alguno al alumno/a la obtenci&oacute;n de
                    resultados concretos ni la superaci&oacute;n de la
                    oposici&oacute;n en la que se haya matriculado.
                  </li>
                  <li>
                    <strong>PENITENCIARIOS</strong> se reserva el derecho a
                    realizar cambios en el Portal sin previo aviso, con el
                    objeto de actualizar, corregir, modificar, a&ntilde;adir o
                    eliminar los contenidos del Portal o de su dise&ntilde;o.
                    Los contenidos y servicios que ofrece el Portal se
                    actualizan peri&oacute;dicamente.&nbsp;
                  </li>
                  <li>
                    <strong>PENITENCIARIOS</strong> se compromete a garantizar
                    el uso de la p&aacute;gina web y a no interrumpir la
                    utilizaci&oacute;n de la misma excepto por los motivos
                    pactados en el presente contrato o por las causas de
                    resoluci&oacute;n acordadas en el mismo.
                  </li>
                  <li>
                    <strong>PENITENCIARIOS</strong> garantiza al/a alumno/a el
                    funcionamiento de la p&aacute;gina web, objeto del&nbsp;
                    presente contrato y su estado operacional, pero no garantiza
                    que el funcionamiento del mismo no sea interrumpido. El/la
                    alumno/a entiende y acepta que el servicio sea interrumpido
                    o suspendido, en todo o en parte, por razones de
                    mantenimiento o por puntuales problemas t&eacute;cnicos.
                    El/la alumno/a acepta esta interrupci&oacute;n temporal de
                    los servicios sin que tenga derecho a exigir
                    indemnizaci&oacute;n alguna.
                  </li>
                  <li>
                    <strong>PENITENCIARIOS</strong> no se hace responsable de
                    los incumplimientos o demoras que pudieran ocurrir en la
                    prestaci&oacute;n del servicio como consecuencia de causas
                    de fuerza mayor o caso fortuito, y de aquellas otras causas
                    que est&eacute;n fuera de su control o voluntad. En tales
                    casos, <strong>PENITENCIARIOS</strong> se compromete a
                    comunicar al alumno/a el plazo estimado de resoluci&oacute;n
                    de tales incidencias e intentar&aacute; solventarlas a la
                    mayor brevedad posible.
                  </li>
                  <li>
                    Tanto el dise&ntilde;o del Portal y sus c&oacute;digos
                    fuente, como los logos, marcas, y dem&aacute;s signos
                    distintivos que aparecen en el mismo, pertenecen a{" "}
                    <strong>PENITENCIARIOS</strong>
                    <strong>,</strong> y est&aacute;n protegidos por los
                    correspondientes derechos de propiedad intelectual e
                    industrial. Igualmente est&aacute;n protegidos por los
                    correspondientes derechos de propiedad intelectual e
                    industrial las im&aacute;genes, etc. que est&aacute;n en la
                    p&aacute;gina web de <strong>PENITENCIARIOS</strong>.
                  </li>
                  <li>
                    Su reproducci&oacute;n, distribuci&oacute;n,
                    comunicaci&oacute;n p&uacute;blica, cesi&oacute;n, venta,
                    transmisi&oacute;n, alquiler, subcontrataci&oacute;n,
                    transformaci&oacute;n o cualquier otra actividad similar o
                    an&aacute;loga, queda totalmente prohibida salvo que medie
                    consentimiento previo y por escrito&nbsp; de{" "}
                    <strong>PENITENCIARIOS</strong>. La licencia de uso de
                    cualquier contenido de este Portal otorgada al usuario se
                    limita a la descarga por parte del usuario de dicho
                    contenido y el uso privado del mismo, siempre que los
                    citados contenidos permanezcan &iacute;ntegros.
                  </li>
                  <li>
                    <strong>PENITENCIARIOS</strong> declara su respeto a los
                    derechos de propiedad intelectual e industrial de terceros;
                    por ello, si considera que este sitio pudiera estar violando
                    sus derechos, rogamos se ponga en contacto con{" "}
                    <strong>PENITENCIARIOS</strong> en la siguiente
                    direcci&oacute;n de e‐mail:
                    penitenciarios@penitenciarios.com
                  </li>
                  <li>
                    <strong>PENITENCIARIOS</strong> le facilita el acceso a
                    otras p&aacute;ginas web que consideramos pueden ser de su
                    inter&eacute;s. El objetivo de dichos enlaces es
                    &uacute;nicamente facilitarle la b&uacute;squeda de los
                    recursos que le puedan interesar a trav&eacute;s de
                    Internet. No obstante, dichas p&aacute;ginas no le
                    pertenecen, as&iacute; como tampoco se hace una
                    revisi&oacute;n de sus contenidos que tienen car&aacute;cter
                    &uacute;nicamente informativo y que no necesariamente
                    implican relaci&oacute;n con personas o entidades titulares
                    de dichos contenidos o de los sitios donde se encuentren y
                    por ello, no puede hacerse responsable de los mismos, del
                    funcionamiento de la p&aacute;gina enlazada o de los
                    posibles da&ntilde;os que puedan derivarse del acceso o uso
                    de la misma.
                  </li>
                  <li>
                    <strong>PENITENCIARIOS</strong> no se hace responsable de
                    ning&uacute;n modo ni garantiza la calidad, exactitud,
                    fiabilidad, correcci&oacute;n o moralidad de contenidos o
                    servicios que el establecimiento del hiperenlace pueda
                    ofrecer. El usuario tendr&aacute; bajo su exclusiva
                    responsabilidad las consecuencias, da&ntilde;os o acciones
                    que pudieran derivarse del acceso a la p&aacute;gina web del
                    hiperenlace.
                  </li>
                </ul>
                <h4>
                  <strong>
                    B.- ENSE&Ntilde;ANZA SIN VALIDEZ ACAD&Eacute;MICA.
                  </strong>
                </h4>
                <p>
                  Expresamente se hace constar, y as&iacute; se acepta por el/la
                  alumno/a, que las ense&ntilde;anzas impartidas en el curso no
                  permiten por s&iacute; solas la obtenci&oacute;n de
                  t&iacute;tulo oficial con validez acad&eacute;mica. No se
                  expide ning&uacute;n tipo de diploma por la
                  finalizaci&oacute;n del Curso de preparaci&oacute;n de
                  Oposiciones.
                </p>
                <h4>
                  <strong>C.- PERSONAL DE </strong>
                  <strong>PENITENCIARIOS</strong>
                  <strong>.</strong>
                </h4>
                <p>
                  <strong>PENITENCIARIOS</strong> es el responsable del
                  contenido de la p&aacute;gina web.{" "}
                  <strong>PENITENCIARIOS</strong> se reserva el derecho a
                  cambiar a los profesionales que trabajan para{" "}
                  <strong>PENITENCIARIOS</strong> en el desarrollo del curso por
                  otro con cualificaci&oacute;n similar.&nbsp;
                </p>
                <h4>
                  <strong>D.- PAGO DEL PRECIO.</strong>
                </h4>
                <p>
                  En el caso de que el/la alumno/a opte por el pago aplazado en
                  un n&uacute;mero determinado de mensualidades, los pagos se
                  efectuar&aacute;n por mensualidades completas,
                  independientemente del n&uacute;mero de d&iacute;as que el
                  alumno se conecte a la Plataforma, y dentro de los cinco
                  primeros d&iacute;as del mes, con la &uacute;nica
                  excepci&oacute;n del primer mes de asistencia, en que se
                  abonar&aacute; el recibo el d&iacute;a de comienzo que figure
                  en el contrato.
                </p>
                <p>
                  Las faltas de conexi&oacute;n no eximen del pago de la
                  mensualidad correspondiente, y <strong>PENITENCIARIOS</strong>{" "}
                  no est&aacute; obligado a indemnizarlas en modo alguno.
                </p>
                <p>
                  <strong>PENITENCIARIOS</strong> se reserva la posibilidad de
                  bloquear el acceso del/la alumno/a al Portal y a todos sus
                  contenidos, sin ning&uacute;n tipo de responsabilidad por su
                  parte, en los siguientes casos:
                </p>
                <ul>
                  <li>
                    Si el/la alumno/a tuviera facturas pendientes de cobro, una
                    vez transcurrido el plazo de vencimiento.
                  </li>
                  <li>
                    Si el/la alumno/a incumpliera cualquiera de las obligaciones
                    derivadas del presente contrato.
                  </li>
                </ul>
                <p>
                  Pagos adicionales. Antes de que el/la alumno/a quede vinculado
                  por cualquier contrato u oferta adicional a la contratada en
                  este acto, <strong>PENITENCIARIOS </strong>deber&aacute;
                  obtener su consentimiento expreso para todo pago adicional a
                  la remuneraci&oacute;n acordada para&nbsp; la
                  obligaci&oacute;n contractual principal. Estos suplementos
                  opcionales se comunicar&aacute;n de una manera clara y
                  comprensible y su aceptaci&oacute;n por el/la alumno/a se
                  realizar&aacute; sobre una base de opci&oacute;n de
                  inclusi&oacute;n (el/la alumno/a deber&aacute; contratar
                  expresamente las nuevas funcionalidades, sin que puedan
                  entenderse contratadas las mismas por la mera omisi&oacute;n
                  del/la alumno/a).
                </p>
                <p>
                  Existe la obligaci&oacute;n de desglosar del precio total
                  todos los incrementos y descuentos que se apliquen incluidos
                  los ocasionados, en su caso, por la utilizaci&oacute;n de los
                  medios de pago u otras condiciones de pagos similares.
                </p>
                <h4>
                  <strong>E.- FACTURACI&Oacute;N.</strong>
                </h4>
                <p>
                  El/la alumno/a tiene el derecho de recibir la correspondiente
                  factura en papel. Solicitando dicha factura al correo
                  penitenciarios@penitenciarios.com. La expedici&oacute;n de la
                  factura electr&oacute;nica estar&aacute; condicionada a que
                  PENITENCIARIOS haya obtenido previamente el consentimiento
                  expreso del/la alumno/a.
                </p>
                <h4>
                  <strong>F.- HOJAS DE RECLAMACIONES.</strong>
                </h4>
                <p>
                  Existen Hojas de Reclamaciones a disposici&oacute;n de los/las
                  alumnos/as.
                </p>
                <h4>
                  <strong>G.- DURACI&Oacute;N DEL CONTRATO.</strong>
                </h4>
                <p>
                  El periodo de validez del contrato es mensual, renovable
                  mensualmente. No existe un periodo de permanencia.
                </p>
                <h4>
                  <strong>
                    H.- SERVICIO DE ATENCI&Oacute;N AL USUARIO &ndash;
                    TUTOR&Iacute;AS.
                  </strong>
                </h4>
                <p>
                  El servicio que ofrece <strong>PENITENCIARIOS</strong> para la
                  atenci&oacute;n al/la alumno/a estar&aacute; en funcionamiento
                  en el horario establecido en la propia plataforma online,
                  garantizando en todo caso un m&iacute;nimo diario de 4 horas.
                  Con un compromiso de respuesta m&aacute;ximo de 24 horas a
                  contar desde la presentaci&oacute;n de la duda por parte del
                  alumno/a. Dicho servicio se prestar&aacute; a trav&eacute;s
                  del correo penitenciarios@penitenciarios.com.
                </p>
                <h4>
                  <strong>I.- COMUNICACIONES COMERCIALES.</strong>
                </h4>
                <p>
                  El/la alumno/a autoriza expresamente a{" "}
                  <strong>PENITENCIARIOS</strong> a enviarle comunicaciones
                  comerciales por correo electr&oacute;nico referentes a
                  productos o servicios de su empresa, siempre que &eacute;stos
                  sean similares a los que inicialmente fueron objeto de
                  contrataci&oacute;n por el/la alumno/a.
                </p>
                <p>
                  El destinatario podr&aacute; revocar en cualquier momento el
                  consentimiento prestado a la recepci&oacute;n de
                  comunicaciones comerciales con la simple notificaci&oacute;n a{" "}
                  <strong>PENITENCIARIO a</strong> trav&eacute;s del correo
                  electr&oacute;nico penitenciarios@penitenciarios.com.
                </p>
                <h4>
                  <strong>J.- DERECHO DE DESISTIMIENTO.</strong>
                </h4>
                <p>
                  Al tratarse de suministro de contenido digital, el alumno
                  manifiesta conocer y consentir que por aplicaci&oacute;n del
                  art. 103.m del Real Decreto Legislativo 1/2007, de 16 de
                  noviembre, por el que se aprueba el texto refundido de la Ley
                  General para la Defensa de los Consumidores y Usuarios, no le
                  ser&aacute; aplicable el derecho de desistimiento regulados en
                  los art&iacute;culos 68 y siguientes del citado Texto
                  Refundido.
                </p>
                <h3>
                  <strong>9. PUBLICACIONES.</strong>
                </h3>
                <p>
                  La informaci&oacute;n administrativa facilitada a
                  trav&eacute;s del sitio web no sustituye la publicidad legal
                  de las leyes, normativas, planes, disposiciones generales y
                  actos que tengan que ser publicados formalmente a los diarios
                  oficiales de las administraciones p&uacute;blicas, que
                  constituyen el &uacute;nico instrumento que da fe de su
                  autenticidad y contenido. La informaci&oacute;n disponible en
                  este sitio web debe entenderse como una gu&iacute;a sin
                  prop&oacute;sito de validez legal.
                </p>
                <h3>
                  <strong>10. POL&Iacute;TICA DE PRIVACIDAD.</strong>
                </h3>
                <p>
                  Tiene a su disposici&oacute;n nuestra pol&iacute;tica de
                  privacidad en el apartado que se denomina
                  &ldquo;Pol&iacute;tica de Privacidad&rdquo;. ( Poner enlace a
                  dicho apartado)
                </p>
                <h3>
                  <strong>11. POL&Iacute;TICA DE COOKIES.</strong>
                </h3>
                <p>
                  Tiene a su disposici&oacute;n nuestra pol&iacute;tica de
                  cookies en el apartado que se denomina &ldquo;Pol&iacute;tica
                  de Cookies&rdquo;.
                </p>
                <h3>
                  <strong>12. JURISDICCI&Oacute;N APLICABLE.</strong>
                </h3>
                <p>
                  En los casos de discrepancias interpretativas, producidas por
                  la existencia de diferentes versiones en idiomas distintos al
                  castellano, siempre primar&aacute; la versi&oacute;n en este
                  idioma frente a las otras versiones.
                </p>
                <p id="promo">
                  En caso de duda o discrepancia acerca de la
                  interpretaci&oacute;n y/o aplicaci&oacute;n del presente
                  contrato, as&iacute; como de conflictos que puedan surgir con
                  ocasi&oacute;n de la visita al Portal o del uso de los
                  servicios que en &eacute;l se puedan ofertar, las partes se
                  someten expresamente a los juzgados y tribunales de Sevilla
                  capital, renunciando expresamente ambas partes a cualesquiera
                  otros fueros que pudieran corresponderles, siendo aplicable en
                  todos los casos la legislaci&oacute;n espa&ntilde;ola.
                </p>
                <div>
                  <h3>
                    <strong>Promoción de Descuento en la Plataforma Web</strong>
                  </h3>
                  <p>
                    El presente aviso legal regula las condiciones de la
                    promoción de descuento ofrecida por Penitenciarios.com (en
                    adelante, "la Plataforma") durante un periodo específico.
                    Por favor, lea detenidamente este aviso legal antes de
                    suscribirse a la promoción. Al acceder y utilizar la
                    Plataforma, usted acepta quedar sujeto a los términos y
                    condiciones aquí establecidos.
                  </p>
                  <h3>
                    <strong>Descripción de la Promoción</strong>
                  </h3>
                  <p>
                    Durante un periodo de 15 días, desde el 15 de Julio hasta el
                    31 de Julio (en adelante, "el Periodo de Promoción"), la
                    Plataforma ofrece un descuento especial a aquellos usuarios
                    que se suscriban y realicen el pago correspondiente. Los
                    usuarios que participen en esta promoción podrán disfrutar
                    de acceso a...
                  </p>
                  <h3>
                    <strong>DEFINICIONES</strong>
                  </h3>
                  <p>
                    En este aviso legal (el "Aviso"), los términos "nosotros",
                    "nuestro" y "nos" se refieren a la entidad que opera la
                    plataforma web de test y supuestos prácticos. "Usted" y "su"
                    se refieren a cualquier usuario de la plataforma.
                  </p>
                  <h3>
                    <strong>LA PROMOCIÓN</strong>
                  </h3>
                  <p>
                    Desde el 15 de Julio hasta el 31 de Julio, ambos días
                    inclusive, ofrecemos un descuento en la suscripción a
                    nuestra plataforma. Durante este periodo, si se suscribe y
                    realiza el pago de 17,90 euros, podrá disfrutar de acceso a
                    nuestra plataforma hasta el 15 de Septiembre, también
                    inclusive. Esto representa un coste mensual de 5,97 euros.
                  </p>
                  <p>
                    Si decide no aprovechar esta promoción trimestral, el precio
                    de la suscripción a nuestra plataforma será de 9,90 euros al
                    mes, que es su precio original.
                  </p>
                  <p>
                    Para calificar para esta promoción, debe realizar la
                    transferencia o Bizum correspondiente antes de las 00:00 del
                    día 1 de Agosto.
                  </p>
                  <h3>
                    <strong>POLÍTICA DE REEMBOLSOS</strong>
                  </h3>
                  <p>
                    Ofrecemos una política de reembolsos de 15 días. Esto
                    significa que si no está satisfecho con nuestra plataforma
                    por cualquier razón, puede solicitar un reembolso completo
                    de su pago dentro de los 15 días posteriores a su
                    suscripción. Pasado este periodo de 15 días, no se realizará
                    el reembolso correspondiente.
                  </p>
                  <h3>
                    <strong>EJEMPLOS</strong>
                  </h3>
                  <p>
                    A continuación se presentan dos ejemplos de cómo funciona
                    esta promoción:
                  </p>
                  <p>
                    i. Andr&eacute;s se suscribe a la promoción el 28 de Julio y
                    paga 17,90 euros. Como resultado, tendrá acceso a la
                    plataforma y a todos sus recursos hasta el 15 de Septiembre,
                    incluido ese día.
                  </p>
                  <p>
                    ii. Mar&iacute;a se suscribe y paga el 16 de Julio. Al igual
                    que Andr&eacute;s, Mar&iacute;a tendrá acceso a la
                    plataforma hasta el 15 de Septiembre.
                  </p>
                  <p>
                    El presente Aviso Legal está sujeto a cambios y
                    modificaciones sin previo aviso. Recomendamos que los
                    usuarios revisen regularmente este documento para mantenerse
                    informados sobre nuestras políticas y prácticas. Si tiene
                    alguna pregunta sobre este Aviso Legal, por favor, póngase
                    en contacto con nosotros.
                  </p>
                  <p>Fecha de la última actualización: 13 de Julio de 2023.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default AvisoLegalPage;
