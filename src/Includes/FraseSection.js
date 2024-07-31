import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";
import {toast} from "react-toastify";

class FraseSection extends Component {

    state = {
        frase: []
    };

    timer() {
        if (localStorage.getItem("token_penitenciarios") != null && localStorage.getItem("email_penitenciarios") != null) {
            axios.post(process.env.REACT_APP_URL_API+`frases_motivadoras`, {
                email: localStorage.getItem('email_penitenciarios')
            }, {
                headers: {
                    authorization: localStorage.getItem('token_penitenciarios')
                }
            })
                .then(res => {
                    if(res.data.result !== undefined){
                    }else{
                        this.setState({
                            frase: res.data
                        });
                    }

                })
                .catch(error => {
                    if (error.response) {
                        toast.error(error.response.data.error);
                    }
                });
        }
    }

    componentDidMount() {
        this.timer()
        this.intervalId = setInterval(this.timer.bind(this), 60000);
    }

    render() {
        if(this.state.frase.frase !== undefined){
            return (<div className="frase_motivadora">
                <a className="close" onClick={() => this.setState({
                    frase: []
                })} ><i className="la la-times" ></i></a>
                <div className="frase" >{this.state.frase.frase}</div>
                { this.state.frase.link !="" && <a target="_blank" href={this.state.frase.link} >{this.state.frase.link}</a> }
            </div>)
        }else{
            return (<div></div>)
        }
    }
}

export default FraseSection;
