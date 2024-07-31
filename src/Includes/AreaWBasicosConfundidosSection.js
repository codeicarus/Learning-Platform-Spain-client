import React, { Component } from "react";
import BasicoConfundidoAreaWBasicosConfundidosSection from "../Includes/BasicoConfundidoAreaWBasicosConfundidosSection";

class AreaWBasicosConfundidosSection extends Component {
  constructor(props) {
    super(props);
    this.changeBasicosConfundidosSelected =
      this.changeBasicosConfundidosSelected.bind(this);
  }

  changeTitle = (nameArea) => {
    const newName = nameArea.split(" ");
    for (let i = 0; i < newName.length; i++) {
      newName[i] = newName[i][0].toUpperCase() + newName[i].substring(1);
    }
    return newName.join(" ");
  };

  changeBasicosConfundidosSelected = (id_basicoconfundido, estado) => {
    this.props.changeBasicosConfundidosSelected(id_basicoconfundido, estado);
  };

  render() {
    if (this.props.area.basicosconfundidos != null) {
      return (
        <div className="row justify-content-center text-center items lis_al_50">
          <div className="col-12 col-md-12 col-lg-12 align-self-auto item mb-5">
            <div>
              {/* <h4 className="text-left">{this.props.area.name}</h4> */}
              <h4 className="text-left">
                {this.changeTitle(this.props.area.name)}
              </h4>
              <ul className="list-group list-group-flush">
                {this.props.area.basicosconfundidos.map(
                  (basicoconfundido, i) => (
                    <BasicoConfundidoAreaWBasicosConfundidosSection
                      changeBasicosConfundidosSelected={
                        this.changeBasicosConfundidosSelected
                      }
                      basicoconfundido={basicoconfundido}
                      key={i}
                    />
                  )
                )}
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

export default AreaWBasicosConfundidosSection;
