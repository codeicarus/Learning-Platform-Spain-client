import React from "react";
import { withRouter } from "react-router-dom";
import { serverSocket } from "../App";
import { toast } from "react-toastify";

class CheckConections extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    serverSocket.on("other-user-connected", () => {
      localStorage.removeItem("token_penitenciarios");
      localStorage.removeItem("email_penitenciarios");
      this.props.update();
      this.props.history.push("/login");
      toast.error("Sesion iniciada en otro dispositivo");
    });

    serverSocket.on("change-password", () => {
      localStorage.removeItem("token_penitenciarios");
      localStorage.removeItem("email_penitenciarios");
      toast.error("Un administrado cambio tu contraseña");
      this.props.update();
      this.props.history.push("/login");
    });
  }

  render() {
    return <></>;
  }
}

export default withRouter(CheckConections);
