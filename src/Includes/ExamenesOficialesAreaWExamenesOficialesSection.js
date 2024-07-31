import React, {Component} from 'react';

class ExamenesOficialesAreaWExamenesOficialesSection extends Component {

    state = {
        selected: false
    };

    changeSelected = () => {
        if(this.props.examenes_oficiales_selected.includes(this.props.examen_oficial.id)){

        }else{
            this.setState({
                selected: true
            }, this.emitChange);
        }
    };
    emitChange = () => {
        this.props.changeExamenesOficialesSelected(this.props.examen_oficial.id, this.state.selected)
    };
    className = () => {
        if(this.state.selected && this.props.examenes_oficiales_selected.includes(this.props.examen_oficial.id)){
            return "radioStyle la la-check text-right selected"
        }else{
            return "radioStyle la la-check text-right"
        }
    };

    render() {

        return (
            <li onClick={() => this.changeSelected()} className="list-group-item text-left">
                <i className={this.className()}></i>
                <span> {this.props.examen_oficial.name}</span>
            </li>
        );
    }

}

export default ExamenesOficialesAreaWExamenesOficialesSection;
