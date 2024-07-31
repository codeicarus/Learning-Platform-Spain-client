import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { AiOutlineAppstoreAdd, AiOutlineSend } from "react-icons/ai";
import axios from "axios";

const suscripcion = {
  "0990": {
    price: "9.90",
    time: "1 mes",
    description: "Suscripción a 1 mes",
  },
  2790: {
    price: "27.90",
    time: "3 meses",
    description: "Suscripción a 3 mes",
  },
};

function ConfirmPagoPage() {
  const { id } = useParams();
  const history = useHistory();
  const [precio, setPrecio] = useState("");
  const [descuento, setDescuento] = useState("");

  const checkPromo = (e) => {
    e.preventDefault();
    setDescuento("1.00");
  };

  const iniciarPago = async () => {
    try {
      const { data } = await axios.post(
        process.env.REACT_APP_URL_API + "start_payment",
        {
          UserEmail: localStorage.getItem("email_penitenciarios"),
          Suscription: id,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token_penitenciarios"),
          },
        }
      );
      // console.log(data);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token_penitenciarios");
    if (token === null) return history.push("/login");
    setPrecio(suscripcion[id].price);
  });
  return (
    <section style={{ padding: "70px 0px" }}>
      <div className="row justify-content-center text-center items mt-5">
        <div className="col-10 col-md-6 align-self-center text-center item">
          <div className="card no-hover">
            <div>
              <AiOutlineAppstoreAdd size={50} />
            </div>
            <h4>importante</h4>
            <p className="text-left">
              Al iniciar un pago, <Link to="/">penitenciarios.com</Link> te
              enviara un correo con los datos necesario para que puedas realizar
              el pago.
              <br />
              <br />
              ¿Luego de realizar el pago?.
              <br />
              - Deberas enviar el comprobante de pago al correo que recibiste.
              <br />
              <br />
              Luego se verificara que el pago se haya realizado correctamente.
              Si todo salio bien, su cuenta se actualizara a los dias de su
              suscripcion
            </p>
            <form style={{ position: "relative" }} onSubmit={checkPromo}>
              <AiOutlineSend
                size={30}
                className="send"
                style={{ position: "absolute", top: "5px", right: "5px" }}
              />
              <input type="text" placeholder="Codigo promocional" />
            </form>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-4 align-self-center text-center item">
          <div className="card no-hover">
            <i className="icon icon-handbag"></i>
            <h4>{suscripcion[id].time}</h4>
            {descuento.length === 0 ? (
              <>
                <span className="price">
                  <label>
                    {precio}
                    <i>€</i>
                  </label>
                </span>
              </>
            ) : (
              <>
                <span className="price">
                  {/* {precio}
                  <i>€</i> */}
                  <label style={{ textDecoration: "line-through" }}>
                    {precio}
                  </label>
                  <i>€</i>
                </span>
                <span className="price price-nuevo">
                  {Number(precio) - Number(descuento)}
                  <i>€</i>
                </span>
              </>
            )}
            <button
              onClick={iniciarPago}
              className="smooth-anchor btn mx-auto primary-button"
            >
              <i className="icon-arrow-right-circle"></i>Iniciar Pago
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ConfirmPagoPage;
