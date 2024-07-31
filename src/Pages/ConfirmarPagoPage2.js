import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { BsCreditCard2Back } from "react-icons/bs";
import { AiOutlineArrowRight, AiOutlineCopy } from "react-icons/ai";
import { PiNumberCircleOneFill, PiNumberCircleTwoFill } from "react-icons/pi";
import axios from "axios";
import "./ConfirmPago.css";
import { toast } from "react-toastify";

const suscripcion = {
  "0990": {
    price: "9.90",
    time: "1 mes",
    description: "Suscripción a 1 mes",
  },
  2790: {
    price: "26.90",
    time: "3 meses",
    description: "Suscripción a 3 mes",
  },
  salida: {
    price: "17.50",
    time: "Promoción exclusiva solo por 15 dias",
    description: "Promocion exclusiva",
  },
};

function ConfirmPagoPage2() {
  const { id } = useParams();
  const history = useHistory();
  const [load, setLoad] = useState(false);

  const copyCode = (code) => {
    navigator.clipboard
      .writeText(code)
      .then(() => toast.success("Copiado en portapapeles"))
      .catch((error) => toast.success(error));
  };

  const sendPayment = async (e) => {
    e.preventDefault();
    try {
      if (localStorage.getItem("token_penitenciarios")) {
        setLoad(true);
        const { data } = await axios.post(
          process.env.REACT_APP_URL_API + "start_payment",
          {
            suscription: id,
            mount: suscripcion[id].price,
            email: localStorage.getItem("email_penitenciarios"),
            type: e.target.concepto.id,
            concepto: e.target.concepto.value,
          },
          {
            headers: {
              Authorization: localStorage.getItem("token_penitenciarios"),
            },
          }
        );
        toast.success(data.message);
        setLoad(false);
      }
    } catch (error) {
      setLoad(false);

      toast.error(error.response.data.error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const token = localStorage.getItem("token_penitenciarios");
    if (token === null) return history.push("/login");
    if (!suscripcion[id]) return history.push("/home");
  }, []);

  return (
    <section style={{ padding: "90px 0px" }}>
      {load && <div className="loader_examen"></div>}
      <div className="row justify-content-center text-center items">
        <div className="col-10 col-md-6 align-self-center text-center item confirmPago">
          <h2>Realizar Pago</h2>
          <div className="no-hover">
            <div className="impotante-info">
              <span>
                <PiNumberCircleOneFill size={20} /> Realizar un Bizum o
                transferencia
              </span>
              {/* <span>
                <PiNumberCircleOneFill size={20} /> Realizar una transferencia
              </span> */}
              <br />
              <span>
                <PiNumberCircleTwoFill size={20} /> En el concepto de Bizum o
                transferencia añade tu correo electrónico para actualizar tu
                suscripción
              </span>
              {/* <span>
                <PiNumberCircleTwoFill size={20} /> En el concepto de
                transferencia añade tu correo electrónico para actualizar tu
                suscripción
              </span> */}
            </div>
          </div>
          <div className="content opt-content">
            <div className="bizumm">
              <img
                src="/assets/images/logo-bizum.jpg"
                alt="bizumm"
                width={200}
                height={100}
              />
              <p>
                603161768{" "}
                <AiOutlineCopy
                  size={18}
                  onClick={() => copyCode("603161768")}
                />
              </p>
              <form className="env-form" onSubmit={sendPayment}>
                <input
                  type="text"
                  placeholder="Concepto de Bizum"
                  id="bizum"
                  name="concepto"
                />
                <button className="enviar-btn">
                  <AiOutlineArrowRight />
                </button>{" "}
              </form>
            </div>

            <div className="transferencia">
              <span>
                <BsCreditCard2Back size={80} />
                <br />
                Transferencia
              </span>
              <p>
                ES85 0073 0100 5507 9441 9471{" "}
                <AiOutlineCopy
                  size={18}
                  onClick={() => copyCode("ES8500730100550794419471")}
                />
              </p>
              <form className="env-form" onSubmit={sendPayment}>
                <input
                  type="text"
                  placeholder="Concepto de Transferencia"
                  id="transferencia"
                  name="concepto"
                />
                <button className="enviar-btn">
                  <AiOutlineArrowRight />
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-4 align-self-center text-center item">
          <div className="card no-hover">
            <i className="icon icon-handbag"></i>
            <h4>{suscripcion[id].time}</h4>
            <span className="price">
              <label>
                {suscripcion[id].price}
                <i>€</i>
              </label>
            </span>
            {id === "salida" && (
              <span className="info-promo">
                <p>
                  Duración: 3 meses desde el 15 de Julio hasta el 15 de
                  Septiembre
                </p>
                <p>Acceso ilimitado a preguntas Test</p>
                <p>Acceso ilimitado a supuestos prácticos</p>
                <p>Estadísticas y autoevaluación</p>
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ConfirmPagoPage2;
