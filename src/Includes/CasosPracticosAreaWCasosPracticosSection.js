import React, {Component} from 'react';

class CasosPracticosAreaWCasosPracticosSection extends Component {

    state = {
        selected: false
    };

    changeSelected = () => {
        if (this.props.simulacros_selected.includes(this.props.caso_practico.id)) {
            this.setState({
                selected: false
            }, this.emitChange);
        } else {
            this.setState({
                selected: true
            }, this.emitChange);
        }
    };
    emitChange = () => {
        this.props.changeSimulacrosSelected(this.props.caso_practico.id, this.state.selected)
    };
    className = () => {
        if (this.props.simulacros_selected.includes(this.props.caso_practico.id)) {
            return "checkStyle la la-check text-right selected"
        } else {
            return "checkStyle la la-check text-right"
        }
    };

    render() {

        if (!this.props.caso_practico.oficial) {
            return (
                <li onClick={() => this.changeSelected()} className="list-group-item text-left">
                    <i className={this.className()}></i>
                    <span> {this.props.caso_practico.name}</span>
                </li>
            );
        } else {
            return "";
        }
    }

}

export default CasosPracticosAreaWCasosPracticosSection;
