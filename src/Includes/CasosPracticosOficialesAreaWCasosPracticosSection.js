import React, {Component} from 'react';

class CasosPracticosOficialesAreaWCasosPracticosSection extends Component {

    state = {
        selected: false
    };

    changeSelected = () => {
        if(this.props.casos_practicos_selected.includes(this.props.caso_practico.id)){

        }else{
            this.setState({
                selected: true
            }, this.emitChange);
        }
    };
    emitChange = () => {
        this.props.changeCasosPracticosSelected(this.props.caso_practico.id, this.state.selected)
    };
    className = () => {
        if(this.state.selected && this.props.casos_practicos_selected.includes(this.props.caso_practico.id)){
            return "radioStyle la la-check text-right selected"
        }else{
            return "radioStyle la la-check text-right"
        }
    };

    render() {

        if(this.props.caso_practico.oficial){

            return (
                <li onClick={() => this.changeSelected()} className="list-group-item text-left">
                    <i className={this.className()}></i>
                    <span> {this.props.caso_practico.name}</span>
                </li>
            );
        }
        else{
            return "";
        }
    }

}

export default CasosPracticosOficialesAreaWCasosPracticosSection;
