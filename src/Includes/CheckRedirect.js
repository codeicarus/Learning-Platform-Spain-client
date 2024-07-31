import React from 'react';
import { withRouter } from 'react-router-dom';

class CheckRedirect extends React.Component {
  componentDidMount(){
    const token = localStorage.getItem('token_penitenciario');
    if(!token){
        this.props.history.push('/login');    
        window.scrollTo(0, 0);
    }
  }


  render() {
    return (
    <></>
    );
  }
}

export default withRouter(CheckRedirect);
