import React, { Component } from "react";
import LoginForm from "../Includes/LoginForm";
import RegisterForm from "../Includes/RegisterForm";
import { Redirect } from "react-router-dom";
import axios from "axios";
import ReactGA from "react-ga";

class LoginPage extends Component {
  initial_state = {
    redirectDashboard: false,
    redirectFirstLogin: false,
  };
  state = this.initial_state;

  componentDidMount() {
    ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALITYCS);
    ReactGA.pageview(window.location.pathname + window.location.search);
    window.scrollTo(0, 0);
    if (
      localStorage.getItem("token_penitenciarios") != null &&
      localStorage.getItem("email_penitenciarios") != null
    ) {
      this.doFindUser();
    } else {
    }
  }

  async doFindUser() {
    axios
      .post(
        process.env.REACT_APP_URL_API + `usuarios/find`,
        {
          email: localStorage.getItem("email_penitenciarios"),
        },
        {
          headers: {
            authorization: localStorage.getItem("token_penitenciarios"),
          },
        }
      )
      .then((res) => {
        if (!res.data.usuario.first_login) {
          this.setState({
            redirectFirstLogin: true,
          });
        } else {
          this.setState({
            redirectDashboard: true,
          });
        }
      })
      .catch((error) => {
        if (error.response) {
          this.setState({
            title: "ERROR",
            message: error.response.data.error,
            class: "error_sms",
          });
        }
      });
  }

  renderRedirectDashboard = () => {
    if (this.state.redirectDashboard) {
      return <Redirect to="/dashboard" />;
    }
  };
  renderRedirectFirstLogin = () => {
    if (this.state.redirectFirstLogin) {
      return <Redirect to="/first-login" />;
    }
  };

  render() {
    return (
      <div>
        {this.renderRedirectDashboard()}
        {this.renderRedirectFirstLogin()}
        <section id="contact" className="form featured all">
          <div className="container">
            <div className="row pt-5">
              <div className="col-12 col-md-6 align-self-auto text-center text-md-left pr-lg-5 pr-md-5">
                <RegisterForm />
              </div>
              <div className="col-12 col-md-6 align-self-auto text-center text-md-left pl-lg-5 pl-md-5 mt-md-0 mt-lg-0 mt-sm-5">
                <LoginForm update_menu={this.props.update_menu} />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default LoginPage;
