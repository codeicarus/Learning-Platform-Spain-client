import React, { Component, createRef } from "react";
import axios from "axios";
import UserInfoData from "./UserInfoData";
import { Grid, Select, MenuItem } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

class UsersInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      auxData: [],
      loader: false,
      view_render: false,
      redirect_to_login: false,
      notify: false,
      search: "",
      typeSearch: "nombre",
    };
    this.selectRef = createRef();
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleSubmitSearch = this.handleSubmitSearch.bind(this);
    this.handleChangeTypeSearch = this.handleChangeTypeSearch.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.setState({
      loader: true,
    });
    axios
      .post(
        process.env.REACT_APP_URL_API + `usuarios/get_all_user`,
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
        this.state.data = res.data.data;
        this.state.auxData = res.data.data;
      })
      .catch((err) => {})
      .then(() => this.setState({ loader: false }));
  }

  timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time =
      this.str_pad(date + "", 2, "0", "STR_PAD_LEFT") +
      "/" +
      this.str_pad(a.getMonth() + 1 + "", 2, "0", "STR_PAD_LEFT") +
      "/" +
      year +
      " " +
      this.str_pad(hour + "", 2, "0", "STR_PAD_LEFT") +
      ":" +
      this.str_pad(min + "", 2, "0", "STR_PAD_LEFT") +
      ":" +
      this.str_pad(sec + "", 2, "0", "STR_PAD_LEFT");
    return time;
  }

  str_pad(str, pad_length, pad_string, pad_type) {
    var len = pad_length - str.length;

    if (len < 0) return str;

    for (var i = 0; i < len; i++) {
      if (pad_type == "STR_PAD_LEFT") {
        str = pad_string + str;
      } else {
        str += pad_string;
      }
    }

    return str;
  }

  timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time =
      this.str_pad(date + "", 2, "0", "STR_PAD_LEFT") +
      "/" +
      this.str_pad(a.getMonth() + 1 + "", 2, "0", "STR_PAD_LEFT") +
      "/" +
      year;
    return time;
  }

  str_pad(str, pad_length, pad_string, pad_type) {
    var len = pad_length - str.length;
    if (len < 0) return str;
    for (var i = 0; i < len; i++) {
      if (pad_type == "STR_PAD_LEFT") {
        str = pad_string + str;
      } else {
        str += pad_string;
      }
    }
    return str;
  }

  handleChangeInput(e) {
    this.setState({ search: e.target.value });
  }

  handleSubmitSearch(e) {
    this.setState({
      loader: true,
    });
    if (this.state.search === "") {
      this.state.data = this.state.auxData;
      this.setState({
        loader: false,
      });
      return;
    }
    axios
      .post(
        process.env.REACT_APP_URL_API + `usuarios/get_search_user`,
        {
          email: localStorage.getItem("email_penitenciarios"),
          type: this.state.typeSearch,
          data: this.state.search,
        },
        {
          headers: {
            authorization: localStorage.getItem("token_penitenciarios"),
          },
        }
      )
      .then((res) => {
        if (res.data.data) this.state.data = res.data.data;
        else this.state.data = [];
      })
      .catch((err) => {})
      .then(() => this.setState({ loader: false }));
  }

  handleChangeTypeSearch(e) {
    this.setState({ typeSearch: e.target.value });
  }

  render() {
    return (
      <div>
        <section className="plans featured left">
          <div className="container">
            <div className="row intro mt-5 mt-sm-2">
              <div className="col-12">
                <h2 className="featured">Lista de usuarios</h2>
                <p>Aqui se mostrara la lista de Usuarios junto a su email</p>
              </div>
            </div>

            <Grid
              container
              spacing={1}
              alignItems="center"
              style={{ margin: "0px 0px 30px" }}
              justifyContent="center"
            >
              <Grid item xs={12} sm={6} md={4}>
                <input
                  type="text"
                  placeholder="Buscar usuario/s por..."
                  onChange={this.handleChangeInput}
                />
              </Grid>
              <Grid item xs={12} sm={3} md={2}>
                <Select
                  labelId="tipo-busqueda-label"
                  id="tipo-busqueda-select"
                  ref={this.selectRef}
                  value={this.typeSearch}
                  onChange={this.handleChangeTypeSearch}
                  fullWidth
                  defaultValue={"nombre"}
                >
                  <MenuItem value="nombre">Nombre</MenuItem>
                  <MenuItem value="email">Email</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12} sm={3} md={2}>
                <button
                  className="btn primary-button"
                  style={{ width: "100%", height: "100%" }}
                  onClick={this.handleSubmitSearch}
                >
                  <SearchIcon fontSize="small"></SearchIcon>Buscar
                </button>
              </Grid>
            </Grid>

            <div className="row justify-content-center text-center items">
              {this.state.loader && <div className="loader_examen"></div>}
              <div className="col-12 col-md-12 col-lg-12 align-self-auto item">
                {this.state.data.length > 0 ? (
                  this.state.data.map(
                    (userData, index) =>
                      userData.email !=
                        localStorage.getItem("email_penitenciarios") && (
                        <UserInfoData data={userData} key={index} />
                      )
                  )
                ) : (
                  <h4>No hay datos para mostrar</h4>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

// export default withStyles(styles)(UsersInfo);
export default UsersInfo;
