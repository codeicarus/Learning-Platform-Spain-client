import React, { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";

const suscripcionesTypes = {
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
  salida: {
    price: "17.50",
    time: "Promocion exclusiva",
    description: "Promocion exclusiva",
  },
};

function SuscripcionCardInfo({ infoData, set }) {
  const [view, setView] = useState(true);
  const [message, setMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteSuscripcion, setDeleteSuscripcion] = useState(false);

  const aceptarPago = async () => {
    try {
      set(true);
      const info = {
        id: infoData.id,
        suscription: infoData.suscription,
        email: infoData.email,
        user_id: infoData.user.id,
        type: infoData.type,
        concepto: infoData.concepto,
        status: infoData.status,
        mount: infoData.mount,
      };
      const { data } = await axios.put(
        process.env.REACT_APP_URL_API + "accept-payment",
        {
          ...info,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token_penitenciarios"),
          },
        }
      );
      toast.success("Pago aceptado");
      setView(false);
      set(false);
    } catch (error) {
      set(false);
      toast.error(error.response.data.error);
    }
  };

  const rechazarPago = async () => {
    try {
      set(true);

      await axios.put(
        process.env.REACT_APP_URL_API + "rechazar-payment",
        {
          id: infoData.id,
          user_id: infoData.user.id,
          message: message,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token_penitenciarios"),
          },
        }
      );
      toast.warning("Pago rechazado");
      setOpenDialog(false);
      set(false);
    } catch (error) {
      set(false);
      toast.error(error.response.data.error);
    }
  };

  const deleteSuscripcionDB = async (id) => {
    setDeleteSuscripcion(false);
    // console.log(id);
    try {
      const { data } = await axios.delete(
        process.env.REACT_APP_URL_API + "delete-suscription/" + id,
        {
          headers: {
            Authorization: localStorage.getItem("token_penitenciarios"),
          },
        }
      );
      setView(false);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <>
      <div
        className={infoData.status === "RECHAZADO" ? "rechazado" : "user-Card"}
        style={view ? null : { display: "none" }}
      >
        <div className="opt">
          <Link to={`/userinfo/${infoData.user_id}`}>
            <AiOutlineUser size={30} />
          </Link>
          <button className="act" onClick={aceptarPago}>
            Aceptar
          </button>
          <button className="rec" onClick={() => setOpenDialog(true)}>
            Rechazar
          </button>
        </div>
        <p>Usuario: {infoData.user.name}</p>
        <p>Email: {infoData.user.email}</p>

        <div>
          <p>
            Monto: {infoData.mount}
            <i>€</i>
          </p>
          <p>Tipo: {suscripcionesTypes[infoData.suscription].time}</p>
          <p>Metodo: {infoData.type}</p>
          <p>Concepto: {infoData.concepto}</p>
        </div>
        <button
          onClick={() => setDeleteSuscripcion(true)}
          className="btn ml-lg-auto primary-button"
        >
          <BsTrash size={20} />
        </button>
      </div>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Motivo por el que se rechaza el pago
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div
              className="row"
              style={{
                width: "500px",
              }}
            >
              <div className="col-12 input-group p-0">
                <p>Puede volver a cambiar el estado en cualquier momento.</p>
                <label>Este mensaje le llegara al usuario por correo</label>
              </div>
              <div className="col-12 input-group p-0">
                <input
                  type="text"
                  onChange={(e) => setMessage(e.target.value)}
                  name="nombre_simulacro"
                  className="form-control"
                  required=""
                ></input>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <div
            style={{
              display: "flex",
              width: "100%",
              gap: "10px",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "35%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button
                className="btn btn-primary"
                onClick={() => setOpenDialog(false)}
                color="primary"
              >
                Cancelar
              </Button>
              <Button
                className="btn btn-primary"
                onClick={() => rechazarPago()}
                color="primary"
                autoFocus
              >
                Aceptar
              </Button>
            </div>
          </div>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteSuscripcion}
        onClose={() => setDeleteSuscripcion(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Eliminar historial de suscripción
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div
              className="row"
              style={{
                width: "500px",
              }}
            >
              <div className="col-12 input-group p-0">
                <label>
                  Eliminar Pago de {infoData.mount}€ del usuario{" "}
                  {infoData.user.email}{" "}
                </label>
                <p>
                  Esto no se notificara al usuario, solo eliminara el historial
                  de la base de datos, dejando que el usuario elija otra
                  suscripción.
                </p>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <div
            style={{
              display: "flex",
              width: "100%",
              gap: "10px",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "35%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button
                className="btn btn-primary"
                onClick={() => setDeleteSuscripcion(false)}
                color="primary"
              >
                Cancelar
              </Button>
              <Button
                className="btn btn-primary"
                onClick={() => deleteSuscripcionDB(infoData.id)}
                color="primary"
                autoFocus
              >
                Eliminar
              </Button>
            </div>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default SuscripcionCardInfo;
