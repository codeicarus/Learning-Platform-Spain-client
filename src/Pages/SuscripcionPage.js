import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
import ReactGA from "react-ga";
import { Link } from "react-router-dom";
import ContactForm from "../Includes/ContactForm";
import Precios from "../Includes/Precios";
import SinServicio from "./SinServicio";

class SuscripcionPage extends Component {
  componentDidMount() {
    ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALITYCS);
    ReactGA.pageview(window.location.pathname + window.location.search);
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div>
        <Precios />
        {/* <SinServicio /> */}
      </div>
    );
  }
}

export default SuscripcionPage;
