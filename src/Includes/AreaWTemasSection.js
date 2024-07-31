import React, { Component } from "react";
import TemaAreaWTemasSection from "../Includes/TemaAreaWTemasSection";

class AreaWTemasSection extends Component {
  constructor(props) {
    super(props);
    this.changeTemasSelected = this.changeTemasSelected.bind(this);
  }

  changeTemasSelected = (id_tema, estado) => {
    this.props.changeTemasSelected(id_tema, estado);
  };

  changeTitle = (nameArea) => {
    const newName = nameArea.split(" ");
    for (let i = 0; i < newName.length; i++) {
      newName[i] = newName[i][0].toUpperCase() + newName[i].substring(1);
    }
    return newName.join(" ");
  };

  render() {
    return (
      <div className="col-12 col-md-12 col-lg-12 align-self-auto item">
        <div>
          <h4 className="text-left">
            {this.changeTitle(this.props.area.name)}
          </h4>
          <ul className="list-group list-group-flush">
            {this.props.area.temas?.map((tema, i) => (
              <TemaAreaWTemasSection
                changeTemasSelected={this.changeTemasSelected}
                tema={tema}
                key={i}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default AreaWTemasSection;
