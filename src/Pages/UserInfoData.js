import React, { Component } from "react";
import { Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

class UserInfoData extends Component {
  render() {
    const props = this.props;

    return (
      <Link
        to={`/userinfo/${props.data.id}`}
        className="list-group-item text-left card"
      >
        <div>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography
                variant="body1"
                style={{ paddingLeft: 20, fontSize: 20 }}
              >
                {props.data.name}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">{props.data.email}</Typography>
            </Grid>
            <Grid item>
              <i
                className="btn-icon icon-arrow-right-circle"
                style={{ paddingRight: 20, fontSize: 20 }}
              ></i>
            </Grid>
          </Grid>
        </div>
      </Link>
    );
  }
}

export default UserInfoData;
