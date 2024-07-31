import React, {Component} from 'react';
import BloqueAreaWBloquesSection from "../Includes/BloqueAreaWBloquesSection";

class AreaWBloquesSection extends Component {


    constructor(props) {
        super(props)
        this.changeBloquesSelected = this.changeBloquesSelected.bind(this)
    }


    changeBloquesSelected = (id_bloque, estado) => {
        this.props.changeBloquesSelected(id_bloque, estado)
    };

    changeTitle = (nameArea) => {
        const newName = nameArea.split(" ");
        for (let i = 0; i < newName.length; i++) {
            newName[i] = newName[i][0].toUpperCase() + newName[i].substring(1);
        }
        return newName.join(" ")
    }

    render() {
        return (
            <div className="row justify-content-center text-center items lis_al_25">
                <div className="col-12 col-md-12 col-lg-12 align-self-auto item mb-5">
                    <div>
                        <h4 className="text-left">{this.changeTitle(this.props.area.name)}</h4>
                        <ul className="list-group list-group-flush">
                            {this.props.area.bloques?.map((bloque, i) => <BloqueAreaWBloquesSection changeBloquesSelected={this.changeBloquesSelected} bloque={bloque} key={i}/>)}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }


}

export default AreaWBloquesSection;
