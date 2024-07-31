import React, { useState, useEffect } from "react";
import axios from "axios";
import SuscripcionCardInfo from "../Includes/SuscripcionesCard";
import "./PaymentUsersPage.css";

function PaymentUsersPage() {
  const [suscripcines, setSuscripciones] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (localStorage.getItem("token_penitenciarios")) {
      axios
        .get(process.env.REACT_APP_URL_API + "view-payments", {
          headers: {
            Authorization: localStorage.getItem("token_penitenciarios"),
          },
        })
        .then(({ data }) =>
          //  setSuscripciones(data.data)
          data.data === null
            ? setSuscripciones([])
            : setSuscripciones(data.data)
        )
        .catch((err) => {});
    }
  }, []);

  return (
    <div>
      {load && <div className="loader_examen"></div>}
      <section id="pricing" className="plans featured left">
        <div className="container">
          <div className="row intro mt-5 mt-sm-2">
            <div className="col-12">
              <h2 className="featured">Lista de suscripciones pendienes</h2>
            </div>
          </div>
        </div>
        <div className="cards-users text-center">
          {suscripcines.length === 0 ? (
            <div className="row intro mt-5 mt-sm-2">
              <div className="col-12">
                <h4 className="featured">Lista de suscripciones pendienes</h4>
              </div>
            </div>
          ) : (
            suscripcines.map((suscripcion, index) => (
              <SuscripcionCardInfo
                key={index}
                infoData={suscripcion}
                set={setLoad}
              />
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export default PaymentUsersPage;
