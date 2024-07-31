import React, {Component} from 'react';

class BloqueAreaWBloquesSection extends Component {

    state = {
        selected: false
    };

    changeSelected = () => {
        this.setState({
            selected: !this.state.selected
        }, this.emitChange);
    };
    emitChange = () => {
        this.props.changeBloquesSelected(this.props.bloque.id, this.state.selected)
    };
    className = () => {
        if(this.state.selected){
            return "checkStyle la la-check text-right selected"
        }else{
            return "checkStyle la la-check text-right"
        }
    };

    render() {

        return (
            <li onClick={() => this.changeSelected()} className="list-group-item text-left">
                <i className={this.className()}></i>
                <span> {this.props.bloque.name}</span>
            </li>
        );
    }

}

export default BloqueAreaWBloquesSection;
