import React, {Component} from 'react';
import LegislacionAreaWLegislacionesSection from "../Includes/LegislacionAreaWLegislacionesSection";

class AreaWLegislacionesSection extends Component {


    constructor(props) {
        super(props)
        this.changeLegislacionesSelected = this.changeLegislacionesSelected.bind(this)
    }


    changeLegislacionesSelected = (id_legislacion, estado) => {
        this.props.changeLegislacionesSelected(id_legislacion, estado)
    };

    changeTitle = (nameArea) => {
        const newName = nameArea.split(" ");
        for (let i = 0; i < newName.length; i++) {
            newName[i] = newName[i][0].toUpperCase() + newName[i].substring(1);
        }
        return newName.join(" ")
    }

    render() {
        if (this.props.area.legislaciones != null) {
            return (
                <div className="row justify-content-center text-center items lis_al_50">
                    <div className="col-12 col-md-12 col-lg-12 align-self-auto item mb-5">
                        <div>
                            <h4 className="text-left">{this.changeTitle(this.props.area.name)}</h4>
                            <ul className="list-group list-group-flush">
                                {this.props.area.legislaciones.map((legislacion, i) => <LegislacionAreaWLegislacionesSection changeLegislacionesSelected={this.changeLegislacionesSelected} legislacion={legislacion} key={i}/>)}
                            </ul>
                        </div>
                    </div>
                </div>
            );
        } else {
            return "";
        }

    }


}

export default AreaWLegislacionesSection;
